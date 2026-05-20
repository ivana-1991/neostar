/* ─────────────────────────────────────────────────────────
   Neostar – Hero page
   Figma canvas: 1600 × 900 px
   Colors: gradient #7FE5FF → #4280EF (117.29°)
   Logo: "NEOSTAR" wordmark in 5 SVG parts (public/assets/)
   Hero deco: star shape, right side, opacity 10%
───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(117.29deg, #7FE5FF 5.19%, #4280EF 81.07%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Decorative star – right side, full height, 10% opacity ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "54%",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-image.svg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left center" }}
        />
      </div>

      {/* ── Left content column ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingLeft: "clamp(24px, 5.3125vw, 85px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
          paddingTop: "clamp(48px, 8vh, 80px)",
          paddingBottom: "clamp(48px, 8vh, 80px)",
          maxWidth: "clamp(300px, 50%, 740px)",
        }}
      >
        {/* NEOSTAR wordmark – 5 SVG pieces in a scaled container */}
        <div
          role="img"
          aria-label="Neostar"
          style={{
            position: "relative",
            width: "clamp(220px, 37.5vw, 600px)",
            aspectRatio: "600 / 102",
            overflow: "hidden",
            marginBottom: "clamp(16px, 4.4vh, 40px)",
          }}
        >
          {/* NE */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/vector.svg" alt="" aria-hidden="true"
            style={{ position: "absolute", inset: "1.87% 72.51% 2% 0", width: "auto", height: "auto" }} />
          {/* O */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mask-group-1.svg" alt="" aria-hidden="true"
            style={{ position: "absolute", inset: "0.15% 55.7% 0.27% 28.86%", width: "auto", height: "auto" }} />
          {/* S */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mask-group-2.svg" alt="" aria-hidden="true"
            style={{ position: "absolute", inset: "0.15% 41.19% 0.27% 45.8%", width: "auto", height: "auto" }} />
          {/* TA */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/vector-2.svg" alt="" aria-hidden="true"
            style={{ position: "absolute", inset: "1.87% 14.42% 2% 59.46%", width: "auto", height: "auto" }} />
          {/* R */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mask-group-3.svg" alt="" aria-hidden="true"
            style={{ position: "absolute", inset: "1.87% -0.06% 2% 87.23%", width: "auto", height: "auto" }} />
        </div>

        {/* "AI prodajni savjetnik" – Figma: 56px Bold, white */}
        <p
          style={{
            margin: 0,
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "clamp(22px, 3.5vw, 56px)",
            lineHeight: 1.2,
            fontFamily: "Inter, sans-serif",
            letterSpacing: 0,
          }}
        >
          AI prodajni savjetnik
        </p>
      </div>
    </div>
  );
}
