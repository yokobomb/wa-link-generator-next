"use client";

import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const cleanPhoneNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "");

    if (numbersOnly.startsWith("0")) {
      return `62${numbersOnly.slice(1)}`;
    }

    return numbersOnly;
  };

  const cleanedPhone = cleanPhoneNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = cleanedPhone
    ? `https://wa.me/${cleanedPhone}?text=${encodedMessage}`
    : "";

  const isDisabled = !cleanedPhone;

  const copyLink = async () => {
    if (!whatsappLink) return;

    await navigator.clipboard.writeText(whatsappLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <main className="page">
      <section className="card" aria-labelledby="page-title">
        <div className="header">
          <p className="eyebrow">Simple tool</p>
          <h1 id="page-title">WhatsApp Link Generator</h1>
          <p className="subtitle">
            Enter a phone number and message to create a ready-to-share
            WhatsApp link.
          </p>
        </div>

        <div className="form">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Example: 08123456789"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Example: Hello, I want to ask about..."
            rows="5"
          />
        </div>

        <div className="preview">
          <span>Preview link</span>
          <p>{whatsappLink || "Your WhatsApp link will appear here"}</p>
        </div>

        <div className="actions">
          <button type="button" onClick={copyLink} disabled={isDisabled}>
            {copied ? "Copied!" : "Copy link"}
          </button>

          <a
            className={isDisabled ? "button disabled" : "button"}
            href={whatsappLink || undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={isDisabled}
          >
            Open WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
