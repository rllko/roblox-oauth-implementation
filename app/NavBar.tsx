"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoutForm from "./components/LogoutForm";
import useUser from "./lib/useUser";

const NavBar = () => {
  const { isLoading, user } = useUser();

  return (
    <div className="navbar shadow-sm bg-gray-300 flex justify-between">
      <div className="flex-none">
        <Link href="/" className="btn btn-square btn-ghost">
          Home
        </Link>
      </div>
      <div className="flex">
        {(!user || isLoading) && (
          <Link href="/api/providers/roblox" className="btn">
            Login
          </Link>
        )}

        {user && !isLoading && (
          <div className="flex align-middle">
            <p className="m-auto">{user.name}</p>
            <Image
              src={user.picture!}
              width={100}
              height={100}
              alt="profile-picture"
            />
            <LogoutForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
