import React from "react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-start items-center">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      <ul className="text-xl">
        <li className="mb-4">
          <Link href="/users">
            <a className="text-blue-500 hover:text-blue-700">Users</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/about">
            <a className="text-blue-500 hover:text-blue-700">About</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/contact">
            <a className="text-blue-500 hover:text-blue-700">Contact</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
