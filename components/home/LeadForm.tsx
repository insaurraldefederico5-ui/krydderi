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
    background: "#F7F4EE",
    border: "1px solid rgba(26,22,15,0.14)",
    color: "#1A160F",
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
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(26,22,15,0.5)",
  };

  if (submitted) {
    return (
      <section id="kontakt" className="py-24 px-5" style={{ background: "#F7F4EE" }}>
        <div className="max-w-xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(68,94,56,0.10)", border: "1px solid #445E38" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#445E38" strokeWidth="2.2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            {t("success")}
          </h3>
          <p className="text-sm" style={{ color: "#6B6150" }}>
            {t("successBody")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-24 px-5" style={{ background: "#F7F4EE" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#B57422" }}>
            {t("getStarted")}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#1A160F" }}
          >
            {t("title")}
          </h2>
          <p className="text-sm" style={{ color: "#6B6150" }}>
            {t("subtitle")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 sm:p-10 reveal"
          style={{ background: "#EDE9E0", border: "1px solid rgba(26,22,15,0.08)" }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label style={labelStyle}>{t("businessName")}</label>
              <input
                required name="business_name" type="text"
                placeholder="Juno The Bakery ApS"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#B57422")}
                onBlur={e  => (e.target.style.borderColor = "rgba(26,22,15,0.14)")}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("contactName")}</label>
              <input
                required name="contact_name" type="text"
                placeholder="Emil Hansen"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#B57422")}
                onBlur={e  => (e.target.style.borderColor = "rgba(26,22,15,0.14)")}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("email")}</label>
              <input
                required name="email" type="email"
                placeholder="emil@bakery.dk"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#B57422")}
                onBlur={e  => (e.target.style.borderColor = "rgba(26,22,15,0.14)")}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("phone")}</label>
              <input
                name="phone" type="tel"
                placeholder="+45 33 25 56 77"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = "#B57422")}
                onBlur={e  => (e.target.style.borderColor = "rgba(26,22,15,0.14)")}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("segment")}</label>
              <select
                name="segment"
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                onFocus={e => (e.target.style.borderColor = "#B57422")}
                onBlur={e  => (e.target.style.borderColor = "rgba(26,22,15,0.14)")}
              >
                <option value="" style={{ background: "#F7F4EE" }}>{t("selectPlaceholder")}</option>
                {(["bakery","restaurant","manufacturer","health_food","distributor"] as const).map(s => (
                  <option key={s} value={s} style={{ background: "#F7F4EE" }}>
                    {t(`segments.${s}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label style={labelStyle}>{t("message")}</label>
              <textarea
                name="message" rows={3}
                placeholder={t("messagePlaceholder")}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => (e.target.style.borderColor = "#B57422")}
                onBlur={e  => (e.target.style.borderColor = "rgba(26,22,15,0.14)")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-4 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-60"
            style={{ background: "#1A160F", color: "#F7F4EE" }}
          >
            {loading ? t("sending") : t("submit")}
          </button>

          <p className="mt-4 text-center text-xs" style={{ color: "rgba(26,22,15,0.35)" }}>
            {t("disclaimer")}
          </p>
        </form>
      </div>
    </section>
  );
}
