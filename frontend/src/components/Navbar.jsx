import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareCode, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="border-b border-base-300 fixed top-0 w-full z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center h-full justify-between">
          {/* left part */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquareCode className="text-primary" />
              </div>
              <div className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                Nabata
              </div>
            </Link>
            {/* <div className="flex items-center gap-4">
              <Link to="/signup" className="hover:opacity-80 transition-all">
                <span className="text-sm">Signup</span>
              </Link>
              <Link to="/login" className="hover:opacity-80 transition-all">
                <span className="text-sm">Login</span>
              </Link>
            </div> */}
          </div>
          {/* right part */}
          <div className="flex items-center gap-2">
           
            <Link to="/settings" className={`btn btn-sm transition-color group`}>
              <Settings className="size-4 transition-all group-hover:animate-spin" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            { 
              authUser &&
             ( <>
                <Link to="/profile" className={`btn btn-sm transition-color gap-2`}>
                <User className="size-4"/>
                <span className="hidden sm:inline capitalize">profile</span>
                            </Link>
                            <button
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all"
                onClick={() => logout()}
                            >
                            <LogOut className="size-4"/>
                <span className="hidden sm:inline">Logout</span>
                            </button>
              </>)
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
