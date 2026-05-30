import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { PenTool, Gem, Hammer, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── Local image imports ─────────────────────────────────────── */
import hero1 from "./assets/images/hero-1.jpg";
import hero2 from "./assets/images/hero-2.jpg";
import hero3 from "./assets/images/hero-3.jpg";
import hero4 from "./assets/images/hero-4.jpg";

import feat1 from "./assets/images/feat-1.jpg";
import feat2 from "./assets/images/feat-2.jpg";
import feat3 from "./assets/images/feat-3.jpg";
import feat4 from "./assets/images/feat-4.jpg";

import aboutImg from "./assets/images/about-2.jpg";

import scroll1 from "./assets/images/scroll-1.jpg";
import scroll2 from "./assets/images/scroll-2.jpg";
import scroll3 from "./assets/images/scroll-3.jpg";
import scroll4 from "./assets/images/scroll-4.jpg";
import scroll5 from "./assets/images/scroll-5.jpg";
import scroll6 from "./assets/images/scroll-6.jpg";
import scroll7 from "./assets/images/scroll-7.jpg";
import scroll8 from "./assets/images/scroll-8.jpg";

import mas1 from "./assets/images/mas-1.jpg";
import mas2 from "./assets/images/mas-2.jpg";
import mas3 from "./assets/images/mas-3.jpg";
import mas4 from "./assets/images/mas-4.jpg";
import mas5 from "./assets/images/mas-5.jpg";
import mas6 from "./assets/images/mas-6.jpg";
import mas7 from "./assets/images/mas-7.jpg";
import mas8 from "./assets/images/mas-8.jpg";
import mas9 from "./assets/images/mas-9.jpg";
import mas10 from "./assets/images/mas-10.jpg";
import mas11 from "./assets/images/mas-11.jpg";
import mas12 from "./assets/images/mas-12.jpg";

import reelVideo1 from "./assets/images/reel-DTtl_2bjjyl.mp4";
import reelVideo2 from "./assets/images/reel-DPMDqR0Dk-B.mp4";

/* ─── Project page images ─────────────────────────────────────── */
import projFoa       from "./assets/images/projects/foa.jpg";
import projFoa2      from "./assets/images/projects/foa-2.jpg";
import projFoa3      from "./assets/images/projects/foa-3.jpg";
import projFoa4      from "./assets/images/projects/foa-4.jpg";
import projFoa5      from "./assets/images/projects/foa-5.jpg";
import projCocina    from "./assets/images/projects/cocina.jpg";
import projCocina2   from "./assets/images/projects/cocina-2.jpg";
import projCocina3   from "./assets/images/projects/cocina-3.jpg";
import projCocina4   from "./assets/images/projects/cocina-4.jpg";
import projPilar     from "./assets/images/projects/pilar.jpg";
import projPilar2    from "./assets/images/projects/pilar-2.jpg";
import projPilar3    from "./assets/images/projects/pilar-3.jpg";
import projPilar4    from "./assets/images/projects/pilar-4.jpg";
import projLaguna    from "./assets/images/projects/laguna.jpg";
import projLaguna2   from "./assets/images/projects/laguna-2.jpg";
import projLaguna3   from "./assets/images/projects/laguna-3.jpg";
import projLaguna4   from "./assets/images/projects/laguna-4.jpg";
import projLapankana from "./assets/images/projects/lapankana.jpg";
import projLapankana2 from "./assets/images/projects/lapankana-2.jpg";
import projLapankana3 from "./assets/images/projects/lapankana-3.jpg";
import projLapankana4 from "./assets/images/projects/lapankana-4.jpg";
import projObra      from "./assets/images/projects/obra.jpg";
import projObra2     from "./assets/images/projects/obra-2.jpg";
import projObra3     from "./assets/images/projects/obra-3.jpg";
import projOficina   from "./assets/images/projects/oficina.jpg";
import projOficina2  from "./assets/images/projects/oficina-2.jpg";
import projOficina3  from "./assets/images/projects/oficina-3.jpg";
import projOficina4  from "./assets/images/projects/oficina-4.jpg";
import projVilla     from "./assets/images/projects/villa.jpg";
import projVilla2    from "./assets/images/projects/villa-2.jpg";
import projVilla3    from "./assets/images/projects/villa-3.jpg";
import projVilla4    from "./assets/images/projects/villa-4.jpg";

const HERO_IMGS = [hero1, hero2, hero3, hero4];
const PROJECT_IMGS = [feat1, feat2, feat3, feat4];
const HSCROLL_IMGS = [scroll1, scroll2, scroll3, scroll4, scroll5, scroll6, scroll7, scroll8];
const MASONRY_IMGS = [mas1, mas2, mas3, mas4, mas5, mas6, mas7, mas8, mas9, mas10, mas11, mas12];
const ABOUT_IMG = aboutImg;
const REEL_VIDEOS = [
  { src: reelVideo1, label: "Proyecto residencial" },
  { src: reelVideo2, label: "Proceso artesanal" },
];

const PROJECTS_ALL = [
  { imgs: [projFoa, projFoa2, projFoa3, projFoa4, projFoa5],               name: "Casa FOA 2026",        cat: "RESIDENCIAL" },
  { imgs: [projCocina, projCocina2, projCocina3, projCocina4],             name: "Cocina Phlaukalber",   cat: "COCINA" },
  { imgs: [projPilar, projPilar2, projPilar3, projPilar4],                 name: "Diseño Pilar",         cat: "RESIDENCIAL" },
  { imgs: [projLaguna, projLaguna2, projLaguna3, projLaguna4],             name: "Laguna Larga",         cat: "RESIDENCIAL" },
  { imgs: [projLapankana, projLapankana2, projLapankana3, projLapankana4], name: "Lapankana",            cat: "RESIDENCIAL" },
  { imgs: [projObra, projObra2, projObra3],                                name: "Obra Phlaukalber",     cat: "CONSTRUCCIÓN" },
  { imgs: [projOficina, projOficina2, projOficina3, projOficina4],         name: "Oficina Corporativa",  cat: "COMERCIAL" },
  { imgs: [projVilla, projVilla2, projVilla3, projVilla4],                 name: "Villa del Rosario",    cat: "RESIDENCIAL" },
];

/* ─── Hover-cycling Project Card ─────────────────────────────── */
function ProjectCard({ imgs, name, cat, index, onClick }: { imgs: string[]; name: string; cat: string; index: number; onClick: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = () => {
    if (imgs.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % imgs.length);
        setFading(false);
      }, 400);
    }, 900);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setFading(false);
  };

  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
      onClick={onClick}
    >
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${name} - ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            i === currentIdx ? (fading ? "opacity-0" : "opacity-100") : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Hover line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      {/* Dot indicators */}
      {imgs.length > 1 && (
        <div className="absolute top-4 left-4 flex gap-1.5">
          {imgs.map((_, i) => (
            <span
              key={i}
              className={`block h-[2px] rounded-full transition-all duration-400 ${
                i === currentIdx ? "w-5 bg-primary" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <span className="block text-primary font-sans text-[10px] tracking-[0.25em] uppercase mb-2">{cat}</span>
        <h3 className="font-serif text-white text-xl leading-tight">{name}</h3>
      </div>
      {/* Index number */}
      <div className="absolute bottom-6 right-6 font-serif text-white/10 text-4xl leading-none group-hover:text-white/20 transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ─── Magnetic Button ────────────────────────────────────────── */
function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
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
    <button ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
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

/* ─── Custom Magnetic Cursor ─────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    // Quick GSAP setter for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    
    const onMouseEnter = () => {
       gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(200, 130, 42, 0.2)", border: "0.5px solid rgba(200, 130, 42, 0.8)", duration: 0.3 });
    };
    const onMouseLeave = () => {
       gsap.to(cursor, { scale: 1, backgroundColor: "rgba(200, 130, 42, 1)", border: "none", duration: 0.3 });
    };
    
    window.addEventListener("mousemove", onMouseMove);
    
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, input, textarea, .cursor-pointer");
      els.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}

export default function App() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const logoRef        = useRef<HTMLDivElement>(null);
  const hScrollRef     = useRef<HTMLDivElement>(null);
  const hScrollTrack   = useRef<HTMLDivElement>(null);

  const [loading, setLoading]         = useState(true);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [heroIdx, setHeroIdx]           = useState(0);
  const [heroPaused, setHeroPaused]     = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_ALL[0] | null>(null);

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

      /* Horizontal scroll gallery (Desktop Only) */
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
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
      });

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
    { name: "Casa FOA", cat: "RESIDENCIAL" },
    { name: "Oficina Corporativa", cat: "COMERCIAL" },
    { name: "Lapankana", cat: "RESIDENCIAL" },
    { name: "Residencia Pilar", cat: "RESIDENCIAL" },
  ];

  const HSCROLL_LABELS = [
    "Cocina Phlaukalber",
    "Diseño Pilar",
    "Laguna Larga",
    "Lapankana",
    "Obra",
    "Oficina",
    "Pilar",
    "Villa Del Rosario"
  ];

  const NAV_LINKS = [
    { name: "INICIO", id: "#" },
    { name: "NOSOTROS", id: "#about-section" },
    { name: "SERVICIOS", id: "#services-section" },
    { name: "PROYECTOS", id: "#gallery-section" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (showProjects) {
      setShowProjects(false);
      setTimeout(() => {
        if (id === "#") window.scrollTo({ top: 0, behavior: "smooth" });
        else document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      if (id === "#") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen">
      <CustomCursor />

      {/* ════ PROJECT DETAIL VIEW (Case Study) ════ */}
      {selectedProject && (
        <div className="fixed inset-0 z-[300] bg-[#050505] overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-[#050505]/95 backdrop-blur-md border-b border-[#1A1A1A] px-6 md:px-12 h-20 flex items-center justify-between">
            <div className="flex flex-col cursor-pointer" onClick={() => { setSelectedProject(null); window.scrollTo({ top: 0 }); }}>
              <span className="font-serif text-xl tracking-wider text-primary leading-none">Disegno</span>
              <span className="font-sans text-[9px] tracking-[0.2em] text-white/60 mt-0.5">MOBILIARIO</span>
            </div>
            <button
              onClick={() => { setSelectedProject(null); window.scrollTo({ top: 0 }); }}
              className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors font-sans text-xs tracking-widest uppercase group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver a Galería</span>
            </button>
          </div>

          {/* Header */}
          <div className="px-6 md:px-12 pt-24 pb-16 max-w-5xl mx-auto text-center">
            <p className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-4">{selectedProject.cat}</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">{selectedProject.name}</h1>
            <p className="text-muted-foreground font-sans font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Cada espacio cuenta una historia única. En este proyecto, nos enfocamos en combinar materiales nobles con un diseño funcional de vanguardia, creando una atmósfera de lujo silencioso y confort absoluto.
            </p>
          </div>

          {/* Masonry Gallery */}
          <div className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {selectedProject.imgs.map((img, i) => (
                <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-lg">
                  <img src={img} alt={`${selectedProject.name} foto ${i+1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════ PROJECTS PAGE (full page overlay) ════ */}
      {showProjects && (
        <div className="fixed inset-0 z-[200] bg-[#030303] overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-[#030303]/95 backdrop-blur-md border-b border-[#1A1A1A] px-6 md:px-12 h-20 flex items-center justify-between">
            <div className="flex flex-col cursor-pointer" onClick={() => { setShowProjects(false); window.scrollTo({ top: 0 }); }}>
              <span className="font-serif text-xl tracking-wider text-primary leading-none">Disegno</span>
              <span className="font-sans text-[9px] tracking-[0.2em] text-white/60 mt-0.5">MOBILIARIO</span>
            </div>
            <button
              onClick={() => { setShowProjects(false); window.scrollTo({ top: 0 }); }}
              className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors font-sans text-xs tracking-widest uppercase group"
            >
              <span>Volver</span>
              <span className="w-6 h-[1px] bg-current transition-all group-hover:w-10" />
            </button>
          </div>

          {/* Hero title */}
          <div className="px-6 md:px-12 py-20 border-b border-[#1A1A1A]">
            <p className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-4">Portafolio Completo</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white">Todos los <span className="italic text-primary">Proyectos.</span></h1>
          </div>

          {/* Projects grid */}
          <div className="px-6 md:px-12 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
              {PROJECTS_ALL.map((proj, i) => (
                <ProjectCard
                  key={i}
                  index={i}
                  imgs={proj.imgs}
                  name={proj.name}
                  cat={proj.cat}
                  onClick={() => { setSelectedProject(proj); window.scrollTo({ top: 0 }); }}
                />
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-6 md:px-12 py-20 border-t border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-serif text-3xl md:text-5xl text-white mb-2">¿Tienes un proyecto <span className="italic text-primary">en mente?</span></p>
              <p className="text-muted-foreground font-sans font-light">Hablemos y lo hacemos realidad.</p>
            </div>
            <button
              onClick={() => {
                window.open("https://wa.me/5493513067321?text=Hola%20Disegno,%20estuve%20viendo%20su%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20por%20un%20proyecto.", "_blank");
              }}
              className="flex-shrink-0 border border-primary/60 text-white font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-primary hover:text-black transition-all duration-300"
            >
              Comenzar Proyecto
            </button>
          </div>
        </div>
      )}

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
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.id} onClick={(e) => handleNavClick(e, link.id)} className="relative group hover:text-primary transition-colors">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </a>
          ))}
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
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.id} onClick={(e) => handleNavClick(e, link.id)} className="hover:text-primary transition-colors">{link.name}</a>
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
            <img src={url} alt={`Disegno Mobiliario - Diseño de interiores y mobiliario a medida en Córdoba - imagen ${i + 1}`} className="w-full h-full object-cover animate-ken-burns" loading={i < 2 ? "eager" : "lazy"} />
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
            <h1 className="text-4xl md:text-7xl lg:text-[80px] font-serif text-white leading-[1.1] mb-2">
              <div className="block">{splitText("Diseñamos espacios.")}</div>
            </h1>
            <h2 className="text-3xl md:text-6xl lg:text-[70px] font-serif italic text-primary leading-[1.1] mb-8">
              <div className="block">{splitText("Creamos experiencias.")}</div>
            </h2>
            <p className="font-sans font-light text-foreground/80 max-w-lg mb-10 text-lg">
              Mobiliario a medida con diseño, calidad y funcionalidad para transformar tus ambientes.
            </p>
            <MagneticButton 
              className="relative group overflow-hidden border border-primary text-white px-8 py-4 text-sm tracking-widest uppercase flex items-center gap-3 w-max"
              onClick={() => {
                const el = document.querySelector("#gallery-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
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
            <button
              onClick={() => { setShowProjects(true); window.scrollTo({ top: 0 }); }}
              className="border border-primary/60 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-primary hover:text-black transition-all duration-300 flex items-center gap-3"
            >
              VER TODOS LOS PROYECTOS <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* ── ABOUT / NOSOTROS ── */}
      <section id="about-section" className="relative py-24 md:py-40 px-6 md:px-12 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
            <div className="relative rounded-[32px] overflow-hidden border border-primary/20 shadow-2xl shadow-black/80 aspect-[4/5] max-w-md mx-auto">
              <img src={ABOUT_IMG} alt="Fábrica Disegno" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-sans text-xs tracking-[0.2em] text-primary uppercase mb-2">Hecho a mano en Argentina</p>
                <p className="font-serif text-white/90 text-lg italic">"La perfección está en los detalles que no se ven a simple vista."</p>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <span className="text-primary font-sans text-xs tracking-[0.3em] uppercase block mb-6">Nuestra Historia</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">Maestros<br /><span className="italic text-primary">del oficio.</span></h2>
            <div className="space-y-6 text-muted-foreground font-sans font-light text-base md:text-lg leading-relaxed">
              <p>
                Con más de una década de experiencia, en Disegno Mobiliario nos dedicamos a la creación de espacios que inspiran. No fabricamos muebles, construimos el escenario de tu vida cotidiana.
              </p>
              <p>
                Nuestra fábrica propia nos permite controlar cada etapa del proceso, desde la selección de la madera bruta hasta el último herraje. Esta independencia es lo que nos garantiza entregar una calidad que pocos pueden igualar.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-12">
              <div>
                <div className="text-4xl font-serif text-white mb-2">+10</div>
                <div className="text-[10px] font-sans text-primary tracking-[0.2em] uppercase">Años de exp.</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-white mb-2">+500</div>
                <div className="text-[10px] font-sans text-primary tracking-[0.2em] uppercase">Proyectos</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-white mb-2">100%</div>
                <div className="text-[10px] font-sans text-primary tracking-[0.2em] uppercase">A medida</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services-section" className="py-32 px-6 md:px-12 bg-[#0A0A0A] relative border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary font-sans text-xs tracking-[0.3em] uppercase block mb-4">Experiencia Disegno</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">Nuestros Servicios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Diseño de Interiores",
                desc: "Desarrollamos proyectos integrales de arquitectura interior. Optimizamos la distribución espacial y seleccionamos cada textura para crear atmósferas que reflejen tu identidad."
              },
              {
                title: "Mobiliario a Medida",
                desc: "Diseñamos y fabricamos cada pieza en nuestra propia planta. Desde cocinas de alta gama hasta vestidores de lujo, garantizando un ajuste milimétrico y acabados perfectos."
              },
              {
                title: "Dirección y Montaje",
                desc: "No solo diseñamos; ejecutamos. Nuestro equipo de profesionales supervisa la instalación completa para asegurar que la visión original se materialice sin compromisos."
              }
            ].map((srv, i) => (
              <div key={i} className="service-card group relative p-8 md:p-12 min-h-[350px] rounded-[24px] overflow-hidden border border-[#2A2520] bg-[#0F0F0F] hover:border-primary/50 hover:bg-[#141414] transition-all duration-500 flex flex-col justify-between">
                <div className="text-primary font-serif text-6xl opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  0{i + 1}.
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 transition-colors duration-500 group-hover:text-primary">{srv.title}</h3>
                  <p className="font-sans font-light text-muted-foreground text-sm leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="py-24 px-6 md:px-12 bg-[#0A0A0A] relative border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-sans text-xs tracking-[0.3em] uppercase block mb-4">Metodología</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">Nuestro Proceso</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {[
              {
                step: "01",
                title: "Asesoramiento",
                desc: "Entendemos tu visión y relevamos el espacio para captar tus necesidades exactas."
              },
              {
                step: "02",
                title: "Diseño 3D",
                desc: "Proyectamos tu idea con renders realistas y planificación al milímetro."
              },
              {
                step: "03",
                title: "Fabricación",
                desc: "Producimos en nuestra propia planta con materiales premium y tecnología de precisión."
              },
              {
                step: "04",
                title: "Instalación",
                desc: "Montaje perfecto en tu domicilio a cargo de nuestro equipo especializado."
              }
            ].map((item, i) => (
              <div key={i} className="relative group p-6">
                {/* Connector line (desktop only) */}
                {i !== 3 && <div className="hidden md:block absolute top-12 left-[60%] w-full h-[1px] bg-[#2A2520] group-hover:bg-primary/50 transition-colors duration-500" />}
                
                <div className="relative z-10 flex flex-col md:items-center md:text-center">
                  <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#2A2520] flex items-center justify-center text-primary font-serif text-2xl mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_15px_rgba(200,130,42,0)] group-hover:shadow-[0_0_20px_rgba(200,130,42,0.15)]">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3 group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                  <p className="font-sans font-light text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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
        <div ref={hScrollTrack} className="flex flex-col md:flex-row will-change-transform">
          {HSCROLL_IMGS.map((url, i) => (
            <div
              key={i}
              className="hscroll-panel relative flex-shrink-0 overflow-hidden w-full h-[60vh] md:w-[100vw] md:h-[100vh]"
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
        {/* Fondo de lujo con gradiente oscuro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2A1B0E]/40 via-[#0A0A0A] to-black pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-16 py-24 md:py-0" style={{ minHeight: "90vh" }}>
          <div className="flex-1 text-left order-2 md:order-1">
            <p className="text-primary font-sans text-xs tracking-[0.35em] uppercase mb-8 drop-shadow-md">Diseño sin compromisos</p>
            <h2 className="video-text text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-3 text-shadow-sm">Cada <span className="italic text-primary">detalle.</span></h2>
            <h2 className="video-text text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-3 text-shadow-sm">Cada <span className="italic text-primary">espacio.</span></h2>
            <h2 className="video-text text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-12 text-shadow-sm">Cada <span className="italic text-primary">historia.</span></h2>
            <button 
              onClick={() => window.open("https://wa.me/5493513067321?text=Hola%20Disegno,%20estuve%20viendo%20su%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20por%20un%20proyecto.", "_blank")}
              className="inline-block border border-primary/60 text-white font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-primary hover:text-black transition-all duration-300"
            >
              Comenzar proyecto
            </button>
          </div>

          <div className="flex-shrink-0 order-1 md:order-2 flex flex-col md:flex-row gap-6 items-center md:items-end justify-center">
            {REEL_VIDEOS.map(({ src, label }, i) => {
              return (
                <div
                  key={i}
                  className={`relative group w-[220px] lg:w-[240px] rounded-[28px] overflow-hidden shadow-2xl shadow-black/80 ${i === 1 ? 'md:mt-12 mt-4' : ''}`}
                  style={{
                    height: "430px",
                    border: "1.5px solid rgba(200,130,42,0.35)",
                    background: "#0A0A0A",
                  }}
                >
                  <video
                    src={src}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                  {/* Play icon overlay - desaparece al hacer hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:opacity-0 transition-all duration-300" style={{ background: "rgba(200,130,42,0.90)", backdropFilter: "blur(4px)", boxShadow: "0 0 28px rgba(200,130,42,0.55)" }}>
                      <svg width="20" height="22" viewBox="0 0 18 20" fill="white"><path d="M0 0 L18 10 L0 20 Z" /></svg>
                    </div>
                  </div>
                  {/* Label inferior */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FaInstagram size={10} className="text-primary" />
                      <span className="font-sans text-[9px] tracking-[0.15em] text-primary uppercase">@disegno.mobiliario</span>
                    </div>
                    <p className="font-serif text-white text-sm italic">{label}</p>
                  </div>
                  {/* Golden glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 0 40px rgba(200,130,42,0.25) inset" }} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
      </section>


      {/* ── MAP ── */}
      <section className="relative bg-[#0A0A0A] border-t border-[#2A2520]">
        {/* Decorative header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-primary font-sans text-xs tracking-[0.3em] uppercase block mb-3">Dónde encontrarnos</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">A. Yofre de Álvarez,<br /><span className="italic text-primary">Costa Sacate, Córdoba.</span></h2>
          </div>
          <div className="flex flex-col gap-2 text-sm font-sans text-muted-foreground">
            <span>📞 <a href="tel:+5493513067321" className="hover:text-primary transition-colors">+54 9 3513 06-7321</a></span>
            <span>✉️ <a href="mailto:disegnoplacares@gmail.com" className="hover:text-primary transition-colors">disegnoplacares@gmail.com</a></span>
            <span>🕐 Lun–Vie · 8:00 a.m. – 6:00 p.m.</span>
          </div>
        </div>

        {/* Map embed */}
        <div className="relative overflow-hidden" style={{ height: "420px" }}>
          {/* Gradient overlays for elegance */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <iframe
            title="Ubicación Disegno Mobiliario - Costa Sacate, Córdoba"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.0!2d-63.4!3d-31.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sA.+Yofre+de+%C3%81lvarez%2C+Costa+Sacate%2C+C%C3%B3rdoba%2C+Argentina!5e0!3m2!1ses!2sar!4v1!5m2!1ses!2sar&q=A.+Yofre+de+Álvarez,+Costa+Sacate,+Córdoba,+Argentina"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: "invert(90%) hue-rotate(180deg) saturate(0.5) brightness(0.85)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
            {["INICIO", "NOSOTROS", "SERVICIOS", "PROYECTOS"].map((link) => (
              <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex gap-6 text-white">
            <a href="https://www.instagram.com/disegno.mobiliario" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaInstagram size={24} /></a>
            <a href="https://wa.me/5493513067321?text=Hola%20Disegno,%20estuve%20viendo%20su%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20por%20un%20proyecto." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaWhatsapp size={24} /></a>
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="text-[#8A8580] font-sans text-xs font-light">© 2026 Disegno · Elegancia a medida</div>
            <div className="text-[#5A5550] font-sans text-[10px] tracking-wide">
              Sitio creado por{" "}
              <a
                href="https://www.digitall.baby/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-primary transition-colors"
              >
                DIGITALL
              </a>
            </div>
          </div>
        </div>
      </footer>


      {/* ── FLOATING CTA ── */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
        <a href="https://wa.me/5493513067321?text=Hola%20Disegno,%20estuve%20viendo%20su%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20por%20un%20proyecto." target="_blank" rel="noopener noreferrer" className="relative w-14 h-14 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-black/50 group cursor-pointer block">
          <div className="absolute inset-[-10px] hidden md:block">
            <svg viewBox="0 0 100 100" width="100" height="100" className="animate-[spin_8s_linear_infinite]">
              <defs><path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
              <text fontSize="11" fill="hsl(var(--primary))" letterSpacing="2" className="font-sans font-semibold uppercase">
                <textPath href="#circle">DISEGNO · MOBILIARIO · CONTACTO ·</textPath>
              </text>
            </svg>
          </div>
          <FaWhatsapp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-3xl md:text-4xl" />
        </a>
      </div>

    </div>
  );
}
