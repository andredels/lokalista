"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  content?: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryMessage[]>([]);

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
          setChatHistory([{
            role: "assistant",
            content: `Hello! I'm your AI assistant for Lokalista. I've detected your location and can help you find the perfect spots nearby. What would you like to discover?`,
          }]);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // If permission denied or error, use default location
          setUserLocation([10.3157, 123.8854]); // Cebu City, Philippines
          setLocationReady(true);
          setLocationError(true);
          
          // Add welcome message with error notice
          setMessages([{
            id: "1",
            content: "Hello! I'm your AI assistant for Lokalista. I couldn't access your location, so I'll focus on Cebu City for now. Allow location access for hyper-local picks around you. What would you like to discover?",
            isUser: false,
            timestamp: new Date(),
          }]);
          setChatHistory([{
            role: "assistant",
            content: "Hello! I'm your AI assistant for Lokalista. I couldn't access your location, so I'll use Cebu City as our base. What would you like to discover around here?",
          }]);
        }
      );
    } else {
      // Fallback if geolocation not supported
      setUserLocation([10.3157, 123.8854]);
      setLocationReady(true);
      setLocationError(true);
      
      setMessages([{
        id: "1",
        content: "Hello! I'm your AI assistant for Lokalista. Location services aren't available, so we'll explore Cebu City by default. What would you like to discover?",
        isUser: false,
        timestamp: new Date(),
      }]);
      setChatHistory([{
        role: "assistant",
        content: "Hello! I'm your AI assistant for Lokalista. Location services aren't available, so let's explore Cebu City by default. What would you like to discover?",
      }]);
    }
  }, []);


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const rawInput = inputMessage.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: rawInput,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Build location context with detailed information
    let locationContext = "";
    if (userLocation) {
      const [lat, lon] = userLocation;
      locationContext = `IMPORTANT: The user's CURRENT LOCATION is at coordinates ${lat.toFixed(6)}, ${lon.toFixed(6)} (latitude, longitude). This is their exact current position. Base ALL recommendations on this specific location. Prioritize places within 1-2km of these coordinates.`;
    } else if (locationError) {
      locationContext = "User location not available. Using Cebu City, Philippines (10.3157, 123.8854) as default location. Base recommendations on this area.";
    } else {
      locationContext = "User location is being detected. Using Cebu City, Philippines (10.3157, 123.8854) as default location for now.";
    }

    const systemPrompt = [
      "You are Lokalista, an upbeat culinary concierge that provides location-based food recommendations.",
      "CRITICAL: Always base your recommendations on the user's CURRENT LOCATION provided below, NOT on previous conversation history.",
      "Each request should be treated independently based on where the user is RIGHT NOW.",
      locationContext,
      "Whenever the user mentions a specific neighborhood or landmark (e.g., IT Park, SM Seaside, Ayala Center), prioritize that area and mention it in your reply.",
      "Provide specific, actionable recommendations for places near the user's current location.",
      "Keep answers concise (4-6 sentences) and focused on the current location.",
      "Do NOT reference previous conversations unless the user explicitly asks about them.",
    ].join(" ");

    // Only send the current message, not conversation history, to prioritize location
    const payloadMessages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: rawInput },
    ];

    let assistantContent =
      "Sorry, I couldn't fetch a response from our AI right now. Please try again in a moment.";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const errorMessage = errorPayload?.error || `API error (${response.status})`;
        
        // Provide user-friendly error messages
        if (response.status === 401) {
          assistantContent = "⚠️ Invalid API key. Please check your GROQ_API_KEY in the .env.local file. Make sure it's correct and starts with 'gsk_'.";
        } else if (response.status === 429) {
          assistantContent = "⏱️ Rate limit exceeded. Please try again in a moment.";
        } else {
          assistantContent = `Sorry, I encountered an error: ${errorMessage}. Please try again.`;
        }
        
        console.error("Chat completion error:", errorMessage);
      } else {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (content) {
          assistantContent = content;
        }
      }
    } catch (error: any) {
      console.error("Chat completion error:", error);
      assistantContent = error?.message 
        ? `Sorry, I encountered an error: ${error.message}. Please try again.`
        : "Sorry, I couldn't fetch a response from our AI right now. Please try again in a moment.";
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: assistantContent,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    // Only keep the last exchange for minimal context, but location is primary
    setChatHistory([{ role: "user", content: rawInput }, { role: "assistant", content: assistantContent }]);
    setIsLoading(false);
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
    <div className="ai-assistant-bg animate-fade-in h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-ai-surface border-b border-ai shadow-ai animate-fade-in-down flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-scale-in">
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

      <div className="max-w-4xl mx-auto px-4 py-4 flex-1 flex flex-col min-h-0 w-full">
        <div className="bg-ai-surface rounded-2xl shadow-ai border border-ai overflow-hidden backdrop-blur flex flex-col flex-1 min-h-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className="space-y-4 animate-fade-in-up">
                {/* User Message */}
                {message.isUser && message.content && (
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white hover-scale">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-1 text-purple-100">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* AI Message */}
                {!message.isUser && (
                  <div className="space-y-4">
                    {message.content && (
                      <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 hover-scale">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs mt-1 text-gray-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
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
            <div className="px-6 py-3 bg-ai-muted border-t border-ai flex-shrink-0">
              <p className="text-sm text-gray-600 mb-2">Quick actions:</p>
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
          <div className="p-4 bg-ai-surface border-t border-ai flex-shrink-0">
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
      </div>
    </div>
  );
}