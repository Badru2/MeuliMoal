import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="space-y-4">
      <div className="w-full py-3 px-2 bg-blue-600 shadow-md text-white">
        <div className="w-full max-w-[1330px] mx-auto">
          <Link>Dashboard</Link>
        </div>
      </div>

      <div className="w-full max-w-[1330px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
