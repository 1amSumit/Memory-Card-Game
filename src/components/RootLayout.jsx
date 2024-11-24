import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "../store/username";

export default function RootLayout() {
  const [usr, setUsr] = useRecoilState(usernameState);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username") || "";

    if (username.trim() === "") {
      console.log("No username found, redirecting to welcome.");
      navigate("/welcome");
    } else {
      console.log("Username found: ", username);
      setUsr(username);
      navigate("/");
    }
  }, [navigate, setUsr]);

  return (
    <main>
      <Outlet />
    </main>
  );
}
