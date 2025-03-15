"use client";
import { useAuth } from "@/context";

const Page = () => {
  const { userId, token, logout } = useAuth();

  return (
    <div>
      <h2>Welcome User {userId}</h2>
      <p>Your token: {token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Page;
