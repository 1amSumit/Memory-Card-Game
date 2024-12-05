import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import { PlayGame } from "./pages/PlayGame";
import UserName from "./pages/UserName";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Levels from "./pages/Levels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

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
  const queryClinet = new QueryClient();
  return (
    <QueryClientProvider client={queryClinet}>
      <Toaster position="to-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
