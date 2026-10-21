import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { content } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'

const DETAIL_ICON = { email: 'mail', phone: 'phone', location: 'pin' }

/* EmailJS credentials come from `.env` (see .env.example). */
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const emailReady = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

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

/** Contact: compact two-column section — EmailJS form + details and socials. */
export default function Contact() {
  const { contact } = content
  const formRef = useReveal()
  const detailsRef = useReveal(120)

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | unconfigured
  const formRefNode = useRef(null)

  const emailAddress = contact.details.find((detail) => detail.type === 'email')?.value ?? ''
  const mailtoHref = `mailto:${emailAddress}`

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
      if (!emailReady) throw new Error('EmailJS is not configured')

      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: values.name,
          from_email: values.email,
          reply_to: values.email,
          subject: `Portfolio message from ${values.name}`,
          message: values.message,
        },
        { publicKey: EMAILJS.publicKey },
      )

      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Contact form failed:', error)
      setStatus(error?.message === 'EmailJS is not configured' ? 'unconfigured' : 'error')
    }
  }

  const fieldClasses = (field) =>
    [
      'w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none dark:bg-white/5 dark:text-white dark:placeholder-slate-500',
      errors[field]
        ? 'border-red-400 dark:border-red-400/70'
        : 'border-slate-300 dark:border-white/10',
    ].join(' ')

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-emerald-400/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-64 w-64 rounded-full bg-sky-400/8 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          subtitle={contact.blurb}
          titleClassName="text-3xl md:text-4xl lg:text-5xl"
          spacing="mb-5 md:mb-6"
        />

        <div className="grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Form card */}
          <div
            ref={formRef}
            data-reveal
            className="glass relative overflow-hidden rounded-3xl p-4 sm:p-5"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
            />

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Send a message
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Icon name="clock" className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
                Usually replies within a day
              </span>
            </div>

            <form ref={formRefNode} onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300"
                  >
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
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300"
                  >
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
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Tell me about the role or project…"
                  className={`${fieldClasses('message')} resize-y`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-emerald-500/35 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === 'sending' ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Icon name="send" className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Prefer email?{' '}
                  <a
                    href={mailtoHref}
                    className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
                  >
                    {emailAddress}
                  </a>
                </p>
              </div>

              {/* Status messages */}
              <div aria-live="polite" className="mt-3 min-h-5">
                {status === 'success' && (
                  <p className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-3.5 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    <Icon name="check" className="h-4 w-4" />
                    Thanks! Your message is on its way — I'll reply soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-3.5 py-2 text-sm font-medium text-red-600 dark:text-red-400">
                    <Icon name="close" className="h-4 w-4" />
                    Couldn't send that — please email me directly.
                  </p>
                )}
                {status === 'unconfigured' && (
                  <p className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 px-3.5 py-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                    <Icon name="mail" className="h-4 w-4" />
                    Email service isn't set up yet — please use{' '}
                    <a href={mailtoHref} className="underline underline-offset-2">
                      {emailAddress}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Details + socials */}
          <div ref={detailsRef} data-reveal className="space-y-4">
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Available for new opportunities
              </p>
            </div>

            <ul className="glass space-y-1 rounded-2xl p-3">
              {contact.details.map((detail) => {
                const inner = (
                  <span className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                      <Icon name={DETAIL_ICON[detail.type]} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {detail.type}
                      </span>
                      <span className="block truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {detail.value}
                      </span>
                    </span>
                  </span>
                )
                return (
                  <li key={detail.type}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="block rounded-xl px-2 py-2 transition-colors hover:bg-emerald-500/5"
                        aria-label={`${detail.type}: ${detail.value}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="px-2 py-2">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="grid grid-cols-3 gap-2">
              {contact.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.name} profile (opens in a new tab)`}
                  className="glass flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-slate-600 transition-all duration-200 hover:-translate-y-1 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
