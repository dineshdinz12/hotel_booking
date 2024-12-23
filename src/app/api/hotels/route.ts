import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // Adjust the path to match your DB setup

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM hotel');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json({ error: 'Error fetching hotels' }, { status: 500 });
  }
}
