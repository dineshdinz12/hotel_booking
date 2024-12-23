'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, Coffee, Wifi, ShowerHead , Utensils } from 'lucide-react';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const amenities = [
    { icon: <Coffee size={24} />, title: "Premium Restaurant", description: "Fine dining experience" },
    { icon: <Wifi size={24} />, title: "High-Speed WiFi", description: "Stay connected always" },
    { icon: <ShowerHead  size={24} />, title: "Luxury ShowerHead ", description: "Relax and rejuvenate" },
    { icon: <Utensils size={24} />, title: "Room Service", description: "24/7 availability" },
  ];

  const rooms = [
    {
      title: "Deluxe Suite",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      price: "$299",
      description: "ShowerHead cious suite with city view"
    },
    {
      title: "Presidential Suite",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      price: "$599",
      description: "Ultimate luxury experience"
    },
    {
      title: "Ocean View Room",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      price: "$399",
      description: "Breathtaking ocean views"
    }
  ];

  type Hotel = {
    id: number;
    name: string;
    location: string;
    image: string;
    rating: number;
    status: string;
    description: string;
  };
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  

    useEffect(() => {
      fetch('/api/hotels')
        .then((response) => response.json())
        .then((data) => setHotels(data))
        .catch((error) => console.error('Error fetching hotels:', error));
    }, []);
    console.log(hotels)

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Luxury Hotel"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white ShowerHead ce-y-6 px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Welcome to Luxury Living
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience unparalleled luxury and comfort in the heart of paradise
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/hotels" 
                className="bg-blue-600 text-white  mt-4  px-8 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">Luxury Accommodations</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {hotels.slice(0, 3).map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden group"
        >
          {hotel.image && (
            <div className="relative h-48">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">{hotel.name}</h2>
            <p className="text-sm text-gray-600">{hotel.location}</p>
            <p className="text-gray-700 text-sm">{hotel.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-bold">Rating:</span>
              {hotel.rating}
            </div>
            <div
              className={`text-sm ${hotel.status === 'Open'
                ? 'text-green-500'
                : 'text-red-500'
                }`}
            >
              {hotel.status}
            </div>
            <div>
              <Link
                href={`/hotels/booking?hotelId=${hotel.id}`}
                className="bg-blue-600 text-white mt-4 px-8 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay now and get exclusive benefits with our premium membership.
          </p>
          <Link 
            href="/hotels" 
            className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
          >
            Reserve Your Stay
          </Link>
        </div>
      </section>
    </main>
  );
}
