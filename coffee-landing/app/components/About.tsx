import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text content */}
        <div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
            Our Story
          </h2>
          <p className="max-w-prose leading-relaxed text-base md:text-lg">
            We believe in the ritual of great coffee. From sourcing the finest
            beans to perfecting our roast, every cup tells a story of craft
            and care. Our space is designed to be your third place - somewhere
            between home and work where you can slow down, savor the moment,
            and connect.
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden">
          <Image
            src="/about-coffee.svg"
            alt="Interior of coffee shop with warm lighting"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
