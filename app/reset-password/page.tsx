"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setReady(true);
      } else {
        setMessage(
          "Invalid or expired reset link. Please request a new one."
        );
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "PASSWORD_RECOVERY" ||
        session
      ) {
        setReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Password updated successfully! You can now log in."
    );

    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }

  return (
    <main>
      <h1>Reset Password</h1>

      {!ready ? (
        <p>{message || "Checking reset link..."}</p>
      ) : (
        <>
          <p>Enter your new password below.</p>

          <form onSubmit={handleUpdatePassword}>
            <div>
              <label>New Password</label>
              <br />

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength={6}
              />
            </div>

            <br />

            <div>
              <label>Confirm Password</label>
              <br />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
                minLength={6}
              />
            </div>

            <br />

            <button type="submit" disabled={loading}>
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>
          </form>

          <p>{message}</p>
        </>
      )}

      <p>
        <a href="/login">Back to Login</a>
      </p>
    </main>
  );
}