import { Link } from "wouter";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Product } from "@/data/mockDatabase";
import { getWhatsappUrl } from "@/data/mockDatabase";

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <div className="product-image-wrap relative aspect-[0.82] overflow-hidden bg-[#e5dfd0]">
        <Link
          href={`/product/${product.id}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#273326]"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.image_url}
            alt={product.name}
            loading={index > 1 ? "lazy" : "eager"}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1f2a20]/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f8f4ec]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-[#29362a]/50 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          {product.badge && (
            <span className="border border-white/60 bg-[#29362a]/50 px-3 py-1.5 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>
        <a
          href={getWhatsappUrl(product)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Inquire about ${product.name} on WhatsApp`}
          className="absolute bottom-4 left-4 right-4 z-10 flex translate-y-3 items-center justify-between bg-[#6e4b36] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fbf8f1] opacity-0 shadow-xl transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbf8f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6e4b36] active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            <MessageCircle size={15} strokeWidth={1.7} />
            Inquire on WhatsApp
          </span>
          <ArrowUpRight size={15} strokeWidth={1.7} />
        </a>
      </div>
      <div className="flex flex-1 flex-col border-b border-[#b6aa96]/50 py-5">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#857b69]">{product.category}</p>
          <p className="font-display text-[16px] text-[#2d392c]">{product.price}</p>
        </div>
        <h3 className="font-display text-[24px] leading-[1.1] text-[#273326]">
          <Link
            href={`/product/${product.id}`}
            className="transition hover:text-[#8c654a] focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 max-w-[32ch] text-[13px] leading-6 text-[#756e61] line-clamp-3">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <Link
            href={`/product/${product.id}`}
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6e4b36] transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e4b36] focus-visible:ring-offset-4"
          >
            View piece details <ArrowUpRight size={14} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </article>
  );
}
