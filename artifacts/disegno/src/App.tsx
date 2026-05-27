import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { PenTool, Gem, Hammer, Users, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Custom Cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const setCursorState = (state: "default" | "VER") => {
    if (!cursorRef.current || !cursorTextRef.current) return;
    if (state === "default") {
      cursorRef.current.classList.remove("expand");
      cursorTextRef.current.innerText = "";
    } else {
      cursorRef.current.classList.add("expand");
      cursorTextRef.current.innerText = state;
    }
  };

  useGSAP(
    () => {
      // Loader Animation
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          ScrollTrigger.refresh();
        },
      });

      tl.to("#loader-svg-path", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
        .to("#loader-logo", { opacity: 1, duration: 0.5 })
        .to("#loader-curtain", {
          y: "-100%",
          duration: 1.2,
          ease: "expo.inOut",
        })
        .fromTo(
          "#main-nav",
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-char",
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: "power4.out", duration: 1 },
          "-=0.5"
        )
        .fromTo(
          "#hero-right-panel",
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.2"
        );

      // Fixed Nav Scroll
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          const nav = document.getElementById("main-nav");
          if (nav) {
            if (self.direction === 1) {
              nav.classList.add("bg-[#0D0D0D]", "backdrop-blur-md");
              nav.classList.remove("bg-transparent");
            } else if (self.progress === 0) {
              nav.classList.remove("bg-[#0D0D0D]", "backdrop-blur-md");
              nav.classList.add("bg-transparent");
            }
          }
        },
      });

      // Features Bar
      gsap.fromTo(
        ".feature-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#features-bar",
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        }
      );

      // Featured Projects
      gsap.fromTo(
        "#featured-large",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: "#featured-projects", start: "top 75%", invalidateOnRefresh: true },
        }
      );

      gsap.fromTo(
        ".featured-small",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          scrollTrigger: { trigger: "#featured-projects", start: "top 75%", invalidateOnRefresh: true },
        }
      );

      // About Us Parallax & Reveal
      gsap.to("#about-image", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        "#about-text",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: "#about-section", start: "top 70%", invalidateOnRefresh: true },
        }
      );

      // Services
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          scrollTrigger: { trigger: "#services-section", start: "top 80%", invalidateOnRefresh: true },
        }
      );

      // Gallery Masonry
      gsap.utils.toArray(".gallery-item").forEach((el: any) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", invalidateOnRefresh: true },
          }
        );
      });

      // Showcase parallax background
      gsap.to("#showcase-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#video-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Showcase text stagger reveal
      gsap.fromTo(
        ".video-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: "#video-section", start: "top 65%", invalidateOnRefresh: true },
        }
      );

      // Materials
      gsap.fromTo(
        ".material-card",
        { rotation: 3, opacity: 0, y: 40 },
        {
          rotation: 0,
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: { trigger: "#materials-section", start: "top 80%", invalidateOnRefresh: true },
        }
      );

      // Testimonials
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          scrollTrigger: { trigger: "#testimonials-section", start: "top 80%", invalidateOnRefresh: true },
        }
      );
    },
    { scope: containerRef }
  );

  const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btnRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power3.out" });
    };
    const handleMouseLeave = () => {
      if (!btnRef.current) return;
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5 });
    };

    return (
      <button ref={btnRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
        {children}
      </button>
    );
  };

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="hero-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:flex">
        <span ref={cursorTextRef} className="text-primary-foreground font-sans font-semibold tracking-wider"></span>
      </div>

      {/* Loader */}
      <div id="loader-curtain" className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <path
              id="loader-svg-path"
              d="M 20 20 L 50 20 C 70 20 80 35 80 50 C 80 65 70 80 50 80 L 20 80 Z"
              stroke="#C8822A"
              strokeWidth="2"
              strokeDasharray="250"
              strokeDashoffset="250"
            />
          </svg>
          <div id="loader-logo" className="mt-6 opacity-0 text-white font-serif text-2xl tracking-widest text-center">
            Disegno
            <div className="text-[10px] font-sans tracking-[0.3em] text-primary mt-2">MOBILIARIO</div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav id="main-nav" className="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex flex-col cursor-pointer">
          <span className="font-serif text-xl tracking-wider leading-none text-primary">Disegno</span>
          <span className="font-sans text-[9px] tracking-[0.2em] text-foreground mt-1">MOBILIARIO</span>
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

      {/* Hero */}
      <section className="relative h-[100dvh] w-full overflow-hidden flex items-center px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <img src="/hero.png" alt="Hero background" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
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
      </section>

      {/* Features Bar */}
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

      {/* Featured Projects */}
      <section id="featured-projects" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Espacios que hablan de vos.</h2>
            <div className="w-24 h-[1px] bg-primary"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Large Image */}
            <div id="featured-large" className="w-full lg:w-[60%] h-[500px] lg:h-[700px] relative group overflow-hidden cursor-none" onMouseEnter={() => setCursorState("VER")} onMouseLeave={() => setCursorState("default")}>
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800" alt="Casa Funes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <div className="text-primary font-sans text-xs tracking-widest uppercase mb-2">RESIDENCIAL</div>
                <h3 className="text-3xl font-serif text-white">Casa Funes</h3>
              </div>
            </div>

            {/* Small Images */}
            <div className="w-full lg:w-[40%] flex flex-col gap-6">
              {[
                { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800", name: "Local Comercial", cat: "COMERCIAL" },
                { url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800", name: "Casa GC", cat: "RESIDENCIAL" },
                { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", name: "Oficinas MT", cat: "COMERCIAL" }
              ].map((proj, i) => (
                <div key={i} className="featured-small h-[220px] relative group overflow-hidden cursor-none" onMouseEnter={() => setCursorState("VER")} onMouseLeave={() => setCursorState("default")}>
                  <img src={proj.url} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6">
                    <div className="text-primary font-sans text-[10px] tracking-widest uppercase mb-1">{proj.cat}</div>
                    <h3 className="text-xl font-serif text-white">{proj.name}</h3>
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

      {/* About Us */}
      <section id="about-section" className="py-24 px-6 md:px-12 bg-[#141414] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div id="about-text" className="w-full md:w-1/2">
             <div className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-6">SOBRE NOSOTROS</div>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-[1.2]">
               Más de 10 años transformando espacios en Córdoba.
             </h2>
             <p className="font-sans font-light text-muted-foreground text-lg leading-relaxed mb-12">
               Cada proyecto es único, pensado desde el primer boceto hasta la instalación final. Trabajamos con los mejores materiales y los artesanos más talentosos de la región para garantizar que cada mueble no solo sea hermoso, sino que perdure en el tiempo.
             </p>
             <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#2A2520]">
                <div>
                  <div className="text-3xl font-serif text-primary mb-2">200+</div>
                  <div className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Proyectos</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-primary mb-2">10+</div>
                  <div className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Años</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-primary mb-2">100%</div>
                  <div className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Satisfacción</div>
                </div>
             </div>
          </div>
          <div className="w-full md:w-1/2 h-[600px] overflow-hidden">
            <img id="about-image" src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900" alt="About Us" className="w-full h-[120%] object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Services */}
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

      {/* Gallery Masonry */}
      <section id="gallery-section" className="py-24 px-6 md:px-12 bg-[#141414]">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-16">Nuestro trabajo habla por nosotros</h2>
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600",
            "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600",
            "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600",
            "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600"
          ].map((url, i) => (
            <div key={i} className="gallery-item break-inside-avoid relative group overflow-hidden cursor-none" onMouseEnter={() => setCursorState("VER")} onMouseLeave={() => setCursorState("default")}>
              <img src={url} alt={`Gallery image ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section id="video-section" className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <div
          id="showcase-bg"
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
          style={{
            backgroundImage: "url('/showcase.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        {/* Decorative line top */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-primary/50" />

        <div className="relative z-10 text-center flex flex-col gap-2 px-6">
          <p className="text-primary font-sans text-xs tracking-[0.35em] uppercase mb-8">Diseño sin compromisos</p>
          <h2 className="video-text text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.05]">
            Cada <span className="italic text-primary">detalle.</span>
          </h2>
          <h2 className="video-text text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.05]">
            Cada <span className="italic text-primary">espacio.</span>
          </h2>
          <h2 className="video-text text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.05]">
            Cada <span className="italic text-primary">historia.</span>
          </h2>
          <div className="mt-12">
            <a href="#contact" className="inline-block border border-primary/60 text-white font-sans text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-primary hover:text-black transition-all duration-300">
              Comenzar proyecto
            </a>
          </div>
        </div>

        {/* Decorative line bottom */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-primary/50" />
      </section>

      {/* Materials */}
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

      {/* Testimonials */}
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

      {/* Contact */}
      <section id="contact-section" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">Hablemos de tu proyecto</h2>
            <form className="flex flex-col gap-8">
              {["Nombre", "Email", "Teléfono"].map((field) => (
                <div key={field} className="relative group">
                  <input 
                    type={field === "Email" ? "email" : "text"} 
                    placeholder={field}
                    className="w-full bg-transparent border-b border-[#2A2520] py-4 text-white placeholder-muted-foreground font-sans font-light focus:outline-none focus:border-transparent transition-colors peer"
                  />
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 peer-focus:scale-x-100 origin-left transition-transform duration-300"></span>
                </div>
              ))}
              <div className="relative group">
                <textarea 
                  placeholder="Mensaje" rows={4}
                  className="w-full bg-transparent border-b border-[#2A2520] py-4 text-white placeholder-muted-foreground font-sans font-light focus:outline-none focus:border-transparent transition-colors peer resize-none"
                ></textarea>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 peer-focus:scale-x-100 origin-left transition-transform duration-300"></span>
              </div>
              
              <MagneticButton className="hover-clip-path-bottom relative bg-transparent border border-primary text-white py-5 mt-4 text-sm tracking-widest uppercase font-sans font-semibold overflow-hidden group">
                 <span className="relative z-10 group-hover:text-black transition-colors duration-300">ENVIAR CONSULTA</span>
                 <div className="clip-path-bottom absolute inset-0 bg-primary" />
              </MagneticButton>
            </form>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:pl-16">
            <div>
              <h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">DIRECCIÓN</h3>
              <p className="font-serif text-2xl text-white">Córdoba, Argentina</p>
            </div>
            <div>
              <h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">WHATSAPP</h3>
              <p className="font-serif text-2xl text-white">+54 9 351 000-0000</p>
            </div>
            <div>
              <h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">INSTAGRAM</h3>
              <p className="font-serif text-2xl text-white">@disegno.mobiliario</p>
            </div>
            <div>
              <h3 className="text-primary font-sans text-xs tracking-widest uppercase mb-4">HORARIOS</h3>
              <p className="font-sans font-light text-lg text-muted-foreground">Lun-Vie 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

          <div className="text-[#8A8580] font-sans text-xs font-light mt-8">
            © 2025 Disegno Mobiliario · Córdoba, Argentina
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-black/50 group">
          <div className="absolute inset-[-10px]">
             <svg viewBox="0 0 100 100" width="100" height="100" id="cta-text" className="animate-[spin_8s_linear_infinite]">
              <defs>
                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="11" fill="hsl(var(--primary))" letterSpacing="2" className="font-sans font-semibold uppercase">
                <textPath href="#circle">
                  DISEGNO · MOBILIARIO · CONTACTO ·
                </textPath>
              </text>
            </svg>
          </div>
          <FaWhatsapp size={32} className="relative z-10" />
        </button>
      </div>

    </div>
  );
}
