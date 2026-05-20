import Image from "next/image";

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: "linear-gradient(117.29deg, #7FE5FF 5.19%, #4280EF 81.07%)" }}
    >
      {/* Hero decorative shape – right side */}
      <div className="absolute right-0 top-0 h-full w-[54%] pointer-events-none select-none opacity-10">
        <Image
          src="/assets/hero-image.svg"
          alt=""
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 sm:px-16 lg:px-24 py-16 flex flex-col gap-8">

        {/* NEOSTAR logo – 5 SVG parts side by side */}
        <div className="flex items-center" style={{ height: "clamp(48px, 8vw, 102px)", gap: "clamp(3px, 0.5vw, 8px)" }}>
          {/* NE */}
          <div className="relative flex-none" style={{ height: "100%", aspectRatio: "164.959 / 98.0506" }}>
            <Image src="/assets/vector.svg" alt="NE" fill className="object-contain" />
          </div>
          {/* O */}
          <div className="relative flex-none" style={{ height: "100%", aspectRatio: "92.6816 / 101.572" }}>
            <Image src="/assets/mask-group-1.svg" alt="O" fill className="object-contain" />
          </div>
          {/* S */}
          <div className="relative flex-none" style={{ height: "100%", aspectRatio: "78.0694 / 101.572" }}>
            <Image src="/assets/mask-group-2.svg" alt="S" fill className="object-contain" />
          </div>
          {/* TA */}
          <div className="relative flex-none" style={{ height: "100%", aspectRatio: "156.731 / 98.0546" }}>
            <Image src="/assets/vector-2.svg" alt="TA" fill className="object-contain" />
          </div>
          {/* R */}
          <div className="relative flex-none" style={{ height: "100%", aspectRatio: "76.9918 / 98.0546" }}>
            <Image src="/assets/mask-group-3.svg" alt="R" fill className="object-contain" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-white font-bold max-w-xl"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", lineHeight: 1.2 }}
        >
          AI prodajni savjetnik
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 max-w-md leading-relaxed" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
          Pametni asistent koji pomaže tvojim kupcima pronaći pravi proizvod u pravo vrijeme.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-fit">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#4280EF] font-semibold text-base hover:bg-white/90 transition-colors shadow-lg whitespace-nowrap"
          >
            Počni besplatno
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-base hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Saznaj više
          </a>
        </div>
      </div>
    </main>
  );
}
