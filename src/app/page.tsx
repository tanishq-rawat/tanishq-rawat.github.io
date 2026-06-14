import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Backdrop from "@/components/Backdrop";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

function Divider() {
  return (
    <div className="container-page" aria-hidden>
      <div className="circuit-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Backdrop />
      <Navbar />

      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <div className="relative z-10">
        <main id="main">
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Blogs />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </div>

      <ChatbotWidget />
    </SmoothScroll>
  );
}
