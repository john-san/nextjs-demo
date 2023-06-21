import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "actions/userActions";
import { AiOutlineUser } from "react-icons/ai";
import Spinner from "pages/users/components/Spinner";
interface UserProps {
  id: number;
}

export default function User({ id }: UserProps) {
  const dispatch = useDispatch();
  // TODO: Fix any
  const userState = useSelector((state: any) => state.user);
  const { currentUser: user, loading, error } = userState;

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  console.log(userState);
  if (loading) return <Spinner loading={loading} />;
  if (error) return <p>{error || "Something went wrong"} </p>;

  let userContent = <></>;
  if (user) {
    userContent = (
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AiOutlineUser className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
          <p className="text-sm text-gray-500">{user.website}</p>
          <p className="text-sm text-gray-500">{user.address.street}</p>
          <p className="text-sm text-gray-500">{user.address.suite}</p>
          <p className="text-sm text-gray-500">{user.address.city}</p>
          <p className="text-sm text-gray-500">{user.address.zipcode}</p>
          <p className="text-sm text-gray-500">{user.company.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg px-6 py-4">
      {userContent}
    </div>
  );
}
