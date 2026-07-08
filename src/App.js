import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const INK = "#1c1713";
const CREAM = "#f6f0e6";
const PARCHMENT = "#ece3d3";
const COPPER = "#b06c3a";
const SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';
const SANS = "ui-sans-serif, system-ui, sans-serif";

const label = {
  fontFamily: SANS,
  fontSize: "10px",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
};

/* ---------- Photo data ---------- */
const PHOTOS = [
  { src: "/images/IMG_20260707_110413.jpg", caption: "Marans chicks, week two", category: "chicks" },
  { src: "/images/IMG_20260707_110420.jpg", caption: "Silverudd's Blue hen", category: "breeds" },
  { src: "/images/IMG_20260707_110440.jpg", caption: "Silverudd's Blue rooster", category: "breeds" },
  { src: "/images/IMG_20260707_110444.jpg", caption: "Silverudd's Blue — full view", category: "breeds" },
  { src: "/images/IMG_20260707_110448.jpg", caption: "Olive Egger eggs", category: "eggs" },
  { src: "/images/IMG_20260707_110452.jpg", caption: "Rainbow dozen in basket", category: "eggs" },
  { src: "/images/IMG_20260707_110455.jpg", caption: "Rainbow eggs close-up", category: "eggs" },
  { src: "/images/IMG_20260707_110500.jpg", caption: "Dark Marans & Olive Eggers", category: "eggs" },
  { src: "/images/IMG_20260707_110504.jpg", caption: "Black Copper Marans flock", category: "breeds" },
  { src: "/images/IMG_20260707_110510.jpg", caption: "Black Copper Marans hen", category: "breeds" },
  { src: "/images/IMG_20260707_110513.jpg", caption: "Dark dozen with feather", category: "eggs" },
  { src: "/images/IMG_20260707_110516.jpg", caption: "Marans eggs & sunflowers", category: "eggs" },
  { src: "/images/IMG_20260707_110520.jpg", caption: "Marans color chart comparison", category: "eggs" },
  { src: "/images/IMG_20260707_110523.jpg", caption: "Dark chocolate eggs in bowl", category: "eggs" },
  { src: "/images/IMG_20260707_110531.jpg", caption: "Handful of espresso eggs", category: "eggs" },
  { src: "/images/IMG_20260707_110536.jpg", caption: "Dark trio on wood", category: "eggs" },
  { src: "/images/IMG_20260707_110539.jpg", caption: "Ceramic dozen display", category: "eggs" },
];

/* ---------- Floating Feather Particle ---------- */
function FeatherParticle({ delay, x, size, duration }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x, rotate: 0 }}
      animate={{ 
        opacity: [0, 0.6, 0.3, 0.8, 0],
        y: [0, 150, 300, 450, 600],
        x: [x, x + 30, x - 20, x + 40, x + 10],
        rotate: [0, 45, -30, 60, 90]
      }}
      transition={{ 
        duration: duration || 8, 
        delay, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        width: size || 12,
        height: size ? size * 2.5 : 30,
        background: `linear-gradient(to bottom, rgba(176,108,58,0.4), rgba(246,240,230,0.2))`,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        filter: "blur(1px)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------- Speckle Dot ---------- */
function SpeckleDot({ delay, x, y, size }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.7, 0.3, 0.9, 0], scale: [0, 1, 1.2, 0.8, 0] }}
      transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size || 3,
        height: size || 3,
        borderRadius: "50%",
        background: "rgba(176,108,58,0.6)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------- Programmatic Egg with GSAP ---------- */
