import { useRef, useState } from 'react'
import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

const DETAIL_ICON = { email: 'mail', phone: 'phone', location: 'pin' }

/** Client-side validation for the contact form. */
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = 'That email address doesn’t look right.'
  }
  if (!values.message.trim()) {
    errors.message = 'Please enter a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'A few more words, please (10+ characters).'
  }
  return errors
}

/** Contact: form + contact details + social links. */
export default function Contact() {
  const { contact } = content
  const detailsRef = useReveal()
  const formRef = useReveal(120)

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const formRefNode = useRef(null)

  const update = (field) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [field]: value }))
    // Clear the field's error as soon as the user edits it
    setErrors((err) => (err[field] ? { ...err, [field]: undefined } : err))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      // Focus the first invalid field for keyboard/screen-reader users
      const firstInvalid = Object.keys(nextErrors)[0]
      formRefNode.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      if (contact.endpoint) {
        // Real endpoint (Formspree, EmailJS, your API…)
        const res = await fetch(contact.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      } else {
        // No endpoint configured — simulate a short delay
        await new Promise((r) => setTimeout(r, 700))
      }
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fieldClasses = (field) =>
    [
      'w-full rounded-xl border bg-white/70 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none dark:bg-white/5 dark:text-white dark:placeholder-slate-500',
      errors[field]
        ? 'border-red-400 dark:border-red-400/70'
        : 'border-slate-300 dark:border-white/10',
    ].join(' ')

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          subtitle={contact.blurb}
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div ref={formRef} data-reveal className="glass rounded-3xl p-6 md:p-8">
            <form ref={formRefNode} onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your name"
                    className={fieldClasses('name')}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={update('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@example.com"
                    className={fieldClasses('email')}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Tell me about the role or project…"
                  className={`${fieldClasses('message')} resize-y`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="button mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-7 py-3.5 font-display font-semibold text-white shadow-lg shadow-emerald-500/25 Transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Icon name="send" className="h-4 w-4" />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {/* Status messages */}
              <div aria-live="polite" className="mt-4 min-h-6">
                {status === 'success' && (
                  <p className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    <Icon name="check" className="h-4 w-4" />
                    Thanks! Your message has been sent — I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400">
                    Something went wrong — please email me directly instead.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Details + socials */}
          <div ref={detailsRef} data-reveal className="space-y-6">
            <ul className="card space-y-4 rounded-3xl p-6">
              {contact.details.map((detail) => {
                const inner = (
                  <span className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                      <Icon name={DETAIL_ICON[detail.type]} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {detail.type}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{detail.value}</span>
                    </span>
                  </span>
                )
                return (
                  <li key={detail.type}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="block rounded-xl transition-colors hover:bg-emerald-500/5"
                        aria-label={`${detail.type}: ${detail.value}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="rounded-xl">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex gap-3">
              {contact.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.name} profile (opens in a new tab)`}
                  className="core-chip flex h-12 w-12 items-center justify-center rounded-2xl text-slate-600 transition-all duration-200 hover:-translate-y-1 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
                >
                  <Icon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
