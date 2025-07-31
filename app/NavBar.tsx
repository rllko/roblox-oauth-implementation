import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoutForm from "./components/LogoutForm";
import { getSession } from "./actions";

const NavBar = async () => {
  const session = await getSession();
  return (
    <div className="navbar bg-base-100 shadow-sm bg-gray-300 flex justify-between">
      <div className="flex-none">
        <Link href="/" className="btn btn-square btn-ghost">
          Home
        </Link>
      </div>
      <div className="flex">
        {!session.userId && (
          <Link href="/api/providers/roblox" className="btn">
            Login
          </Link>
        )}
        {session.userId && (
          <div className="flex align-middle">
            <p className="m-auto">{session.username}</p>
            <Image
              src={session.img!}
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
