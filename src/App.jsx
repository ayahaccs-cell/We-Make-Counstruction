import React, { useEffect, useRef, useState } from "react";

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
  ["Projects", "#work"],
  ["About", "#about"],
  ["Divisions", "#divisions"],
  ["Accreditation", "#accreditation"],
  ["Contact", "#contact"],
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "civil", label: "Civil & Maintenance" },
  { id: "paving", label: "Paving & Infrastructure" },
  { id: "commercial", label: "Commercial & Energy" },
];

const WHY = ["Expertise", "Quality", "On-Time", "Equipment", "Skilled Team", "Value"];

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

const E = "/images/projects/";
const DIVISIONS = [
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
  {
    no: "03",
    title: "Equipment",
    lead: "We utilize well-maintained machinery and tools to ensure efficiency, precision, and safety in every project.",
    photos: [
      ["Plate compactors", E + "eq-plate-compactor.jpg"],
      ["Concrete cutters", E + "eq-concrete-cutter.jpg"],
      ["Kerbing moulds and tools", E + "eq-kerb-moulds.jpg"],
      ["Excavation tools", E + "eq-excavation-tools.jpg"],
      ["Levelling and alignment equipment", E + "eq-laser-leveling.jpg"],
      ["Transport and handling equipment", E + "eq-forklift.jpg"],
    ],
  },
];

const SECTORS = [
  ["Energy and fuel retail", "Bapco Energies petrol stations"],
  ["Education", "Royal University for Women"],
  ["Hospitality", "Delmon International Hotel"],
  ["Sports and community", "Budaiya Sports Club"],
  ["Residential", "Al Naseem Villas, Zawia 1, Villa Hidd"],
  ["Roads and infrastructure", "Road works with interlock paving and kerbing"],
];

/* Featured grid. Placement classes are written out in full so Tailwind can see them. */
const FEATURED = [
  { name: "Royal University for Women", place: "Awali", tag: "Institutional", src: E + "royal-university.jpg", pos: "30% center", place_cls: "lg:col-start-2 lg:row-start-7 lg:row-span-3" },
  { name: "Bapco Energies Petrol Stations", place: "Bahrain", tag: "Infrastructure / Paving", src: E + "bapco-diplomatic.jpg", pos: "center 45%", place_cls: "lg:col-start-2 lg:row-start-1 lg:row-span-6" },
  { name: "Al Naseem Villas", place: "Bahrain", tag: "Residential", src: E + "al-naseem-villas.jpg", pos: "center", place_cls: "lg:col-start-3 lg:row-start-1 lg:row-span-4" },
  { name: "Delmon International Hotel", place: "Bahrain", tag: "Hospitality", src: E + "delmon-hotel.jpg", pos: "center 40%", place_cls: "lg:col-start-3 lg:row-start-5 lg:row-span-4" },
  { name: "Zawia 1, Amwaj", place: "Amwaj Islands", tag: "Commercial Fitout", src: E + "zawia-amwaj.jpg", pos: "center", place_cls: "lg:col-start-1 lg:row-start-7 lg:row-span-6" },
  { name: "Budaiya Sports Club", place: "Budaiya", tag: "Public Facility", src: E + "budaiya-sports-club.jpg", pos: "center", place_cls: "lg:col-start-2 lg:row-start-10 lg:row-span-3" },
  { name: "Villa Hidd Projects", place: "Hidd", tag: "Civil Works", src: E + "villa-hidd-1.jpg", pos: "center 35%", place_cls: "lg:col-start-3 lg:row-start-9 lg:row-span-4" },
];

