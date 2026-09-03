"use client";

import { supabase } from "@/lib/supabase";

export default function RolePage() {
  async function chooseRole(role: "farmer" | "buyer") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    localStorage.setItem("userRole", role);

    if (role === "farmer") {
      window.location.href = "/farmer";
    } else {
      window.location.href = "/buyer";
    }
  }

  return (
    <main>
      <h1>Welcome to KisanConnect</h1>

      <p>Choose how you want to use KisanConnect:</p>

      <button onClick={() => chooseRole("farmer")}>
        I'm a Farmer
      </button>

      {" "}

      <button onClick={() => chooseRole("buyer")}>
        I'm a Buyer
      </button>
    </main>
  );
}