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
  ["Services", "#divisions"],
  ["Sectors", "#sectors"],
  ["Projects", "#portfolio"],
  ["Certificates", "#accreditation"],
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

/** Photo frame with hover zoom; shows a neutral panel with the expected filename if an image is missing. */
function Photo({ src, alt, className = "", imgClassName = "", zoom = true, position = "center" }) {
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
  <p className={`text-xs uppercase tracking-widest text-neutral-500 ${className}`}>{children}</p>
);

/* ---------------------------------------------------------------
   Sections
---------------------------------------------------------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-bone/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <a href="#top" aria-label="We Make Constructions, home" className="flex items-center">
          <img src="/images/logo.png" alt="We Make Constructions" className="h-14 w-auto" />
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
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-14 lg:px-10 lg:pb-14 lg:pt-20">
        <Label className="mb-6">{COMPANY}, Manama, Bahrain</Label>
        <h1 className="max-w-[16ch] text-[clamp(3rem,9.5vw,9rem)] font-medium leading-[0.95] tracking-tighter">
          Building strength beneath every step.
        </h1>
        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12">
          <p className="max-w-xl text-lg leading-relaxed text-neutral-700 lg:col-span-5 lg:text-xl">
            Interlock paving and kerbing specialists, and a contracting company for civil works and building
            maintenance, serving residential, commercial and infrastructure projects across Bahrain.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:col-span-7 lg:justify-end lg:self-end" aria-label="Browse projects by category">
            {FILTERS.map((f) => (
              <li key={f.id}>
                <button type="button" onClick={() => onFilter(f.id)} className="link-u pb-0.5 hover:text-navy">
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
          alt="A We Make paving specialist laying interlock paving on a Bahrain street"
          className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          imgClassName="hero-img"
          position="center 40%"
          zoom={false}
        />
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="border-b border-black/10">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
        <Reveal className="lg:col-span-6">
          <Label>About us</Label>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[1] tracking-tighter">
            Built with precision and care. Designed to last for years.
          </h2>
          <Photo
            src="/images/worker-site.jpg"
            alt="A We Make team member on a finished interlock street with a wheelbarrow of pavers"
            className="mt-10 aspect-[4/5] max-w-md"
            position="center 60%"
          />
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-neutral-700 lg:col-span-6 lg:pt-9">
          <p>
            <strong className="font-semibold text-obsidian">{COMPANY}</strong> is available for utilities, businesses
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

      <div className="border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-5 pt-6 lg:px-10">
          <Label>Why choose us</Label>
        </div>
        <ul className="mx-auto grid max-w-[1400px] grid-cols-2 px-5 sm:grid-cols-3 lg:grid-cols-6 lg:px-10">
          {WHY.map((w, i) => (
            <li
              key={w}
              className={`border-black/10 py-6 text-lg font-medium tracking-tight lg:pl-6 lg:first:pl-0 ${
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
  return (
    <section className="border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        {[
          {
            h: "Our Vision",
            body: (
              <p className="max-w-xl text-xl leading-snug tracking-tight sm:text-2xl">
                To be the customer&rsquo;s first choice in construction and building maintenance services. In paving
                and surface construction, to become a leading name by continuously improving workmanship, adopting
                modern techniques, and building long-term client relationships.
              </p>
            ),
          },
          {
            h: "Our Mission",
            body: (
              <>
                <p className="max-w-xl text-xl leading-snug tracking-tight sm:text-2xl">
                  To deliver reliable and cost-effective solutions while maintaining the highest standards of quality,
                  safety, and customer satisfaction.
                </p>
                <ul className="mt-6 max-w-xl text-neutral-700">
                  {MISSION.map((m) => (
                    <li key={m} className="border-t border-black/10 py-3 text-sm">{m}</li>
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
                  <li key={v} className="border-t border-black/10 py-4 text-xl tracking-tight first:border-t-0 first:pt-0">{v}</li>
                ))}
              </ul>
            ),
          },
        ].map((r, i) => (
          <Reveal key={r.h} delay={i * 60} className="grid gap-5 border-t border-black/10 py-10 first:border-t-0 first:pt-0 lg:grid-cols-12">
            <h2 className="text-3xl font-medium tracking-tighter sm:text-4xl lg:col-span-4">{r.h}</h2>
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
    <section id="divisions" className="border-b border-black/10">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <Label className="lg:col-span-3">Our services</Label>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter lg:col-span-9">
            Some of the services provided by us.
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
                    <span className="text-sm text-neutral-500 lg:col-span-3">{d.no}</span>
                    <span className="text-2xl font-medium leading-tight tracking-tight transition-colors group-hover:text-navy sm:text-3xl lg:col-span-8 lg:text-4xl">
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
                    <div className="pb-12">
                      <p className="max-w-xl text-neutral-600 lg:ml-[25%]">{d.lead}</p>

                      {d.groups && (
                        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                          {d.groups.map((g) => (
                            <div key={g.title} className={g.prose ? "sm:col-span-2 lg:col-span-1" : ""}>
                              <h4 className="border-t border-black/10 pt-3 text-base font-semibold tracking-tight">{g.title}</h4>
                              {g.prose ? (
                                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{g.items[0]}</p>
                              ) : (
                                <ul className="mt-3 space-y-1.5 text-sm text-neutral-700">
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
                        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
                          {d.photos.map(([cap, src]) => (
                            <li key={cap} className="group">
                              <Photo src={src} alt={cap} className="aspect-[4/3]" />
                              <p className="mt-3 border-t border-black/10 pt-2 text-sm">{cap}</p>
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
    <section id="sectors" className="border-b border-black/10">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <Reveal className="lg:col-span-4">
          <Label>Sectors</Label>
          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Residential, commercial and infrastructure projects.
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
          <Label className="lg:col-span-3">Our projects</Label>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter lg:col-span-9">
            Built across the Kingdom of Bahrain.
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
            <li key={p.src}>
              <Reveal as="article" delay={(i % 3) * 80} className="group">
                <Photo src={p.src} alt={`${p.name}, ${p.place}`} className="aspect-[4/3]" />
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-black/10 pt-3">
                  <h3 className="text-lg font-medium leading-snug tracking-tight">{p.name}</h3>
                  <Label className="shrink-0 pt-1.5">{p.sector}</Label>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{p.place}, Bahrain</p>
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
          <Label className="lg:col-span-3">Our certificates</Label>
          <div className="lg:col-span-9">
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter">
              Issued by the Ministry of Works, Kingdom of Bahrain.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-neutral-700">
              Prequalified at Grade E for Building Maintenance Works and for Landscaping &amp; Beautification Works.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20">
          {CERTS.map((c, i) => (
            <Reveal key={c.licence} delay={i * 100} as="figure" className="border border-black/10 bg-white p-4 sm:p-5">
              <Photo
                src={c.src}
                alt={`Ministry of Works certificate: ${c.title}, Grade E`}
                className="aspect-[1917/1370] bg-white"
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
          <h2 className="max-w-[14ch] text-[clamp(2.8rem,8.5vw,8rem)] font-medium leading-[0.95] tracking-tighter">
            Built with precision and care.
          </h2>
          <p className="mt-6 text-xl text-white/70">Designed to last for years.</p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-royal px-7 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-white"
          >
            Enquire on WhatsApp
          </a>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Office</p>
            <address className="mt-4 not-italic leading-relaxed text-white/85">
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
            <p className="mt-4 text-white/85">CR {CR}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          <div className="self-start bg-bone p-3 sm:self-auto">
            <img src="/images/logo.png" alt="We Make Constructions" className="h-20 w-auto" />
          </div>
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
        <Purpose />
        <Divisions />
        <Sectors />
        <Portfolio filter={filter} onFilter={applyFilter} />
        <Accreditation />
      </main>
      <Footer />
    </>
  );
}
