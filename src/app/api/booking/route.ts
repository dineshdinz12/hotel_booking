import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // Adjust the path to match your DB setup

export async function POST(req: Request) {
  try {
    const {
      checkIn,
      checkOut,
      guests,
      roomType,
      name,
      email,
      phone,
      specialRequests,
      paymentMethod,
      hotel_id,  // Capture hotel_id from the request
    } = await req.json();

    // Validate required fields
    if (!checkIn || !checkOut || !name || !email || !phone || !hotel_id) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = calculateTotal(roomType, checkIn, checkOut);

    // Insert into database
    const [rows]: any = await pool.execute(
      `INSERT INTO bookings (hotel_id, check_in_date, check_out_date, guests, room_type, customer_name, customer_email, customer_phone, special_requests, payment_method, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [hotel_id, checkIn, checkOut, guests, roomType, name, email, phone, specialRequests, paymentMethod, totalAmount]  // Include hotel_id
    );

    const newBooking = {
      id: rows.insertId, // Assuming MySQL
      hotel_id, // Add hotel_id to the new booking data
      checkIn,
      checkOut,
      guests,
      roomType,
      name,
      email,
      phone,
      specialRequests,
      paymentMethod,
      totalAmount,
    };

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error('Error in POST /api/booking:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

function calculateTotal(roomType: string, checkIn: string, checkOut: string) {
  const roomTypes = {
    deluxe: { price: 200 },
    suite: { price: 350 },
    executive: { price: 500 },
  };

  if (!roomType || !checkIn || !checkOut) return 0;

  const days = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  return 500;
}
