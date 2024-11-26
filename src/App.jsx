import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import { PlayGame } from "./pages/PlayGame";
import UserName from "./pages/UserName";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Levels from "./pages/Levels";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "welcome", element: <Welcome /> },
        { path: "username", element: <UserName /> },
        { path: "play", element: <PlayGame /> },
        { path: "level", element: <Levels /> },
        { index: true, element: <Home /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
