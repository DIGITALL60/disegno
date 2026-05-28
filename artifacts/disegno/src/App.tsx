import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { PenTool, Gem, Hammer, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── Google Drive image helper ─────────────────────────────── */
const D = (id: string, sz = "w1600") =>
  `https://drive.google.com/thumbnail?id=${id}&sz=${sz}`;

/* ─── Drive folder IDs ──────────────────────────────────────── */
const FOLDER1_IDS = [
  "11MGAFRNJRPKEeKN5OhrCrJprYC3DSs_3",
  "12SwnYwDm4QBv4AjKDfcDeyF9dLq6MTGX",
  "1INqtgmMzKPMPJ8nXM6yC43hGB6rQ6gLt",
  "1JbndqBSI41C2dUjNbRQTJpilS4Q4UK8V",
  "1jU3dJ1ABI5s8CZ3QtfdgjcbMuMjSRrgB",
  "1Mv12HRkegILVYjAuvd3Cl8IijKSePiNW",
  "1t9breUfPtzHrM6eBDMn9Cl3uGVUgpBKN",
  "1wQjH7yep4GoYDWrMz1i299hhkxUrTwTk",
  "1wyyXW6Ov8Bm4K-2ZtzeFrLJ1dL31UCcq",
  "1xqOPvNs3PaUxSdhp0fKm0-kVgSCPXFh8",
];

const FOLDER2_IDS = [
  "10pJrqem_weqkNQf-CAQvO00bSsXI3OiJ",
  "10T0M-n3UmGMvIQ5E5xJM5zNDwfvNXMTq",
  "10wsyk9X3OflT6vfvxAgzbLhREOFjvNMp",
  "1628sT4beTxHq1layOEdZ1DZRFiT8tSt1",
  "17hhJATbBjcKRcKkgj5EX-AagiYPrijNF",
  "1An6ebdO5pthCaxxfdYqjagq2Pu8bckFs",
  "1_balOUSLCp7NAoy-chwrAvIWwxGzNXmm",
  "1D1X0xytY1bWdXcH5vacQBJTAr3Qx3H14",
  "1d5oLv-81VZh99ezv55b7EugeBpoZbpXA",
  "1Dc7C7Wlw5E0PkO16w2ljNH0Yjc525YmL",
  "1Embieg2k3Gy-84Oa_Rzvt0HPtCkAXdy6",
  "1FNKcX68Dsbton3lA7fYvpY9u7ILS_4u6",
  "1fxJumF3wohG9b4K6d6rLf5742sZ21LEW",
  "1GdzFYFWwcgLCUi3Q5fnA_k7ZdeK6fQul",
  "1GwDtbwhl7Rj1MaKv_ZuXb_cftpDuyuXM",
  "1HLqLkHHBkAw-yPOzfJPlvZFzjOKJoVXJ",
  "1i4346z3I5VsNiOctK-xCfM8OifcHUe-e",
  "1J4h5dm3stkRIx-b8f9m3OLQ2Q-6dGmQP",
  "1JaSqPPS-Klak6dHhxVS5SoIpX49plWyo",
  "1jr4birc4oNf1VOZSIt_YWgT3kLYHXiOP",
];

const FOLDER3_IDS = [
  "13Ey4JF5fXU9bcYYQHrUhK7R2ENpgGqGy",
  "144jR39wjB7aPVEAcY49abr5w7FLIWKsC",
  "1-5eowomRRqP68spiJHl17MQTI-q2zofN",
  "16o5m-0M1vsK_8K6KEVgAL4o34qGmcrQC",
  "173sXyqShjmhQ5zn7upxDfGwxzxfSoVHV",
  "18xU3JDNXUurRVZ3h0_7o-mrwY0oCOIqw",
  "190zQ1NYYB0B5kN7aDdZ3l0XEVyggvzWF",
  "19OqG7v0JoMuGy2U55PVKGf33rjnPBbMF",
  "1B-dKd-8Ngc_z9l1Iw58NGEKUKnyfRjrB",
  "1bTemxe59PqEU3wpMp3POOC7314aYCGYn",
  "1bwsVUuIyOcTIJi4ZUhC4SqTV0EjERRuI",
  "1dtkxUMBI1wBmqT70KA1OA6hkQgZHXCXW",
  "1dYrfPBQtuhWCagaZoEa_0hfqET-MTMnJ",
  "1ebKdRs1EljHZTXNGDXaqlBgyv2sQjJSe",
  "1EH-AkV7o0el9hoTTXxtLDqcEA-r48n9V",
  "1ew4PWFQy9L2YXbiHinIv4oEwaKjvDzt-",
  "1FqM-m4BigBSMx6IrsEDVkYQA6-tYOZro",
  "1gDJ7-iDuMRcVBtXNery8Gyiy659NJpKf",
  "1Hkt5mXL3GXSxeu9-mKPFvJCdcf7B6tQV",
  "1hyP9NJ6eSIT5pQbOc7lwBfJHhmniZbJO",
];

/* Sections assignment */
const HERO_IMGS    = FOLDER1_IDS.map(id => D(id));               // 10 – hero carousel
const PROJECT_IMGS = FOLDER2_IDS.slice(0, 4).map(id => D(id, "w1000")); // 4 – featured projects
const HSCROLL_IMGS = FOLDER2_IDS.slice(4).map(id => D(id));     // 16 – horizontal scroll gallery
const MASONRY_IMGS = FOLDER3_IDS.slice(0, 12).map(id => D(id, "w900")); // 12 – masonry
const ABOUT_IMG    = D(FOLDER3_IDS[12], "w1200");
const REEL_IMGS    = [D(FOLDER1_IDS[0]), D(FOLDER1_IDS[1])];

/* ─── Magnetic Button ────────────────────────────────────────── */
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
  return (
    <button ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </button>
  );
}