function Egg({ color, speckle, size = 64, delay = 0, className = "" }) {
  const dots = [
    [30, 22], [55, 38], [40, 60], [65, 70], [25, 75], [58, 15], [45, 40], [70, 50],
  ];
  const eggRef = useRef(null);

  useEffect(() => {
    if (eggRef.current) {
      gsap.fromTo(eggRef.current,
        { y: 40, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          delay,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: eggRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [delay]);

  return (
    <div ref={eggRef} className={className} style={{ opacity: 0 }}>
      <div
        style={{
          width: size,
          height: size * 1.3,
          background: `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.35), transparent 55%), ${color}`,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          boxShadow: "inset -6px -8px 14px rgba(0,0,0,0.18), 0 10px 18px rgba(0,0,0,0.15)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {speckle &&
          dots.map(([x, y], i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: i % 2 ? 4 : 3,
                height: i % 2 ? 4 : 3,
                borderRadius: "50%",
                background: "rgba(60,30,10,0.55)",
              }}
            />
          ))}
      </div>
    </div>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const strip = "FRESH FROM THE COOP · SACRAMENTO, CA · PASTURE RAISED · SMALL BATCH · @_BYTHEDOZEN_ · ";
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 28,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  return (
    <div style={{ background: COPPER, overflow: "hidden" }} className="py-3">
      <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: "fit-content" }}>
        {[0, 1].map((k) => (
          <span key={k} style={{ ...label, color: CREAM, fontSize: "11px" }} className="px-2">
            {strip.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Photo Gallery ---------- */
function PhotoGallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);

  const filters = [
    { key: "all", label: "All" },
    { key: "eggs", label: "Eggs" },
    { key: "breeds", label: "Birds" },
    { key: "chicks", label: "Chicks" },
  ];

  const filtered = filter === "all" ? PHOTOS : PHOTOS.filter(p => p.category === filter);

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item');
      gsap.fromTo(items,
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.05,
          ease: "power2.out"
        }
      );
    }
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              ...label,
              fontSize: "9px",
              background: filter === f.key ? "rgba(28,23,19,0.1)" : "transparent",
              border: "1px solid rgba(28,23,19,0.2)",
              color: INK,
            }}
            className="px-4 py-2 rounded-full transition-colors hover:bg-black hover:bg-opacity-5"
          >
            {f.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((photo, i) => (
          <div
            key={photo.src}
            className="gallery-item group relative aspect-square overflow-hidden cursor-pointer bg-neutral-200"
            onClick={() => setLightbox(photo)}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to top, rgba(28,23,19,0.7) 0%, transparent 60%)" }}
            >
              <span style={{ fontFamily: SERIF, fontStyle: "italic", color: CREAM }} className="p-4 text-sm">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(28,23,19,0.92)", backdropFilter: "blur(8px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white text-3xl hover:opacity-70 transition-opacity"
                style={{ fontFamily: SANS }}
              >
                ×
              </button>
              <img src={lightbox.src} alt={lightbox.caption} className="max-w-full max-h-[80vh] object-contain rounded-sm" />
              <p style={{ fontFamily: SERIF, fontStyle: "italic", color: CREAM }} className="mt-4 text-lg text-center">
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Pricing Card ---------- */
function PricingCard({ title, items, note, delay = 0 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [delay]);

  return (
    <div ref={cardRef} className="p-8" style={{ border: "1px solid rgba(246,240,230,0.15)", opacity: 0 }}>
      <h3 style={{ fontFamily: SERIF }} className="text-2xl italic mb-6">{title}</h3>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-baseline gap-4">
            <span style={{ fontFamily: SANS, color: INK }} className="text-sm">{item.name}</span>
            <span style={{ fontFamily: SERIF, color: COPPER }} className="text-xl italic whitespace-nowrap">${item.price}</span>
          </div>
        ))}
      </div>
      {note && (
        <p style={{ fontFamily: SANS, color: "rgba(28,23,19,0.6)" }} className="text-xs mt-6 italic">{note}</p>
      )}
    </div>
  );
}

/* ---------- Accordion ---------- */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
    }
  }, [open]);

  return (
    <div style={{ borderBottom: "1px solid rgba(246,240,230,0.12)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span style={{ fontFamily: SERIF }} className="text-lg italic">{title}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ color: COPPER, fontSize: "20px" }}>
          +
        </motion.span>
      </button>
      <div ref={contentRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <div className="pb-5" style={{ color: "rgba(246,240,230,0.65)", fontFamily: SANS }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- Scroll Reveal Text ---------- */
function RevealText({ children, className = "", delay = 0, as: Component = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [delay]);

  return <Component ref={ref} className={className} style={{ opacity: 0 }}>{children}</Component>;
}

/* ---------- Parallax Image ---------- */
function ParallaxImage({ src, alt, speed = 0.5, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <img ref={ref} src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function ByTheDozen() {
  const [form, setForm] = useState({ name: "", email: "", interest: "Rainbow dozen" });
  const [sent, setSent] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroEggsRef = useRef(null);
  const particlesRef = useRef(null);
  const mainRef = useRef(null);

  const eggColors = [
    { name: "Marans Copper", c: "#5a3018" },
    { name: "Chocolate", c: "#7a4a26" },
    { name: "Olive", c: "#8a8a4e" },
    { name: "Sage", c: "#b5b98f" },
    { name: "Cream", c: "#e8d9b8" },
    { name: "Robin Blue", c: "#a9c8c0" },
  ];

  const breeds = [
    {
      name: "Black Copper Marans",
      note: "The darkest egg in the coop — deep chocolate shells with copper speckling. French heritage lines. A 'Rainbow' dozen means a mix of different colored eggs from various breeds.",
      egg: "#5a3018",
      speckle: true,
    },
    {
      name: "Espresso Egger",
      note: "Rich, dark brown eggs with an espresso-like depth. A crossbreed selected for the deepest chocolate tones. Available as hatching eggs and chicks.",
      egg: "#4a2512",
      speckle: true,
    },
    {
      name: "Olive Egger",
      note: "Marans crossed with blue layers for eggs in every shade of olive, sage, and moss.",
      egg: "#8a8a4e",
      speckle: false,
    },
    {
      name: "Lavender Cochin Bantam",
      note: "Small, absurdly fluffy, and endlessly personable. Our resident lap chickens. Also available in black split varieties.",
      egg: "#e8d9b8",
      speckle: false,
    },
    {
      name: "Silverudd's Blue",
      note: "Stunning blue-laced plumage with a calm temperament. Lays beautiful blue-tinted eggs. Also known as Isbar in some circles.",
      egg: "#a9c8c0",
      speckle: false,
    },
    {
      name: "LF Show Cochin",
      note: "Large fowl Cochins bred for the show ring. Massive, feather-legged, and gentle giants of the coop.",
      egg: "#c9bda5",
      speckle: false,
    },
  ];

  const hatchingEggs = [
    { name: "Espresso Eggers", price: "300" },
    { name: "LF Show Cochins", price: "180" },
    { name: "Silverudd's Blue", price: "160" },
    { name: "Rainbow Hatching Eggs (mixed)", price: "200" },
  ];

  const chicks = [
    { name: "Black Copper Marans", price: "65" },
    { name: "Espresso Eggers", price: "55" },
    { name: "Silverudd's Blue", price: "45" },
    { name: "LF Show Cochins", price: "40" },
    { name: "Lavender / Black Split Bantam Cochins", price: "50" },
  ];

  const navLinks = ["Palette", "Breeds", "Pricing", "Gallery", "Reserve"];

  /* Hero entrance animation */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      const heroTl = gsap.timeline({ delay: 0.3 });

      heroTl.fromTo(".hero-label",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(".hero-line",
        { y: "110%" },
        { y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(".hero-egg",
        { opacity: 0, y: 60, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: "elastic.out(1, 0.6)" },
        "-=0.5"
      );

      // Parallax eggs on scroll
      gsap.to(".hero-egg", {
        y: (i) => (i % 2 === 0 ? -80 : -40),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Nav show on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "bottom 80%",
        onEnter: () => setNavVisible(true),
        onLeaveBack: () => setNavVisible(false)
      });

      // Section wipe transitions
      gsap.utils.toArray(".section-wipe").forEach((section) => {
        gsap.fromTo(section,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Breed cards stagger
      gsap.utils.toArray(".breed-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Gallery parallax
      gsap.utils.toArray(".gallery-item").forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 4) * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    gsap.to(window, { duration: 1.2, scrollTo: { y: id, offsetY: 70 }, ease: "power3.inOut" });
  };

  return (
    <main ref={mainRef} style={{ background: INK, color: CREAM }} className="antialiased">
      {/* Floating particles background */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <FeatherParticle
            key={i}
            delay={i * 0.8}
            x={Math.random() * 100}
            size={8 + Math.random() * 12}
            duration={10 + Math.random() * 8}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <SpeckleDot
            key={`s${i}`}
            delay={Math.random() * 5}
            x={Math.random() * 100}
            y={Math.random() * 100}
            size={2 + Math.random() * 3}
          />
        ))}
      </div>

      {/* NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "power3.out" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ background: "rgba(28,23,19,0.9)", backdropFilter: "blur(12px)" }}
      >
        <span style={{ fontFamily: SERIF }} className="text-xl italic">By The Dozen</span>
        <div className="hidden md:flex gap-8">
          {navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(`#${l.toLowerCase()}`)}
              style={{ ...label, color: CREAM }}
              className="hover:opacity-60 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("#reserve")}
          style={{ ...label, color: CREAM, borderColor: "rgba(246,240,230,0.4)" }}
          className="border px-4 py-2 hover:bg-white hover:bg-opacity-10 transition-colors bg-transparent cursor-pointer"
        >
          Reserve
        </button>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${COPPER}, transparent)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${COPPER}, transparent)` }} />
        </div>

        <p className="hero-label mb-6" style={{ ...label, color: COPPER, opacity: 0 }}>
          Sacramento, California
        </p>

        <h1 style={{ fontFamily: SERIF, fontWeight: 300 }} className="text-5xl md:text-7xl leading-tight relative z-10">
          <span className="block overflow-hidden">
            <span className="hero-line block" style={{ transform: "translateY(110%)" }}>
              Eggs worth
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block italic" style={{ transform: "translateY(110%)" }}>
              waking up for.
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-md text-lg italic" style={{ fontFamily: SERIF, color: "rgba(246,240,230,0.6)", opacity: 0 }}>
          Heritage Marans, Olive Eggers, and Cochin Bantams — raised slow, on pasture, by the dozen.
        </p>

        <div ref={heroEggsRef} className="flex items-end gap-4 mt-14 relative z-10">
          {eggColors.map((e, i) => (
            <div key={e.name} className="hero-egg" style={{ opacity: 0 }}>
              <Egg color={e.c} speckle={i === 0} size={i === 2 ? 56 : 44} delay={0} />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 1, height: 40, background: "rgba(246,240,230,0.3)" }} className="mx-auto" />
          <span style={{ ...label, fontSize: "8px", color: "rgba(246,240,230,0.4)" }} className="block mt-2">SCROLL</span>
        </motion.div>
      </section>

      <Marquee />

      {/* PALETTE */}
      <section id="palette" className="section-wipe py-24 px-6 md:px-10 relative" style={{ background: PARCHMENT, color: INK }}>
        <div className="max-w-5xl mx-auto">
          <RevealText as="p" style={{ ...label, color: COPPER }} className="mb-4">The Palette</RevealText>
          <RevealText as="h2" style={{ fontFamily: SERIF, fontWeight: 300 }} className="text-4xl md:text-6xl mb-6" delay={0.1}>
            No two cartons <span className="italic">alike.</span>
          </RevealText>
          <RevealText as="p" style={{ fontFamily: SANS, color: "rgba(28,23,19,0.6)" }} className="text-sm mb-14 max-w-xl leading-relaxed" delay={0.2}>
            A "Rainbow" dozen is a mix of different colored eggs from our various breeds — 
            deep chocolate Marans, olive-toned Eggers, sage greens, and creamy tans all in one carton.
          </RevealText>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {eggColors.map((e, i) => (
              <Egg key={e.name} color={e.c} speckle={i === 0} size={52} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* BREEDS */}
      <section id="breeds" className="py-24 px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <RevealText as="p" style={{ ...label, color: COPPER }} className="mb-4">The Flock</RevealText>
          <RevealText as="h2" style={{ fontFamily: SERIF, fontWeight: 300 }} className="text-4xl md:text-6xl mb-6" delay={0.1}>
            Six breeds, <span className="italic">chosen carefully.</span>
          </RevealText>
          <RevealText as="p" style={{ fontFamily: SANS, color: "rgba(246,240,230,0.5)" }} className="text-sm mb-14 max-w-xl leading-relaxed" delay={0.2}>
            Click any breed below to learn more about their temperament, egg color, and availability.
          </RevealText>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {breeds.slice(0, 3).map((b, i) => (
              <div key={b.name} className="breed-card p-8 flex flex-col items-start gap-6" style={{ border: "1px solid rgba(246,240,230,0.15)", opacity: 0, perspective: 1000 }}>
                <Egg color={b.egg} speckle={b.speckle} size={48} delay={0} />
                <h3 style={{ fontFamily: SERIF }} className="text-2xl italic">{b.name}</h3>
                <p style={{ color: "rgba(246,240,230,0.65)", fontFamily: SANS }} className="text-sm leading-relaxed">{b.note}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {breeds.slice(3).map((b, i) => (
              <div key={b.name} className="breed-card p-8 flex flex-col items-start gap-6" style={{ border: "1px solid rgba(246,240,230,0.15)", opacity: 0, perspective: 1000 }}>
                <Egg color={b.egg} speckle={b.speckle} size={48} delay={0} />
                <h3 style={{ fontFamily: SERIF }} className="text-2xl italic">{b.name}</h3>
                <p style={{ color: "rgba(246,240,230,0.65)", fontFamily: SANS }} className="text-sm leading-relaxed">{b.note}</p>
              </div>
            ))}
          </div>

          {/* Breed FAQ Accordion */}
          <div className="mt-20 max-w-2xl">
            <RevealText as="p" style={{ ...label, color: COPPER }} className="mb-6">Breed Notes</RevealText>
            <Accordion title="What does 'Rainbow' mean?">
              A Rainbow dozen (or hatching eggs) is a curated mix of different colored eggs from our various breeds. 
              You might get deep chocolate Marans, olive Eggers, sage greens, and creamy tans — 
              every carton is unique. We do not sell rainbow chicks.
            </Accordion>
            <Accordion title="What is an Espresso Egger?">
              Espresso Eggers are a select crossbreed we developed for the deepest, richest brown eggs — 
              think dark chocolate or espresso tones. They are available as both hatching eggs ($300) and chicks ($55).
            </Accordion>
            <Accordion title="What is a Silverudd's Blue?">
              Silverudd's Blue (sometimes called Isbar) is a rare Swedish breed known for its blue-laced plumage 
              and blue-tinted eggs. Calm, hardy, and stunning in the coop. Hatching eggs $160, chicks $45.
            </Accordion>
            <Accordion title="LF Show Cochins vs Bantam Cochins">
              LF (Large Fowl) Show Cochins are massive, feather-legged giants bred for exhibition — 
              hatching eggs $180, chicks $40. Bantam Cochins are the miniature version, available in 
              Lavender and Black Split varieties at $50 per chick.
            </Accordion>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-wipe py-24 px-6 md:px-10" style={{ background: PARCHMENT, color: INK }}>
        <div className="max-w-6xl mx-auto">
          <RevealText as="p" style={{ ...label, color: COPPER }} className="mb-4">Pricing</RevealText>
          <RevealText as="h2" style={{ fontFamily: SERIF, fontWeight: 300 }} className="text-4xl md:text-6xl mb-6" delay={0.1}>
            Straightforward <span className="italic">pricing.</span>
          </RevealText>
          <RevealText as="p" style={{ fontFamily: SANS, color: "rgba(28,23,19,0.6)" }} className="text-sm mb-14 max-w-xl leading-relaxed" delay={0.2}>
            All prices are per dozen for hatching eggs, or per chick. 
            Waiting list is open — reserve your spot below.
          </RevealText>

          <div className="grid md:grid-cols-2 gap-6">
            <PricingCard title="Hatching Eggs" items={hatchingEggs} note="Rainbow hatching eggs are a mixed dozen of various colored eggs. No rainbow chicks available." delay={0} />
            <PricingCard title="Chicks" items={chicks} note="Chicks are sold as straight run (unsexed) unless otherwise noted. Availability varies by season." delay={0.15} />
          </div>

          <div className="mt-12 p-6 text-center" style={{ background: "rgba(28,23,19,0.04)", border: "1px solid rgba(28,23,19,0.1)" }}>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", color: INK }} className="text-lg mb-2">Waiting list is open.</p>
            <p style={{ fontFamily: SANS, color: "rgba(28,23,19,0.5)" }} className="text-sm">
              Popular breeds sell out fast. Join the list to secure your spot for the next hatch.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <RevealText as="p" style={{ ...label, color: COPPER }} className="mb-4">The Coop</RevealText>
          <RevealText as="h2" style={{ fontFamily: SERIF, fontWeight: 300 }} className="text-4xl md:text-6xl mb-6" delay={0.1}>
            Life on the <span className="italic">farm.</span>
          </RevealText>
          <RevealText as="p" style={{ fontFamily: SANS, color: "rgba(246,240,230,0.5)" }} className="text-sm mb-14 max-w-xl leading-relaxed" delay={0.2}>
            17 photos from the run — eggs, birds, chicks, and daily coop life. Click any photo to view full size.
          </RevealText>
          <PhotoGallery />
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="py-24 px-6 md:px-10 relative">
        <div className="max-w-xl mx-auto text-center">
          <RevealText as="p" style={{ ...label, color: COPPER }} className="mb-4">Reserve</RevealText>
          <RevealText as="h2" style={{ fontFamily: SERIF, fontWeight: 300 }} className="text-4xl md:text-5xl mb-4" delay={0.1}>
            Get on the <span className="italic">list.</span>
          </RevealText>
          <RevealText as="p" style={{ fontFamily: SANS, color: "rgba(246,240,230,0.5)" }} className="text-sm mb-10" delay={0.2}>
            Waiting list is open. We'll reach out when your breed is available.
          </RevealText>

          {sent ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10">
              <p style={{ fontFamily: SERIF, color: COPPER }} className="text-xl italic mb-2">Thank you — you're on the list.</p>
              <p style={{ fontFamily: SANS, color: "rgba(246,240,230,0.5)" }} className="text-sm">We'll be in touch soon when your selection is ready.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="flex flex-col gap-4 text-left"
            >
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ background: "transparent", border: "1px solid rgba(246,240,230,0.25)", color: CREAM, fontFamily: SANS }}
                className="px-5 py-4 text-sm focus:outline-none focus:border-copper transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ background: "transparent", border: "1px solid rgba(246,240,230,0.25)", color: CREAM, fontFamily: SANS }}
                className="px-5 py-4 text-sm focus:outline-none focus:border-copper transition-colors"
              />
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                style={{ background: INK, border: "1px solid rgba(246,240,230,0.25)", color: CREAM, fontFamily: SANS }}
                className="px-5 py-4 text-sm focus:outline-none focus:border-copper transition-colors"
              >
                <option>Rainbow dozen (eating eggs)</option>
                <option>Dark Marans dozen (eating eggs)</option>
                <option>Espresso Egger hatching eggs — $300</option>
                <option>LF Show Cochin hatching eggs — $180</option>
                <option>Silverudd's Blue hatching eggs — $160</option>
                <option>Rainbow hatching eggs — $200</option>
                <option>Black Copper Marans chick — $65</option>
                <option>Espresso Egger chick — $55</option>
                <option>Silverudd's Blue chick — $45</option>
                <option>LF Show Cochin chick — $40</option>
                <option>Lavender/Black Split Bantam Cochin chick — $50</option>
                <option>Hatching eggs (general inquiry)</option>
                <option>Chicks (general inquiry)</option>
              </select>
              <button type="submit" style={{ ...label, background: COPPER, color: CREAM }} className="py-4 mt-2 hover:opacity-90 transition-opacity">
                Join the waiting list
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(246,240,230,0.12)" }} className="py-10 px-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <span style={{ fontFamily: SERIF }} className="italic">By The Dozen</span>
        <span style={{ ...label, color: "rgba(246,240,230,0.4)" }}>Sacramento, CA · @_bythedozen_ · Est. 2024</span>
      </footer>
    </main>
  );
}
