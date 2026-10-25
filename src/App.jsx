import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/* ---------------------------------------------------------------
   Content (wording taken from the We Make company profiles)
---------------------------------------------------------------- */
const COMPANY = "We Make Constructions Co. WLL";
const EMAIL = "projectswemake@gmail.com";
const WEB = "www.wemakeconstructions.com";
const CR = "107336-1";
const PHONES = [
  { label: "+973 1736 5177", href: "tel:+97317365177" },
  { label: "+973 3826 2305", href: "tel:+97338262305" },
  { label: "+973 3678 0025", href: "tel:+97336780025" },
];
const WHATSAPP =
  "https://wa.me/97338262305?text=" +
  encodeURIComponent("Hello We Make Constructions, I would like to make a project enquiry.");

const NAV = [
  ["About", "#about"],
  ["Divisions", "#divisions"],
  ["Projects", "#projects"],
  ["Location", "#visit"],
  ["Contact", "#contact"],
];

const E = "/images/projects/";

const PROJECTS = [
  { name: "Bapco Energies, Diplomatic Station", place: "Diplomatic Area", src: E + "bapco-diplomatic.jpg", pos: "center 40%" },
  { name: "Royal University for Women", place: "Awali", src: E + "royal-university.jpg", pos: "35% center" },
  { name: "Al Naseem Villas", place: "Bahrain", src: E + "al-naseem-villas.jpg", pos: "center" },
  { name: "Bapco Energies, Diyar Al Muharraq", place: "Diyar Al Muharraq", src: E + "bapco-diyar.jpg", pos: "center 40%" },
  { name: "Delmon International Hotel", place: "Bahrain", src: E + "delmon-hotel.jpg", pos: "center 40%" },
  { name: "Budaiya Sports Club", place: "Budaiya", src: E + "budaiya-sports-club.jpg", pos: "center" },
  { name: "Bapco Energies, Adliya", place: "Adliya", src: E + "bapco-adliya.jpg", pos: "center 45%" },
  { name: "Zawia 1", place: "Amwaj Islands", src: E + "zawia-amwaj.jpg", pos: "center" },
  { name: "Bapco Energies, Hamad Town", place: "Hamad Town", src: E + "bapco-hamad-town.jpg", pos: "center 55%" },
  { name: "Villa Hidd, Project 1", place: "Hidd", src: E + "villa-hidd-1.jpg", pos: "center 35%" },
  { name: "Bapco Energies, Hoora", place: "Hoora", src: E + "bapco-hoora.jpg", pos: "center 40%" },
  { name: "Road Works", place: "Interlock carriageway and kerbs", src: E + "road-works-1.jpg", pos: "center" },
  { name: "Villa Hidd, Project 2", place: "Hidd", src: E + "villa-hidd-2.jpg", pos: "center 35%" },
  { name: "Road Works", place: "Interlock road with kerb edge", src: E + "road-works-2.jpg", pos: "center" },
];

const FEATURES = [
  {
    no: "01",
    title: "Civil Works",
    text: "Block works, plastering, tiles, granite and marble, concrete, footing, column and beam works.",
    tone: "white",
    cls: "lg:left-[0%] lg:top-[52%]",
    icon: "building",
  },
  {
    no: "02",
    title: "Interlock Paving",
    text: "Roads, driveways, footpaths, parking areas and yards, with concrete kerbstone and edge finishing.",
    tone: "dark",
    cls: "lg:left-[5%] lg:top-[8%]",
    icon: "layers",
  },
  {
    no: "03",
    title: "Heavy Machinery",
    text: "Plate compactors, concrete cutters, kerbing moulds, excavation tools and levelling equipment.",
    tone: "white",
    cls: "lg:right-[6%] lg:top-[8%]",
    icon: "truck",
  },
  {
    no: "04",
    title: "Building Maintenance",
    text: "Existing and new building maintenance, one time or yearly, with electrical, plumbing and waterproofing.",
    tone: "dark",
    cls: "lg:right-[0%] lg:top-[52%]",
    icon: "gear",
  },
];

