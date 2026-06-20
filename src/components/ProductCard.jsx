import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const BADGE_COLORS = {
  BESTSELLER: { bg: 'rgba(201, 168, 76, 0.15)', border: 'rgba(201, 168, 76, 0.4)', text: '#c9a84c' },
  LIMITED: { bg: 'rgba(139, 26, 26, 0.2)', border: 'rgba(139, 26, 26, 0.5)', text: '#e05555' },
  NEW: { bg: 'rgba(60, 120, 180, 0.15)', border: 'rgba(60, 120, 180, 0.4)', text: '#7ab3e0' },
  ICON: { bg: 'rgba(201, 168, 76, 0.15)', border: 'rgba(201, 168, 76, 0.4)', text: '#c9a84c' },
  SALE: { bg: 'rgba(139, 26, 26, 0.2)', border: 'rgba(139, 26, 26, 0.5)', text: '#e05555' },
  'SET OF 3': { bg: 'rgba(80, 80, 80, 0.3)', border: 'rgba(150,150,150,0.3)', text: '#c8c8c8' },
};

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.category === 'rings' ? 'M' : null);
  };

  const badgeStyle = product.badge ? BADGE_COLORS[product.badge] || BADGE_COLORS.BESTSELLER : null;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="product-card group"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div
          className="relative overflow-hidden aspect-square"
          style={{ background: '#111' }}
        >
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-gold px-4 py-2 text-[0.6rem] flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <ShoppingBag size={12} strokeWidth={2} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 flex items-center justify-center bg-black/60 border border-white/15 text-ivory/80 hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
              >
                <Eye size={14} strokeWidth={1.5} />
              </motion.div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && badgeStyle && (
              <span
                className="font-cinzel text-[0.5rem] tracking-[0.15em] px-2.5 py-1 uppercase"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: badgeStyle.bg,
                  border: `1px solid ${badgeStyle.border}`,
                  color: badgeStyle.text,
                }}
              >
                {product.badge}
              </span>
            )}
            {discount && (
              <span
                className="font-cinzel text-[0.5rem] tracking-wider px-2.5 py-1 uppercase"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: 'rgba(139, 26, 26, 0.2)',
                  border: '1px solid rgba(139,26,26,0.4)',
                  color: '#e05555',
                }}
              >
                -{discount}%
              </span>
            )}
            {!product.inStock && (
              <span
                className="font-cinzel text-[0.5rem] tracking-wider px-2.5 py-1 uppercase"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#666',
                }}
              >
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4 pb-2">
          {/* Category tag */}
          <p className="font-inter text-[0.55rem] tracking-[0.25em] uppercase text-silver/40 mb-1.5">
            {product.category} · {product.material?.split(',')[0]}
          </p>

          {/* Name */}
          <h3
            className="font-cinzel text-sm tracking-wide text-ivory group-hover:text-gold transition-colors duration-300 leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={9}
                  className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-silver/20'}
                  strokeWidth={1}
                />
              ))}
            </div>
            <span className="font-inter text-[0.55rem] text-silver/40">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span
              className="font-cinzel text-base text-gold tracking-wide"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-inter text-xs text-silver/30 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
