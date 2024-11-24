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
      navigate("/welcome");
    }
    setUsr(username);
    navigate("/");
  }, [navigate, setUsr]);

  return (
    <main>
      <Outlet />
    </main>
  );
}
