import React from "react";
import User from "./components/User";
import { useRouter } from "next/router";
import Link from "next/link";

function index() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <div>
      <h1 className="text-4xl">User</h1>
      <User id={parseInt(userId as string)} />
      <div className="mt-4">
        <Link href="/users">
          <a className="text-blue-500 hover:text-blue-700">Back to Users</a>
        </Link>
      </div>
    </div>
  );
}

export default index;
