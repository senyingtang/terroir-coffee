'use client'

import { useState } from 'react'

const subjects = [
  'Order Enquiry',
  'Wholesale',
  'Coffee Questions',
  'Roastery Visit',
  'Press & Media',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const inputStyle = {
    borderColor: 'var(--line)',
    color: 'var(--text)',
    backgroundColor: 'transparent',
  }

  const labelStyle = {
    fontSize: '10px',
    letterSpacing: '0.2em',
    color: 'var(--taupe)',
  }

  return (
    <>
      {/* ── Header ────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center px-8 py-32 pt-44 text-center"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <p
          className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe)' }}
        >
          CONTACT
        </p>
        <h1
          className="font-[family-name:var(--font-cormorant)] font-light"
          style={{ color: 'var(--text)', fontSize: 'clamp(3rem, 7vw, 7rem)' }}
        >
          Let's Talk <em style={{ color: 'var(--taupe)' }}>Coffee</em>
        </h1>
        <p
          className="mt-6 max-w-lg text-sm leading-relaxed font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--text2)' }}
        >
          Whether you want to know more about a specific lot, explore wholesale options, or just wonder what's on the cupping table this week —
          <br className="hidden md:block" />
          we'd love to hear from you. Every message gets a reply within one business day.
        </p>
      </section>

      {/* ── Main content ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-8 md:px-16 pb-24 md:pb-32">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-20">

          {/* Left: info */}
          <div className="flex flex-col gap-12">
            {/* Direct contact */}
            <div className="flex flex-col gap-5">
              <p
                className="text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-jost)]"
                style={{ color: 'var(--taupe)' }}
              >
                Get in Touch
              </p>
              {[
                ['Email', 'hello@terroircoffee.com'],
                ['Phone', '+886 2 2345 6789'],
                ['Instagram', '@terroir.coffee'],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-6 text-sm">
                  <span
                    className="w-20 shrink-0 font-[family-name:var(--font-jost)] uppercase text-xs tracking-wider"
                    style={{ color: 'var(--taupe-lt)' }}
                  >
                    {label}
                  </span>
                  <span style={{ color: 'var(--text2)' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-5">
              <p
                className="text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-jost)]"
                style={{ color: 'var(--taupe)' }}
              >
                Opening Hours
              </p>
              {[
                ['Mon — Fri', '10:00 — 18:00'],
                ['Saturday', '10:00 — 16:00 (Public Cupping 14:00)'],
                ['Sunday', 'Closed'],
              ].map(([day, time]) => (
                <div key={day} className="flex gap-6 text-sm">
                  <span className="w-24 shrink-0 font-[family-name:var(--font-jost)]" style={{ color: 'var(--taupe-lt)' }}>
                    {day}
                  </span>
                  <span style={{ color: 'var(--text2)' }}>{time}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-4">
              <p
                className="text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-jost)]"
                style={{ color: 'var(--taupe)' }}
              >
                Visit Us
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                No. 6, Lane 48, Section 2, Roosevelt Rd, Zhongzheng District, Taipei
                <br />
                <span style={{ color: 'var(--taupe-lt)' }}>5-min walk from MRT Guting Station, Exit 2</span>
              </p>
              {/* Map placeholder */}
              <div
                className="aspect-[4/3] rounded-sm overflow-hidden"
                style={{ backgroundColor: 'var(--bg3)' }}
              >
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-xs font-[family-name:var(--font-jost)]" style={{ color: 'var(--taupe-lt)' }}>
                    Map loading
                  </span>
                </div>
              </div>
            </div>

            {/* Wholesale */}
            <div
              className="p-8 flex flex-col gap-4"
              style={{ backgroundColor: 'var(--bg2)', border: '1px solid var(--line)' }}
            >
              <h3
                className="font-[family-name:var(--font-cormorant)] text-2xl font-light"
                style={{ color: 'var(--text)' }}
              >
                Working with <em>Cafés</em>
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                We supply twenty specialty cafés across Taipei and Taiwan. Fill in the form and select "Wholesale" — our team will be in touch within one business day.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === 'sent' ? (
              <div className="flex flex-col gap-5 py-16">
                <h3
                  className="font-[family-name:var(--font-cormorant)] italic"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
                >
                  Thank you for your message.
                </h3>
                <p style={{ color: 'var(--text2)' }}>
                  We'll reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { id: 'lastName',  label: 'Last Name',  placeholder: 'Chen' },
                    { id: 'firstName', label: 'First Name', placeholder: 'Wei-Ling' },
                  ].map(({ id, label, placeholder }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label
                        htmlFor={id}
                        className="font-[family-name:var(--font-jost)] uppercase"
                        style={labelStyle}
                      >
                        {label}
                      </label>
                      <input
                        id={id}
                        type="text"
                        placeholder={placeholder}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={update(id as keyof typeof form)}
                        className="border-b py-3 text-sm outline-none placeholder:opacity-30 font-[family-name:var(--font-jost)]"
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-[family-name:var(--font-jost)] uppercase" style={labelStyle}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className="border-b py-3 text-sm outline-none placeholder:opacity-30 font-[family-name:var(--font-jost)]"
                    style={inputStyle}
                  />
                </div>

                {/* Subject dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-[family-name:var(--font-jost)] uppercase" style={labelStyle}>
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    value={form.subject}
                    onChange={update('subject')}
                    className="border-b py-3 text-sm outline-none appearance-none font-[family-name:var(--font-jost)] cursor-pointer"
                    style={{ ...inputStyle, backgroundColor: 'transparent' }}
                  >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-[family-name:var(--font-jost)] uppercase" style={labelStyle}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us anything…"
                    required
                    value={form.message}
                    onChange={update('message')}
                    className="border-b py-3 text-sm outline-none resize-none placeholder:opacity-30 font-[family-name:var(--font-jost)]"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 self-start border px-10 py-4 text-sm tracking-widest uppercase transition-opacity hover:opacity-60 disabled:opacity-40 font-[family-name:var(--font-jost)]"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