const SERVICES = [
  {
    no: "01",
    title: "Building Maintenance & Civil Works",
    lead: "Civil, electrical, plumbing, HVAC, interior and fit-out, waterproofing and cleaning services, from one-time repairs to yearly maintenance.",
    groups: [
      { title: "Building Maintenance", items: ["Existing building maintenance", "New building maintenance", "One time maintenance", "Yearly maintenance"] },
      { title: "Civil", items: ["Block works, Plastering", "Tiles, Granite, Marble", "Interlock, Concrete works", "Footing, Column, Beam works"] },
      { title: "Electrical", items: ["Wiring, Cabling, Light fittings", "Panel Boards, DEWA meter", "Pump, Motor, Generator", "Flood Lights, Solar Lights"] },
      { title: "Roofing System", items: ["Sandwich Panel Roof", "Metal Roof, Concrete Roof", "Roof Tiles, Asbestos Roof", "Industrial, Warehouse Roof"] },
      { title: "Plumbing and Sanitary", items: ["Water Supply, Drainage system", "Sanitary Fittings, Water heater", "DEWA line connection", "Concealed WC, Mixer"] },
      { title: "Carpentry and Wood", items: ["Wooden Door, Cupboards", "Kitchen Cabinets", "Wooden Flooring, Skirting", "Wooden Pergola, Handrail"] },
      { title: "Microtopping and Flooring", items: ["Self Levelling, Microtopping", "Epoxy Flooring", "Industrial Concrete Flooring", "Vinyl, Carpet flooring"] },
      { title: "Waterproofing Solution", items: ["Combo water proofing", "Membrane waterproofing", "Chemical Injection", "Cementitious waterproofing"] },
      { title: "Painting", items: ["Wall, Ceiling Painting", "External painting using cradle", "Epoxy, Powder coated paint", "Floor, Steel, Wood painting"] },
    ],
  },
  {
    no: "02",
    title: "Interlock Paving & Kerbing",
    lead: "We provide complete interlock paving and kerbing solutions designed for durability, load resistance, and visual appeal.",
    groups: [
      {
        title: "What we lay",
        items: [
          "Interlock paving for roads and driveways",
          "Footpaths and walkways",
          "Parking areas and yards",
          "Villa and commercial paving works",
          "Concrete kerbstone installation",
          "Edge finishing and levelling works",
        ],
      },
      {
        title: "Our safety standards",
        items: ["We follow strict safety guidelines and proper site practices to protect our team and ensure safe, smooth, and reliable project execution."],
        prose: true,
      },
    ],
  },
];

const EQUIPMENT = [
  ["Plate compactors", E + "eq-plate-compactor.jpg"],
  ["Concrete cutters", E + "eq-concrete-cutter.jpg"],
  ["Kerbing moulds and tools", E + "eq-kerb-moulds.jpg"],
  ["Excavation tools", E + "eq-excavation-tools.jpg"],
  ["Levelling and alignment equipment", E + "eq-laser-leveling.jpg"],
  ["Transport and handling equipment", E + "eq-forklift.jpg"],
];

const CERTS = [
  { title: "Building Maintenance Works", licence: "5472", valid: "19-01-2026 to 19-01-2028", src: "/images/cert-building-maintenance.jpg" },
  { title: "Landscaping & Beautification Works", licence: "5392", valid: "04-11-2025 to 04-11-2027", src: "/images/cert-landscape.jpg" },
];

const MISSION = [
  "To establish and maintain professionalism in construction and building maintenance sectors.",
  "To provide technical and management services for our clients.",
  "To monitor our performance on all our projects.",
  "To continuously self-monitor performance for improvement and development.",
  "To perform and maintain the highest level of quality in construction.",
];
const VALUES = [
  "Commitment to quality, health, safety and environment.",
  "Transparency and discipline in our business.",
  "Innovation and accountability.",
];

/* ---------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */
const ARROW = <path d="M7 17L17 7M8 7h9v9" />;

function ArrowIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ARROW}
    </svg>
  );
}

