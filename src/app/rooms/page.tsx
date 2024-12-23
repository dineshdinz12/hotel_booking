'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Coffee, Tv, Users, Bath, Star, Search, ArrowRight } from 'lucide-react';

export default function Rooms() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: 200,
      size: '40m²',
      occupancy: '2 Adults, 1 Child',
      description: 'Modern comfort meets elegant design in our Deluxe Room, featuring city views and premium amenities.',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
      amenities: ['Free WiFi', 'Mini Bar', 'Room Service', 'TV', 'Air Conditioning']
    },
    {
      id: 2,
      name: 'Premium Suite',
      price: 350,
      size: '65m²',
      occupancy: '2 Adults, 2 Children',
      description: 'Spacious suite with separate living area and panoramic ocean views. Perfect for families.',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      amenities: ['Free WiFi', 'Mini Bar', 'Room Service', 'TV', 'Balcony', 'Kitchen']
    },
    {
      id: 3,
      name: 'Executive Suite',
      price: 500,
      size: '85m²',
      occupancy: '3 Adults, 2 Children',
      description: 'Luxury suite with private terrace, jacuzzi, and butler service. The epitome of luxury living.',
      rating: 5.0,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      amenities: ['Free WiFi', 'Mini Bar', 'Room Service', 'TV', 'Jacuzzi', 'Butler']
    }
  ];

  const amenityIcons = {
    'WiFi': <Wifi size={20} />,
    'Coffee': <Coffee size={20} />,
    'TV': <Tv size={20} />,
    'Bath': <Bath size={20} />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
          alt="Luxury Rooms"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Our Luxury Rooms</h1>
            <p className="text-xl max-w-2xl">Experience comfort and elegance in every detail</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sort By</label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium">{room.rating}</span>
                    <span className="text-xs text-gray-600">({room.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{room.name}</h2>
                    <p className="text-sm text-gray-600">{room.size} • {room.occupancy}</p>
                  </div>
                  <p className="text-xl font-bold text-blue-600">${room.price}</p>
                </div>

                <p className="text-gray-600 text-sm">{room.description}</p>

                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Link 
                    href={`/rooms/${room.id}`}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Comfort",
                description: "Luxurious bedding and furniture for ultimate relaxation",
                icon: <Bath className="text-blue-600" size={24} />
              },
              {
                title: "Modern Amenities",
                description: "State-of-the-art technology and entertainment systems",
                icon: <Tv className="text-blue-600" size={24} />
              },
              {
                title: "24/7 Room Service",
                description: "Round-the-clock service to cater to all your needs",
                icon: <Coffee className="text-blue-600" size={24} />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}