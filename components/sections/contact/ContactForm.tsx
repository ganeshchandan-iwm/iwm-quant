"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded border border-edge bg-panel-2/60 px-4 py-2.5 font-mono text-sm text-fg placeholder:text-mut/50 outline-none transition-all duration-300 focus:border-primary/60 focus:shadow-lg focus:shadow-primary/10";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Pre-fill the message when arriving from a careers role card (?role=...)
  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get("role");
    if (role && messageRef.current && !messageRef.current.value) {
      messageRef.current.value = `I'd like to apply for the ${role} role.\n\n`;
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="corner-frame rounded-lg border border-primary/40 bg-panel/80 p-10 text-center space-y-4">
        <p className="font-mono text-4xl text-primary">✓</p>
        <h3 className="font-mono text-xl font-semibold text-primary">
          Transmission received.
        </h3>
        <p className="text-mut text-sm leading-relaxed">
          Your message is stored on our desk. A human (assisted by several machines) will
          respond shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-mono text-xs text-mut underline-offset-4 hover:text-primary hover:underline"
        >
          send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-mut uppercase tracking-wider">
            name *
          </label>
          <input id="name" name="name" required maxLength={120} placeholder="Ada Lovelace" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-mut uppercase tracking-wider">
            email *
          </label>
          <input id="email" name="email" type="email" required maxLength={200} placeholder="ada@fund.com" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-mono text-xs text-mut uppercase tracking-wider">
            phone
          </label>
          <input id="phone" name="phone" type="tel" maxLength={20} placeholder="+91 98xxxxxxx" className={inputCls} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block font-mono text-xs text-mut uppercase tracking-wider">
            company / fund
          </label>
          <input id="company" name="company" maxLength={200} placeholder="Analytical Engines LLP" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-mut uppercase tracking-wider">
          message *
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          placeholder="> Let's talk markets, math, and beyond..."
          className={`${inputCls} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="rounded border border-down/40 bg-down/10 px-4 py-2.5 font-mono text-xs text-down">
          ✗ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group w-full rounded border border-primary/60 bg-primary/10 px-6 py-3.5 font-mono text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? (
          <span>
            transmitting<span className="animate-blink">▌</span>
          </span>
        ) : (
          <span>
            transmit message{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        )}
      </button>
    </form>
  );
}
