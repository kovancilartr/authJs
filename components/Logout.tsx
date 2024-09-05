"use client";
import { logout } from "@/actions/auth";

const Logout = () => {
  return (
    <div onClick={() => logout()}>
      <div className="bg-gray-600 text-white px-4 py-2 rounded-xl cursor-pointer">
        Logout
      </div>
    </div>
  );
};

export default Logout;
