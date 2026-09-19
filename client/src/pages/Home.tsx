import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, ArrowRight, Instagram, Menu, MessageCircle, Shield, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

const heroImage =
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1800&q=90";
const editorialImage =
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=88";

export default function Home() {
  const { products, categories } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  // If a category was deleted in admin, reset activeCategory to "All"
  useEffect(() => {
    if (activeCategory !== "All" && !categories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [categories, activeCategory]);

  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  );

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3ea] text-[#273326]">
      <div className="bg-[#273326] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e9dfca]">
        Complimentary delivery on orders over ₹15,000 · Worldwide dispatch from Jaipur
      </div>

      <header className="absolute left-0 right-0 top-9 z-30 border-b border-white/20 text-[#faf7ef]">
        <div className="mx-auto flex h-[92px] max-w-[1440px] items-center justify-between px-6 lg:px-14">
          <a href="#top" className="group flex items-center gap-3 py-1" aria-label="TouchWorth home">
            <img src="/img/tw-logo.png" alt="TouchWorth" className="h-[72px] w-auto object-contain brightness-0 invert transition group-hover:opacity-90" />
          </a>
          <nav className="hidden items-center gap-9 text-[10px] font-semibold uppercase tracking-[0.2em] md:flex" aria-label="Main navigation">
            <a href="#collection" className="transition hover:text-[#dfc99f]">The edit</a>
            <a href="#story" className="transition hover:text-[#dfc99f]">Our story</a>
            <a href="#journal" className="transition hover:text-[#dfc99f]">Journal</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/9436022202" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] transition hover:text-[#dfc99f] sm:flex">
              <MessageCircle size={15} strokeWidth={1.5} /> Speak with us
            </a>
            <Link href="/admin" className="hidden items-center gap-1.5 border border-white/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#faf7ef] transition hover:border-white hover:bg-white/10 sm:inline-flex" title="Studio Admin Portal">
              <Shield size={11} /> Admin
            </Link>
            <button type="button" className="flex h-10 w-10 items-center justify-center border border-white/40 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/20 bg-[#273326]/95 px-6 py-5 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-5 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <button type="button" className="text-left" onClick={scrollToCollection}>The edit</button>
              <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
              <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-[#dfc99f]">Admin Portal</Link>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[720px] overflow-hidden bg-[#526050] text-[#faf7ef] lg:min-h-[780px]">
          <img src={heroImage} alt="Neutral fabric and tailored fashion details" className="absolute inset-0 h-full w-full object-cover object-center opacity-75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e2a20]/95 via-[#314031]/65 to-[#314031]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a20]/60 via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-end px-6 pb-20 pt-40 lg:min-h-[780px] lg:px-14 lg:pb-[108px]">
            <div className="max-w-[730px] animate-fade-up">
              <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e1cfaa]"><span className="h-px w-10 bg-[#e1cfaa]" /> Bespoke furniture · 2026 collection</p>
              <h1 className="max-w-[710px] font-display text-[clamp(3.7rem,8.5vw,8.4rem)] leading-[0.88] tracking-[-0.06em] text-[#faf7ef]">Furniture with a <em className="font-normal text-[#d8c69f]">lasting</em> point of view.</h1>
              <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:gap-14">
                <p className="max-w-[300px] text-[14px] leading-7 text-[#e7e2d5]/80">Bespoke pieces for considered interiors, shaped by skilled hands and made to become part of your story.</p>
                <button type="button" onClick={scrollToCollection} className="group flex w-fit items-center gap-3 border-b border-[#e1cfaa] pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#faf7ef] transition hover:gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#faf7ef] focus-visible:ring-offset-4 focus-visible:ring-offset-[#314031]">
                  Explore the collection <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <div className="mt-16 flex items-center justify-between border-t border-white/25 pt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e7e2d5]/70 lg:mt-24">
              <span>Crafted in India · Designed for everywhere</span>
              <span className="hidden items-center gap-2 sm:flex">Scroll to discover <ArrowDown size={14} strokeWidth={1.4} /></span>
            </div>
          </div>
        </section>

        <section className="border-b border-[#c9bfad]/70 bg-[#f7f3ea]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-[#c9bfad]/70 px-6 py-1 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-14">
            {[
              ["01", "Made with intent", "Furniture shaped with purpose and precision"],
              ["02", "Considered materials", "Natural timber, rich leather and tactile stone"],
              ["03", "A personal experience", "Bespoke guidance, from our studio to you"],
            ].map(([number, title, text]) => (
              <div key={number} className="flex items-center gap-4 py-5 sm:px-7 sm:py-7 first:sm:pl-0 last:sm:pr-0">
                <span className="font-display text-[18px] italic text-[#9a816b]">{number}</span>
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#364331]">{title}</p><p className="mt-1 text-[12px] text-[#8b8172]">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="collection" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-14 lg:py-36">
          <div className="flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8c654a]">
                The collection / {String(products.length).padStart(2, "0")} pieces
              </p>
              <h2 className="max-w-[660px] font-display text-[clamp(2.9rem,5.5vw,5.9rem)] leading-[0.94] tracking-[-0.05em] text-[#273326]">A room becomes <em className="font-normal text-[#8c654a]">yours</em> with the right pieces.</h2>
            </div>
              <p className="max-w-[260px] text-[13px] leading-6 text-[#7c7467] lg:pb-1">The forms we return to. Designed to bring warmth, balance and character to your interior.</p>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#c9bfad]/70 py-4">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e4b36] focus-visible:ring-offset-4 ${activeCategory === category ? "text-[#6e4b36]" : "text-[#a39a8c] hover:text-[#6e4b36]"}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </section>

        <section id="story" className="bg-[#e9e1d3]">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-14 lg:py-32">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-5 -top-5 h-24 w-24 border-l border-t border-[#8c654a]/60" />
              <img src={editorialImage} alt="Model wearing a warm neutral Atelier Noor look" className="relative aspect-[0.82] w-full object-cover object-top grayscale-[20%]" />
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f8271]">Atelier Noor / Studio 03</p>
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8c654a]">Our point of view</p>
              <blockquote className="max-w-[650px] font-display text-[clamp(2.4rem,5vw,5.2rem)] leading-[0.98] tracking-[-0.05em] text-[#273326]">“The finest rooms are built around what feels unmistakably yours.”</blockquote>
              <div className="mt-10 grid max-w-[520px] gap-8 border-t border-[#b9ab98] pt-7 sm:grid-cols-2">
                <p className="text-[13px] leading-7 text-[#756e61]">We believe in the quiet confidence of furniture made well: the hand-feel of honest materials, the grace of proportion, the pleasure of finding a favourite again.</p>
                <p className="text-[13px] leading-7 text-[#756e61]">Our pieces are designed for elegant, lived-in interiors and finished by skilled makers. Every detail carries the trace of its making.</p>
              </div>
              <a href="#journal" className="mt-10 inline-flex items-center gap-3 border-b border-[#6e4b36] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] transition hover:gap-5">Read our journal <ArrowRight size={15} strokeWidth={1.5} /></a>
            </div>
          </div>
        </section>

        <section id="journal" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-14 lg:py-32">
          <div className="flex items-end justify-between border-b border-[#c9bfad]/70 pb-7">
            <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8c654a]">From the journal</p><h2 className="font-display text-[clamp(2.5rem,4vw,4.6rem)] leading-none tracking-[-0.05em] text-[#273326]">Notes on living well.</h2></div>
            <a href="#journal" className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6e4b36] sm:flex">View all <ArrowRight size={15} strokeWidth={1.5} /></a>
          </div>
          <div className="grid gap-0 sm:grid-cols-3">
            {[
              ["01 / 09 / 26", "The beauty of a daily ritual", "A few small ways to make the everyday feel more considered."],
              ["22 / 08 / 26", "On collecting slowly", "Why the things we keep should have room to become ours."],
              ["04 / 08 / 26", "Inside the Noor studio", "A morning with our makers, materials and the light of Jaipur."],
            ].map(([date, title, text], index) => (
              <a href="#journal" key={title} className={`group border-b border-[#c9bfad]/70 py-8 sm:border-b-0 sm:py-10 ${index > 0 ? "sm:border-l sm:pl-7" : "sm:pr-7"}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a816b]">{date}</p>
                <h3 className="mt-7 max-w-[240px] font-display text-[27px] leading-[1.04] text-[#273326] transition group-hover:text-[#8c654a]">{title}</h3>
                <p className="mt-4 max-w-[260px] text-[13px] leading-6 text-[#857b6c]">{text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6e4b36] transition group-hover:gap-4">Read story <ArrowRight size={14} strokeWidth={1.5} /></span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#273326] text-[#f5f1e8]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-14 lg:py-28">
          <div className="grid gap-14 border-b border-white/20 pb-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10">
            <div>
              <img src="/img/tw-logo.png" alt="TouchWorth" className="mb-8 h-24 w-auto object-contain brightness-0 invert opacity-95" />
              <p className="mb-6 font-display text-[22px] italic text-[#d8c69f]">Designed to be lived with.</p><h2 className="max-w-[420px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.94] tracking-[-0.05em]">Keep in <em className="font-normal text-[#d8c69f]">touch.</em></h2><a href="https://wa.me/9436022202" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 border-b border-[#d8c69f] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5f1e8] transition hover:gap-5">Start a conversation <ArrowRight size={15} strokeWidth={1.5} /></a></div>
            <div><p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c69f]">Explore</p><div className="flex flex-col gap-4 text-[13px] text-[#c6c1b5]"><a href="#collection" className="transition hover:text-white">The edit</a><a href="#story" className="transition hover:text-white">Our story</a><a href="#journal" className="transition hover:text-white">Journal</a></div></div>
            <div><p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c69f]">Visit</p><div className="text-[13px] leading-7 text-[#c6c1b5]">TouchWorth Studio<br />Jaipur, Rajasthan 302004<br />India</div></div>
            <div><p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8c69f]">Stay awhile</p><p className="max-w-[260px] text-[13px] leading-6 text-[#c6c1b5]">Occasional notes on objects, rituals and the art of the everyday.</p><form className="mt-5 flex border-b border-white/40" onSubmit={(event) => event.preventDefault()}><input type="email" aria-label="Email address" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-3 text-[12px] text-white outline-none placeholder:text-[#8e9588]" /><button type="submit" aria-label="Subscribe"><ArrowRight size={17} strokeWidth={1.5} /></button></form></div>
          </div>
          <div className="flex flex-col justify-between gap-5 pt-6 text-[10px] uppercase tracking-[0.17em] text-[#8e9588] sm:flex-row">
            <p>© 2026 TouchWorth Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#top" className="transition hover:text-white">Privacy</a>
              <a href="#top" className="transition hover:text-white">Terms</a>
              <Link href="/admin" className="transition hover:text-[#d8c69f] flex items-center gap-1 text-[#c6c1b5]">
                <Shield size={11} /> Admin Portal
              </Link>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="TouchWorth on Instagram" className="transition hover:text-white">
                <Instagram size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
