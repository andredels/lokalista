"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchRealFoodPlaces, type FoodPlace } from "@/lib/restaurants";

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  price_range: string;
  location: string;
  vibe: string;
  menu?: string[];
  image: string;
  tip?: string;
  latitude?: number;
  longitude?: number;
}

interface Message {
  id: string;
  content?: string;
  isUser: boolean;
  timestamp: Date;
  restaurants?: Restaurant[];
  isTyping?: boolean;
}

export default function AIAssistantPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [locationReady, setLocationReady] = useState(false);
  const [locationError, setLocationError] = useState(false);

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          setLocationReady(true);
          console.log('Location detected:', coords);
          
          // Add welcome message once location is ready
          setMessages([{
            id: "1",
            content: `Hello! I'm your AI assistant for Lokalista. I've detected your location and I can help you find the perfect restaurants, cafes, and events near you. What would you like to discover?`,
            isUser: false,
            timestamp: new Date(),
          }]);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // If permission denied or error, use default location
          setUserLocation([14.5995, 120.9842]); // Manila, Philippines
          setLocationReady(true);
          setLocationError(true);
          
          // Add welcome message with error notice
          setMessages([{
            id: "1",
            content: "Hello! I'm your AI assistant for Lokalista. I couldn't access your location, so I'll show results for a general area. Allow location access for better recommendations near you. What would you like to discover?",
            isUser: false,
            timestamp: new Date(),
          }]);
        }
      );
    } else {
      // Fallback if geolocation not supported
      setUserLocation([14.5995, 120.9842]);
      setLocationReady(true);
      setLocationError(true);
      
      setMessages([{
        id: "1",
        content: "Hello! I'm your AI assistant for Lokalista. Location services aren't available in your browser. What would you like to discover?",
        isUser: false,
        timestamp: new Date(),
      }]);
    }
  }, []);

  // Convert FoodPlace to Restaurant format
  const convertToRestaurant = (place: FoodPlace): Restaurant => {
    // Generate vibe based on category and name
    const getVibe = (category: string, name: string) => {
      const lowerName = name.toLowerCase();
      if (category.includes("Cafe") || lowerName.includes("coffee")) {
        return lowerName.includes("cozy") || lowerName.includes("quiet") 
          ? "Cozy and quiet, perfect for work or relaxation" 
          : "Modern and welcoming, great for meetings";
      }
      if (category.includes("Fast Food")) {
        return "Quick and convenient, family-friendly";
      }
      if (category.includes("Local")) {
        return "Authentic Filipino experience";
      }
      return "Welcoming atmosphere, great for dining";
    };

    // Generate tip based on place
    const getTip = (category: string, name: string) => {
      if (category.includes("Cafe")) return "Visit during off-peak hours for a more peaceful experience.";
      if (category.includes("Fast Food")) return "Most locations are open until late, great for quick meals.";
      if (name.toLowerCase().includes("starbucks")) return "Peak hours are lunch and afternoon, try early morning.";
      return "Check hours before visiting to avoid disappointment.";
    };

    return {
      id: place.id,
      name: place.name,
      category: place.category,
      rating: place.rating,
      price_range: place.price_range,
      location: place.description || `Near your location`,
      vibe: getVibe(place.category, place.name),
      image: place.image_url || "/Landing.png",
      tip: getTip(place.category, place.name),
      latitude: place.latitude,
      longitude: place.longitude
    };
  };

  const generateRecommendations = async (userInput: string): Promise<Restaurant[]> => {
    if (!userLocation) {
      return [];
    }

    const input = userInput.toLowerCase();
    
    try {
      // Fetch real food places near user location
      const foodPlaces = await fetchRealFoodPlaces(userLocation);
      
      // Filter based on keywords
      let matches: FoodPlace[] = [];
      
      if (input.includes("coffee") || input.includes("cafe") || input.includes("cozy")) {
        matches = foodPlaces.filter(p => 
          p.category.toLowerCase().includes("cafe") || 
          p.name.toLowerCase().includes("coffee") ||
          p.name.toLowerCase().includes("cafe")
        );
      } else if (input.includes("fast food") || input.includes("quick") || input.includes("cheap")) {
        matches = foodPlaces.filter(p => 
          p.category.toLowerCase().includes("fast") || 
          p.price_range === "$"
        );
      } else if (input.includes("budget") || input.includes("affordable")) {
        matches = foodPlaces.filter(p => p.price_range === "$");
      } else if (input.includes("local") || input.includes("filipino")) {
        matches = foodPlaces.filter(p => 
          p.category.toLowerCase().includes("local") || 
          p.cuisine_type?.toLowerCase().includes("filipino")
        );
      } else {
        matches = foodPlaces.slice(0, 3);
      }
      
      // Limit to 3 results
      const limited = matches.slice(0, 3);
      
      // Convert to Restaurant format
      return limited.map(convertToRestaurant);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Fetch real recommendations based on location
    try {
      const restaurants = await generateRecommendations(inputMessage.trim());
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: restaurants.length > 0 
          ? `Here are ${restaurants.length} ${inputMessage.trim().toLowerCase().includes('cozy') ? 'cozy' : inputMessage.trim().toLowerCase().includes('coffee') ? 'coffee' : ''} recommendations near your location:`
          : "I couldn't find places matching your request. Try asking for 'coffee', 'fast food', or 'budget-friendly' options.",
        restaurants: restaurants,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't fetch recommendations right now. Please try again or use the map to explore nearby places.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewOnMap = (restaurant: Restaurant) => {
    if (restaurant.latitude && restaurant.longitude) {
      router.push(`/map?lat=${restaurant.latitude}&lng=${restaurant.longitude}&restaurant=${encodeURIComponent(restaurant.name)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Good coffee spot near me",
    "Budget-friendly places near me",
    "Fast food near me",
    "Cozy cafes for working",
    "Quick meals nearby",
    "Popular restaurants near me"
  ];

  return (
    <div className="ai-assistant-bg">
      {/* Header */}
      <div className="bg-ai-surface border-b border-ai shadow-ai">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-gray-600">Your personal food discovery companion</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-ai-surface rounded-2xl shadow-ai border border-ai overflow-hidden backdrop-blur">
          {/* Messages Container */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-4">
                {/* User Message */}
                {message.isUser && message.content && (
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-1 text-purple-100">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* AI Message with Restaurant Cards */}
                {!message.isUser && (
                  <div className="space-y-4">
                    {message.content && (
                      <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gray-100 text-gray-900">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs mt-1 text-gray-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Restaurant Cards */}
                    {message.restaurants && message.restaurants.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {message.restaurants.map((restaurant) => (
                          <div key={restaurant.id} className="bg-ai-card border border-ai rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            {/* Image */}
                            <div className="aspect-video overflow-hidden bg-gray-100">
                              <img 
                                src={restaurant.image} 
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/Landing.png";
                                }}
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 space-y-3">
                              <div>
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                                    <p className="text-sm text-gray-500">{restaurant.category}</p>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm">
                                    <span className="text-yellow-500">⭐</span>
                                    <span className="font-medium">{restaurant.rating}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-400">Closed</p>
                              </div>
                              
                              <div className="space-y-2 text-sm text-gray-700">
                                <div>
                                  <span className="font-medium">📍 Location:</span> {restaurant.location}
                                </div>
                                <div>
                                  <span className="font-medium">✨ Vibe:</span> {restaurant.vibe}
                                </div>
                                <div>
                                  <span className="font-medium">💰 Price:</span> {restaurant.price_range}
                                </div>
                                {restaurant.menu && restaurant.menu.length > 0 && (
                                  <div>
                                    <span className="font-medium">🍽️ Menu:</span> {restaurant.menu.slice(0, 3).join(", ")}
                                  </div>
                                )}
                                {restaurant.tip && (
                                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                                    <span className="font-medium text-amber-800">💡 Tip:</span> {restaurant.tip}
                                  </div>
                                )}
                              </div>
                              
                              <button
                                onClick={() => handleViewOnMap(restaurant)}
                                className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                              >
                                View on Map
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {locationReady && (
            <div className="px-6 py-4 bg-ai-muted border-t border-ai">
              <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action)}
                    className="px-3 py-1.5 text-xs bg-ai-card border border-ai rounded-full hover:bg-muted transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 bg-ai-surface border-t border-ai">
            {!locationReady ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                <p className="text-gray-600">Getting your location...</p>
              </div>
            ) : (
              <>
                {locationError && (
                  <div className="mb-4 p-3 bg-yellow-50/80 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-100">
                      ⚠️ Location permission denied. Showing results for Manila area. Allow location access for better recommendations.
                    </p>
                  </div>
                )}
                {userLocation && !locationError && (
                  <div className="mb-4 p-3 bg-green-50/80 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-100">
                      ✓ Location detected! Finding places near you.
                    </p>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask anything about places, restaurants, or cafes..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading || !locationReady}
                    />
                  </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading || !locationReady}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                    Send
                </button>
              </div>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-ai-card p-6 rounded-xl shadow-lg border border-ai">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location-Based</h3>
            <p className="text-ai-muted text-sm">Find restaurants and cafes near your current location with precise recommendations.</p>
          </div>

          <div className="bg-ai-card p-6 rounded-xl shadow-lg border border-ai">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Filtering</h3>
            <p className="text-ai-muted text-sm">Filter by cuisine, price range, features, and preferences to find exactly what you want.</p>
          </div>

          <div className="bg-ai-card p-6 rounded-xl shadow-lg border border-ai">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized</h3>
            <p className="text-ai-muted text-sm">Get recommendations tailored to your preferences, budget, and dining preferences.</p>
          </div>
          </div>
      </div>
    </div>
  );
}