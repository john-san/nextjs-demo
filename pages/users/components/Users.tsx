import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { getUsers } from "actions/userActions";
import Link from "next/link";
import Spinner from "./Spinner";

function Users() {
  const dispatch = useDispatch();
  // TODO: Fix any
  const users = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (users.loading) return <Spinner loading={users.loading} />;
  if (users.error) return <p>Error :(</p>;
  console.log(users);
  return (
    <ul className="space-y-4">
      {users.users.map((user) => (
        <li
          key={user.id}
          className="bg-white shadow overflow-hidden rounded-lg px-6 py-4"
        >
          <Link href={`/users/${user.id}`}>
            <a className="flex items-center">
              <div className="flex-shrink-0">
                <AiOutlineUser className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Users;
