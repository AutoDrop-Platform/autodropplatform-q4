"use client";

import { useEffect, useState } from "react";

export default function InjectPage() {
  const [status, setStatus] = useState("Injecting magic... 🪄");

  useEffect(() => {
    (async () => {
      try {
        // Check for axios
        const hasAxios = !!(await import("axios"));
        if (!hasAxios) throw new Error("Axios not found");

        // Check for env keys
        const requiredKeys = ["STRIPE_SECRET_KEY", "ALIREXPRESS_API_KEY", "OPENAI_API_KEY"];
        const missingKeys = requiredKeys.filter((key) => !process.env[key]);
        if (missingKeys.length > 0) {
          setStatus(`❌ Missing keys: ${missingKeys.join(", ")}`);
          return;
        }

        // Show product access confirmation (you can expand this)
        setStatus("✅ Injection complete. All systems go 🚀");
      } catch (err: any) {
        setStatus(`💥 Injection failed: ${err.message}`);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
      {status}
    </div>
  );
}
