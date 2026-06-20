import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Lock, CreditCard, Truck, ChevronRight, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirm'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 flex items-center justify-center border transition-colors duration-300 ${
                i < current
                  ? 'bg-gold border-gold'
                  : i === current
                  ? 'border-gold bg-gold/10'
                  : 'border-white/10 bg-transparent'
              }`}
            >
              {i < current ? (
                <Check size={13} className="text-obsidian" strokeWidth={2.5} />
              ) : (
                <span className={`font-cinzel text-[0.6rem] ${i === current ? 'text-gold' : 'text-silver/30'}`} style={{ fontFamily: "'Cinzel', serif" }}>
                  {i + 1}
                </span>
              )}
            </div>
            <span
              className={`font-cinzel text-[0.5rem] tracking-widest uppercase ${
                i === current ? 'text-gold' : i < current ? 'text-gold/50' : 'text-silver/20'
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="w-16 sm:w-24 h-px mx-2 mb-5 transition-colors duration-300"
              style={{ background: i < current ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.08)' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function OrderSummary({ items, subtotal }) {
  const shipping = subtotal > 200 ? 0 : 15;
  return (
    <div className="border border-white/6 p-6 space-y-4">
      <h3 className="font-cinzel text-sm tracking-widest text-ivory uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Order Summary</h3>
      <div className="space-y-3 border-b border-white/5 pb-4">
        {items.map(item => (
          <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
            <div className="w-12 h-12 overflow-hidden flex-shrink-0 border border-white/5" style={{ background: '#111' }}>
              <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-cinzel text-[0.65rem] tracking-wide text-ivory truncate" style={{ fontFamily: "'Cinzel', serif" }}>{item.name}</p>
              {item.size && <p className="font-inter text-[0.55rem] text-silver/40 mt-0.5">Size {item.size}</p>}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-inter text-xs text-silver/50">×{item.qty}</p>
              <p className="font-cinzel text-xs text-gold" style={{ fontFamily: "'Cinzel', serif" }}>${(item.price * item.qty).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between"><span className="text-silver/50">Subtotal</span><span className="text-ivory">${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-silver/50">Shipping</span><span className={shipping === 0 ? 'text-gold' : 'text-ivory'}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
        <div className="flex justify-between pt-3 border-t border-white/8">
          <span className="font-cinzel text-sm text-ivory uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Total</span>
          <span className="font-cinzel text-base text-gold" style={{ fontFamily: "'Cinzel', serif" }}>${(subtotal + shipping).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated, openModal } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', country: 'United States', postcode: '',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Checkout — NOCTURN';
  }, []);

  const updateForm = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2200));
    setProcessing(false);
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center gap-6" style={{ background: '#080808' }}>
        <p className="font-cinzel text-2xl text-ivory/30 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Your reliquary is empty</p>
        <button onClick={() => navigate('/shop')} className="btn-gold" style={{ fontFamily: "'Cinzel', serif" }}>Shop Collection</button>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen pt-24 pb-24 flex items-center justify-center" style={{ background: '#080808' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 20 }}
            className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8"
          >
            <Check size={32} className="text-gold" strokeWidth={1.5} />
          </motion.div>
          <h2 className="font-cinzel text-3xl text-ivory tracking-tight mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Order Confirmed</h2>
          <p className="font-cormorant text-lg text-ivory/50 italic leading-relaxed mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Your relics are being prepared with care. You'll receive an email confirmation shortly.
          </p>
          <div className="font-inter text-xs text-silver/30 tracking-widest uppercase mb-10">
            Order #NCT-{Math.floor(Math.random() * 90000) + 10000}
          </div>
          <button onClick={() => navigate('/')} className="btn-gold" style={{ fontFamily: "'Cinzel', serif" }}>Return Home</button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-24" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10">
        <div className="mb-10">
          <span className="font-cinzel text-[0.6rem] tracking-[0.4em] text-gold/60 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
            Secure Checkout
          </span>
          <h1 className="font-cinzel text-4xl text-ivory mt-2 tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>Complete Your Order</h1>
        </div>

        <StepIndicator current={step} />

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {/* Step 0: Cart review */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-cinzel text-xl text-ivory tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>Review Your Selection</h2>
                  {!isAuthenticated && (
                    <div className="border border-gold/20 bg-gold/3 px-5 py-4 flex items-center justify-between gap-4">
                      <p className="font-inter text-sm text-ivory/60">Sign in for faster checkout and order tracking.</p>
                      <button onClick={() => openModal('signin')} className="btn-outline-gold whitespace-nowrap" style={{ fontFamily: "'Cinzel', serif" }}>Sign In</button>
                    </div>
                  )}
                  <div className="border border-white/6 divide-y divide-white/5">
                    {items.map(item => (
                      <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 p-4">
                        <div className="w-16 h-16 overflow-hidden flex-shrink-0" style={{ background: '#111' }}>
                          <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-cinzel text-sm text-ivory tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>{item.name}</p>
                          {item.size && <p className="font-inter text-[0.6rem] text-silver/40 mt-1 uppercase tracking-wider">Size {item.size}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-inter text-xs text-silver/40">Qty: {item.qty}</p>
                          <p className="font-cinzel text-base text-gold mt-1" style={{ fontFamily: "'Cinzel', serif" }}>${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)} className="btn-gold w-full flex items-center justify-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    Continue to Shipping <ChevronRight size={15} strokeWidth={2} />
                  </button>
                </motion.div>
              )}

              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-cinzel text-xl text-ivory tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>Shipping Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Email</label>
                      <input value={formData.email} onChange={e => updateForm('email', e.target.value)} type="email" placeholder="your@email.com" className="input-dark" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">First Name</label>
                        <input value={formData.firstName} onChange={e => updateForm('firstName', e.target.value)} type="text" className="input-dark" placeholder="First" />
                      </div>
                      <div>
                        <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Last Name</label>
                        <input value={formData.lastName} onChange={e => updateForm('lastName', e.target.value)} type="text" className="input-dark" placeholder="Last" />
                      </div>
                    </div>
                    <div>
                      <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Street Address</label>
                      <input value={formData.address} onChange={e => updateForm('address', e.target.value)} type="text" className="input-dark" placeholder="123 Dark Alley" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">City</label>
                        <input value={formData.city} onChange={e => updateForm('city', e.target.value)} type="text" className="input-dark" placeholder="City" />
                      </div>
                      <div>
                        <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Postcode</label>
                        <input value={formData.postcode} onChange={e => updateForm('postcode', e.target.value)} type="text" className="input-dark" placeholder="ZIP" />
                      </div>
                    </div>
                    <div>
                      <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Shipping Method</label>
                      <div className="space-y-2">
                        {[
                          { id: 'standard', label: 'Standard Delivery', sub: '5-7 business days', price: subtotal > 200 ? 'Free' : '$15' },
                          { id: 'express', label: 'Express Delivery', sub: '2-3 business days', price: '$29' },
                        ].map(opt => (
                          <label key={opt.id} className="flex items-center justify-between cursor-pointer border border-white/8 hover:border-gold/30 px-4 py-3 transition-colors">
                            <div className="flex items-center gap-3">
                              <input type="radio" name="shipping" defaultChecked={opt.id === 'standard'} className="accent-gold" />
                              <div>
                                <p className="font-inter text-xs text-ivory">{opt.label}</p>
                                <p className="font-inter text-[0.6rem] text-silver/40">{opt.sub}</p>
                              </div>
                            </div>
                            <span className={`font-cinzel text-xs ${opt.price === 'Free' ? 'text-gold' : 'text-ivory'}`} style={{ fontFamily: "'Cinzel', serif" }}>{opt.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="btn-outline-gold flex-1" style={{ fontFamily: "'Cinzel', serif" }}>Back</button>
                    <button onClick={() => setStep(2)} className="btn-gold flex-1 flex items-center justify-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                      Continue to Payment <ChevronRight size={15} strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-cinzel text-xl text-ivory tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>Payment Details</h2>
                  <div className="flex items-center gap-2 text-silver/40">
                    <Lock size={13} strokeWidth={1.5} />
                    <span className="font-inter text-[0.6rem] tracking-wide">Powered by Stripe — 256-bit SSL encrypted</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Card Number</label>
                      <div className="relative">
                        <input
                          value={formData.cardNumber}
                          onChange={e => updateForm('cardNumber', e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19))}
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="input-dark pr-12"
                        />
                        <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/20" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Expiry</label>
                        <input
                          value={formData.expiry}
                          onChange={e => updateForm('expiry', e.target.value.replace(/\D/g,'').replace(/(\d{2})(\d)/,'$1/$2').slice(0,5))}
                          type="text" placeholder="MM/YY" maxLength={5} className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">CVV</label>
                        <input
                          value={formData.cvv}
                          onChange={e => updateForm('cvv', e.target.value.replace(/\D/g,'').slice(0,4))}
                          type="text" placeholder="•••" maxLength={4} className="input-dark"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-inter text-[0.65rem] tracking-widest uppercase text-silver/50 block mb-1.5">Name on Card</label>
                      <input value={formData.cardName} onChange={e => updateForm('cardName', e.target.value)} type="text" placeholder="As it appears on card" className="input-dark" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline-gold flex-1" style={{ fontFamily: "'Cinzel', serif" }}>Back</button>
                    <button onClick={() => setStep(3)} className="btn-gold flex-1 flex items-center justify-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                      Review Order <ChevronRight size={15} strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-cinzel text-xl text-ivory tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>Confirm Your Order</h2>
                  <div className="border border-white/6 p-6 space-y-3">
                    <div className="flex items-center gap-3 text-silver/60">
                      <Truck size={15} strokeWidth={1.5} />
                      <div>
                        <p className="font-inter text-xs text-ivory/80">{formData.firstName} {formData.lastName}</p>
                        <p className="font-inter text-[0.65rem] text-silver/40">{formData.address}, {formData.city} {formData.postcode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-silver/60">
                      <CreditCard size={15} strokeWidth={1.5} />
                      <p className="font-inter text-xs text-ivory/80">
                        •••• •••• •••• {formData.cardNumber.slice(-4) || '????'}
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-[0.65rem] text-silver/30 leading-relaxed">
                    By placing your order you agree to our Terms of Service and Privacy Policy. Your card will be charged immediately upon confirmation.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline-gold flex-1" style={{ fontFamily: "'Cinzel', serif" }}>Back</button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      whileTap={{ scale: 0.98 }}
                      className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-70"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {processing ? (
                        <><Loader size={14} className="animate-spin" /> Processing…</>
                      ) : (
                        <><Lock size={13} strokeWidth={2} /> Place Order</>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-28 self-start">
            <OrderSummary items={items} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </main>
  );
}
