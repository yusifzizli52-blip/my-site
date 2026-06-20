import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=crosses', label: 'Crosses' },
  { to: '/shop?category=rings', label: 'Rings' },
  { to: '/shop?category=chains', label: 'Chains' },
];

export default function Navbar() {
  const location = useLocation();
  const { totalItems, toggleDrawer } = useCart();
  const { isAuthenticated, user, openModal, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to.split('?')[0]);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start group">
              <span
                className="font-cinzel text-2xl font-900 tracking-[0.25em] gold-shimmer leading-none"
                style={{ fontFamily: "'Cinzel', serif", fontWeight: 900 }}
              >
                NOCTURN
              </span>
              <span
                className="font-cormorant text-[0.6rem] tracking-[0.4em] text-moonlight/50 uppercase mt-0.5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Dark Luxury
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-5">
              {/* Search */}
              <button
                className="text-moonlight/60 hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Auth */}
              <div className="relative">
                <button
                  onClick={() => isAuthenticated ? setUserMenuOpen(v => !v) : openModal('signin')}
                  className="text-moonlight/60 hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  aria-label="Account"
                >
                  <User size={18} strokeWidth={1.5} />
                  {isAuthenticated && (
                    <span className="hidden sm:block font-cinzel text-[0.6rem] tracking-widest text-gold/80">
                      {user.name.split(' ')[0].toUpperCase()}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {isAuthenticated && userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-48 glass-dark border border-white/8 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-white/5">
                        <p className="font-cinzel text-[0.6rem] text-gold tracking-widest uppercase">{user.name}</p>
                        <p className="font-inter text-[0.65rem] text-silver mt-0.5">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 font-cinzel text-[0.6rem] tracking-widest text-moonlight/60 hover:text-crimson hover:bg-white/3 transition-colors uppercase"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={toggleDrawer}
                className="relative text-moonlight/60 hover:text-gold transition-colors duration-300"
                aria-label={`Cart (${totalItems} items)`}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-gold rounded-full flex items-center justify-center font-inter text-[0.5rem] font-600 text-obsidian"
                      style={{ fontWeight: 600 }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-moonlight/60 hover:text-gold transition-colors"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-obsidian/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 glass-dark border-l border-white/5 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
                <span className="font-cinzel text-lg tracking-[0.2em] text-gold" style={{ fontFamily: "'Cinzel', serif" }}>MENU</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} strokeWidth={1.5} className="text-moonlight/60" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 py-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.to}
                      className={`block px-4 py-3 font-cinzel text-sm tracking-[0.2em] uppercase transition-colors ${
                        isActive(link.to) ? 'text-gold' : 'text-moonlight/70 hover:text-gold'
                      }`}
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto px-8 py-8 border-t border-white/5">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="font-cormorant text-base text-ivory/80">{user.name}</p>
                    <button onClick={signOut} className="btn-outline-gold w-full text-center" style={{ fontFamily: "'Cinzel', serif" }}>Sign Out</button>
                  </div>
                ) : (
                  <button
                    onClick={() => { openModal('signin'); setMobileOpen(false); }}
                    className="btn-gold w-full text-center"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
