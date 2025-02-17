"use server";
 
import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
 
export async function POST(req: Request) {
  // Get body request
  const body = await req.json();
  const { user, oeuvre } = body;
 
  // Call register function (see below)
  const response = await visite(user.rowid, oeuvre);
 
  return NextResponse.json({ response });
}
 
async function visite(
  user: string,
  oeuvre: string
) {
  let db = null;
 
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: process.env.DATABASE_NAME || "", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  console.log(user, oeuvre);
  
  const sql_verif = `SELECT * FROM proposition  WHERE user = ?`;
  const verif = await db.get(sql_verif, user);

  if (verif) {
    return false;
  }
  // Insert the new visit
    const now = new Date()
    const sql = `INSERT INTO proposition (user, oeuvre, date) VALUES (?, ?, ?)`;
    const insert = await db.get(sql, user, oeuvre, now);
 
  return insert;
}