/* ─── Split text helper ──────────────────────────────────────── */
function splitText(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="hero-char inline-block whitespace-pre">{char}</span>
  ));
}

export default function App() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);
  const hScrollRef     = useRef<HTMLDivElement>(null);
  const hScrollTrack   = useRef<HTMLDivElement>(null);

  const [loading, setLoading]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx]   = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  /* ── Logo hover ── */
  useEffect(() => {
    const el = logoRef.current; if (!el) return;
    const enter = () => {
      gsap.fromTo(".nav-logo-char", { y: 0 }, { y: -9, duration: 0.22, stagger: { each: 0.055, from: "start" }, ease: "power2.out", yoyo: true, repeat: 1 });
      gsap.to(".nav-sub", { letterSpacing: "0.45em", duration: 0.4, ease: "power2.out" });
    };
    const leave = () => gsap.to(".nav-sub", { letterSpacing: "0.2em", duration: 0.5, ease: "power2.inOut" });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, []);

  /* ── Hero carousel auto-advance ── */
  useEffect(() => {
    if (loading || heroPaused) return;
    const t = setInterval(() => setHeroIdx(p => (p + 1) % HERO_IMGS.length), 5000);
    return () => clearInterval(t);
  }, [loading, heroPaused]);

  /* ── Hero carousel GSAP crossfade ── */
  useEffect(() => {
    if (loading) return;
    gsap.utils.toArray<HTMLElement>(".hero-slide").forEach((slide, i) => {
      gsap.to(slide, { opacity: i === heroIdx ? 1 : 0, duration: 1.4, ease: "power2.inOut" });
    });
  }, [heroIdx, loading]);

  /* ── Main GSAP animations ── */
  useGSAP(
    () => {
      /* Loader */
      const tl = gsap.timeline({ onComplete: () => { setLoading(false); ScrollTrigger.refresh(); } });
      tl.to("#loader-svg-path", { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
        .to("#loader-logo", { opacity: 1, duration: 0.1 })
        .fromTo(".loader-logo-char", { y: 22, opacity: 0, rotateX: -60 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.07, ease: "back.out(2)" })
        .fromTo(".loader-sub", { opacity: 0, letterSpacing: "0.6em" }, { opacity: 1, letterSpacing: "0.3em", duration: 0.7, ease: "power3.out" }, "-=0.3")
        .to("#loader-curtain", { y: "-100%", duration: 1.2, ease: "expo.inOut" })
        .fromTo("#main-nav", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8")
        .fromTo(".nav-logo-char", { y: 22, opacity: 0, rotateX: -60 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.07, ease: "back.out(2)" }, "-=0.6")
        .fromTo(".nav-sub", { opacity: 0, letterSpacing: "0.6em" }, { opacity: 1, letterSpacing: "0.2em", duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-char", { y: -60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, ease: "power4.out", duration: 1 }, "-=0.5")
        .fromTo("#hero-right-panel", { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.2");

      /* Logo shimmer */
      gsap.fromTo(".nav-shimmer-line", { x: "-200%" }, { x: "300%", duration: 0.75, ease: "power1.inOut", repeat: -1, repeatDelay: 4, delay: 3.2 });

      /* Nav scroll bg */
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          const nav = document.getElementById("main-nav");
          if (!nav) return;
          if (self.direction === 1) { nav.classList.add("bg-[#0D0D0D]", "backdrop-blur-md"); nav.classList.remove("bg-transparent"); }
          else if (self.progress === 0) { nav.classList.remove("bg-[#0D0D0D]", "backdrop-blur-md"); nav.classList.add("bg-transparent"); }
        },
      });

      /* Features bar */
      gsap.fromTo(".feature-item", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, scrollTrigger: { trigger: "#features-bar", start: "top 85%", invalidateOnRefresh: true } });

      /* Featured projects */
      gsap.fromTo("#featured-large", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: "#featured-projects", start: "top 75%", invalidateOnRefresh: true } });
      gsap.fromTo(".featured-small", { x: 80, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.2, duration: 1, scrollTrigger: { trigger: "#featured-projects", start: "top 75%", invalidateOnRefresh: true } });

      /* About parallax */
      gsap.to("#about-image", { y: -100, ease: "none", scrollTrigger: { trigger: "#about-section", start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true } });
      gsap.fromTo("#about-text", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: "#about-section", start: "top 70%", invalidateOnRefresh: true } });

      /* Horizontal scroll gallery */
      if (hScrollRef.current && hScrollTrack.current) {
        const track = hScrollTrack.current;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: hScrollRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        /* Each panel reveals with slight scale */
        gsap.utils.toArray<HTMLElement>(".hscroll-panel").forEach((panel, i) => {
          if (i === 0) return;
          gsap.fromTo(panel.querySelector("img"),
            { scale: 1.08 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: hScrollRef.current, start: "top top", end: () => `+=${track.scrollWidth - window.innerWidth}`, scrub: 1, invalidateOnRefresh: true } }
          );
        });
      }

      /* Gallery masonry items */
      gsap.utils.toArray(".gallery-item").forEach((el: any) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", invalidateOnRefresh: true } });
      });

      /* Showcase text */
      gsap.fromTo(".video-text", { x: -60, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#video-section", start: "top 70%", invalidateOnRefresh: true } });

      /* Material cards */
      gsap.fromTo(".material-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: "#materials-section", start: "top 80%", invalidateOnRefresh: true } });

      /* Testimonials */
      gsap.fromTo(".testimonial-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: "#testimonials-section", start: "top 80%", invalidateOnRefresh: true } });

      /* Footer line */
      gsap.to("#footer-line", { scaleX: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: "footer", start: "top 90%", invalidateOnRefresh: true } });
    },
    { scope: containerRef }
  );

  const PROJECT_LABELS = [
    { name: "Living Moderno", cat: "RESIDENCIAL" },
    { name: "Local Comercial", cat: "COMERCIAL" },
    { name: "Suite Premium", cat: "RESIDENCIAL" },
    { name: "Oficinas MT", cat: "COMERCIAL" },
  ];

  const HSCROLL_LABELS = HSCROLL_IMGS.map((_, i) => `Proyecto ${String(i + 1).padStart(2, "0")}`);

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen">

      {/* ── LOADER ── */}
      <div id="loader-curtain" className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <path id="loader-svg-path" d="M 20 20 L 50 20 C 70 20 80 35 80 50 C 80 65 70 80 50 80 L 20 80 Z" stroke="#C8822A" strokeWidth="2" strokeDasharray="250" strokeDashoffset="250" />
          </svg>
          <div id="loader-logo" className="mt-6 opacity-0 text-center">
            <div className="flex justify-center leading-none" style={{ perspective: "300px" }}>
              {Array.from("Disegno").map((char, i) => (
                <span key={i} className="loader-logo-char inline-block font-serif text-2xl tracking-widest text-white" style={{ display: "inline-block" }}>{char}</span>
              ))}
            </div>
            <div className="loader-sub text-[10px] font-sans text-primary mt-2" style={{ letterSpacing: "0.6em", opacity: 0 }}>MOBILIARIO</div>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav id="main-nav" className="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent py-4 px-6 md:px-12 flex justify-between items-center">
        <div ref={logoRef} id="nav-logo" className="flex flex-col cursor-pointer relative">
          <div className="nav-shimmer absolute inset-0 pointer-events-none overflow-hidden">
            <div className="nav-shimmer-line absolute inset-y-0 w-6" style={{ background: "linear-gradient(90deg, transparent, rgba(200,130,42,0.5), rgba(255,220,150,0.7), rgba(200,130,42,0.5), transparent)", transform: "skewX(-15deg)", left: 0 }} />
          </div>
          <div className="flex leading-none" style={{ perspective: "300px" }}>
            {Array.from("Disegno").map((char, i) => (
              <span key={i} className="nav-logo-char inline-block font-serif text-xl tracking-wider text-primary" style={{ willChange: "transform" }}>{char}</span>
            ))}
          </div>
          <span className="nav-sub font-sans text-[9px] text-foreground mt-1 block" style={{ letterSpacing: "0.2em" }}>MOBILIARIO</span>
        </div>

        <div className="hidden md:flex gap-8 items-center font-sans font-light text-xs tracking-widest uppercase">
          {["INICIO", "NOSOTROS", "SERVICIOS", "PROYECTOS", "MATERIALES", "CONTACTO"].map((link) => (
            <a key={link} href="#" className="relative group hover:text-primary transition-colors">
              {link}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <button className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-[#0D0D0D] transition-colors duration-300">
            <FaWhatsapp size={18} />
          </button>
        </div>

        <button className="md:hidden text-white z-50 relative" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 w-full bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`h-0.5 w-full bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`h-0.5 w-full bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#0D0D0D] z-40 flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-8 text-center font-serif text-3xl">
          {["INICIO", "NOSOTROS", "SERVICIOS", "PROYECTOS", "MATERIALES", "CONTACTO"].map((link) => (
            <a key={link} href="#" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>{link}</a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO — AUTO-CAROUSEL con Google Drive
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative h-[100dvh] w-full overflow-hidden flex items-center px-6 md:px-12"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        {/* Background slides */}
        {HERO_IMGS.map((url, i) => (
          <div
            key={i}
            className="hero-slide absolute inset-0 z-0 transition-none"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <img src={url} alt="" className="w-full h-full object-cover animate-ken-burns" loading={i < 2 ? "eager" : "lazy"} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/30" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12 pt-20">
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-primary block"></span>
              <span className="text-primary font-sans text-xs tracking-[0.3em] uppercase">DISEGNO MOBILIARIO</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif text-white leading-[1.1] mb-2">
              <div className="block">{splitText("Diseñamos espacios.")}</div>
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-[70px] font-serif italic text-primary leading-[1.1] mb-8">
              <div className="block">{splitText("Creamos experiencias.")}</div>
            </h2>
            <p className="font-sans font-light text-foreground/80 max-w-lg mb-10 text-lg">
              Mobiliario a medida con diseño, calidad y funcionalidad para transformar tus ambientes.
            </p>
            <MagneticButton className="relative group overflow-hidden border border-primary text-white px-8 py-4 text-sm tracking-widest uppercase flex items-center gap-3 w-max">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">VER PROYECTOS</span>
              <ArrowRight size={16} className="relative z-10 group-hover:text-black transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
            </MagneticButton>
          </div>

          <div id="hero-right-panel" className="w-full md:w-1/3 bg-[#141414]/80 backdrop-blur-md p-8 border border-white/5 hidden md:block">
            <div className="flex flex-col gap-6">
              {[
                { title: "Diseño a medida", desc: "Pensado para tu espacio" },
                { title: "Calidad premium", desc: "Materiales seleccionados" },
                { title: "Funcionalidad", desc: "Estética con propósito" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 border-l border-primary/30 pl-4 hover:border-primary transition-colors">
                  <span className="text-white font-serif text-xl">{item.title}</span>
                  <span className="text-muted-foreground font-sans text-sm font-light">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {HERO_IMGS.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`transition-all duration-400 rounded-full ${i === heroIdx ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* Hero arrows */}
        <button
          onClick={() => setHeroIdx(p => (p - 1 + HERO_IMGS.length) % HERO_IMGS.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setHeroIdx(p => (p + 1) % HERO_IMGS.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronRight size={18} />
        </button>

        {/* Slide counter */}
        <div className="absolute bottom-8 right-8 z-10 font-sans text-xs tracking-widest text-white/40">
          {String(heroIdx + 1).padStart(2, "0")} / {String(HERO_IMGS.length).padStart(2, "0")}
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <section id="features-bar" className="bg-[#141414] py-16 px-6 md:px-12 border-b border-[#2A2520]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {[
            { icon: PenTool, title: "Diseño Personalizado", desc: "Adaptado a tu visión" },
            { icon: Gem, title: "Materiales Premium", desc: "Selección rigurosa" },
            { icon: Hammer, title: "Fabricación Propia", desc: "Control de calidad" },
            { icon: Users, title: "Asesoramiento Integral", desc: "Acompañamiento total" },
          ].map((feature, i) => (
            <div key={i} className="feature-item flex flex-col items-start gap-4 lg:border-r border-[#2A2520] last:border-r-0 lg:pr-8">
              <div className="text-primary"><feature.icon size={32} strokeWidth={1.5} /></div>
              <div>
                <h3 className="text-white font-sans text-sm tracking-widest uppercase mb-2">{feature.title}</h3>
                <p className="text-muted-foreground font-sans font-light text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURED PROJECTS — Google Drive images
      ══════════════════════════════════════════════════════════ */}
      <section id="featured-projects" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Espacios que hablan de vos.</h2>
            <div className="w-24 h-[1px] bg-primary"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div id="featured-large" className="w-full lg:w-[60%] h-[500px] lg:h-[700px] relative group overflow-hidden">
              <img src={PROJECT_IMGS[0]} alt={PROJECT_LABELS[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <div className="text-primary font-sans text-xs tracking-widest uppercase mb-2">{PROJECT_LABELS[0].cat}</div>
                <h3 className="text-3xl font-serif text-white">{PROJECT_LABELS[0].name}</h3>
              </div>
            </div>

            <div className="w-full lg:w-[40%] flex flex-col gap-6">
              {PROJECT_IMGS.slice(1).map((url, i) => (
                <div key={i} className="featured-small h-[220px] relative group overflow-hidden">
                  <img src={url} alt={PROJECT_LABELS[i + 1].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6">
                    <div className="text-primary font-sans text-[10px] tracking-widest uppercase mb-1">{PROJECT_LABELS[i + 1].cat}</div>
                    <h3 className="text-xl font-serif text-white">{PROJECT_LABELS[i + 1].name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <button className="border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
              VER TODOS LOS PROYECTOS →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about-section" className="py-24 px-6 md:px-12 bg-[#141414] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div id="about-text" className="w-full md:w-1/2">
            <div className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-6">SOBRE NOSOTROS</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-[1.2]">Más de 10 años transformando espacios en Córdoba.</h2>
            <p className="font-sans font-light text-muted-foreground text-lg leading-relaxed mb-12">
              Cada proyecto es único, pensado desde el primer boceto hasta la instalación final. Trabajamos con los mejores materiales y los artesanos más talentosos de la región para garantizar que cada mueble no solo sea hermoso, sino que perdure en el tiempo.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#2A2520]">
              <div><div className="text-3xl font-serif text-primary mb-2">200+</div><div className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Proyectos</div></div>
              <div><div className="text-3xl font-serif text-primary mb-2">10+</div><div className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Años</div></div>
              <div><div className="text-3xl font-serif text-primary mb-2">100%</div><div className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Satisfacción</div></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[600px] overflow-hidden">
            <img id="about-image" src={ABOUT_IMG} alt="Nuestro trabajo" className="w-full h-[120%] object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services-section" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-20">Nuestros Servicios</h2>
          <div className="flex flex-col">
            {[
              { num: "01", title: "Diseño de Interiores", desc: "Transformamos tu visión en espacios habitables y estéticamente únicos." },
              { num: "02", title: "Mobiliario a Medida", desc: "Cada pieza diseñada y fabricada específicamente para tu espacio y necesidades." },
              { num: "03", title: "Asesoramiento Integral", desc: "Te acompañamos en cada etapa, desde el concepto hasta la instalación." }
            ].map((srv, i) => (
              <div key={i} className="service-card group relative border-t border-[#2A2520] py-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 hover:bg-[#141414] transition-colors px-6 cursor-pointer">
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></span>
                <div className="text-5xl md:text-6xl font-serif text-primary/40 group-hover:text-primary transition-colors">{srv.num}</div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{srv.title}</h3>
                  <p className="text-muted-foreground font-sans font-light text-lg">{srv.desc}</p>
                </div>
                <div className="hidden md:block">
                  <ArrowRight size={24} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            ))}
            <div className="border-t border-[#2A2520]"></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GALERÍA MASONRY — Google Drive images
      ══════════════════════════════════════════════════════════ */}
      <section id="gallery-section" className="py-24 px-6 md:px-12 bg-[#141414]">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-4">Nuestro trabajo habla por nosotros</h2>
        <p className="text-center text-muted-foreground font-sans text-sm tracking-widest uppercase mb-16">Galería de proyectos reales</p>
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {MASONRY_IMGS.map((url, i) => (
            <div key={i} className="gallery-item break-inside-avoid relative group overflow-hidden rounded-sm" style={{ opacity: 0 }}>
              <img src={url} alt={`Proyecto ${i + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1.5px rgba(200,130,42,0.5)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GALERÍA HORIZONTAL SCROLL-PINNED — 16 imágenes Drive
          Al scrollear hacia abajo, las fotos avanzan de a una
      ══════════════════════════════════════════════════════════ */}
      <section ref={hScrollRef} id="hscroll-section" className="bg-black">
        {/* Header visible antes de entrar al pin */}
        <div ref={hScrollTrack} className="flex will-change-transform">
          {HSCROLL_IMGS.map((url, i) => (
            <div
              key={i}
              className="hscroll-panel relative flex-shrink-0 overflow-hidden"
              style={{ width: "100vw", height: "100vh" }}
            >
              <img
                src={url}
                alt={HSCROLL_LABELS[i]}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 pointer-events-none" />

              {/* Panel info */}
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-primary font-sans text-[10px] tracking-[0.3em] uppercase mb-3">DISEGNO MOBILIARIO</div>
                    <h3 className="text-3xl md:text-5xl font-serif text-white">{HSCROLL_LABELS[i]}</h3>
                  </div>
                  {/* Slide counter */}
                  <div className="text-right">
                    <div className="text-6xl font-serif text-white/10 leading-none">{String(i + 1).padStart(2, "0")}</div>
                    <div className="text-white/40 font-sans text-xs tracking-widest">/ {String(HSCROLL_IMGS.length).padStart(2, "0")}</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-6 h-[1px] bg-white/10 relative">
                  <div className="absolute left-0 top-0 h-full bg-primary transition-none" style={{ width: `${((i + 1) / HSCROLL_IMGS.length) * 100}%` }} />
                </div>
              </div>

              {/* Scroll hint (first panel) */}
              {i === 0 && (
                <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col items-center gap-3 text-white/50">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase rotate-90 origin-center translate-y-8">Scroll</span>
                  <div className="w-[1px] h-16 bg-white/20 mt-8">
                    <div className="w-full bg-primary animate-[scrollDown_1.5s_ease-in-out_infinite]" style={{ height: "40%" }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOWCASE / REELS ── */}
      <section id="video-section" className="relative w-full overflow-hidden bg-black" style={{ minHeight: "90vh" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-20 py-24 md:py-0" style={{ minHeight: "90vh" }}>
          <div className="flex-1 text-left order-2 md:order-1">
            <p className="text-primary font-sans text-xs tracking-[0.35em] uppercase mb-8">Diseño sin compromisos</p>
            <h2 className="video-text text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-3">Cada <span className="italic text-primary">detalle.</span></h2>
            <h2 className="video-text text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-3">Cada <span className="italic text-primary">espacio.</span></h2>
            <h2 className="video-text text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-12">Cada <span className="italic text-primary">historia.</span></h2>
            <a href="#contact" className="inline-block border border-primary/60 text-white font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-primary hover:text-black transition-all duration-300">
              Comenzar proyecto
            </a>
          </div>

          <div className="flex-shrink-0 order-1 md:order-2 flex gap-5 items-end">
            {[
              { code: "DTtl_2bjjyl", thumb: REEL_IMGS[0], label: "Proyecto residencial", offset: "0px" },
              { code: "DPMDqR0Dk-B", thumb: REEL_IMGS[1], label: "Proceso artesanal", offset: "48px" },
            ].map(({ code, thumb, label, offset }) => (
              <div key={code} className="w-[185px] lg:w-[210px]" style={{ marginTop: offset }}>
                <a href={`https://www.instagram.com/reel/${code}/`} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative overflow-hidden shadow-2xl shadow-black/60" style={{ borderRadius: "28px", border: "1.5px solid rgba(200,130,42,0.35)", aspectRatio: "9/16" }}>
                    <img src={thumb} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 0 40px rgba(200,130,42,0.25) inset" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(200,130,42,0.90)", backdropFilter: "blur(4px)", boxShadow: "0 0 24px rgba(200,130,42,0.5)" }}>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="white"><path d="M0 0 L18 10 L0 20 Z" /></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FaInstagram size={10} className="text-primary" />
                        <span className="font-sans text-[9px] tracking-[0.15em] text-primary uppercase">@disegno.mobiliario</span>
                      </div>
                      <p className="font-serif text-white text-sm italic">{label}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
      </section>

      {/* ── MATERIALS ── */}
      <section id="materials-section" className="py-24 px-6 md:px-12 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-16">Trabajamos con los mejores materiales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Madera de Roble", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", desc: "Calidez y durabilidad excepcional." },
              { name: "Mármol Carrara", img: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400", desc: "Elegancia atemporal y sofisticación." },
              { name: "Acero Inoxidable", img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7dfa?w=400", desc: "Acabados modernos y resistencia." },
              { name: "Vidrio Templado", img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=400", desc: "Transparencia y seguridad absoluta." }
            ].map((mat, i) => (
              <div key={i} className="material-card flex flex-col bg-background/50 border border-[#2A2520] hover:border-primary/50 transition-colors">
                <div className="h-48 overflow-hidden">
                  <img src={mat.img} alt={mat.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-white mb-2">{mat.name}</h3>
                  <p className="font-sans font-light text-muted-foreground text-sm">{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials-section" className="py-24 px-6 md:px-12 bg-[#141414] border-t border-[#2A2520]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { quote: "El equipo de Disegno transformó completamente nuestro living. La calidad de los muebles es excepcional.", author: "María González, Córdoba" },
              { quote: "Profesionales de otra categoría. Desde el diseño hasta la instalación, todo impecable.", author: "Carlos Méndez, Buenos Aires" },
              { quote: "Nuestro local quedó increíble. Los clientes siempre preguntan quién nos lo diseñó.", author: "Restaurant Luma, Córdoba" }
            ].map((t, i) => (
              <div key={i} className="testimonial-card relative px-6 py-8 border border-[#2A2520] bg-background/30">
                <div className="absolute -top-6 left-6 text-6xl font-serif text-primary opacity-50">"</div>
                <p className="font-sans font-light text-foreground text-lg italic mb-6 relative z-10">{t.quote}</p>
                <p className="font-sans text-primary text-sm tracking-widest uppercase">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact-section" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">Hablemos de tu proyecto</h2>
            <form className="flex flex-col gap-8">
              {["Nombre", "Email", "Teléfono"].map((field) => (
                <div key={field} className="relative group">
                  <input type={field === "Email" ? "email" : "text"} placeholder={field} className="w-full bg-transparent border-b border-[#2A2520] py-4 text-white placeholder-muted-foreground font-sans font-light focus:outline-none focus:border-transparent transition-colors peer" />
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 peer-focus:scale-x-100 origin-left transition-transform duration-300"></span>
                </div>
              ))}
              <div className="relative group">
                <textarea placeholder="Mensaje" rows={4} className="w-full bg-transparent border-b border-[#2A2520] py-4 text-white placeholder-muted-foreground font-sans font-light focus:outline-none focus:border-transparent transition-colors peer resize-none"></textarea>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 peer-focus:scale-x-100 origin-left transition-transform duration-300"></span>
              </div>
              <MagneticButton className="hover-clip-path-bottom relative bg-transparent border border-primary text-white py-5 mt-4 text-sm tracking-widest uppercase font-sans font-semibold overflow-hidden group">
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">ENVIAR CONSULTA</span>
                <div className="clip-path-bottom absolute inset-0 bg-primary" />
              </MagneticButton>
            </form>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:pl-16">
            <div><h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">DIRECCIÓN</h3><p className="font-serif text-2xl text-white">Córdoba, Argentina</p></div>
            <div><h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">WHATSAPP</h3><p className="font-serif text-2xl text-white">+54 9 351 000-0000</p></div>
            <div><h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">INSTAGRAM</h3><p className="font-serif text-2xl text-white">@disegno.mobiliario</p></div>
            <div><h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">HORARIOS</h3><p className="font-sans font-light text-lg text-muted-foreground">Lun-Vie 9:00 - 18:00</p></div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0A] pt-16 pb-8 border-t border-[#2A2520] relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0" id="footer-line"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl tracking-wider leading-none text-primary">Disegno</span>
            <span className="font-sans text-[10px] tracking-[0.3em] text-foreground mt-2">MOBILIARIO</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs font-sans tracking-widest uppercase text-muted-foreground">
            {["INICIO", "NOSOTROS", "SERVICIOS", "PROYECTOS", "MATERIALES", "CONTACTO"].map((link) => (
              <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex gap-6 text-white">
            <a href="#" className="hover:text-primary transition-colors"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaWhatsapp size={24} /></a>
          </div>
          <div className="text-[#8A8580] font-sans text-xs font-light mt-8">© 2025 Disegno Mobiliario · Córdoba, Argentina</div>
        </div>
      </footer>

      {/* ── FLOATING CTA ── */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-black/50 group">
          <div className="absolute inset-[-10px]">
            <svg viewBox="0 0 100 100" width="100" height="100" className="animate-[spin_8s_linear_infinite]">
              <defs><path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
              <text fontSize="11" fill="hsl(var(--primary))" letterSpacing="2" className="font-sans font-semibold uppercase">
                <textPath href="#circle">DISEGNO · MOBILIARIO · CONTACTO ·</textPath>
              </text>
            </svg>
          </div>
          <FaWhatsapp size={32} className="relative z-10" />
        </button>
      </div>

    </div>
  );
}
