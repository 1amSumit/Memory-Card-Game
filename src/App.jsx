import UserName from "./pages/UserName";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    { path: "/welcome", element: <Welcome /> },
    { path: "/username", element: <UserName /> },
    // {path:"/", }
  ]);
  return <RouterProvider router={router} />;
}
