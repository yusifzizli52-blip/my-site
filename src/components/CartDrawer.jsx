import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 28, stiffness: 280 } },
  exit: { x: '100%', transition: { duration: 0.3, ease: [0.36, 0, 0.66, -0.56] } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.35 },
  }),
};

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, updateQty, subtotal, totalItems } = useCart();

  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            variants={drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: '#0e0e0e', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" strokeWidth={1.5} />
                <span className="font-cinzel text-sm tracking-[0.2em] text-ivory uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  Your Reliquary
                </span>
                {totalItems > 0 && (
                  <span className="badge-gold">{totalItems}</span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="text-silver/60 hover:text-ivory transition-colors p-1"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto drawer-scroll px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full border border-white/8 flex items-center justify-center">
                    <ShoppingBag size={28} className="text-silver/30" strokeWidth={1} />
                  </div>
                  <div>
                    <p className="font-cormorant text-xl text-ivory/60 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Your collection awaits
                    </p>
                    <p className="font-inter text-xs text-silver/40 mt-1 tracking-widest uppercase">
                      No items yet
                    </p>
                  </div>
                  <button onClick={closeDrawer} className="btn-outline-gold text-sm">
                    Explore the Collection
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      layout
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 py-4 border-b border-white/5 last:border-0"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#161616' }}>
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-cinzel text-xs tracking-wider text-ivory leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                              {item.name}
                            </p>
                            {item.size && (
                              <p className="font-inter text-[0.6rem] text-silver/50 tracking-widest uppercase mt-1">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-silver/30 hover:text-crimson transition-colors flex-shrink-0 ml-2"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2 border border-white/10">
                            <button
                              onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-silver/60 hover:text-gold hover:bg-gold/5 transition-colors"
                            >
                              <Minus size={11} strokeWidth={2} />
                            </button>
                            <span className="font-inter text-xs text-ivory w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-silver/60 hover:text-gold hover:bg-gold/5 transition-colors"
                            >
                              <Plus size={11} strokeWidth={2} />
                            </button>
                          </div>
                          <p className="font-cinzel text-sm text-gold tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-6 border-t border-white/5 space-y-4"
              >
                {/* Free shipping notice */}
                {subtotal < 200 && (
                  <div className="bg-gold/5 border border-gold/15 px-4 py-3">
                    <p className="font-inter text-[0.65rem] text-gold/80 text-center tracking-wide">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                    <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gold/50 to-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-inter text-silver/60 tracking-wider uppercase">Subtotal</span>
                    <span className="font-inter text-ivory">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-inter text-silver/60 tracking-wider uppercase">Shipping</span>
                    <span className="font-inter text-ivory">
                      {shipping === 0 ? (
                        <span className="text-gold">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/8 pt-2 mt-1">
                    <span className="font-cinzel text-sm tracking-widest text-ivory uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Total</span>
                    <span className="font-cinzel text-sm text-gold tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  to="/checkout"
                  onClick={closeDrawer}
                  className="btn-gold w-full flex items-center justify-center gap-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Proceed to Checkout
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
                <button
                  onClick={closeDrawer}
                  className="btn-outline-gold w-full text-center"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
