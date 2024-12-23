"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, CreditCard, Clock } from 'lucide-react';

type RoomType = 'deluxe' | 'suite' | 'executive';

interface FormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: RoomType;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: string;
  hotel_id: number; 
}

const Booking: React.FC = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelId');
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'deluxe',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'creditCard',
    hotel_id: hotelId ? parseInt(hotelId) : 0, 
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const roomTypes = {
    deluxe: { price: 200 },
    suite: { price: 350 },
    executive: { price: 500 },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'checkIn' || name === 'checkOut' || name === 'roomType') {
      calculateTotal();
    }
  };

  const calculateTotal = () => {
    const { checkIn, checkOut, roomType } = formData;
    if (!checkIn || !checkOut || !roomType) return;

    const days = Math.ceil(
      (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    setTotalAmount(roomTypes[roomType]?.price * days || 0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.success) {
        setShowSummary(true);
      } else {
        alert('Booking failed, please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your booking.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
          alt="Luxury Booking"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Book Your Stay</h1>
            <p className="text-xl">Experience luxury like never before</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {['Dates & Room', 'Guest Details', 'Payment'].map((stepName, index) => (
                <div key={index} className="flex-1 text-center">
                  <div 
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 
                      ${step > index + 1 ? 'bg-green-500 text-white' : 
                        step === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm">{stepName}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {showSummary ? (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Booking Confirmed!</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <Clock size={20} />
                  <span>Confirmation sent to your email</span>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Booking Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Check-in</p>
                      <p className="font-medium">{formData.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-out</p>
                      <p className="font-medium">{formData.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Room Type</p>
                      <p className="font-medium">{roomTypes[formData.roomType]?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Guests</p>
                      <p className="font-medium">{formData.guests}</p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  View Booking Details
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <div className="relative">
                        <Input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          required
                          className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <div className="relative">
                        <Input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          required
                          className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        required
                        className="pl-10"
                      />
                      <Users className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <Label>Select Room Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {Object.entries(roomTypes).map(([key, room]) => (
                        <div
                          key={key}
                          className={`border rounded-lg p-4 cursor-pointer transition-all
                            ${formData.roomType === key ? 'border-blue-600 bg-blue-50' : 'hover:border-gray-300'}`}
                          onClick={() => handleChange({ target: { name: 'roomType', value: key } })}
                        >
                          <h4 className="font-semibold text-lg">{key}</h4>
                          <p className="text-sm">Price: ${room.price} per night</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Button */}
                  <Button 
                    type="button"
                    className="mt-6 w-full"
                    onClick={() => setStep(2)} // Move to next step
                  >
                    Next
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Input
                      type="text"
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Back Button */}
                  <Button 
                    type="button" 
                    className="mt-6 w-full" 
                    onClick={() => setStep(1)} // Go back to the first step
                  >
                    Back
                  </Button>

                  {/* Next Button */}
                  <Button 
                    type="button"
                    className="mt-6 w-full"
                    onClick={() => setStep(3)} // Move to next step
                  >
                    Next
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">Total Amount</h2>
                      <p>${totalAmount}</p>
                    </div>
                    <div className="flex gap-2">
                      <CreditCard size={20} className="text-gray-400" />
                      <p>Payment Method: {formData.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Complete Button */}
                  <Button 
                    type="submit"
                    className="mt-6 w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Complete Booking'}
                  </Button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

