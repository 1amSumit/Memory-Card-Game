import React from "react";
import { useRecoilValue } from "recoil";
import { usernameState } from "../store/username";

export default function Home() {
  const username = useRecoilValue(usernameState);
  return (
    <div className="h-screen overflow-hidden p-4 bg-gray-900">
      <div>
        <h2 className="text-gray-200 font-bold font-sour text-2xl">
          Hallo {username}
        </h2>

        <div></div>
      </div>
    </div>
  );
}
