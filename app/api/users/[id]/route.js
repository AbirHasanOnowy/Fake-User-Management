import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

// This is a GET request to get a user by id
export async function GET(_, res) {
  const { id } = await res.params;
  const user = users.find((user) => user.id === Number(id));
  return NextResponse.json(user, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// This is a POST request to login a user
export async function POST(req, res) {
  const { name, email, password } = await req.json();
  const { id } = await res.params;
  const {
    name: uName,
    email: uEmail,
    password: uPassword,
  } = users.find((user) => user.id === Number(id));

  if (uName === name && uEmail === email && uPassword === password) {
    return NextResponse.json({ result: "Successfully logged in" });
  } else if (!name || !email || !password) {
    return NextResponse.json({ result: "Please fill all the fields" });
  } else {
    return NextResponse.json({ result: "Invalid credentials" });
  }
}

// This is a PUT request to update a user
export async function PUT(req, res) {
  const { name, age, email, password } = await req.json();
  const { id } = await res.params;

  const userIndex = users.findIndex((user) => user.id === Number(id));
  if (userIndex === -1) {
    return NextResponse.json(
      { result: "User not found" },
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Update the user
  if (name) users[userIndex].name = name;
  if (age) users[userIndex].age = age;
  if (email) users[userIndex].email = email;
  if (password) users[userIndex].password = password;

  const updatedData = JSON.stringify(users, null, 2);
  fs.writeFileSync(
    "app/util/db.js",
    `export const users = ${updatedData}`,
    "utf-8"
  );

  return NextResponse.json(users[userIndex], {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// This is a DELETE request to delete a user
export async function DELETE(_, res) {
  const { id } = await res.params;
  const userIndex = users.findIndex((user) => user.id === Number(id));
  if (userIndex === -1) {
    return NextResponse.json(
      { result: "User not found" },
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Delete the user
  users.splice(userIndex, 1);

  const updatedData = JSON.stringify(users, null, 2);
  fs.writeFileSync(
    "app/util/db.js",
    `export const users = ${updatedData}`,
    "utf-8"
  );

  return NextResponse.json(
    { result: "User deleted successfully" },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
