"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

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
        setMessage("You are already subscribed to the newsletter.");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to subscribe");
      }

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  return (
    <section id="newsletter" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Newsletter Centered Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto card-base p-8 md:p-12 text-center flex flex-col items-center"
        >
          <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-4">
            Newsletter
          </span>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide text-[var(--color-text)] mb-3">
            Stay in the <span className="text-[var(--color-accent)]">Loop</span>
          </h2>
          
          <p className="text-sm text-[var(--color-text-secondary)] font-light mb-8 max-w-sm leading-relaxed">
            Get regular notifications on release updates, technical articles, and fresh interface design trends.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className="flex-1 px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary justify-center cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-xs font-mono uppercase tracking-wide ${
                status === "success"
                  ? "text-[var(--color-accent)]"
                  : status === "duplicate"
                    ? "text-[var(--color-text-secondary)]"
                    : "text-[var(--color-error)]"
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>

      </div>
    </section>
  );
}
