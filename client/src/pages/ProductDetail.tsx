import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Copy,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Package,
  Shield,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import { getWhatsappUrl, type Product } from "@/data/mockDatabase";

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { products } = useProducts();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Accordion state
  const [openSpec, setOpenSpec] = useState<string | null>("materials");

  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  // Scroll to top whenever product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  // Related products: filter out current product, prioritize same category
  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .sort((a, b) => (a.category === product?.category ? -1 : 1))
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard", {
      description: "Share this piece with your designer or partner.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const getCustomWhatsappUrl = (p: Product) => {
    const msg = `Hello TouchWorth, I am interested in inquiring about the ${p.name} listed at ${p.price}. Could you please share available finishes, customizations, and dispatch timeline?`;
    return `https://wa.me/9436022202?text=${encodeURIComponent(msg)}`;
  };

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f3ea] text-[#273326] flex flex-col justify-between">
        <header className="border-b border-[#c9bfad]/60 bg-[#fbf8f1] px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] hover:gap-3 transition-all"
            >
              <ArrowLeft size={15} /> Return to Storefront
            </Link>
            <span className="font-display text-[16px] italic text-[#273326]">TouchWorth Studio</span>
          </div>
        </header>

        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <Package size={40} className="mx-auto text-[#8c654a]" />
          <h1 className="mt-4 font-display text-[32px] text-[#273326]">Piece Not Found</h1>
          <p className="mt-2 text-[13px] text-[#756e61]">
            This furniture piece may have been removed or the link has expired.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 bg-[#273326] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#faf7ef] hover:bg-[#3d4f3b] transition"
          >
            Explore The Collection <ArrowRight size={14} />
          </Link>
        </div>

        <footer className="border-t border-[#c9bfad]/60 py-5 text-center text-[10px] uppercase tracking-[0.2em] text-[#8c8273]">
          TouchWorth Jaipur · Bespoke Furniture
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3ea] text-[#273326]">
      {/* Top Banner */}
      <div className="bg-[#273326] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e9dfca]">
        Complimentary white-glove delivery on all bespoke orders · Studio dispatch from Jaipur
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#c9bfad]/70 bg-[#f7f3ea]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-14">
          <Link href="/" className="group flex items-center gap-3" aria-label="TouchWorth home">
            <span className="flex h-9 w-9 items-center justify-center border border-[#273326] font-display text-[17px] italic text-[#273326] transition group-hover:bg-[#273326] group-hover:text-[#f7f3ea]">
              N
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#273326]">
              TouchWorth
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-[10px] font-semibold uppercase tracking-[0.2em] md:flex">
            <Link href="/" className="transition hover:text-[#8c654a]">
              The Edit
            </Link>
            <Link href="/#story" className="transition hover:text-[#8c654a]">
              Our Story
            </Link>
            <Link href="/#journal" className="transition hover:text-[#8c654a]">
              Journal
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/9436022202"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#273326] transition hover:text-[#8c654a] sm:flex"
            >
              <MessageCircle size={15} strokeWidth={1.5} /> Speak with us
            </a>
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 border border-[#273326]/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#273326] transition hover:border-[#273326] sm:inline-flex"
            >
              <Shield size={11} /> Admin
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-[#273326]/40 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#c9bfad]/60 bg-[#fbf8f1] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                The Edit
              </Link>
              <Link href="/#story" onClick={() => setMenuOpen(false)}>
                Our Story
              </Link>
              <Link href="/#journal" onClick={() => setMenuOpen(false)}>
                Journal
              </Link>
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-[#8c654a]">
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumbs & Return Bar */}
      <div className="border-b border-[#c9bfad]/60 bg-[#fbf8f1]/50 px-6 py-3.5 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <div className="flex items-center gap-2 text-[#8c8273]">
            <Link href="/" className="hover:text-[#273326] transition flex items-center gap-1">
              <ArrowLeft size={13} /> The Edit
            </Link>
            <span>/</span>
            <span className="text-[#6e4b36]">{product.category}</span>
            <span>/</span>
            <span className="text-[#273326] font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6e4b36] hover:text-[#273326] transition"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Share Piece"}</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="mx-auto max-w-[1440px] px-6 py-12 lg:px-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-start">
          {/* LEFT: Photography & Image Frame */}
          <div className="space-y-4">
            <div className="product-image-wrap relative aspect-[0.88] w-full overflow-hidden bg-[#e5dfd0] border border-[#c9bfad]">
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
              />
              <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f8f4ec]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-[#29362a]/60 backdrop-blur-sm">
                  {String(product.id).padStart(2, "0")}
                </span>
                {product.badge && (
                  <span className="border border-white/60 bg-[#29362a]/60 px-3.5 py-1.5 backdrop-blur-sm">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Micro Highlights under image */}
            <div className="grid grid-cols-3 gap-3 border border-[#c9bfad]/70 bg-[#fbf8f1] p-4 text-center">
              <div className="border-r border-[#c9bfad]/50 pr-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8c654a]">
                  Origin
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-[#273326]">Jaipur Studio</p>
              </div>
              <div className="border-r border-[#c9bfad]/50 px-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8c654a]">
                  Lead Time
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-[#273326]">3–5 Weeks</p>
              </div>
              <div className="pl-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8c654a]">
                  Customization
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-[#273326]">Made to Order</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Inquiry */}
          <div className="flex flex-col">
            {/* Category & Badge */}
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8c654a]">
              <span>{product.category}</span>
              {product.badge && (
                <>
                  <span className="h-1 w-1 rounded-full bg-[#8c654a]" />
                  <span className="text-[#6e4b36]">{product.badge}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-3 font-display text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[0.96] tracking-[-0.04em] text-[#273326]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4 border-b border-[#c9bfad]/70 pb-6">
              <span className="font-display text-[32px] font-normal text-[#273326]">
                {product.price}
              </span>
              <span className="text-[12px] text-[#756e61]">
                Taxes included · White-glove delivery
              </span>
            </div>

            {/* Narrative Description */}
            <div className="mt-8">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c654a] mb-2">
                The Silhouette & Narrative
              </h2>
              <p className="text-[15px] leading-8 text-[#5a5347] font-normal">
                {product.description}
              </p>
            </div>

            {/* Main Action CTAs */}
            <div className="mt-10 space-y-3.5 border-t border-[#c9bfad]/70 pt-8">
              <a
                href={getCustomWhatsappUrl(product)}
                target="_blank"
                rel="noreferrer"
                id="product-inquire-whatsapp"
                className="group flex w-full items-center justify-between bg-[#6e4b36] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fbf8f1] transition hover:bg-[#855c42] active:scale-[0.99] shadow-md"
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle size={18} strokeWidth={1.7} />
                  Inquire on WhatsApp
                </span>
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex w-full items-center justify-center gap-2 border border-[#c9bfad] bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#273326] transition hover:border-[#6e4b36] hover:text-[#6e4b36]"
              >
                <Copy size={14} /> {copied ? "Link Copied!" : "Share / Save This Piece"}
              </button>
            </div>

            {/* Accordion / Specifications */}
            <div className="mt-10 divide-y divide-[#c9bfad]/70 border-y border-[#c9bfad]/70">
              {/* Materials & Craftsmanship */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenSpec(openSpec === "materials" ? null : "materials")}
                  className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[#273326]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} className="text-[#8c654a]" /> Materials & Craftsmanship
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition duration-300 ${
                      openSpec === "materials" ? "rotate-180 text-[#8c654a]" : "text-[#8c8273]"
                    }`}
                  />
                </button>
                {openSpec === "materials" && (
                  <div className="mt-3 text-[13px] leading-6 text-[#756e61] animate-fade-up">
                    Crafted from responsibly harvested solid timbers, full-grain aniline leathers,
                    tactile woven velvets, or precision-hewn travertine stone. Every joint is
                    hand-mortised and finished with organic wax oils to ensure longevity and a rich,
                    living patina over time.
                  </div>
                )}
              </div>

              {/* Proportions & Sizing */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenSpec(openSpec === "dimensions" ? null : "dimensions")}
                  className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[#273326]"
                >
                  <span className="flex items-center gap-2">
                    <Compass size={14} className="text-[#8c654a]" /> Dimensions & Custom Sizing
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition duration-300 ${
                      openSpec === "dimensions" ? "rotate-180 text-[#8c654a]" : "text-[#8c8273]"
                    }`}
                  />
                </button>
                {openSpec === "dimensions" && (
                  <div className="mt-3 text-[13px] leading-6 text-[#756e61] animate-fade-up">
                    Available in studio standard proportions tailored to considered living rooms and
                    dining halls. Bespoke dimensions can be commissioned through our Jaipur workshop to
                    fit your architectural floorplan seamlessly.
                  </div>
                )}
              </div>

              {/* Delivery & Dispatch */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenSpec(openSpec === "delivery" ? null : "delivery")}
                  className="flex w-full items-center justify-between text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[#273326]"
                >
                  <span className="flex items-center gap-2">
                    <Truck size={14} className="text-[#8c654a]" /> White-Glove Delivery
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition duration-300 ${
                      openSpec === "delivery" ? "rotate-180 text-[#8c654a]" : "text-[#8c8273]"
                    }`}
                  />
                </button>
                {openSpec === "delivery" && (
                  <div className="mt-3 text-[13px] leading-6 text-[#756e61] animate-fade-up">
                    Each piece is inspected, wrapped in custom wooden crates, and dispatched with
                    white-glove placement service directly from our Jaipur workshop. Standard dispatch
                    is 3–5 weeks from order confirmation.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED / RECOMMENDED PIECES */}
        {relatedProducts.length > 0 && (
          <section className="mt-28 border-t border-[#c9bfad]/70 pt-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8c654a]">
                  Curated Companions
                </p>
                <h2 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.6rem)] tracking-[-0.04em] text-[#273326]">
                  You may also consider.
                </h2>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6e4b36] hover:gap-3 transition-all"
              >
                View all pieces <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#273326] text-[#f5f1e8] mt-24">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-14 lg:py-28">
          <div className="grid gap-14 border-b border-white/20 pb-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10">
            <div>
              <p className="mb-6 font-display text-[22px] italic text-[#d8c69f]">
                Designed to be lived with.
              </p>
              <h2 className="max-w-[420px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.94] tracking-[-0.05em]">
                Keep in <em className="font-normal text-[#d8c69f]">touch.</em>
              </h2>
              <a
                href={getCustomWhatsappUrl(product)}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-3 border-b border-[#d8c69f] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5f1e8] transition hover:gap-5"
              >
                Inquire about {product.name} <ArrowRight size={15} strokeWidth={1.5} />
              </a>
            </div>
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c69f]">
                Explore
              </p>
              <div className="flex flex-col gap-4 text-[13px] text-[#c6c1b5]">
                <Link href="/" className="transition hover:text-white">
                  The Edit
                </Link>
                <Link href="/#story" className="transition hover:text-white">
                  Our story
                </Link>
                <Link href="/#journal" className="transition hover:text-white">
                  Journal
                </Link>
              </div>
            </div>
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c69f]">
                Visit
              </p>
              <div className="text-[13px] leading-7 text-[#c6c1b5]">
                TouchWorth Studio
                <br />
                Jaipur, Rajasthan 302004
                <br />
                India
              </div>
            </div>
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c69f]">
                Stay awhile
              </p>
              <p className="max-w-[260px] text-[13px] leading-6 text-[#c6c1b5]">
                Occasional notes on objects, rituals and the art of the everyday.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-5 pt-6 text-[10px] uppercase tracking-[0.17em] text-[#8e9588] sm:flex-row">
            <p>© 2026 TouchWorth Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/" className="transition hover:text-white">
                Terms
              </Link>
              <Link
                href="/admin"
                className="transition hover:text-[#d8c69f] flex items-center gap-1 text-[#c6c1b5]"
              >
                <Shield size={11} /> Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