/** Pill button with the circular arrow, as in the reference. */
function Pill({ href, children, tone = "light", onClick, type, className = "" }) {
  const light = tone === "light";
  const cls = `pill group inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-[11px] font-normal uppercase tracking-widest transition-colors ${
    light ? "bg-concrete-white text-concrete-black hover:bg-concrete-light" : "bg-concrete-stone text-concrete-white hover:bg-concrete-mid hover:text-concrete-black"
  } ${className}`;
  const dot = (
    <span className={`pill-dot grid h-9 w-9 place-items-center rounded-full ${light ? "bg-concrete-black text-concrete-white" : "bg-concrete-white text-concrete-black"}`}>
      <ArrowIcon />
    </span>
  );
  if (href)
    return (
      <a href={href} onClick={onClick} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {dot}
      </a>
    );
  return (
    <button type={type || "button"} onClick={onClick} className={cls}>
      {children}
      {dot}
    </button>
  );
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/** Image with a neutral fallback panel that names the expected file. */
function Img({ src, alt, className = "", position = "center", eager = false, imgClass = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`${/\b(absolute|relative|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-concrete-stone ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center p-4">
          <span className="text-center text-[10px] uppercase tracking-widest text-concrete-mid">{src}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full object-cover ${imgClass}`}
        />
      )}
    </div>
  );
}

const Small = ({ children, className = "" }) => (
  <p className={`text-[10px] font-light uppercase tracking-widest text-concrete-mid ${className}`}>{children}</p>
);

function Icon({ name }) {
  const paths = {
    building: "M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 11h2M13 11h2",
    layers: "M12 4l9 5-9 5-9-5zM3 14l9 5 9-5",
    truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    gear: "M12 9a3 3 0 100 6 3 3 0 000-6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1",
  };
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

/* ---------------------------------------------------------------
   Smooth scroll (Lenis) + hero parallax
---------------------------------------------------------------- */
function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    let id = 0;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      const el = hash.length > 1 ? document.querySelector(hash) : null;
      if (hash === "#top") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.6 });
      } else if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -8, duration: 1.6 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}

function useHeroParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) el.style.setProperty("--sy", String(y));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}

