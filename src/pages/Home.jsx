import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const FEATURES = [
  { icon: Shield, title: 'Authenticity Guaranteed', desc: 'Every piece hallmarked and certified.' },
  { icon: Sparkles, title: 'Handcrafted Quality', desc: 'Each item individually finished by artisans.' },
  { icon: Truck, title: 'Free Shipping Over $200', desc: 'Worldwide discreet delivery.' },
];

export default function Home() {
  const featured = PRODUCTS.filter(p => p.featured);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'NOCTURN — Dark Luxury Accessories';
  }, []);

  return (
    <main>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.04) 0%, transparent 60%), linear-gradient(180deg, #050505 0%, #080808 100%)',
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Decorative cross */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none hidden xl:block">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <rect x="225" y="0" width="50" height="500" fill="white"/>
            <rect x="0" y="200" width="500" height="50" fill="white"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={heroChild}>
                <span
                  className="inline-block font-cinzel text-[0.6rem] tracking-[0.35em] text-gold/70 uppercase border border-gold/20 px-4 py-2"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  SS 2024 Collection
                </span>
              </motion.div>

              <motion.h1
                variants={heroChild}
                className="font-cinzel leading-none"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <span
                  className="block text-6xl lg:text-8xl font-black tracking-tight text-ivory"
                  style={{ fontWeight: 900 }}
                >
                  Dark
                </span>
                <span
                  className="block text-6xl lg:text-8xl font-black tracking-tight gold-shimmer"
                  style={{ fontWeight: 900 }}
                >
                  Luxury
                </span>
                <span
                  className="block text-6xl lg:text-8xl font-black tracking-tight text-ivory/20"
                  style={{ fontWeight: 900 }}
                >
                  Forged
                </span>
              </motion.h1>

              <motion.p
                variants={heroChild}
                className="font-cormorant text-xl text-ivory/50 leading-relaxed max-w-md"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Crosses, rings, and chains born from shadow. Each piece a testament to craftsmanship, darkness, and the beauty of the macabre.
              </motion.p>

              <motion.div variants={heroChild} className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="btn-gold flex items-center gap-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Explore Collection
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
                <Link
                  to="/shop?category=crosses"
                  className="btn-outline-gold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  View Crosses
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={heroChild} className="flex gap-10 pt-4">
                {[
                  { num: '2,400+', label: 'Pieces Sold' },
                  { num: '98%', label: 'Satisfaction' },
                  { num: '12+', label: 'Years Craft' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="font-cinzel text-2xl text-gold tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>{stat.num}</p>
                    <p className="font-inter text-[0.6rem] text-silver/40 tracking-widest uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="relative overflow-hidden aspect-[4/5]"
                style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=85"
                  alt="Nocturn hero piece — gothic cross pendant"
                  className="w-full h-full object-cover animate-float"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
                  }}
                />
                {/* Featured label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass border border-white/8 px-5 py-4">
                    <p className="font-cinzel text-[0.55rem] tracking-[0.3em] text-gold/70 uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Featured Piece</p>
                    <p className="font-cinzel text-base text-ivory tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Obsidian Crucifix Pendant</p>
                    <p className="font-inter text-xs text-silver/60 mt-1">Sterling Silver 925 · Black Rhodium</p>
                  </div>
                </div>
              </div>

              {/* Gold corner accents */}
              {[
                'top-0 left-0',
                'top-0 right-0',
                'bottom-0 left-0',
                'bottom-0 right-0',
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-8 h-8 pointer-events-none`}
                  style={{
                    borderTop: i < 2 ? '1px solid rgba(201,168,76,0.4)' : 'none',
                    borderBottom: i >= 2 ? '1px solid rgba(201,168,76,0.4)' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid rgba(201,168,76,0.4)' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid rgba(201,168,76,0.4)' : 'none',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-cinzel text-[0.5rem] tracking-[0.3em] text-silver/20 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Scroll</p>
            <div className="w-px h-8 bg-gradient-to-b from-silver/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══════════════════════════════════════ */}
      <section className="py-24" style={{ background: '#060606' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-cinzel text-[0.6rem] tracking-[0.4em] text-gold/60 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Browse By
            </span>
            <h2
              className="font-cinzel text-4xl lg:text-5xl text-ivory mt-3 tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              The Collection
            </h2>
            <div className="divider-gold mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group block relative overflow-hidden aspect-[3/4]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transform: 'scale(1.02)' }}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-inter text-[0.55rem] tracking-[0.3em] text-gold/60 uppercase mb-2">
                      {cat.count} pieces
                    </p>
                    <h3
                      className="font-cinzel text-2xl text-ivory tracking-wider group-hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {cat.name}
                    </h3>
                    <p className="font-cormorant text-sm text-ivory/50 italic mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="font-cinzel text-[0.6rem] tracking-[0.2em] text-gold uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                        Explore
                      </span>
                      <ArrowRight size={12} className="text-gold" />
                    </div>
                  </div>
                  {/* Gold border overlay */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ══════════════════════════════════ */}
      <section className="py-24" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span className="font-cinzel text-[0.6rem] tracking-[0.4em] text-gold/60 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Curated
              </span>
              <h2
                className="font-cinzel text-4xl lg:text-5xl text-ivory mt-2 tracking-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Featured Pieces
              </h2>
            </div>
            <Link
              to="/shop"
              className="nav-link flex items-center gap-2 text-gold"
            >
              View All
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES STRIP ════════════════════════════════════ */}
      <section
        className="py-16"
        style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 group"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 border border-gold/20 group-hover:border-gold/50 transition-colors duration-300"
                  style={{ background: 'rgba(201,168,76,0.04)' }}
                >
                  <Icon size={18} className="text-gold/70 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm tracking-wider text-ivory" style={{ fontFamily: "'Cinzel', serif" }}>
                    {title}
                  </h3>
                  <p className="font-inter text-xs text-silver/40 mt-1 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE / EDITORIAL STRIP ═════════════════════════ */}
      <section className="py-12 overflow-hidden" style={{ background: '#050505' }}>
        <div className="flex gap-16 items-center" style={{ animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              {['Gothic Craftsmanship', '·', 'Dark Luxury', '·', 'Handcrafted', '·', 'Sterling Silver', '·', 'Limited Edition', '·'].map((text, j) => (
                <span
                  key={j}
                  className={`font-cinzel text-sm tracking-[0.3em] uppercase ${text === '·' ? 'text-gold' : 'text-silver/15'}`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-25%); } }`}</style>
      </section>
    </main>
  );
}