const PROJECTS = [
  { name: "Bapco Energies, Diplomatic Station", sector: "Energy", place: "Diplomatic Area", cats: ["paving", "commercial"], src: E + "bapco-diplomatic.jpg" },
  { name: "Bapco Energies, Diyar Al Muharraq", sector: "Energy", place: "Diyar Al Muharraq", cats: ["paving", "commercial"], src: E + "bapco-diyar.jpg" },
  { name: "Bapco Energies, Adliya", sector: "Energy", place: "Adliya", cats: ["paving", "commercial"], src: E + "bapco-adliya.jpg" },
  { name: "Bapco Energies, Hamad Town", sector: "Energy", place: "Hamad Town", cats: ["paving", "commercial"], src: E + "bapco-hamad-town.jpg" },
  { name: "Bapco Energies, Hoora", sector: "Energy", place: "Hoora", cats: ["paving", "commercial"], src: E + "bapco-hoora.jpg" },
  { name: "Road Works", sector: "Roads", place: "Interlock carriageway and kerbs", cats: ["paving"], src: E + "road-works-1.jpg" },
  { name: "Road Works", sector: "Roads", place: "Interlock road with kerb edge", cats: ["paving"], src: E + "road-works-2.jpg" },
  { name: "Royal University for Women", sector: "Education", place: "Awali", cats: ["civil"], src: E + "royal-university.jpg" },
  { name: "Budaiya Sports Club", sector: "Sports", place: "Budaiya", cats: ["civil"], src: E + "budaiya-sports-club.jpg" },
  { name: "Al Naseem Villas", sector: "Residential", place: "Bahrain", cats: ["civil", "paving"], src: E + "al-naseem-villas.jpg" },
  { name: "Villa Hidd, Project 1", sector: "Residential", place: "Hidd", cats: ["civil"], src: E + "villa-hidd-1.jpg" },
  { name: "Zawia 1", sector: "Residential", place: "Amwaj Islands", cats: ["civil"], src: E + "zawia-amwaj.jpg" },
  { name: "Delmon International Hotel", sector: "Hospitality", place: "Bahrain", cats: ["civil", "commercial"], src: E + "delmon-hotel.jpg" },
  { name: "Villa Hidd, Project 2", sector: "Residential", place: "Hidd", cats: ["civil"], src: E + "villa-hidd-2.jpg" },
];

const CERTS = [
  { title: "Building Maintenance Works", licence: "5472", valid: "19-01-2026 to 19-01-2028", src: "/images/cert-building-maintenance.jpg" },
  { title: "Landscaping & Beautification Works", licence: "5392", valid: "04-11-2025 to 04-11-2027", src: "/images/cert-landscape.jpg" },
];

/* ---------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */
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
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
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

