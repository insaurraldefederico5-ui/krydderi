"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function LeadForm() {
  const t = useTranslations("home.lead");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(245,230,200,0.05)",
    border: "1px solid rgba(245,230,200,0.12)",
    color: "#f5e6c8",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "rgba(245,230,200,0.5)",
  };

  if (submitted) {
    return (
      <section id="kontakt" className="py-24 px-5" style={{ background: "#0d0603" }}>
        <div className="max-w-xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(107,142,90,0.15)", border: "1px solid #6B8E5A" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B8E5A" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
          >
            {t("success")}
          </h3>
          <p className="text-sm" style={{ color: "rgba(245,230,200,0.5)" }}>
            {t("successBody")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-24 px-5" style={{ background: "#0d0603" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#c4800a" }}>
            Kom i gang
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#f5e6c8" }}
          >
            {t("title")}
          </h2>
          <p className="text-sm" style={{ color: "rgba(245,230,200,0.5)" }}>
            {t("subtitle")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 sm:p-10 reveal"
          style={{
            background: "rgba(245,230,200,0.03)",
            border: "1px solid rgba(245,230,200,0.08)",
          }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Business name */}
            <div className="sm:col-span-2">
              <label style={labelStyle}>{t("businessName")}</label>
              <input
                required
                name="business_name"
                type="text"
                placeholder="Juno The Bakery ApS"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#c4800a")}
                onBlur={e => (e.target.style.borderColor = "rgba(245,230,200,0.12)")}
              />
            </div>

            {/* Contact name */}
            <div>
              <label style={labelStyle}>{t("contactName")}</label>
              <input
                required
                name="contact_name"
                type="text"
                placeholder="Emil Hansen"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#c4800a")}
                onBlur={e => (e.target.style.borderColor = "rgba(245,230,200,0.12)")}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>{t("email")}</label>
              <input
                required
                name="email"
                type="email"
                placeholder="emil@bakery.dk"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#c4800a")}
                onBlur={e => (e.target.style.borderColor = "rgba(245,230,200,0.12)")}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>{t("phone")}</label>
              <input
                name="phone"
                type="tel"
                placeholder="+45 33 25 56 77"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#c4800a")}
                onBlur={e => (e.target.style.borderColor = "rgba(245,230,200,0.12)")}
              />
            </div>

            {/* Segment */}
            <div>
              <label style={labelStyle}>{t("segment")}</label>
              <select
                name="segment"
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                onFocus={e => (e.target.style.borderColor = "#c4800a")}
                onBlur={e => (e.target.style.borderColor = "rgba(245,230,200,0.12)")}
              >
                <option value="" style={{ background: "#1a0a02" }}>Vælg type…</option>
                {(["bakery", "restaurant", "manufacturer", "health_food", "distributor"] as const).map(s => (
                  <option key={s} value={s} style={{ background: "#1a0a02" }}>
                    {t(`segments.${s}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label style={labelStyle}>{t("message")}</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Ca. 20 kg kardemomme og 10 kg kanel om måneden…"
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => (e.target.style.borderColor = "#c4800a")}
                onBlur={e => (e.target.style.borderColor = "rgba(245,230,200,0.12)")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-4 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #c4800a 0%, #e8a020 100%)",
              color: "#0d0603",
              boxShadow: loading ? "none" : "0 0 28px rgba(196,128,10,0.25)",
            }}
          >
            {loading ? t("sending") : t("submit")}
          </button>

          <p className="mt-4 text-center text-xs" style={{ color: "rgba(245,230,200,0.3)" }}>
            {t("disclaimer")}
          </p>
        </form>
      </div>
    </section>
  );
}
