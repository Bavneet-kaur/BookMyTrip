"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoAirplane } from "react-icons/io5";
import ConfirmationModal from "../ConfirmationModal";
import AvatarDropdown from "../Dropdown";

const Navbar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    console.log("user details: ",user);
    if (user) {
      const parsed = JSON.parse(user);
      setRole(parsed.role);
      setUserName(parsed.name);
      setUserEmail(parsed.email);
    }

    const onClickOutside = (e: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  const NAV_LINKS =
    role === "admin"
      ? [
          // { label: "Admin", href: "/admin" },
          // { label: "Profile", href: "/profile" },
        ]
      : [
          { label: "Home", href: "/" },
          { label: "My Bookings", href: "/my-bookings" },
          { label: "Profile", href: "/profile" },
        ];

  const initialLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <header className="bg-white shadow-sm w-full fixed top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative">
        {/* BRAND */}
        <div className="flex items-center">
          <span className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded-full">
            <IoAirplane size={24} color="white" />
          </span>
          <span className="font-semibold text-lg ml-2">Book My Trip</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-blue-600 text-lg font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar with Initial */}
        <div ref={avatarRef} className="relative">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white font-semibold cursor-pointer"
          >
            {initialLetter}
          </div>

          <AvatarDropdown
            open={dropdownOpen}
            userName={userName}
            userEmail={userEmail}
            onLogoutClick={() => setConfirmOpen(true)}
            onClose={() => setDropdownOpen(false)}
          />
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        open={confirmOpen}
        title="Confirm Logout"
        description="Are you sure you want to logout?"
        confirmLabel="Yes, Logout"
        colorType="safe"
        onConfirm={() => {
          setConfirmOpen(false);
          handleLogout();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </header>
  );
};

export default Navbar;
