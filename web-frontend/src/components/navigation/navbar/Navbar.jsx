"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/api/user";
import { ToggleComponent, UserComponent } from "./components/NavbarComponents";
import Skeleton from "react-loading-skeleton";

const Navbar = ({ collapsed, toggle }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    setLoading(true);
    const { data } = await getCurrentUser();
    const { username, ...user } = data;
    setUser({ username: username });
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <nav className="flex bg-background select-none border-b border-gray-300 h-[5%] px-2">
      <div className="flex justify-center items-center">
        {!loading ? (
          <ToggleComponent collapsed={collapsed} toggle={toggle} />
        ) : (
          <Skeleton width={20} />
        )}
      </div>
      <div className="flex-1 flex justify-end items-center">
        {!loading ? <UserComponent user={user} /> : <Skeleton width={100} />}
      </div>
    </nav>
  );
};

export default Navbar;
