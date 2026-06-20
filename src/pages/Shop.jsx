import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES, SORT_OPTIONS } from '../data/products';
import ProductCard from '../components/ProductCard';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 – $250', min: 150, max: 250 },
  { label: 'Over $250', min: 250, max: Infinity },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activeSort, setActiveSort] = useState(searchParams.get('sort') || 'featured');
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
    const sort = searchParams.get('sort');
    if (sort) setActiveSort(sort);
    window.scrollTo(0, 0);
    document.title = 'Shop — NOCTURN Dark Luxury';
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (inStockOnly) list = list.filter(p => p.inStock);
    const priceRange = PRICE_RANGES[activePriceRange];
    list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (activeSort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.reverse(); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [activeCategory, activeSort, activePriceRange, inStockOnly]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  return (
    <main className="min-h-screen pt-24 pb-24" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-10 pb-12 border-b border-white/5"
        >
          <span className="font-cinzel text-[0.6rem] tracking-[0.4em] text-gold/60 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
            {filtered.length} Pieces
          </span>
          <h1
            className="font-cinzel text-4xl lg:text-5xl text-ivory mt-2 tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {activeCategory === 'all'
              ? 'The Full Collection'
              : CATEGORIES.find(c => c.id === activeCategory)?.name ?? 'Collection'}
          </h1>
        </motion.div>

        {/* Toolbar */}
        <div className="flex items-center justify-between py-6 gap-4 flex-wrap">
          {/* Category tabs */}
          <div className="flex gap-1 flex-wrap">
            {[{ id: 'all', name: 'All' }, ...CATEGORIES].map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`font-cinzel text-[0.6rem] tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gold/10 border border-gold/40 text-gold'
                    : 'border border-white/8 text-silver/50 hover:border-white/20 hover:text-silver'
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={activeSort}
                onChange={e => setActiveSort(e.target.value)}
                className="input-dark pl-4 pr-10 py-2.5 text-[0.65rem] tracking-wider uppercase cursor-pointer appearance-none"
                style={{ minWidth: '180px', fontFamily: "'Cinzel', serif" }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/40 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setFilterOpen(v => !v)}
              className={`flex items-center gap-2 border px-4 py-2.5 transition-colors ${
                filterOpen ? 'border-gold/40 text-gold bg-gold/5' : 'border-white/8 text-silver/50 hover:border-white/20 hover:text-silver'
              }`}
            >
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              <span className="font-cinzel text-[0.6rem] tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Filters
              </span>
            </button>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6 mb-6 border-y border-white/5"
                style={{ background: 'rgba(255,255,255,0.01)' }}
              >
                {/* Price Range */}
                <div>
                  <p className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-gold/60 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                    Price Range
                  </p>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range, i) => (
                      <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => setActivePriceRange(i)}
                          className={`w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer ${
                            activePriceRange === i ? 'border-gold bg-gold/20' : 'border-white/20 hover:border-gold/40'
                          }`}
                        >
                          {activePriceRange === i && <div className="w-2 h-2 bg-gold" />}
                        </div>
                        <span
                          className={`font-inter text-xs tracking-wide transition-colors ${activePriceRange === i ? 'text-ivory' : 'text-silver/50 group-hover:text-silver/80'}`}
                        >
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <p className="font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-gold/60 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                    Availability
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setInStockOnly(v => !v)}
                      className={`w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer ${
                        inStockOnly ? 'border-gold bg-gold/20' : 'border-white/20 hover:border-gold/40'
                      }`}
                    >
                      {inStockOnly && <div className="w-2 h-2 bg-gold" />}
                    </div>
                    <span className={`font-inter text-xs tracking-wide ${inStockOnly ? 'text-ivory' : 'text-silver/50 group-hover:text-silver/80'}`}>
                      In Stock Only
                    </span>
                  </label>
                </div>

                {/* Active filters summary */}
                <div className="flex items-start justify-end">
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveSort('featured');
                      setActivePriceRange(0);
                      setInStockOnly(false);
                      setSearchParams({});
                    }}
                    className="flex items-center gap-2 text-silver/40 hover:text-crimson transition-colors"
                  >
                    <X size={13} strokeWidth={1.5} />
                    <span className="font-inter text-[0.65rem] tracking-wide">Clear All</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeSort}-${activePriceRange}-${inStockOnly}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="w-24 h-24 border border-white/8 flex items-center justify-center">
                  <SlidersHorizontal size={28} className="text-silver/20" strokeWidth={1} />
                </div>
                <div className="text-center">
                  <p className="font-cinzel text-lg text-ivory/30 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                    No pieces found
                  </p>
                  <p className="font-inter text-xs text-silver/20 mt-2">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
