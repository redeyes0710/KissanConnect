"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function LoginContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setMessage("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful!");

    if (role === "farmer") {
      window.location.href = "/farmer";
    } else if (role === "buyer") {
      window.location.href = "/buyer";
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main>
      <h1>Login to KisanConnect</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>

        {/* Forgot Password */}
        <p>
          <a href="/forgot-password">
            Forgot password?
          </a>
        </p>
      </form>

      <p>{message}</p>

      <p>
        Don't have an account?{" "}
        <a href={`/signup${role ? `?role=${role}` : ""}`}>
          Create an account
        </a>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main>Loading...</main>}>
      <LoginContent />
    </Suspense>
  );
}