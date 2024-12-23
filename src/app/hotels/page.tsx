'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Hotel = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  status: string;
  description: string;
};

const HotelCart: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch('/api/hotels')
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);
  console.log(hotels)
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Available Hotels</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
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
    </div>
  );
};

export default HotelCart;
