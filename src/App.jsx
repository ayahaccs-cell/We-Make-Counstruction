import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------
   Content
---------------------------------------------------------------- */
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
  ["Divisions", "#divisions"],
  ["Sectors", "#sectors"],
  ["Portfolio", "#portfolio"],
  ["Accreditation", "#accreditation"],
  ["Contact", "#contact"],
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "civil", label: "Civil & Maintenance" },
  { id: "paving", label: "Paving & Infrastructure" },
  { id: "commercial", label: "Commercial & Energy" },
];

const DIVISIONS = [
  {
    no: "01",
    title: "Building Maintenance & Civil Works",
    lead: "Existing and new building maintenance, one-time or yearly, from structure to finish.",
    items: [
      "Block works and plastering",
      "Structural concrete: footing, column and beam works",
      "Electrical switchgear, cabling and panel boards",
      "Plumbing: water supply and drainage systems",
      "Roofing and combo waterproofing",
      "External cradle painting",
      "Epoxy and self-levelling flooring",
      "Wooden pergolas, doors and kitchen cabinets",
    ],
  },
  {
    no: "02",
    title: "Interlock Paving & Kerbing Specialists",
    lead: "Complete interlock paving and kerbing built for durability, load resistance and visual appeal.",
    items: [
      "Heavy-load roadways and driveways",
      "Commercial yards and parking areas",
      "Footpaths and walkways",
      "Machine-laid interlock paving",
      "Concrete kerbstone installation and edge finishing",
    ],
  },
  {
    no: "03",
    title: "Fleet & Heavy Machinery",
    lead: "In-house equipment, so programmes are not held up waiting for hire.",
    items: [
      "Plate compactors",
      "Concrete slab cutters",
      "Kerbing moulds",
      "Laser levelling tools",
      "Forklifts",
    ],
  },
];

const SECTORS = [
  ["Energy and fuel retail", "Bapco Energies petrol stations"],
  ["Education", "Royal University for Women"],
  ["Hospitality", "Delmon International Hotel"],
  ["Sports and community", "Budaiya Sports Club"],
  ["Residential", "Al Naseem Villas, Zawia 1, Hidd villas"],
];

const P = "/images/projects/";
const PROJECTS = [
  { name: "Bapco Energies, Adliya", sector: "Energy", place: "Adliya", cats: ["paving", "commercial"], src: P + "bapco-adliya.jpg" },
  { name: "Bapco Energies, Diplomatic Area", sector: "Energy", place: "Diplomatic Area", cats: ["paving", "commercial"], src: P + "bapco-diplomatic.jpg" },
  { name: "Bapco Energies, Diyar Al Muharraq", sector: "Energy", place: "Diyar Al Muharraq", cats: ["paving", "commercial"], src: P + "bapco-diyar.jpg" },
  { name: "Bapco Energies, Hamad Town", sector: "Energy", place: "Hamad Town", cats: ["paving", "commercial"], src: P + "bapco-hamad-town.jpg" },
  { name: "Bapco Energies, Hoora", sector: "Energy", place: "Hoora", cats: ["paving", "commercial"], src: P + "bapco-hoora.jpg" },
  { name: "Royal University for Women", sector: "Education", place: "Awali", cats: ["civil"], src: P + "royal-university.jpg" },
  { name: "Budaiya Sports Club", sector: "Sports", place: "Budaiya", cats: ["civil"], src: P + "budaiya-sports-club.jpg" },
  { name: "Delmon International Hotel", sector: "Hospitality", place: "Bahrain", cats: ["civil", "commercial"], src: P + "delmon-hotel.jpg" },
  { name: "Al Naseem Villas", sector: "Residential", place: "Bahrain", cats: ["civil"], src: P + "al-naseem-villas.jpg" },
  { name: "Zawia 1", sector: "Residential", place: "Amwaj Islands", cats: ["civil"], src: P + "zawia-amwaj.jpg" },
  { name: "Villa Hidd Projects", sector: "Residential", place: "Hidd", cats: ["civil", "paving"], src: P + "villa-hidd.jpg" },
];

