"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setStatus("duplicate");
        setMessage("You're already subscribed!");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to subscribe");
      }

      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl mx-auto bg-gradient-to-br from-accent-dim/10 to-transparent border border-accent/20 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
            Stay Updated
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            Get notified about new projects and articles.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2.5 bg-accent text-bg font-medium rounded-xl hover:bg-accent-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm ${
                status === "success"
                  ? "text-success"
                  : status === "duplicate"
                    ? "text-accent"
                    : status === "error"
                      ? "text-error"
                      : ""
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
