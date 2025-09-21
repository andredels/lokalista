"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const recommendations = [
    {
      id: 1,
      name: "The Mood Kitchen",
      description: "Innovative dishes with bold flavors",
      distance: "0.3 km",
      status: "Open",
      price: "$$$$",
      rating: 4.8,
      tag: "adventurous",
      tagColor: "bg-purple-100 text-purple-800",
      image: "/restaurant1.jpg"
    },
    {
      id: 2,
      name: "Cozy Corner Cafe",
      description: "Perfect spot for reading and relaxing",
      distance: "0.7 km",
      status: "Open",
      price: "$$",
      rating: 4.6,
      tag: "chill",
      tagColor: "bg-blue-100 text-blue-800",
      image: "/cafe1.jpg"
    },
    {
      id: 3,
      name: "Skyline Rooftop",
      description: "Stunning city views, perfect for dates",
      distance: "1.2 km",
      status: "Closed",
      price: "$$$",
      rating: 4.9,
      tag: "romantic",
      tagColor: "bg-pink-100 text-pink-800",
      image: "/rooftop1.jpg"
    },
    {
      id: 4,
      name: "Street Food Festival",
      description: "Vibrant food festival with live music",
      distance: "2.1 km",
      status: "Open",
      price: "$",
      rating: 4.7,
      tag: "social",
      tagColor: "bg-green-100 text-green-800",
      image: "/festival1.jpg"
    }
  ];

  const trending = [
    { id: 1, name: "Trending Spot #1", image: "/trending1.jpg" },
    { id: 2, name: "Trending Spot #2", image: "/trending2.jpg" },
    { id: 3, name: "Trending Spot #3", image: "/trending3.jpg" },
    { id: 4, name: "Trending Spot #4", image: "/trending4.jpg" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="h-1 bg-gray-300"></div>
      
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Good evening!</h1>
            <p className="text-lg text-gray-600">Discover your next favorite spot</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, cafes, events..."
                className="w-full pl-10 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mb-12">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#8c52ff] text-white rounded-full hover:opacity-90 transition-opacity">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Ask AI
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Map
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="bg-gray-50 py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">See all</a>
          </div>
          
          <div className="space-y-4">
            {recommendations.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image</span>
                  </div>
                  <button className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{item.distance}</span>
                        <span className={`font-medium ${item.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.status}
                        </span>
                        <span>{item.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-white py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Trending in your area</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.map((item) => (
              <div key={item.id} className="relative group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">#{item.id}</span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