const CERTS = [
  { title: "Building Maintenance Works", licence: "5472", valid: "19 Jan 2026 to 19 Jan 2028", src: "/images/cert-building-maintenance.jpg" },
  { title: "Landscaping & Beautification Works", licence: "5392", valid: "4 Nov 2025 to 4 Nov 2027", src: "/images/cert-landscape.jpg" },
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
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
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

/** Photo frame with hover zoom; shows a neutral panel with the expected filename until the image exists. */
function Photo({ src, alt, className = "", imgClassName = "", zoom = true }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center p-4">
          <span className="text-center text-xs uppercase tracking-widest text-neutral-500">{src}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${
            zoom ? "transition-transform duration-700 ease-out group-hover:scale-105" : ""
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}

const Label = ({ children, className = "" }) => (
  <p className={`text-xs uppercase tracking-widest text-neutral-500 ${className}`}>{children}</p>
);

/* ---------------------------------------------------------------
   Sections
---------------------------------------------------------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-bone/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <a href="#top" aria-label="We Make Constructions, home" className="flex items-center">
          <img src="/images/logo.png" alt="We Make Constructions" className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-9 text-sm md:flex" aria-label="Primary">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="link-u pb-0.5">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="link-u hidden pb-0.5 text-sm font-medium text-navy md:inline">
          Project Enquiry
        </a>
        <button
          type="button"
          className="text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-black/10 bg-bone px-5 py-4 md:hidden" aria-label="Mobile">
          <ul className="space-y-3 text-lg">
            {[...NAV, ["Project Enquiry", "#contact"]].map(([l, h]) => (
              <li key={h}>
                <a href={h} onClick={() => setOpen(false)}>{l}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero({ onFilter }) {
  return (
    <section id="top" className="border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-14 lg:px-10 lg:pb-14 lg:pt-24">
        <h1 className="max-w-[16ch] text-[clamp(3rem,9.5vw,9rem)] font-medium leading-[0.95] tracking-tighter">
          Building strength beneath every step.
        </h1>
        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12">
          <p className="max-w-xl text-lg leading-relaxed text-neutral-700 lg:col-span-5 lg:text-xl">
            A disciplined approach to civil construction, building maintenance, and precision infrastructure across
            the Kingdom of Bahrain.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:col-span-7 lg:justify-end lg:self-end" aria-label="Browse projects by category">
            {FILTERS.map((f) => (
              <li key={f.id}>
                <button type="button" onClick={() => onFilter(f.id)} className="link-u pb-0.5 hover:text-royal">
                  [ {f.label} ]
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 pb-12 lg:px-10 lg:pb-20">
        <Photo
          src="/images/hero-paving.jpg"
          alt="The We Make crew laying interlock paving on a Bahrain road"
          className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          imgClassName="hero-img"
          zoom={false}
        />
      </div>
    </section>
  );
}

function Manifesto() {
  const strip = ["Ministry of Works certified", "Direct specialised labour", "In-house heavy fleet"];
  return (
    <section className="border-b border-black/10">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
        <Reveal className="lg:col-span-6">
          <Label>Our approach</Label>
          <h2 className="mt-5 text-[clamp(2.4rem,5.5vw,5rem)] font-medium uppercase leading-[0.98] tracking-tighter">
            Precision execution. Zero compromise.
          </h2>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-neutral-700 lg:col-span-6 lg:pt-9">
          <p>
            We Make Constructions Co. WLL is a Manama-based contractor delivering civil works, building maintenance
            and interlock paving for residential, commercial and infrastructure clients across Bahrain.
          </p>
          <p>
            Our technical workforce is employed directly, and our machinery is our own. That means site supervisors
            who know the work, equipment that arrives when the programme needs it, and quality control that does not
            depend on a chain of subcontractors.
          </p>
          <p>
            We are prequalified by the Kingdom of Bahrain Ministry of Works at Grade E for Building Maintenance and
            for Landscaping &amp; Beautification, and we work to a simple standard: reliable, cost-effective
            solutions, delivered safely and to specification.
          </p>
        </Reveal>
      </div>
      <ul className="mx-auto grid max-w-[1400px] border-t border-black/10 px-5 sm:grid-cols-3 lg:px-10">
        {strip.map((s, i) => (
          <li
            key={s}
            className={`py-5 text-sm uppercase tracking-widest text-neutral-600 sm:py-6 ${
              i > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0 sm:pl-6" : ""
            }`}
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Divisions() {
  const [open, setOpen] = useState(0);
  return (
    <section id="divisions" className="border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">Core divisions</Label>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter lg:col-span-9">
            Three divisions, one standard of work.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-black/10 lg:mt-20">
          {DIVISIONS.map((d, i) => {
            const isOpen = open === i;
            return (
              <div key={d.no} className="border-b border-black/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`div-${d.no}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 text-left lg:grid-cols-12 lg:py-9"
                  >
                    <span className="text-sm text-neutral-500 lg:col-span-3">Division {d.no}</span>
                    <span className="text-2xl font-medium leading-tight tracking-tight transition-colors group-hover:text-royal sm:text-3xl lg:col-span-8 lg:text-4xl">
                      {d.title}
                    </span>
                    <span aria-hidden="true" className="text-2xl leading-none lg:col-span-1 lg:text-right">
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
                    <div className="grid gap-8 pb-10 lg:grid-cols-12">
                      <p className="max-w-md text-neutral-600 lg:col-span-5 lg:col-start-4">{d.lead}</p>
                      <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-4">
                        {d.items.map((it) => (
                          <li key={it} className="border-t border-black/10 py-3 text-sm">{it}</li>
                        ))}
                      </ul>
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
    <section id="sectors" className="border-b border-black/10">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <Reveal className="lg:col-span-4">
          <Label>Sectors</Label>
          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Where we work.
          </h2>
        </Reveal>
        <Reveal as="ul" delay={100} className="border-t border-black/10 lg:col-span-8">
          {SECTORS.map(([s, ex]) => (
            <li key={s} className="grid gap-1 border-b border-black/10 py-5 sm:grid-cols-2">
              <span className="text-xl font-medium tracking-tight">{s}</span>
              <span className="text-neutral-600">{ex}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio({ filter, onFilter }) {
  const list = PROJECTS.filter((p) => filter === "all" || p.cats.includes(filter));
  return (
    <section id="portfolio" className="border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">Portfolio</Label>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter lg:col-span-9">
            Selected work across Bahrain.
          </h2>
        </Reveal>

        <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-black/10 py-4 text-sm">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => onFilter(f.id, false)}
              className={`link-u pb-0.5 ${filter === f.id ? "font-semibold text-navy" : "text-neutral-600"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.name}>
              <Reveal as="article" delay={(i % 3) * 80} className="group">
                <Photo src={p.src} alt={`${p.name}, ${p.place}`} className="aspect-[4/3]" />
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-black/10 pt-3">
                  <h3 className="text-lg font-medium leading-snug tracking-tight">{p.name}</h3>
                  <Label className="shrink-0 pt-1.5">{p.sector}</Label>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{p.place}, Kingdom of Bahrain</p>
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
    <section id="accreditation" className="border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">Accreditation</Label>
          <div className="lg:col-span-9">
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter">
              Prequalified by the Ministry of Works.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-neutral-700">
              Kingdom of Bahrain Ministry of Works, Grade E in two categories. Commercial registration {CR}.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20">
          {CERTS.map((c, i) => (
            <Reveal key={c.licence} delay={i * 100} as="figure" className="border border-black/10 bg-white p-5">
              <Photo
                src={c.src}
                alt={`Ministry of Works certificate: ${c.title}, Grade E`}
                className="aspect-[3/4] bg-neutral-100"
                imgClassName="!object-contain"
                zoom={false}
              />
              <figcaption className="mt-5 flex items-start justify-between gap-4 border-t border-black/10 pt-4">
                <div>
                  <p className="text-lg font-medium tracking-tight">{c.title}</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Licence {c.licence}. Valid {c.valid}.
                  </p>
                </div>
                <p className="text-3xl font-medium tracking-tighter text-navy">Grade E</p>
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
    <footer id="contact" className="bg-obsidian text-bone">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 lg:px-10 lg:pt-32">
        <Reveal>
          <h2 className="max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.95] tracking-tighter">
            Let&rsquo;s build something enduring.
          </h2>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-royal px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white hover:text-obsidian"
          >
            Enquire on WhatsApp
          </a>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Office</p>
            <address className="mt-4 not-italic leading-relaxed text-white/85">
              We Make Constructions Co. WLL
              <br />
              Flat 0, Building 1249
              <br />
              Road 2113, Block 321
              <br />
              Manama, Kingdom of Bahrain
            </address>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Telephone</p>
            <ul className="mt-4 space-y-1 text-white/85">
              {PHONES.map((p) => (
                <li key={p.href}><a href={p.href} className="link-u">{p.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Online</p>
            <ul className="mt-4 space-y-1 text-white/85">
              <li><a href={`mailto:${EMAIL}`} className="link-u break-all">{EMAIL}</a></li>
              <li>{WEB}</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Registration</p>
            <p className="mt-4 leading-relaxed text-white/85">
              CR {CR}
              <br />
              Ministry of Works Grade E
              <br />
              Licences 5472 and 5392
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} We Make Constructions Co. WLL. All rights reserved.</p>
          <img src="/images/logo.png" alt="" className="h-6 w-auto self-start brightness-0 invert sm:self-auto" />
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const applyFilter = (id, scroll = true) => {
    setFilter(id);
    if (scroll) document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Nav />
      <main>
        <Hero onFilter={applyFilter} />
        <Manifesto />
        <Divisions />
        <Sectors />
        <Portfolio filter={filter} onFilter={applyFilter} />
        <Accreditation />
      </main>
      <Footer />
    </>
  );
}
