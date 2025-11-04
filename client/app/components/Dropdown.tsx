import React from "react";
import { IoMdLogOut } from "react-icons/io";

type Props = {
  open: boolean;
  userName: string;
  userEmail: string;
  onLogoutClick: () => void;
  onClose: () => void;
};

const AvatarDropdown: React.FC<Props> = ({
  open,
  userName,
  userEmail,
  onLogoutClick,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg shadow-blue-400 z-50">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-gray-800 font-semibold text-sm">{userName}</p>
        <p className="text-gray-500 text-xs">{userEmail}</p>
      </div>

      <button
        className="w-full text-left px-4 py-2 text-gray-600 hover:text-black flex justify-between items-center"
        onClick={() => {
          onLogoutClick();
          setTimeout(onClose, 0);
        }}
      >
        Logout
        <IoMdLogOut />
      </button>
    </div>
  );
};

export default AvatarDropdown;
