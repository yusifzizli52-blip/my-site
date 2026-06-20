import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Heart, Share2, Plus, Minus, Shield, RotateCcw, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const RING_SIZES = ['5', '6', '7', '8', '9', '10', '11', '12', '13'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = PRODUCTS.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const related = product
    ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setSelectedSize(null);
    setQty(1);
    if (product) {
      document.title = `${product.name} — NOCTURN`;
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24">
        <p className="font-cinzel text-2xl text-ivory/30 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
          Piece not found
        </p>
        <Link to="/shop" className="btn-outline-gold" style={{ fontFamily: "'Cinzel', serif" }}>Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.category === 'rings' && !selectedSize) return;
    addItem(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const isRing = product.category === 'rings';
  const sizeRequired = isRing && !selectedSize;

  return (
    <main className="min-h-screen pt-24 pb-24" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 pt-8 pb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-silver/40 hover:text-gold transition-colors group"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-inter text-[0.65rem] tracking-widest uppercase">Back</span>
          </button>
          <span className="text-white/10">/</span>
          <Link to="/shop" className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/30 hover:text-gold transition-colors">
            Shop
          </Link>
          <span className="text-white/10">/</span>
          <span className="font-inter text-[0.65rem] tracking-widest uppercase text-gold/60">{product.name}</span>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Main image */}
            <div
              className="relative overflow-hidden aspect-square"
              style={{ background: '#111' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Corner accents */}
              {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-6 h-6 pointer-events-none`}
                  style={{
                    borderTop: i < 2 ? '1px solid rgba(201,168,76,0.3)' : 'none',
                    borderBottom: i >= 2 ? '1px solid rgba(201,168,76,0.3)' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid rgba(201,168,76,0.3)' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid rgba(201,168,76,0.3)' : 'none',
                  }}
                />
              ))}

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(v => !v)}
                className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-colors glass border border-white/10 ${wishlisted ? 'text-crimson' : 'text-silver/50 hover:text-crimson'}`}
              >
                <Heart size={15} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 overflow-hidden border transition-colors ${
                      activeImage === i ? 'border-gold' : 'border-white/10 hover:border-white/30'
                    }`}
                    style={{ background: '#111' }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Badge + Category */}
            <div className="flex items-center gap-3">
              <span className="font-inter text-[0.55rem] tracking-[0.3em] uppercase text-silver/40">
                {product.category}
              </span>
              {product.badge && (
                <span className="badge-gold">{product.badge}</span>
              )}
              {!product.inStock && (
                <span
                  className="font-cinzel text-[0.5rem] tracking-wider px-2.5 py-1 uppercase"
                  style={{ fontFamily: "'Cinzel', serif", background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#666' }}
                >
                  Sold Out
                </span>
              )}
            </div>

            {/* Name */}
            <h1
              className="font-cinzel text-3xl lg:text-4xl text-ivory tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-silver/20'}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <span className="font-inter text-xs text-silver/50">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-cinzel text-4xl text-gold tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="font-inter text-lg text-silver/30 line-through">${product.originalPrice}</span>
              )}
            </div>

            <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.2), transparent)' }} />

            {/* Description */}
            <p
              className="font-cormorant text-lg text-ivory/60 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.description}
            </p>

            {/* Ring Size Selector */}
            {isRing && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-silver/60" style={{ fontFamily: "'Cinzel', serif" }}>
                    Ring Size
                  </p>
                  <button className="font-inter text-[0.6rem] text-gold/60 hover:text-gold underline underline-offset-2 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RING_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 font-cinzel text-xs transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-gold/15 border border-gold text-gold'
                          : 'border border-white/15 text-silver/50 hover:border-gold/30 hover:text-silver'
                      }`}
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeRequired && (
                  <p className="font-inter text-[0.65rem] text-crimson mt-2">Please select a size</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-silver/60" style={{ fontFamily: "'Cinzel', serif" }}>
                Quantity
              </p>
              <div className="flex items-center border border-white/15">
                <button
                  onClick={() => setQty(v => Math.max(1, v - 1))}
                  className="w-10 h-10 flex items-center justify-center text-silver/60 hover:text-gold hover:bg-gold/5 transition-colors"
                >
                  <Minus size={13} strokeWidth={2} />
                </button>
                <span className="font-inter text-sm text-ivory w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty(v => Math.min(10, v + 1))}
                  className="w-10 h-10 flex items-center justify-center text-silver/60 hover:text-gold hover:bg-gold/5 transition-colors"
                >
                  <Plus size={13} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                animate={addedAnimation ? { scale: [1, 0.96, 1] } : {}}
                className="btn-gold flex-1 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <ShoppingBag size={15} strokeWidth={2} />
                {addedAnimation ? 'Added!' : product.inStock ? 'Add to Reliquary' : 'Out of Stock'}
              </motion.button>
              <button className="w-12 h-12 border border-white/15 flex items-center justify-center text-silver/50 hover:text-ivory hover:border-white/30 transition-colors flex-shrink-0">
                <Share2 size={15} strokeWidth={1.5} />
              </button>
            </div>

            {/* Specs */}
            <div className="border border-white/6 divide-y divide-white/5">
              {[
                { label: 'Material', value: product.material },
                { label: 'Dimensions', value: product.dimensions },
                { label: 'Weight', value: product.weight },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between px-4 py-3">
                  <span className="font-inter text-[0.65rem] tracking-wider uppercase text-silver/40">{label}</span>
                  <span className="font-inter text-xs text-ivory/70">{value}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, text: 'Authenticity Cert.' },
                { icon: RotateCcw, text: '30-Day Returns' },
                { icon: Truck, text: 'Free over $200' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center py-3 border border-white/5">
                  <Icon size={16} className="text-gold/50" strokeWidth={1.5} />
                  <span className="font-inter text-[0.55rem] text-silver/40 leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24 pt-12 border-t border-white/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="font-cinzel text-[0.6rem] tracking-[0.4em] text-gold/60 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                You May Also Desire
              </span>
              <h2
                className="font-cinzel text-3xl text-ivory mt-2 tracking-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Related Pieces
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
