"use client";

import { useState, useEffect, type FormEvent } from "react";
import { getContactInfo, type ContactInfoData } from "@/lib/api";

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getContactInfo().then(setContactInfo).catch(() => {});
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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
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
    <section id="contact" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent mb-3">CONTACT</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Get In Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            {contactInfo && (
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <p className="text-xs font-mono text-text-muted mb-1">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                {contactInfo.phone && (
                  <div className="bg-surface border border-border rounded-2xl p-5">
                    <p className="text-xs font-mono text-text-muted mb-1">
                      PHONE
                    </p>
                    <p className="text-text-secondary">{contactInfo.phone}</p>
                  </div>
                )}

                <div className="bg-surface border border-border rounded-2xl p-5">
                  <p className="text-xs font-mono text-text-muted mb-1">
                    LOCATION
                  </p>
                  <p className="text-text-secondary">
                    {contactInfo.location}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-2xl p-5">
                  <p className="text-xs font-mono text-text-muted mb-1">
                    STATUS
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 text-sm ${
                      contactInfo.availabilityStatus === "available"
                        ? "text-success"
                        : contactInfo.availabilityStatus === "busy"
                          ? "text-accent"
                          : "text-text-muted"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        contactInfo.availabilityStatus === "available"
                          ? "bg-success"
                          : contactInfo.availabilityStatus === "busy"
                            ? "bg-accent"
                            : "bg-text-muted"
                      }`}
                    />
                    {contactInfo.availabilityStatus === "available"
                      ? "Available for opportunities"
                      : contactInfo.availabilityStatus === "busy"
                        ? "Currently busy"
                        : "Not available"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            {sent ? (
              <div className="bg-surface border border-border rounded-2xl p-8 text-center">
                <div className="size-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-success"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-text-secondary">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface border border-border rounded-2xl p-6 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-6 py-3 bg-accent text-bg font-medium rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
