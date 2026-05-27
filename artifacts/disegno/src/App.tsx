import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import {
  PenTool,
  Gem,
  Hammer,
  Users,
  ArrowRight,
  Phone,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(true);

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const setCursorState = (state: "default" | "VER" | "DRAG") => {
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
      // 1. Loader Animation
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
          ".hero-title-char",
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: "power4.out", duration: 1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        );

      // 2. Fixed Nav
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          const nav = document.getElementById("main-nav");
          if (nav) {
            if (self.direction === 1) {
              nav.classList.add("bg-[#0A0A0A]", "text-white");
              nav.classList.remove("bg-transparent", "text-white");
            } else if (self.progress === 0) {
              nav.classList.remove("bg-[#0A0A0A]", "text-white");
              nav.classList.add("bg-transparent", "text-white");
            }
          }
        },
      });

      // 4. Features Bar
      gsap.fromTo(
        ".feature-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: "#features-section",
            start: "top 80%",
          },
        }
      );

      // 5. Masonry Gallery
      gsap.utils.toArray(".gallery-img-container").forEach((el: any) => {
        gsap.fromTo(
          el.querySelector(".gallery-img"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power3.inOut",
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // 6. Philosophy
      gsap.to(".philosophy-word", {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#philosophy-section",
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1.5,
        },
      });

      gsap.to("#philosophy-img", {
        y: -100,
        scrollTrigger: {
          trigger: "#philosophy-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      // 7. Horizontal Scroll Projects
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        const hScrollContainer = document.getElementById("h-scroll-container");
        const hScrollSection = document.getElementById("h-scroll-section");
        if (hScrollContainer && hScrollSection) {
          const totalWidth = hScrollContainer.scrollWidth;
          const viewportWidth = window.innerWidth;
          
          gsap.to(hScrollContainer, {
            x: -(totalWidth - viewportWidth),
            ease: "none",
            scrollTrigger: {
              trigger: hScrollSection,
              pin: true,
              scrub: 1,
              end: "+=3000",
              invalidateOnRefresh: true,
            },
          });

          gsap.fromTo(
            ".h-project-card",
            { rotation: 3, opacity: 0.5 },
            {
              rotation: 0,
              opacity: 1,
              stagger: 0.2,
              scrollTrigger: {
                trigger: hScrollSection,
                start: "top center",
                end: "+=3000",
                scrub: 1,
              },
            }
          );
        }
      }

      // 8. Process
      gsap.fromTo(
        ".process-step",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#process-section",
            start: "top 80%",
          },
        }
      );

      // Rotating CTA
      gsap.to("#cta-text", {
        rotation: 360,
        repeat: -1,
        duration: 8,
        ease: "none",
        transformOrigin: "50% 50%",
      });
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
      <button
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </button>
    );
  };

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="hero-title-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="philosophy-word opacity-20 inline-block mr-3 mb-2">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:flex">
        <span ref={cursorTextRef}></span>
      </div>

      {/* Cinematic Loader */}
      <div
        id="loader-curtain"
        className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <path
              id="loader-svg-path"
              d="M 20 20 L 50 20 C 70 20 80 35 80 50 C 80 65 70 80 50 80 L 20 80 Z"
              stroke="#C9A96E"
              strokeWidth="2"
              strokeDasharray="250"
              strokeDashoffset="250"
            />
          </svg>
          <div
            id="loader-logo"
            className="mt-6 opacity-0 text-white font-serif text-2xl tracking-widest text-center"
          >
            Disegno
            <div className="text-[10px] font-sans tracking-[0.3em] text-[#C9A96E] mt-2">
              MOBILIARIO
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        id="main-nav"
        className="fixed top-0 w-full z-40 transition-colors duration-500 bg-transparent text-white border-b border-transparent py-4 px-6 md:px-12 flex justify-between items-center"
      >
        <div className="flex flex-col cursor-pointer">
          <span className="font-serif text-xl tracking-wider leading-none">
            Disegno
          </span>
          <span className="font-sans text-[9px] tracking-[0.2em] text-primary mt-1">
            MOBILIARIO
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center font-sans font-light text-xs tracking-widest uppercase">
          <a href="#" className="hover:text-primary transition-colors">Inicio</a>
          <a href="#" className="hover:text-primary transition-colors">Nosotros</a>
          <a href="#" className="hover:text-primary transition-colors">Proyectos</a>
          <a href="#" className="hover:text-primary transition-colors">Proceso</a>
          <a href="#" className="hover:text-primary transition-colors">Contacto</a>
        </div>
        <button className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-colors duration-300">
          <FaWhatsapp size={18} />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center px-6 md:px-12">
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full h-full object-cover animate-ken-burns opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto pt-20">
          <div className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-in fade-in fill-mode-forwards delay-1000">
            Disegno Mobiliario
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-6 max-w-4xl">
            <div className="block">{splitText("Diseñamos espacios.")}</div>
            <div className="block italic text-primary">{splitText("Creamos experiencias.")}</div>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl font-sans font-light text-white/80 max-w-2xl mb-12">
            Mobiliario a medida con diseño, calidad y funcionalidad para transformar tus ambientes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <MagneticButton className="relative group overflow-hidden border border-primary text-white px-8 py-4 text-sm tracking-widest uppercase flex items-center gap-3">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Ver Proyectos</span>
              <ArrowRight size={16} className="relative z-10 group-hover:text-black transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
            </MagneticButton>
            
            <MagneticButton className="hover-clip-path-bottom relative text-white px-8 py-4 text-sm tracking-widest uppercase group border border-transparent">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Contactar</span>
              <div className="clip-path-bottom absolute inset-0 bg-primary" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section id="features-section" className="bg-[#0A0A0A] py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: PenTool, title: "Diseño Personalizado" },
            { icon: Gem, title: "Materiales Premium" },
            { icon: Hammer, title: "Fabricación Propia" },
            { icon: Users, title: "Asesoramiento Integral" },
          ].map((feature, i) => (
            <div key={i} className="feature-item flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <feature.icon size={20} strokeWidth={1} />
              </div>
              <span className="font-sans font-light text-sm tracking-wide">{feature.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-[#0A0A0A]">Espacios que hablan de vos</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Item 1 */}
          <div 
            className="gallery-img-container relative md:col-span-2 md:row-span-2 overflow-hidden group cursor-none"
            onMouseEnter={() => setCursorState("VER")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="gallery-img w-full h-full">
              <img src="/gallery1.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <div className="text-primary text-[10px] tracking-[0.2em] font-sans mb-2">RESIDENCIAL</div>
              <div className="font-serif italic text-2xl md:text-3xl">Casa Funes</div>
            </div>
          </div>

          {/* Item 2 */}
          <div 
            className="gallery-img-container relative md:col-span-1 md:row-span-1 overflow-hidden group cursor-none"
            onMouseEnter={() => setCursorState("VER")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="gallery-img w-full h-full">
              <img src="/gallery2.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <div className="text-primary text-[10px] tracking-[0.2em] font-sans mb-1">COMERCIAL</div>
              <div className="font-serif italic text-xl">Local Comercial</div>
            </div>
          </div>

          {/* Item 3 */}
          <div 
            className="gallery-img-container relative md:col-span-1 md:row-span-2 overflow-hidden group cursor-none"
            onMouseEnter={() => setCursorState("VER")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="gallery-img w-full h-full">
              <img src="/gallery3.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <div className="text-primary text-[10px] tracking-[0.2em] font-sans mb-2">RESIDENCIAL</div>
              <div className="font-serif italic text-2xl md:text-3xl">Casa GC</div>
            </div>
          </div>

          {/* Item 4 */}
          <div 
            className="gallery-img-container relative md:col-span-1 md:row-span-1 overflow-hidden group cursor-none"
            onMouseEnter={() => setCursorState("VER")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="gallery-img w-full h-full">
              <img src="/gallery4.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <div className="text-primary text-[10px] tracking-[0.2em] font-sans mb-1">RESIDENCIAL</div>
              <div className="font-serif italic text-xl">Casa Trabajador</div>
            </div>
          </div>

           {/* Item 5 */}
           <div 
            className="gallery-img-container relative md:col-span-1 md:row-span-1 overflow-hidden group cursor-none"
            onMouseEnter={() => setCursorState("VER")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="gallery-img w-full h-full">
              <img src="/gallery5.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <div className="text-primary text-[10px] tracking-[0.2em] font-sans mb-1">RESIDENCIAL</div>
              <div className="font-serif italic text-xl">Casa Moderna</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy-section" className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 z-10">
            <div className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-8">La artesanía como filosofía</div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.2] text-[#0A0A0A]">
              {splitWords("No fabricamos muebles. Creamos espacios que perduran.")}
            </h2>
          </div>
          <div className="w-full md:w-1/2 h-[600px] overflow-hidden relative">
            <img 
              id="philosophy-img"
              src="/gallery6.png" 
              alt="Philosophy" 
              className="w-full h-[130%] object-cover" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Projects */}
      <section id="h-scroll-section" className="hidden md:flex bg-[#0A0A0A] h-screen items-center overflow-hidden">
        <div 
          id="h-scroll-container" 
          className="flex h-full w-max px-[10vw]"
          onMouseEnter={() => setCursorState("DRAG")}
          onMouseLeave={() => setCursorState("default")}
        >
          {[gallery5, gallery7, gallery8, gallery3].map((img, i) => (
            <div key={i} className="h-project-card w-[70vw] h-[70vh] flex-shrink-0 mr-[5vw] relative flex items-center justify-center mt-[15vh]">
              <div className="w-full h-full overflow-hidden relative group">
                <img src={`/gallery${img}.png`} alt={`Project ${i}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-12 left-12">
                  <div className="text-primary text-xs tracking-[0.2em] font-sans mb-3">CATEGORIA {i+1}</div>
                  <h3 className="text-5xl font-serif text-white mb-6">Proyecto Exclusivo {i+1}</h3>
                  <button className="group/btn flex items-center gap-3 text-white">
                    <span className="font-sans text-sm tracking-widest relative">
                      Ver más
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover/btn:w-full"></span>
                    </span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-2 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Projects fallback */}
      <section className="md:hidden bg-[#0A0A0A] py-24 px-6 flex flex-col gap-12">
         {[gallery5, gallery7, gallery8, gallery3].map((img, i) => (
            <div key={i} className="w-full h-[60vh] relative group overflow-hidden">
              <img src={`/gallery${img}.png`} alt={`Project ${i}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-8 left-6">
                <div className="text-primary text-[10px] tracking-[0.2em] font-sans mb-2">CATEGORIA {i+1}</div>
                <h3 className="text-3xl font-serif text-white mb-4">Proyecto Exclusivo {i+1}</h3>
                <button className="text-primary font-sans text-xs tracking-widest underline underline-offset-4">Ver más</button>
              </div>
            </div>
          ))}
      </section>

      {/* Process */}
      <section id="process-section" className="py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-primary font-sans text-xs tracking-[0.3em] uppercase mb-16 text-center">Nuestro Proceso</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Consulta Inicial", desc: "Escuchamos tus ideas y analizamos el espacio detalladamente." },
              { num: "02", title: "Diseño y Planificación", desc: "Creamos planos y renders fotorrealistas para visualizar." },
              { num: "03", title: "Fabricación Artesanal", desc: "Cada pieza construida a mano con materiales premium." },
              { num: "04", title: "Instalación y Entrega", desc: "Instalamos y supervisamos minuciosamente cada detalle." }
            ].map((step, i) => (
              <div key={i} className="process-step relative pt-12">
                <div className="absolute top-0 left-0 text-8xl md:text-9xl font-serif text-primary opacity-10 select-none">{step.num}</div>
                <h4 className="font-serif text-xl md:text-2xl text-[#0A0A0A] mb-4 relative z-10">{step.title}</h4>
                <p className="font-sans font-light text-sm text-[#0A0A0A]/70 relative z-10 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#0A0A0A] py-32 px-6 md:px-12 text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-12">Hablemos de tu<br/><span className="italic text-primary">proyecto</span></h2>
            
            <div className="flex flex-col gap-6 font-sans font-light text-sm tracking-wide text-white/80">
              <a href="#" className="flex items-center gap-4 hover:text-primary transition-colors"><FaWhatsapp size={20}/> +54 9 11 1234-5678</a>
              <a href="#" className="flex items-center gap-4 hover:text-primary transition-colors"><FaEnvelope size={20}/> hola@disegnomobiliario.com</a>
              <a href="#" className="flex items-center gap-4 hover:text-primary transition-colors"><FaInstagram size={20}/> @disegno.mobiliario</a>
            </div>
          </div>
          
          <div>
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              {["Nombre", "Email", "Teléfono"].map((label, i) => (
                <div key={i} className="relative group">
                  <input 
                    type={label === "Email" ? "email" : "text"} 
                    placeholder={label}
                    className="w-full bg-transparent border-b border-white/20 py-4 font-sans font-light text-sm outline-none text-white focus:border-transparent peer transition-colors"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary transition-all duration-300 peer-focus:w-full"></div>
                </div>
              ))}
              <div className="relative group">
                <textarea 
                  placeholder="Mensaje"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 font-sans font-light text-sm outline-none text-white focus:border-transparent peer transition-colors resize-none"
                ></textarea>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary transition-all duration-300 peer-focus:w-full"></div>
              </div>
              
              <div className="mt-4">
                <MagneticButton className="hover-clip-path-bottom relative text-white px-10 py-5 text-sm tracking-widest uppercase group border border-primary/30 w-full sm:w-auto overflow-hidden">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300 font-medium">Enviar Consulta</span>
                  <div className="clip-path-bottom absolute inset-0 bg-primary" />
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 px-6 md:px-12 border-t border-[#0A0A0A]/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-[#0A0A0A]">
            <span className="font-serif text-lg tracking-wider">Disegno</span>
            <span className="font-sans text-[8px] tracking-[0.2em] text-primary">MOBILIARIO</span>
          </div>
          
          <div className="flex gap-6 font-sans text-xs tracking-widest text-[#0A0A0A]/60">
            <a href="#" className="hover:text-primary transition-colors">INICIO</a>
            <a href="#" className="hover:text-primary transition-colors">PROYECTOS</a>
            <a href="#" className="hover:text-primary transition-colors">CONTACTO</a>
          </div>

          <div className="font-sans text-[10px] text-[#0A0A0A]/40 uppercase tracking-widest">
            © 2025 Disegno Mobiliario · Todos los derechos reservados
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <a href="#" className="fixed bottom-8 right-8 z-40 w-[80px] h-[80px] rounded-full bg-primary text-[#0A0A0A] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">
        <div className="absolute inset-0 p-2">
          <svg viewBox="0 0 100 100" id="cta-text" className="w-full h-full fill-current uppercase text-[10px] font-sans font-semibold tracking-widest">
            <path id="circle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text>
              <textPath href="#circle" startOffset="0%">
                DISEGNO · MOBILIARIO · CONTACTO · 
              </textPath>
            </text>
          </svg>
        </div>
        <Phone size={18} className="absolute z-10" />
      </a>
    </div>
  );
}

const gallery5 = "5";
const gallery7 = "7";
const gallery8 = "8";
const gallery3 = "3";
