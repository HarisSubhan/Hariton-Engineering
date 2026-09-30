import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
const schema = z.object({
  name: z.string().min(2, 'Enter your name.'),
  email: z.string().email('Enter a valid email address.'),
  message: z.string().min(10, 'Tell us a little about the project (10+ characters).')
})
export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm({ resolver: zodResolver(schema) })
  // TODO: replace with your endpoint (Formspree, Resend, Vercel function...)
  const onSubmit = async data => { await new Promise(r => setTimeout(r, 700)); console.log('lead', data) }
  return (
    <section id="contact" className="section">
      <h2>Tell us about your building</h2>
      <p>Pasadena, California. Call <a href="tel:+16264494223">(626) 449-4223</a> or send a message.</p>
      <div className="glass panel">
        <AnimatePresence mode="wait">
          {isSubmitSuccessful ? (
            <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status">
              <h3>Message sent</h3><p>We will reply within one business day.</p>
              <button className="btn" onClick={() => reset()}>Send another message</button>
            </motion.div>
          ) : (
            <motion.form key="f" onSubmit={handleSubmit(onSubmit)} noValidate exit={{ opacity: 0 }}>
              {['name', 'email', 'message'].map(f => (
                <label key={f}>{f[0].toUpperCase() + f.slice(1)}
                  {f === 'message' ? <textarea rows="4" aria-invalid={!!errors[f]} {...register(f)} /> : <input type={f === 'email' ? 'email' : 'text'} aria-invalid={!!errors[f]} {...register(f)} />}
                  <AnimatePresence>{errors[f] && <motion.span className="err" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{errors[f].message}</motion.span>}</AnimatePresence>
                </label>
              ))}
              <button className="btn" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'}</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
