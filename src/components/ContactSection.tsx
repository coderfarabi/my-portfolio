"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { getContactInfo, type ContactInfoData } from "@/lib/api";

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getContactInfo().then(setContactInfo).catch((err) => console.error("Error loading contact info:", err));
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to send message");
      }

      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="section-wrapper border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Inquiries</p>
            <h2 className="display-lg">
              Let&apos;s <span className="text-[var(--color-accent)]">Talk</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] font-light max-w-sm leading-relaxed text-sm md:text-base">
            Have a project in mind or want to collaborate? Send a message and let&apos;s build something together.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {contactInfo && (
              <>
                {/* Email Item */}
                <div className="card-base p-6">
                  <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-2">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-base md:text-lg font-display uppercase tracking-wide text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                {/* Phone Item */}
                {contactInfo.phone && (
                  <div className="card-base p-6">
                    <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-2">
                      Phone Number
                    </span>
                    <span className="text-base md:text-lg font-display uppercase tracking-wide text-[var(--color-text)]">
                      {contactInfo.phone}
                    </span>
                  </div>
                )}

                {/* Location Item */}
                <div className="card-base p-6">
                  <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-2">
                    Location
                  </span>
                  <span className="text-base md:text-lg font-display uppercase tracking-wide text-[var(--color-text)]">
                    {contactInfo.location}
                  </span>
                </div>

                {/* Status Item */}
                <div className="card-base p-6">
                  <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-2">
                    Availability
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-2 rounded-full ${
                        contactInfo.availabilityStatus === "available"
                          ? "bg-[var(--color-accent)] animate-pulse"
                          : "bg-[var(--color-text-muted)]"
                      }`}
                    />
                    <span className="text-sm font-mono uppercase tracking-wide text-[var(--color-text-secondary)]">
                      {contactInfo.availabilityStatus === "available"
                        ? "Available for work"
                        : "Currently busy"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {sent ? (
              <div className="card-base p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="size-12 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-accent)] flex items-center justify-center mb-6">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-[var(--color-accent)]"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold uppercase tracking-wider text-[var(--color-text)] mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] font-light max-w-xs leading-relaxed">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-base p-8 flex flex-col gap-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="name@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="Project inquiry / collaboration"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                    placeholder="Describe your project or proposal..."
                  />
                </div>

                {error && (
                  <div className="text-xs text-[var(--color-error)] bg-[var(--color-error)]/10 px-4 py-3 rounded-lg border border-[var(--color-error)]/20 font-mono">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary justify-center w-full mt-2 cursor-pointer disabled:opacity-50"
                >
                  {sending ? "Sending message..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
