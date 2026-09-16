import { products } from "@/data/products";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Products",
  description: "Paid digital research products from Research With Sabbir.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <section className="container-page py-16">
      <p className="label-eyebrow">Digital Products</p>
      <h1 className="mt-2 max-w-2xl font-serif text-3xl text-paper">
        Research products you can put to work today
      </h1>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-paper-dim">
        Structured research, templates and competitive intelligence, ready to
        buy and use. Checkout happens outside this site.
      </p>

      {products.length === 0 ? (
        <p className="mt-10 text-sm text-paper-dim">
          No products yet — add items in data/products.ts.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between border border-line bg-ink-soft p-5"
            >
              <div>
                <Badge>{product.category}</Badge>
                <h2 className="mt-3 font-serif text-xl text-paper">
                  {product.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {product.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-lg text-gold">
                  {product.price}
                </span>
                <Button href={product.checkoutUrl} external>
                  Buy now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
