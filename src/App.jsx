import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import UserName from "./pages/UserName";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "welcome", element: <Welcome /> },
        { path: "username", element: <UserName /> },
        { index: true, element: <Home /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
