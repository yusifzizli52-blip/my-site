import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 300 } },
  exit: { opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2 } },
};

function SignInForm() {
  const { signIn, loading, error, openModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-silver/60 block mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-dark"
          placeholder="your@email.com"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-silver/60 block mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-dark pr-12"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/40 hover:text-silver transition-colors"
          >
            {showPass ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[0.7rem] text-crimson font-inter leading-relaxed"
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-60"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {loading ? <Loader size={14} className="animate-spin" /> : 'Enter the Sanctum'}
      </button>

      <p className="font-inter text-[0.65rem] text-silver/40 text-center mt-4">
        No account?{' '}
        <button
          type="button"
          onClick={() => openModal('signup')}
          className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
        >
          Create one
        </button>
      </p>

      <p className="font-inter text-[0.6rem] text-silver/25 text-center mt-2">
        Demo: demo@nocturn.com / gothic123
      </p>
    </form>
  );
}

function SignUpForm() {
  const { signUp, loading, error, openModal } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-silver/60 block mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-dark"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-silver/60 block mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-dark"
          placeholder="your@email.com"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label className="font-inter text-[0.65rem] tracking-[0.2em] uppercase text-silver/60 block mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-dark pr-12"
            placeholder="Min. 8 characters"
            required
            minLength={6}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/40 hover:text-silver transition-colors"
          >
            {showPass ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[0.7rem] text-crimson font-inter leading-relaxed"
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-60"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {loading ? <Loader size={14} className="animate-spin" /> : 'Join the Coven'}
      </button>

      <p className="font-inter text-[0.65rem] text-silver/40 text-center mt-4">
        Already a member?{' '}
        <button
          type="button"
          onClick={() => openModal('signin')}
          className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default function AuthModal() {
  const { modal, closeModal } = useAuth();

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            key="auth-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              key={`auth-modal-${modal}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md"
              onClick={e => e.stopPropagation()}
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                <div>
                  <h2
                    className="font-cinzel text-lg tracking-[0.2em] text-ivory uppercase"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {modal === 'signin' ? 'Welcome Back' : 'Join Nocturn'}
                  </h2>
                  <p className="font-cormorant text-sm text-silver/50 italic mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {modal === 'signin'
                      ? 'Enter your sanctuary'
                      : 'Begin your dark journey'}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-silver/40 hover:text-ivory transition-colors"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Form */}
              <div className="px-8 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={modal}
                    initial={{ opacity: 0, x: modal === 'signin' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: modal === 'signin' ? 20 : -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {modal === 'signin' ? <SignInForm /> : <SignUpForm />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Decorative bottom border */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