/* ---------------------------------------------------------------
   Sections
---------------------------------------------------------------- */
function Hero() {
  const ref = useRef(null);
  useHeroParallax(ref);
  const [open, setOpen] = useState(false);
  return (
    <section id="top" className="p-2 sm:p-3">
      <div ref={ref} className="relative isolate h-[calc(100svh-1rem)] min-h-[640px] overflow-hidden rounded-[22px] bg-concrete-black sm:h-[calc(100svh-1.5rem)] sm:rounded-[28px]">
        {/* 1. background plate (moves slowest of the layers behind the subject) */}
        <div className="hero-layer absolute inset-x-0 -bottom-[8%] -top-[8%] -z-30" style={{ "--k": 0.32 }}>
          <Img src="/images/hero-bg.jpg" alt="" className="absolute inset-0" eager position="center 60%" />
        </div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-concrete-black/55 via-concrete-black/10 to-concrete-black/80" aria-hidden="true" />

        {/* 2. giant type, behind the subject */}
        <div className="hero-layer pointer-events-none absolute inset-x-0 top-[13%] -z-10 select-none text-center sm:top-[15%]" style={{ "--k": 0.18 }} aria-hidden="true">
          <h1 className="giant text-[clamp(6rem,33vw,13rem)] sm:text-[clamp(8rem,19.5vw,26rem)]">
            <span className="block sm:inline">WE</span>
            <span className="block sm:ml-[0.12em] sm:inline">MAKE</span>
          </h1>
        </div>
        <h1 className="sr-only">We Make Constructions Co. WLL</h1>

        {/* 3. foreground subject, in front of the type */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[11%] z-0 flex justify-center sm:bottom-[10%] lg:right-[8%] lg:left-0 lg:bottom-[1%]">
          <img
            src="/images/hero-cutout.png"
            alt="A We Make site engineer in a branded hard hat recording notes on site"
            className="hero-layer h-[58svh] w-auto max-w-none sm:h-[66svh] lg:h-[67svh]"
            style={{ "--k": 0.06 }}
            loading="eager"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-[1] h-[48%] bg-gradient-to-t from-concrete-black via-concrete-black/70 to-transparent" aria-hidden="true" />

        {/* nav */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-5 sm:px-8 sm:pt-7">
          <a href="#top" aria-label="We Make Constructions, home">
            <img src="/images/logo-light.png" alt="We Make Constructions" className="h-14 w-auto sm:h-[4.25rem]" />
          </a>
          <nav className="hidden items-center gap-10 pt-2 text-[10px] uppercase tracking-widest md:flex lg:gap-14" aria-label="Primary">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-concrete-white/85 transition-colors hover:text-concrete-white">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden pt-2 text-[10px] uppercase tracking-widest text-concrete-white/85 hover:text-concrete-white md:inline-flex md:items-center md:gap-1">
            Request a quote <ArrowIcon size={11} />
          </a>
          <button type="button" className="pt-2 text-[10px] uppercase tracking-widest md:hidden" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((v) => !v)}>
            {open ? "Close" : "Menu"}
          </button>
          {open && (
            <nav id="mnav" className="absolute inset-x-3 top-20 rounded-3xl bg-concrete-stone/95 p-6 backdrop-blur md:hidden" aria-label="Mobile">
              <ul className="space-y-4 text-2xl font-extralight">
                {NAV.map(([l, h]) => (
                  <li key={h}><a href={h} onClick={() => setOpen(false)}>{l}</a></li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        {/* floating info cards */}
        <div className="absolute right-8 top-28 z-20 hidden w-60 flex-col gap-3 lg:flex xl:right-14">
          <div className="rounded-3xl bg-concrete-white p-4 text-concrete-black">
            <div className="flex items-start justify-between">
              <p className="text-[10px] uppercase leading-snug tracking-widest">Ministry of Works<br />Prequalification</p>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-concrete-black text-concrete-white"><ArrowIcon size={12} /></span>
            </div>
            <div className="mt-5 flex items-end justify-between text-[11px]">
              <span>Grade</span>
              <span className="text-lg font-light leading-none">E</span>
            </div>
          </div>
          <div className="rounded-3xl border border-concrete-white/25 bg-concrete-white/10 p-4 backdrop-blur-md">
            <div className="flex items-start justify-between">
              <p className="text-[10px] uppercase leading-snug tracking-widest">Based in<br />Manama</p>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-concrete-white text-concrete-black"><ArrowIcon size={12} /></span>
            </div>
            <div className="mt-5 flex items-end justify-between text-[11px]">
              <span className="text-concrete-white/70">Kingdom of</span>
              <span>Bahrain</span>
            </div>
          </div>
        </div>

        {/* bottom copy */}
        <div className="absolute inset-x-0 bottom-0 z-20 grid items-end gap-6 px-5 pb-8 sm:px-8 sm:pb-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-extralight leading-[1.08] tracking-tight">
              Building strength
              <br />
              beneath every step.
            </p>
            <p className="mt-3 max-w-xs text-[11px] font-light leading-relaxed text-concrete-white/65">
              Interlock paving and kerbing specialists, with skilled workmanship, modern equipment, and strict quality control.
            </p>
          </div>
          <div className="lg:justify-self-center">
            <Pill href="#projects">View projects</Pill>
          </div>
          <p className="hidden max-w-xs text-[11px] font-light leading-relaxed text-concrete-white/65 lg:block lg:justify-self-end">
            Welcome to {COMPANY}, a specialised contracting company serving residential, commercial and infrastructure projects across the Kingdom of Bahrain.
          </p>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-24 sm:px-8 lg:pt-32">
      <div className="grid gap-y-10 lg:grid-cols-[1fr_2fr_1fr]">
        <Small className="hidden lg:block">Civil, maintenance and paving</Small>
        <div>
          <Reveal>
            <h2 className="text-center text-[clamp(2.4rem,5.4vw,4.6rem)] font-normal uppercase leading-[0.95] tracking-tight">
              Built with precision and care
            </h2>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-10 grid max-w-xl grid-cols-[1fr_auto] items-start gap-6 sm:gap-10">
            <div>
              <p className="text-[11px] font-light leading-relaxed text-concrete-white/70">
                The highest standard of quality and service, professionalism and integrity, for utilities, businesses and other
                areas of construction and maintenance across Bahrain.
              </p>
              <a href="#about" className="mt-10 inline-block text-[10px] uppercase tracking-widest">Scroll to explore</a>
            </div>
            <Img src="/images/worker-site.jpg" alt="A We Make team member on a finished interlock street" className="h-24 w-36 rounded-2xl sm:h-28 sm:w-40" position="center 62%" />
          </Reveal>
        </div>
        <Small className="self-end text-left lg:text-right">Designed to last for years</Small>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 pb-20 pt-16 sm:px-8 lg:pb-28 lg:pt-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-[clamp(2.6rem,5vw,4.4rem)] font-normal uppercase leading-[0.95] tracking-tight">About We Make</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[clamp(1.5rem,2.4vw,2rem)] font-extralight leading-tight tracking-tight">We build what lasts.</p>
          <p className="mt-5 max-w-lg text-[11px] font-light leading-[1.9] text-concrete-white/65">
            {COMPANY} is prequalified by the Kingdom of Bahrain Ministry of Works at Grade E for Building Maintenance Works and for
            Landscaping &amp; Beautification Works. We are specialised in civil, electrical, plumbing, HVAC, interior and fit-out,
            waterproofing and cleaning services, and in interlock paving and kerbing. We have the best engineers, supervisors,
            technicians and labour, who are dependable, knowledgeable and professional, and are the key to our successful progress
            of business.
          </p>
          <div className="mt-8">
            <Pill href="#divisions">Explore divisions</Pill>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-20 grid gap-10 border-t border-concrete-white/15 pt-10 lg:grid-cols-3">
        <div>
          <Small>Our vision</Small>
          <p className="mt-4 text-[13px] font-light leading-relaxed text-concrete-white/80">
            To be the customer&rsquo;s first choice in construction and building maintenance services. In paving and surface
            construction, to become a leading name by continuously improving workmanship, adopting modern techniques, and
            building long-term client relationships.
          </p>
        </div>
        <div>
          <Small>Our mission</Small>
          <p className="mt-4 text-[13px] font-light leading-relaxed text-concrete-white/80">
            To deliver reliable and cost-effective solutions while maintaining the highest standards of quality, safety, and
            customer satisfaction.
          </p>
          <ul className="mt-4 space-y-2 text-[11px] leading-relaxed text-concrete-white/55">
            {MISSION.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <Small>Our values</Small>
          <ul className="mt-4 space-y-3 text-[13px] font-light leading-relaxed text-concrete-white/80">
            {VALUES.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function Carousel() {
  const ref = useRef(null);
  const by = (dir) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8">
      <Reveal className="mb-8 flex items-end justify-between gap-6 lg:hidden">
        <Small>Our projects</Small>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-[13rem_1fr]">
        <div className="flex items-start gap-2 lg:items-center lg:self-start lg:pt-20">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => by(d)}
              aria-label={d < 0 ? "Previous projects" : "Next projects"}
              className="grid h-10 w-10 place-items-center rounded-full border border-concrete-white/40 transition-colors hover:bg-concrete-white hover:text-concrete-black"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={d < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          ))}
        </div>
        <div ref={ref} className="no-scrollbar -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-5 sm:-mr-8 sm:pr-8" data-lenis-prevent-wheel>
          {PROJECTS.map((p) => (
            <article key={p.src} data-card className="card group relative aspect-[5/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-[26px] sm:w-[46%] lg:w-[31.5%]">
              <Img src={p.src} alt={`${p.name}, ${p.place}`} className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105" position={p.pos} />
              <div className="absolute inset-0 bg-gradient-to-t from-concrete-black/75 via-transparent to-concrete-black/10" aria-hidden="true" />
              <span className="card-badge absolute right-3 top-3 grid h-9 w-9 origin-top-right place-items-center rounded-full bg-concrete-white text-concrete-black">
                <ArrowIcon size={13} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[13px] font-normal leading-tight">{p.name}</p>
                <p className="mt-1 text-[9px] uppercase tracking-widest text-concrete-white/65">{p.place}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Small className="!text-concrete-white/50">Project status: completed</Small>
        <Small className="!text-concrete-white/50">Kingdom of Bahrain</Small>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="divisions" className="p-2 pt-16 sm:p-3 sm:pt-24">
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-concrete-white via-concrete-light to-concrete-mid/60 px-5 pb-16 pt-14 text-concrete-black sm:rounded-[28px] sm:px-8 lg:pb-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-normal uppercase leading-[0.98] tracking-tight">Precision meets infrastructure</h2>
          <p className="mx-auto mt-5 max-w-md text-[11px] font-light leading-relaxed text-concrete-stone/80">
            Civil works, interlock paving, heavy machinery and building maintenance, delivered by one team with strict quality
            control, so every project is durable, aesthetic and long-lasting.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-5xl lg:h-[34rem]">
          <Reveal delay={60} className="mx-auto w-full max-w-[34rem] lg:absolute lg:inset-x-0 lg:top-6">
            <Img src="/images/worker-site.jpg" alt="Finished interlock paving and kerbing on a Bahrain street" className="aspect-[5/4] rounded-[26px]" position="center 66%" />
          </Reveal>

          {FEATURES.map((f, i) => {
            const dark = f.tone === "dark";
            return (
              <Reveal
                key={f.no}
                delay={120 + i * 90}
                className={`mt-4 w-full rounded-[26px] p-5 lg:absolute lg:mt-0 lg:w-[16rem] ${f.cls} ${
                  dark ? "bg-concrete-stone/95 text-concrete-white" : "bg-concrete-white text-concrete-black shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest opacity-70">{f.no}</p>
                    <h3 className="mt-0.5 text-[11px] font-normal uppercase tracking-widest">{f.title}</h3>
                  </div>
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${dark ? "bg-concrete-white text-concrete-black" : "bg-concrete-black text-concrete-white"}`}>
                    <ArrowIcon size={12} />
                  </span>
                </div>
                <div className={`my-3 h-px ${dark ? "bg-concrete-white/20" : "bg-concrete-black/10"}`} />
                <p className={`text-[11px] font-light leading-relaxed ${dark ? "text-concrete-white/70" : "text-concrete-stone/80"}`}>{f.text}</p>
                <span className={`absolute -top-3 ${i % 2 ? "-right-3" : "-left-3"} grid h-9 w-9 place-items-center rounded-full border backdrop-blur ${dark ? "border-concrete-white/30 bg-concrete-stone/80 text-concrete-white" : "border-concrete-black/10 bg-concrete-white/80 text-concrete-black"}`}>
                  <Icon name={f.icon} />
                </span>
              </Reveal>
            );
          })}

          <div className="mt-8 flex justify-center lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
            <Pill href="#services">Discover more</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-5 pb-20 pt-24 sm:px-8 lg:pt-32">
      <Reveal className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Small>Our services</Small>
        <h2 className="text-[clamp(2rem,4.2vw,3.6rem)] font-normal uppercase leading-[0.98] tracking-tight">Some of the services provided by us</h2>
      </Reveal>
      <div className="mt-12 border-t border-concrete-white/15">
        {SERVICES.map((d, i) => {
          const isOpen = open === i;
          return (
            <div key={d.no} className="border-b border-concrete-white/15">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${d.no}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left lg:grid-cols-[1fr_2fr_auto]"
                >
                  <span className="text-[10px] tracking-widest text-concrete-mid">{d.no}</span>
                  <span className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-extralight tracking-tight">{d.title}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-concrete-white/40 text-lg leading-none" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div id={`svc-${d.no}`} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="pb-10 lg:pl-[calc(33.333%+1rem)]">
                    <p className="max-w-lg text-[12px] font-light leading-relaxed text-concrete-white/65">{d.lead}</p>
                    <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                      {d.groups.map((g) => (
                        <div key={g.title} className={g.prose ? "sm:col-span-2 xl:col-span-1" : ""}>
                          <h4 className="border-t border-concrete-white/15 pt-3 text-[10px] uppercase tracking-widest text-concrete-mid">{g.title}</h4>
                          {g.prose ? (
                            <p className="mt-3 text-[12px] font-light leading-relaxed text-concrete-white/75">{g.items[0]}</p>
                          ) : (
                            <ul className="mt-3 space-y-1.5 text-[12px] font-light text-concrete-white/80">
                              {g.items.map((it) => (
                                <li key={it}>{it}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EquipmentSlider() {
  const [i, setI] = useState(0);
  const n = EQUIPMENT.length;
  const next = (i + 1) % n;
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-concrete-stone lg:aspect-[1/1]">
          {EQUIPMENT.map(([cap, src], k) => (
            <div key={cap} className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`} aria-hidden={k !== i}>
              <Img src={src} alt={cap} className="absolute inset-0" position="center" />
            </div>
          ))}
        </Reveal>
        <Reveal delay={100} className="flex flex-col">
          <Small>Our equipment</Small>
          <h2 className="mt-3 text-[clamp(2.2rem,4.4vw,4rem)] font-normal uppercase leading-[0.98] tracking-tight">Equipment on every site</h2>
          <p className="mt-6 max-w-sm self-end text-[11px] font-light leading-relaxed text-concrete-white/65 lg:max-w-xs">
            We utilize well-maintained machinery and tools to ensure efficiency, precision, and safety in every project.
          </p>
          <div className="mt-10 flex items-center gap-4 text-concrete-white">
            {[-1, 1].map((d) => (
              <button key={d} type="button" onClick={() => go(d)} aria-label={d < 0 ? "Previous equipment" : "Next equipment"} className="p-1">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={d < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-6">
            <div>
              <p aria-live="polite" className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-extralight leading-tight tracking-tight">{EQUIPMENT[i][0]}</p>
              <p className="mt-3 max-w-[16rem] text-[11px] font-light leading-relaxed text-concrete-white/60">
                {i + 1} of {n}. Tools and machinery that keep paving, kerbing and civil works precise, safe and on time.
              </p>
            </div>
            <Img src={EQUIPMENT[next][1]} alt="" className="hidden h-36 w-28 rounded-2xl sm:block" />
          </div>
          <div className="mt-8">
            <Pill href="#projects">View projects</Pill>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Certificates() {
  return (
    <section id="accreditation" className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8">
      <Reveal className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Small>Our certificates</Small>
        <div>
          <h2 className="text-[clamp(2rem,4.2vw,3.6rem)] font-normal uppercase leading-[0.98] tracking-tight">Issued by the Ministry of Works</h2>
          <p className="mt-4 max-w-md text-[11px] font-light leading-relaxed text-concrete-white/65">
            Kingdom of Bahrain. Grade E for Building Maintenance Works and for Landscaping &amp; Beautification Works.
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {CERTS.map((c, i) => (
          <Reveal key={c.licence} delay={i * 100} as="figure" className="rounded-[26px] bg-concrete-white p-4 text-concrete-black">
            <Img src={c.src} alt={`Ministry of Works certificate: ${c.title}, Grade E`} className="aspect-[1917/1370] rounded-2xl !bg-concrete-white" imgClass="!object-contain" />
            <figcaption className="mt-4 flex items-end justify-between gap-4 px-1 pb-1">
              <div>
                <p className="text-[13px] font-normal">{c.title}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-concrete-stone/70">Licence {c.licence} / {c.valid}</p>
              </div>
              <p className="text-3xl font-extralight tracking-tight">E</p>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone")}\n\nI would like to request a consultation.`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field =
    "w-full border-0 border-b border-concrete-white/35 bg-transparent py-3 text-[12px] font-light uppercase tracking-wider text-concrete-white placeholder:text-concrete-white/60 focus:border-concrete-white focus:outline-none focus:ring-0";
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 pb-24 pt-8 sm:px-8 lg:pb-32">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-[clamp(2.4rem,4.8vw,4.2rem)] font-normal uppercase leading-[0.98] tracking-tight">Ready to start your project?</h2>
          <form onSubmit={submit} className="mt-12 max-w-sm space-y-2 lg:ml-[22%]">
            <label className="sr-only" htmlFor="c-name">Your name</label>
            <input id="c-name" name="name" required placeholder="Your name" autoComplete="name" className={field} />
            <label className="sr-only" htmlFor="c-email">Your email</label>
            <input id="c-email" name="email" type="email" required placeholder="Your email" autoComplete="email" className={field} />
            <label className="sr-only" htmlFor="c-phone">Phone</label>
            <input id="c-phone" name="phone" type="tel" placeholder="+973 0000 0000" autoComplete="tel" className={field} />
            <div className="pt-8">
              <Pill type="submit">{sent ? "Opening your email" : "Request private consultation"}</Pill>
            </div>
          </form>
        </Reveal>
        <Reveal delay={100} className="lg:pt-4">
          <p className="max-w-xs text-[11px] font-light leading-relaxed text-concrete-white/65 lg:ml-auto lg:mr-[8%]">
            Leave your contact details, and our team will get in touch to guide you through the process, discuss your scope, and arrange a site visit.
          </p>
          <Img src="/images/projects/contact-site.jpg" alt="We Make crew inside a concrete building shell on site" className="mt-8 aspect-[4/5] rounded-[26px] sm:aspect-[5/4] lg:aspect-[4/5]" position="center 40%" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="visit" className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-8">
      <div className="grid items-end gap-10 lg:grid-cols-12">
        <p className="giant giant-fade select-none text-[clamp(6rem,28vw,28rem)] leading-[0.78] lg:col-span-8 lg:text-[clamp(8rem,14.2vw,20rem)]" aria-hidden="true">
          <span className="block sm:inline">WE</span>
          <span className="block sm:ml-[0.1em] sm:inline">MAKE</span>
        </p>
        <Reveal className="lg:col-span-4 lg:pb-10">
          <p className="text-[clamp(1.5rem,2.3vw,2rem)] font-extralight leading-[1.08] tracking-tight">
            Built with precision and care. Designed to last for years.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-between border-b border-concrete-white/40 pb-3 text-[12px] font-light text-concrete-white/80 hover:text-concrete-white"
          >
            Enquire on WhatsApp <ArrowIcon size={12} />
          </a>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 text-[11px] uppercase tracking-wider sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
        <p className="text-[10px] normal-case tracking-normal text-concrete-white/55">&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
        <div>
          <h3 className="text-[12px] font-normal tracking-wider">Menu</h3>
          <ul className="mt-5 space-y-2 text-[10px] text-concrete-white/70">
            {NAV.map(([l, h]) => (
              <li key={h}><a href={h} className="hover:text-concrete-white">{l}</a></li>
            ))}
            <li><a href="#accreditation" className="hover:text-concrete-white">Certificates</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[12px] font-normal tracking-wider">Contact us</h3>
          <ul className="mt-5 space-y-2 text-[10px] text-concrete-white/70">
            <li><a href={`mailto:${EMAIL}`} className="break-all hover:text-concrete-white">{EMAIL}</a></li>
            {PHONES.map((p) => (
              <li key={p.href}><a href={p.href} className="hover:text-concrete-white">{p.label}</a></li>
            ))}
            <li className="normal-case">{WEB}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-[12px] font-normal tracking-wider">Visit us</h3>
          <address className="mt-5 text-[10px] not-italic leading-relaxed text-concrete-white/70">
            Flat 0, Building 1249
            <br />
            Road 2113, Block 321
            <br />
            Manama, Bahrain
          </address>
        </div>
        <div>
          <h3 className="text-[12px] font-normal tracking-wider">Registration</h3>
          <p className="mt-5 text-[10px] text-concrete-white/70">CR {CR}</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useSmoothScroll();
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <About />
        <Carousel />
        <Features />
        <Services />
        <EquipmentSlider />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
