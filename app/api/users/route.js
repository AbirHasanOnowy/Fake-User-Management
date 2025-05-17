import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

// get all users
export async function GET() {
  const data = users;
  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// add a new user
export async function POST(req) {
  const { name, age, email, password } = await req.json();

  if (!name || !age || !email || !password) {
    return NextResponse.json(
      { result: "Please fill all the fields" },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return NextResponse.json(
      { result: "User already exists" },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  console.log("last id: ", users[users.length - 1].id);

  const id = Number(users[users.length - 1].id) + 1;
  const newUser = {
    id,
    name,
    age,
    email,
    password,
  };

  users.push(newUser);

  const updatedData = JSON.stringify(users, null, 2);

  fs.writeFileSync(
    "app/util/db.js",
    `export const users = ${updatedData}`,
    "utf-8"
  );

  return NextResponse.json(newUser, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