/** Photo frame with hover zoom; shows a neutral panel with the expected filename if an image is missing. */
function Photo({ src, alt, className = "", imgClassName = "", zoom = true, position = "center", eager = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`${/\b(absolute|relative)\b/.test(className) ? "" : "relative"} overflow-hidden bg-stone-line ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center p-4">
          <span className="text-center text-xs uppercase tracking-[0.2em] text-stone-500">{src}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full object-cover ${
            zoom ? "transition-transform duration-700 ease-out group-hover:scale-105" : ""
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}

const Label = ({ children, className = "" }) => (
  <p className={`text-xs font-medium uppercase tracking-[0.25em] text-stone-500 ${className}`}>{children}</p>
);

const Arrow = ({ className = "" }) => (
  <svg viewBox="0 0 24 8" width="22" height="8" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <path d="M0 4h22M18 1l4 3-4 3" />
  </svg>
);

/* ---------------------------------------------------------------
   Sections
---------------------------------------------------------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const light = !solid && !open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? "bg-transparent" : "border-b border-stone-line bg-stone-canvas/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <a href="#top" aria-label="We Make Constructions, home" className="flex items-center">
          <img
            src={light ? "/images/logo-light.png" : "/images/logo.png"}
            alt="We Make Constructions"
            className="h-12 w-auto sm:h-14"
          />
        </a>
        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {NAV.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className={`text-[11px] font-normal uppercase tracking-[0.25em] transition-colors ${
                light ? "text-white/80 hover:text-white" : "text-espresso/70 hover:text-espresso"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={`text-[11px] uppercase tracking-[0.25em] md:hidden ${light ? "text-white" : "text-espresso"}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-stone-line bg-stone-canvas px-5 py-6 md:hidden" aria-label="Mobile">
          <ul className="space-y-4">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <a href={h} onClick={() => setOpen(false)} className="serif-display text-3xl">{l}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-espresso text-white">
      <Photo
        src="/images/hero-paving.jpg"
        alt="A We Make paving specialist laying interlock paving on a Bahrain street"
        className="absolute inset-0 bg-espresso"
        imgClassName="hero-img"
        position="45% 30%"
        zoom={false}
        eager
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-16 text-center sm:pb-24">
        <h1 className="serif-display text-[clamp(3.6rem,12.5vw,11.5rem)]">
          We Make
          <br />
          Constructions
        </h1>
        <div className="mt-8 flex w-full max-w-5xl items-center justify-center gap-4 sm:mt-10 sm:gap-6">
          <span className="hidden h-px w-12 bg-white/50 sm:block lg:w-24" aria-hidden="true" />
          <p className="text-[10px] font-light uppercase leading-relaxed tracking-[0.22em] text-white/75 sm:text-xs md:tracking-[0.3em] lg:whitespace-nowrap">
            Certified Civil &amp; Infrastructure Contractors | Bahrain
          </p>
          <span className="hidden h-px w-12 bg-white/50 sm:block lg:w-24" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ p, i }) {
  return (
    <Reveal as="article" delay={(i % 3) * 90} className={`group relative min-h-[15rem] lg:min-h-0 ${p.place_cls}`}>
      <a href="#portfolio" className="absolute inset-0 block" aria-label={`${p.name}, ${p.place}`}>
        <Photo src={p.src} alt={`${p.name}, ${p.place}`} position={p.pos} className="h-full w-full rounded-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
          <div>
            <p className="text-[15px] font-normal leading-snug">{p.name}</p>
            <p className="mt-0.5 text-[10px] font-light uppercase tracking-[0.2em] text-white/70">{p.tag}</p>
          </div>
          <Arrow className="shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
        </div>
      </a>
    </Reveal>
  );
}

const BADGES = [
  {
    t: "Ministry of Works Grade E",
    s: "Building Maintenance Works, Lic. 5472",
    icon: <path d="M8 6h24v28H8zM15 14h11M15 14v13M15 20h9M15 27h11" />,
  },
  {
    t: "Ministry of Works Grade E",
    s: "Landscaping & Beautification, Lic. 5392",
    icon: <path d="M8 32C8 18 17 8 32 8c0 14-9 24-24 24zM8 32L24 16" />,
  },
  {
    t: "Commercial Registration",
    s: `CR ${CR}, Kingdom of Bahrain`,
    icon: <path d="M10 6h14l6 6v22H10zM24 6v6h6M15 20h10M15 26h10" />,
  },
  {
    t: "Specialized Fleet",
    s: "In-house heavy machinery and laser paving",
    icon: <path d="M20 12a8 8 0 100 16 8 8 0 000-16zM20 6v6M20 28v6M6 20h6M28 20h6M10 10l4 4M26 26l4 4M30 10l-4 4M14 26l-4 4" />,
  },
  {
    t: "Dedicated Workforce",
    s: "Dependable civil and technical labour",
    icon: <path d="M14 14a4 4 0 100-8 4 4 0 000 8zM6 32c0-6 3-10 8-10s8 4 8 10M27 15a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM25 22c5-1 9 2 9 9" />,
  },
];

function Work() {
  return (
    <section id="work" className="bg-stone-canvas">
      <div className="mx-auto max-w-[1500px] px-5 pb-6 pt-20 lg:px-10 lg:pt-28">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[0.75fr_1fr_1fr] lg:grid-rows-[repeat(12,3.5rem)] xl:grid-rows-[repeat(12,3.9rem)]">
          <Reveal className="col-span-2 mb-8 lg:col-span-1 lg:col-start-1 lg:row-span-6 lg:row-start-1 lg:mb-0 lg:pr-8">
            <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Our work <span className="h-px w-6 bg-stone-500/60" aria-hidden="true" />
            </p>
            <h2 className="serif-display mt-10 text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.08] text-espresso">
              Strength in
              <br />
              every layer.
            </h2>
            <p className="mt-8 max-w-[22rem] text-[13px] leading-[1.9] text-espresso/60">
              We deliver enduring civil infrastructure, building maintenance, and precision interlock paving that
              balances technical durability and architectural finish.
            </p>
            <a
              href="#portfolio"
              className="mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] hover:underline"
            >
              Explore all projects <Arrow />
            </a>
          </Reveal>
          {FEATURED.map((p, i) => (
            <FeaturedCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>

      {/* Recognised for excellence */}
      <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <Reveal className="grid items-stretch gap-y-10 lg:grid-cols-[1.1fr_repeat(5,1fr)]">
          <div className="lg:pr-6 lg:pt-6">
            <p className="max-w-[10rem] text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-stone-500">
              Recognized for excellence
            </p>
            <span className="mt-4 block h-px w-4 bg-stone-500/60" aria-hidden="true" />
          </div>
          {BADGES.map((b, i) => (
            <div
              key={b.s}
              className={`flex flex-col items-center px-3 text-center ${
                i === 0 ? "lg:border-l lg:border-stone-line" : "lg:border-l lg:border-stone-line"
              }`}
            >
              <svg viewBox="0 0 40 40" width="44" height="44" fill="none" stroke="#1C1917" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" aria-hidden="true">
                {b.icon}
              </svg>
              <p className="mt-5 text-[10px] font-medium uppercase leading-relaxed tracking-[0.15em] text-stone-600">{b.t}</p>
              <p className="mt-2 text-[10px] font-light uppercase leading-relaxed tracking-[0.12em] text-stone-500">{b.s}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-stone-line">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
        <Reveal className="lg:col-span-6">
          <Label>About us</Label>
          <h2 className="serif-display mt-6 text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.98]">
            Built with precision and care. Designed to last for years.
          </h2>
          <Photo
            src="/images/worker-site.jpg"
            alt="A We Make team member on a finished interlock street with a wheelbarrow of pavers"
            className="mt-12 aspect-[4/5] max-w-md rounded-sm"
            position="center 60%"
          />
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-[15px] leading-[1.9] text-espresso/70 lg:col-span-6 lg:pt-14">
          <p>
            <strong className="font-medium text-espresso">{COMPANY}</strong> is available for utilities, businesses
            and other various areas of construction and maintenance, providing the highest standard of quality and
            service, professionalism and integrity. We concentrate on favourable references from satisfied customers,
            which helps us expand our business through moderate growth and prosperity.
          </p>
          <p>
            We are specialised in the civil, electrical, plumbing, HVAC, interior and fit-out, waterproofing and
            cleaning services field, and in interlock paving and kerbing for residential, commercial and
            infrastructure projects. With skilled workmanship, modern equipment, and strict quality control, we
            ensure durable, aesthetic, and long-lasting works tailored to client requirements.
          </p>
          <p>
            We have the best engineers, supervisors, technicians and labour, who are dependable, knowledgeable and
            professional, and are the key to our successful progress of business. Our team is committed to timely
            execution, safety standards, and customer satisfaction, making us a trusted partner for projects of all
            scales.
          </p>
        </Reveal>
      </div>

      <div className="border-t border-stone-line">
        <div className="mx-auto max-w-[1500px] px-5 pt-6 lg:px-10">
          <Label>Why choose us</Label>
        </div>
        <ul className="mx-auto grid max-w-[1500px] grid-cols-2 px-5 sm:grid-cols-3 lg:grid-cols-6 lg:px-10">
          {WHY.map((w, i) => (
            <li
              key={w}
              className={`border-stone-line py-7 font-serif text-2xl font-light tracking-tight lg:pl-6 lg:first:pl-0 ${
                i > 0 ? "lg:border-l" : ""
              } ${i % 2 === 1 ? "pl-4 sm:pl-0" : ""}`}
            >
              {w}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Purpose() {
  const rows = [
    {
      h: "Our Vision",
      body: (
        <p className="max-w-xl font-serif text-2xl font-light leading-snug sm:text-3xl">
          To be the customer&rsquo;s first choice in construction and building maintenance services. In paving and
          surface construction, to become a leading name by continuously improving workmanship, adopting modern
          techniques, and building long-term client relationships.
        </p>
      ),
    },
    {
      h: "Our Mission",
      body: (
        <>
          <p className="max-w-xl font-serif text-2xl font-light leading-snug sm:text-3xl">
            To deliver reliable and cost-effective solutions while maintaining the highest standards of quality,
            safety, and customer satisfaction.
          </p>
          <ul className="mt-8 max-w-xl">
            {MISSION.map((m) => (
              <li key={m} className="border-t border-stone-line py-3 text-[13px] leading-relaxed text-espresso/65">{m}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      h: "Our Values",
      body: (
        <ul className="max-w-xl">
          {VALUES.map((v) => (
            <li key={v} className="border-t border-stone-line py-4 font-serif text-2xl font-light tracking-tight first:border-t-0 first:pt-0">{v}</li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <section className="border-t border-stone-line">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        {rows.map((r, i) => (
          <Reveal key={r.h} delay={i * 60} className="grid gap-5 border-t border-stone-line py-12 first:border-t-0 first:pt-0 lg:grid-cols-12">
            <h2 className="serif-display text-4xl sm:text-5xl lg:col-span-4">{r.h}</h2>
            <div className="lg:col-span-8">{r.body}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Divisions() {
  const [open, setOpen] = useState(0);
  return (
    <section id="divisions" className="border-t border-stone-line">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">Our divisions</Label>
          <h2 className="serif-display text-[clamp(2.6rem,5.5vw,5rem)] lg:col-span-9">
            Some of the services provided by us.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-stone-line lg:mt-20">
          {DIVISIONS.map((d, i) => {
            const isOpen = open === i;
            return (
              <div key={d.no} className="border-b border-stone-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`div-${d.no}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 text-left lg:grid-cols-12 lg:py-9"
                  >
                    <span className="text-xs tracking-[0.2em] text-stone-500 lg:col-span-3">{d.no}</span>
                    <span className="font-serif text-3xl font-light leading-tight tracking-tight transition-colors group-hover:text-navy sm:text-4xl lg:col-span-8 lg:text-5xl">
                      {d.title}
                    </span>
                    <span aria-hidden="true" className="text-2xl font-light leading-none lg:col-span-1 lg:text-right">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`div-${d.no}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-12">
                      <p className="max-w-xl text-[15px] leading-[1.8] text-espresso/65 lg:ml-[25%]">{d.lead}</p>

                      {d.groups && (
                        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                          {d.groups.map((g) => (
                            <div key={g.title} className={g.prose ? "sm:col-span-2 lg:col-span-1" : ""}>
                              <h4 className="border-t border-stone-line pt-3 text-[11px] font-medium uppercase tracking-[0.2em]">{g.title}</h4>
                              {g.prose ? (
                                <p className="mt-3 text-sm leading-relaxed text-espresso/65">{g.items[0]}</p>
                              ) : (
                                <ul className="mt-3 space-y-1.5 text-sm text-espresso/75">
                                  {g.items.map((it) => (
                                    <li key={it}>{it}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {d.photos && (
                        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3">
                          {d.photos.map(([cap, src]) => (
                            <li key={cap} className="group">
                              <Photo src={src} alt={cap} className="aspect-[4/3] rounded-sm" />
                              <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-espresso/70">{cap}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="border-t border-stone-line">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <Reveal className="lg:col-span-4">
          <Label>Sectors</Label>
          <h2 className="serif-display mt-6 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.05]">
            Residential, commercial and infrastructure projects.
          </h2>
        </Reveal>
        <Reveal as="ul" delay={100} className="border-t border-stone-line lg:col-span-8">
          {SECTORS.map(([s, ex]) => (
            <li key={s} className="grid gap-1 border-b border-stone-line py-5 sm:grid-cols-2">
              <span className="font-serif text-2xl font-light tracking-tight">{s}</span>
              <span className="text-sm leading-relaxed text-espresso/60 sm:pt-2">{ex}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("all");
  const list = PROJECTS.filter((p) => filter === "all" || p.cats.includes(filter));
  return (
    <section id="portfolio" className="border-t border-stone-line">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">All projects</Label>
          <h2 className="serif-display text-[clamp(2.6rem,5.5vw,5rem)] lg:col-span-9">
            Built across the Kingdom of Bahrain.
          </h2>
        </Reveal>

        <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-y border-stone-line py-4">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`link-u pb-0.5 text-[11px] uppercase tracking-[0.2em] ${
                filter === f.id ? "font-semibold text-navy" : "text-espresso/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.src}>
              <Reveal as="article" delay={(i % 3) * 80} className="group">
                <Photo src={p.src} alt={`${p.name}, ${p.place}`} className="aspect-[4/3] rounded-sm" />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light leading-tight tracking-tight">{p.name}</h3>
                  <Label className="shrink-0 pt-2 !text-[10px] !tracking-[0.2em]">{p.sector}</Label>
                </div>
                <p className="mt-1 text-sm text-espresso/60">{p.place}, Bahrain</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Accreditation() {
  return (
    <section id="accreditation" className="border-t border-stone-line">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">Our certificates</Label>
          <div className="lg:col-span-9">
            <h2 className="serif-display text-[clamp(2.6rem,5.5vw,5rem)]">
              Issued by the Ministry of Works, Kingdom of Bahrain.
            </h2>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.8] text-espresso/65">
              Prequalified at Grade E for Building Maintenance Works and for Landscaping &amp; Beautification Works.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20">
          {CERTS.map((c, i) => (
            <Reveal key={c.licence} delay={i * 100} as="figure" className="rounded-sm border border-stone-line bg-[#F4F1EB] p-4 sm:p-5">
              <Photo
                src={c.src}
                alt={`Ministry of Works certificate: ${c.title}, Grade E`}
                className="aspect-[1917/1370] bg-white"
                imgClassName="!object-contain"
                zoom={false}
              />
              <figcaption className="mt-5 flex items-start justify-between gap-4 border-t border-stone-line pt-4">
                <div>
                  <p className="font-serif text-2xl font-light tracking-tight">{c.title}</p>
                  <p className="mt-1 text-sm text-espresso/60">
                    Licence {c.licence}. Valid {c.valid}.
                  </p>
                </div>
                <p className="font-serif text-4xl font-light tracking-tight text-navy">Grade E</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-espresso text-stone-canvas">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 lg:px-10 lg:pt-32">
        <Reveal>
          <h2 className="serif-display max-w-[14ch] text-[clamp(3.2rem,9vw,8.5rem)]">
            Built with precision and care.
          </h2>
          <p className="mt-6 font-serif text-2xl font-light italic text-white/65">Designed to last for years.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors hover:bg-white hover:text-espresso"
          >
            Enquire on WhatsApp <Arrow />
          </a>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Office</p>
            <address className="mt-4 text-sm not-italic leading-[1.9] text-white/80">
              {COMPANY}
              <br />
              Flat 0, Building 1249
              <br />
              Road 2113, Block 321
              <br />
              Manama, Bahrain
            </address>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Telephone</p>
            <ul className="mt-4 space-y-1 text-sm leading-[1.9] text-white/80">
              {PHONES.map((p) => (
                <li key={p.href}><a href={p.href} className="link-u">{p.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Online</p>
            <ul className="mt-4 space-y-1 text-sm leading-[1.9] text-white/80">
              <li><a href={`mailto:${EMAIL}`} className="link-u break-all">{EMAIL}</a></li>
              <li>{WEB}</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">Registration</p>
            <p className="mt-4 text-sm leading-[1.9] text-white/80">CR {CR}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          <img src="/images/logo-light.png" alt="We Make Constructions" className="h-20 w-auto self-start sm:self-auto" />
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Purpose />
        <Divisions />
        <Sectors />
        <Portfolio />
        <Accreditation />
      </main>
      <Footer />
    </>
  );
}
