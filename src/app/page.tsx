import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import ReturnCTA from "@/components/ReturnCTA";
import AIBanner from "@/components/AIBanner";
import SearchBrowse from "@/components/SearchBrowse";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Hero />
        <Brands />
        <Features />
        <Services />
        <Reviews />
        <ReturnCTA />
        <AIBanner />
        <SearchBrowse />
      </main>
      <Footer />
    </>
  );
}
