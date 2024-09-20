"use client";
import scss from "./Header.module.scss";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { useGetMeQuery } from "@/redux/api/me";
import { useEffect } from "react";
import SearchTracks from "@/components/shared/SearchTracks";

const Header = () => {
  const { data: session } = useGetMeQuery();

  const handleLogin = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/login`,
      "_self"
    );
  };

  const handleLogout = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_FRON8TEND_URL}/api/auth/logout`,
      "_self"
    );
  };

  const handleResizeWindow = () => {};

  useEffect(() => {
    handleResizeWindow();
  }, []);

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link href="/">
              <FaSpotify />
            </Link>
          </div>
          <div className={scss.search}>
            <SearchTracks />
          </div>
          <div className={scss.auth}>
            {session ? (
              <>
                <div>
                  <h5>{session.display_name}</h5>
                  <button onClick={handleLogout}>logout</button>
                </div>
              </>
            ) : (
              <>
                <button onClick={handleLogin}>login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
