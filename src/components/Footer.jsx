import { Link } from 'react-router-dom';
import { Instagram, YouTube, Mail } from 'lucide-react';

// X (formerly Twitter) icon inline since lucide-react removed the Twitter export
const XIcon = ({ size = 15, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4" />
  </svg>
);

const LINKS = {
  shop: [
    { label: 'All Products', to: '/shop' },
    { label: 'Crosses', to: '/shop?category=crosses' },
    { label: 'Rings', to: '/shop?category=rings' },
    { label: 'Chains', to: '/shop?category=chains' },
    { label: 'New Arrivals', to: '/shop?sort=newest' },
  ],
  info: [
    { label: 'Our Story', to: '#' },
    { label: 'Craftsmanship', to: '#' },
    { label: 'Shipping & Returns', to: '#' },
    { label: 'Ring Sizing', to: '#' },
    { label: 'Care Guide', to: '#' },
  ],
};

const SOCIALS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: XIcon, href: '#', label: 'Twitter/X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span
                className="font-cinzel text-3xl font-900 tracking-[0.25em] gold-shimmer"
                style={{ fontFamily: "'Cinzel', serif", fontWeight: 900 }}
              >
                NOCTURN
              </span>
              <p
                className="font-cormorant text-[0.65rem] tracking-[0.4em] text-moonlight/30 uppercase mt-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Dark Luxury Accessories
              </p>
            </div>
            <p
              className="font-cormorant text-lg text-ivory/40 italic leading-relaxed max-w-xs"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "Forged in shadow, worn by those who dare to embrace the darkness."
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="font-cinzel text-[0.6rem] tracking-[0.2em] text-silver/50 uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                Join the Inner Circle
              </p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-dark flex-1"
                  style={{ borderRight: 'none' }}
                />
                <button
                  className="btn-gold px-6 whitespace-nowrap"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3
              className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-gold/80 mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Collection
            </h3>
            <ul className="space-y-3">
              {LINKS.shop.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-inter text-xs text-silver/50 hover:text-gold transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3
              className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-gold/80 mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Information
            </h3>
            <ul className="space-y-3">
              {LINKS.info.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-inter text-xs text-silver/50 hover:text-gold transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[0.6rem] text-silver/25 tracking-widest uppercase">
            © 2024 Nocturn. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-silver/25 hover:text-gold transition-colors duration-300"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <p className="font-inter text-[0.6rem] text-silver/20 tracking-wider">
            Handcrafted with dark intent
          </p>
        </div>
      </div>
    </footer>
  );
}
