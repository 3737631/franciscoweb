import { useState, useEffect, useRef, useCallback } from 'react'
import { BRAND, products, type Product, categories, reviews } from './data'
import './App.css'

const { format } = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

function useIntersection(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
  return visible
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  )
}

interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

function Navbar({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileMega, setMobileMega] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menú">
            <span /><span /><span />
          </button>

          <a href="#" className="nav-logo">{BRAND.logo}</a>

          <div className="nav-center">
            <div className="nav-links" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <button className="nav-link">SHOP</button>
              <button className="nav-link">Mujer</button>
              <button className="nav-link">Colecciones</button>
              <button className="nav-link">Tiendas</button>
            </div>
          </div>

          <div className="nav-actions">
            <button className="nav-action" aria-label="Buscar"><SearchIcon /></button>
            <button className="nav-action" aria-label="Cuenta"><UserIcon /></button>
            <button className="nav-action cart-btn" onClick={onCartOpen} aria-label="Carrito">
              <CartIcon />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        <div className={`mega-menu ${megaOpen ? "open" : ""}`}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="mega-inner">
            {categories.map((cat, i) => (
              <div key={i} className="mega-col">
                <a href={cat.link || "#"} className="mega-title">{cat.name}</a>
                {cat.subcategories && (
                  <div className="mega-subs">
                    {cat.subcategories.map((sub, j) => (
                      <a key={j} href="#" className="mega-sub">{sub}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <div className="mobile-body">
          {categories.map((cat, i) => (
            <div key={i} className="mobile-cat">
              <button
                className="mobile-cat-title"
                onClick={() => setMobileMega(mobileMega === cat.name ? null : cat.name)}
              >
                {cat.name}
                {cat.subcategories && <span className="mobile-arrow">{mobileMega === cat.name ? '−' : '+'}</span>}
              </button>
              {cat.subcategories && mobileMega === cat.name && (
                <div className="mobile-subs">
                  {cat.subcategories.map((sub, j) => (
                    <a key={j} href="#" className="mobile-sub">{sub}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="#" className="mobile-cat-title">Mujer</a>
          <a href="#" className="mobile-cat-title">Colecciones</a>
          <a href="#" className="mobile-cat-title">Tiendas</a>
        </div>
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref, 0.1)

  return (
    <section className="hero" ref={ref}>
      <div className="hero-bg">
        <video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80">
          <source src="https://cdn.shopify.com/videos/c/vp/abcd1234.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div className={`hero-content ${visible ? "fade-up" : ""}`}>
        <p className="hero-suptitle">{BRAND.tagline}</p>
        <h1 className="hero-title">{BRAND.name}</h1>
        <p className="hero-tagline">NUEVA COLECCIÓN VERANO 26</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}>
            COMPRAR AHORA
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById("colecciones")?.scrollIntoView({ behavior: "smooth" })}>
            VER COLECCIÓN
          </button>
        </div>
      </div>
      <div className="hero-scroll">
        <span>DESCUBRE</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product, size: string, color: string) => void }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "")
  const [imgIndex, setImgIndex] = useState(0)
  const [adding, setAdding] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedSize && product.sizes[0] !== "One Size") return
    const size = selectedSize || product.sizes[0]
    setAdding(true)
    onAddToCart(product, size, selectedColor)
    setTimeout(() => setAdding(false), 600)
  }

  return (
    <div
      className="product-card"
      onMouseEnter={() => setImgIndex(1)}
      onMouseLeave={() => setImgIndex(0)}
    >
      <div className="product-image-wrap">
        <img
          src={product.images[imgIndex]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.badge && (
          <span className="product-badge" style={product.badgeColor ? { background: product.badgeColor } : undefined}>
            {product.badge}
          </span>
        )}
        <div className="product-actions">
          <button
            className={`product-add ${adding ? "added" : ""}`}
            onClick={handleAdd}
            disabled={!selectedSize && product.sizes[0] !== "One Size"}
            title={!selectedSize && product.sizes[0] !== "One Size" ? "Selecciona una talla" : "Añadir al carrito"}
          >
            {adding ? "✓" : "AÑADIR"}
          </button>
        </div>
      </div>

      {product.colors.length > 1 && (
        <div className="product-colors">
          {product.colors.map((c) => (
            <button
              key={c.name}
              className={`color-dot ${selectedColor === c.name ? "active" : ""}`}
              style={{ background: c.hex }}
              onClick={() => setSelectedColor(c.name)}
              title={c.name}
            />
          ))}
        </div>
      )}

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{format(product.price)}</p>
        <div className="product-sizes">
          {product.sizes.map((s) => (
            <button
              key={s}
              className={`size-btn ${selectedSize === s ? "active" : ""}`}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ title, products: prods, onAddToCart }: { title: string; products: Product[]; onAddToCart: (p: Product, size: string, color: string) => void }) {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref)

  return (
    <section id="productos" className="section" ref={ref}>
      <div className={`section-content ${visible ? "fade-up" : ""}`}>
        <h2 className="section-title">{title}</h2>
        <div className="product-grid">
          {prods.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCarousel({ title, products: prods, onAddToCart }: { title: string; products: Product[]; onAddToCart: (p: Product, size: string, color: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section id="colecciones" className="section section-dark" ref={ref}>
      <div className={`section-content ${visible ? "fade-up" : ""}`}>
        <div className="carousel-header">
          <h2 className="section-title">{title}</h2>
          <div className="carousel-arrows">
            <button onClick={() => scroll("left")} aria-label="Anterior">‹</button>
            <button onClick={() => scroll("right")} aria-label="Siguiente">›</button>
          </div>
        </div>
        <div className="carousel-track" ref={scrollRef}>
          {prods.concat(prods).map((p, i) => (
            <div key={i} className="carousel-item">
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref)
  const features = [
    { icon: "⟡", title: "ENVÍO GRATIS", desc: "Pedidos superiores a 100€" },
    { icon: "⟡", title: "DEVOLUCIONES", desc: "30 días para cambiar de opinión" },
    { icon: "⟡", title: "PAGO SEGURO", desc: "100% protegido" },
    { icon: "⟡", title: "ATENCIÓN 24/7", desc: "Soporte al cliente online" },
  ]

  return (
    <section className="features-bar" ref={ref}>
      <div className={`features-grid ${visible ? "fade-up" : ""}`}>
        {features.map((f, i) => (
          <div key={i} className="feature-item">
            <span className="feature-icon">{f.icon}</span>
            <div>
              <h4 className="feature-title">{f.title}</h4>
              <p className="feature-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref)

  return (
    <section className="section" ref={ref}>
      <div className={`section-content ${visible ? "fade-up" : ""}`}>
        <h2 className="section-title">OPINIONES</h2>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">
                {Array.from({ length: 5 }, (_, j) => (
                  <span key={j} className={`star ${j < r.rating ? "filled" : ""}`}>★</span>
                ))}
              </div>
              <p className="review-text">"{r.text}"</p>
              <p className="review-name">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <section className="section section-dark newsletter">
      <div className="section-content">
        <h2 className="section-title">NEWSLETTER</h2>
        <p className="newsletter-desc">Suscríbete para recibir novedades, lanzamientos y ofertas exclusivas.</p>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email) setSent(true) }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="newsletter-input"
          />
          <button type="submit" className="btn-primary">
            {sent ? "✓ SUSCRITO" : "SUSCRIBIRSE"}
          </button>
        </form>
      </div>
    </section>
  )
}

function CartDrawer({ open, onClose, items, onRemove, onUpdateQty }: {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onRemove: (idx: number) => void
  onUpdateQty: (idx: number, qty: number) => void
}) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <>
      <div className={`cart-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Carrito ({items.length})</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <div className="cart-empty">
            <CartIcon />
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, i) => (
                <div key={i} className="cart-item">
                  <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-detail">{item.size} / {item.color}</p>
                    <p className="cart-item-price">{format(item.product.price)}</p>
                    <div className="cart-qty">
                      <button onClick={() => onUpdateQty(i, Math.max(1, item.quantity - 1))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(i, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemove(i)}>✕</button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>TOTAL</span>
                <span>{format(total)}</span>
              </div>
              <button className="btn-primary cart-checkout">FINALIZAR PEDIDO</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>{BRAND.name}</h3>
          <p>{BRAND.tagline}</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>AYUDA</h4>
            <a href="#">Contacto</a>
            <a href="#">Envíos</a>
            <a href="#">Devoluciones</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>COMPAÑÍA</h4>
            <a href="#">Sobre nosotros</a>
            <a href="#">Tiendas</a>
            <a href="#">Trabaja con nosotros</a>
            <a href="#">Prensa</a>
          </div>
          <div className="footer-col">
            <h4>SIGUENOS</h4>
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id && item.size === size && item.color === color)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 }
        return next
      }
      return [...prev, { product, size, color, quantity: 1 }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx))
  }, [])

  const updateQty = useCallback((idx: number, qty: number) => {
    setCart((prev) => {
      const next = [...prev]
      next[idx] = { ...next[idx], quantity: qty }
      return next
    })
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const featured = products.filter((p) => p.badge === "BEST SELLER" || p.badge === "NOVEDAD")
  const hoodies = products.filter((p) => p.category === "Sudaderas")
  const tees = products.filter((p) => p.category === "Camisetas")
  const pants = products.filter((p) => p.category === "Pantalones")
  const accessories = products.filter((p) => p.category === "Accesorios")
  const carouselItems = [...hoodies, ...tees, ...pants]

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Features />
        <ProductGrid title="NOVEDADES DESTACADAS" products={featured} onAddToCart={addToCart} />
        <ProductCarousel title="COLECCIÓN COMPLETA" products={carouselItems} onAddToCart={addToCart} />
        <ProductGrid title="CAMISETAS" products={tees} onAddToCart={addToCart} />
        <ProductGrid title="PANTALONES" products={pants} onAddToCart={addToCart} />
        <ProductGrid title="ACCESORIOS" products={accessories} onAddToCart={addToCart} />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
      />
    </>
  )
}
