import { useState } from "react";
import logo from "../logo.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "activities"
  | "dining"
  | "lodging"
  | "transportation"
  | "faq"
  | "activity-detail";

// ─── Photo sources ────────────────────────────────────────────────────────────

const PHOTOS = {
  beach:        "https://images.unsplash.com/photo-1672841828459-bc913fdcd995?w=1200&h=600&fit=crop&auto=format",
  beachAerial:  "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800&h=500&fit=crop&auto=format",
  beachPortrait:"https://images.unsplash.com/photo-1672841828271-54340a6fbcd3?w=800&h=500&fit=crop&auto=format",
  snorkeling:   "https://images.unsplash.com/photo-1708649290066-5f617003b93f?w=600&h=400&fit=crop&auto=format",
  hiking:       "https://images.unsplash.com/photo-1665678473650-b4d8c79b02b7?w=600&h=400&fit=crop&auto=format",
  hikingPerson: "https://images.unsplash.com/photo-1625263036599-e842892a0e4a?w=600&h=400&fit=crop&auto=format",
  diningA:      "https://images.unsplash.com/photo-1775476784484-cd4f5a5101b5?w=600&h=400&fit=crop&auto=format",
  diningB:      "https://images.unsplash.com/photo-1767429013026-fefb4bc82879?w=600&h=400&fit=crop&auto=format",
  lodgingA:     "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=600&h=400&fit=crop&auto=format",
  lodgingB:     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&auto=format",
  boatA:        "https://images.unsplash.com/photo-1581773683009-11e0e759e9ad?w=600&h=400&fit=crop&auto=format",
  boatB:        "https://images.unsplash.com/photo-1678666701965-51d6fd32695b?w=600&h=400&fit=crop&auto=format",
};

// ─── Wireframe primitives ─────────────────────────────────────────────────────

function PhotoBox({
  src,
  alt,
  label,
  className = "",
  overlay = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div className={`relative border-2 border-gray-400 overflow-hidden bg-gray-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "contrast(0.95) brightness(1.05)" }}
      />
      {/* light scrim to keep wireframe feel */}
      <div className="absolute inset-0 bg-white/20" />
      {overlay && (
        <div className="absolute inset-0 bg-black/30" />
      )}
      {label && (
        <span className="absolute top-2 left-3 font-mono text-[9px] text-white/80 uppercase tracking-widest z-10 drop-shadow">
          {label}
        </span>
      )}
    </div>
  );
}

function WireBtn({
  children,
  onClick,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary";
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 border-2 transition-colors cursor-pointer
        ${variant === "primary"
          ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
          : "border-gray-500 bg-gray-100 text-gray-700 hover:bg-gray-200"
        } ${className}`}
    >
      {children}
    </button>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest border border-gray-300 px-1.5 py-0.5">
      {label}
    </span>
  );
}

function Anno({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.18em] mb-1.5">
      {children}
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home",           page: "home" },
  { label: "Dining",         page: "dining" },
  { label: "Lodging",        page: "lodging" },
  { label: "Activities",     page: "activities" },
  { label: "Transportation", page: "transportation" },
  { label: "FAQ",            page: "faq" },
];

function Header({ current, goto }: { current: Page; goto: (p: Page) => void }) {
  return (
    <header className="border-b-2 border-gray-400 bg-white px-8 py-4 flex items-center justify-between gap-6 shrink-0">
      <button
        onClick={() => goto("home")}
        className="h-9 flex items-center cursor-pointer shrink-0 hover:opacity-80 transition-opacity"
      >
        <img
          src={logo}
          alt="Iamiti Logo"
          className="h-full object-contain"
        />
      </button>
      <nav className="flex flex-wrap gap-1 items-center">
        {NAV_LINKS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => goto(page)}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer
              ${current === page
                ? "border-gray-700 bg-gray-700 text-white"
                : "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-800"
              }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ goto }: { goto: (p: Page) => void }) {
  return (
    <footer className="border-t-2 border-gray-400 bg-gray-100 px-8 py-6 mt-auto shrink-0">
      <Anno>Footer Placeholder</Anno>
      <div className="flex flex-wrap gap-6 items-center justify-between">
        <button
          onClick={() => goto("home")}
          className="font-mono text-xs text-gray-500 hover:text-gray-800 uppercase tracking-widest cursor-pointer transition-colors"
        >
          ← Back to Home
        </button>
        <div className="flex flex-wrap gap-4">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => goto(page)}
              className="font-mono text-[10px] text-gray-400 hover:text-gray-700 uppercase tracking-widest cursor-pointer transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-gray-400">
          Iamiti – Taniti Island Tourism
        </span>
      </div>
    </footer>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({
  crumbs,
  goto,
}: {
  crumbs: { label: string; page?: Page }[];
  goto: (p: Page) => void;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 mb-6">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>›</span>}
          {c.page ? (
            <button
              onClick={() => goto(c.page!)}
              className="hover:text-gray-700 cursor-pointer transition-colors uppercase tracking-widest"
            >
              {c.label}
            </button>
          ) : (
            <span className="text-gray-600 uppercase tracking-widest">{c.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

function Shell({
  current,
  goto,
  children,
}: {
  current: Page;
  goto: (p: Page) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header current={current} goto={goto} />
      <main className="flex-1 px-8 py-8 max-w-5xl w-full mx-auto">{children}</main>
      <Footer goto={goto} />
    </div>
  );
}

// ─── Page 1: Home ─────────────────────────────────────────────────────────────

const QUICK_LINKS: { label: string; page: Page; photo: string; alt: string }[] = [
  { label: "Activities",     page: "activities",     photo: PHOTOS.snorkeling,  alt: "Snorkeling in coral reef" },
  { label: "Lodging",        page: "lodging",        photo: PHOTOS.lodgingA,    alt: "Island lodge room" },
  { label: "Dining",         page: "dining",         photo: PHOTOS.diningA,     alt: "Tropical outdoor dining" },
  { label: "Transportation", page: "transportation", photo: PHOTOS.boatA,       alt: "Island boat" },
];

function HomePage({ goto }: { goto: (p: Page) => void }) {
  return (
    <Shell current="home" goto={goto}>
      {/* Hero */}
      <section className="mb-8">
        <Anno>Hero Section</Anno>
        <div className="border-2 border-gray-400 h-80 flex overflow-hidden">
          {/* Left: photo */}
          <div className="relative w-3/5 shrink-0 border-r-2 border-gray-400">
            <img
              src={PHOTOS.beach}
              alt="Tropical beach with palm trees"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "contrast(0.95) brightness(1.05)" }}
            />
            <span className="absolute bottom-2 left-3 font-mono text-[8px] text-white/70 uppercase tracking-widest">
              Hero Image · Tropical Beach
            </span>
          </div>
          {/* Right: headline + CTA */}
          <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center gap-5 px-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em]">
                Welcome to Iamiti
              </span>
              <h1 className="font-mono text-2xl font-bold text-gray-800 tracking-tight leading-snug">
                Discover Iamiti
              </h1>
              <div className="w-8 h-px bg-gray-400 mt-1" />
            </div>
            <WireBtn variant="primary" onClick={() => goto("activities")}>
              Explore Activities
            </WireBtn>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <Anno>Quick Links Section</Anno>
        <div className="grid grid-cols-4 gap-4">
          {QUICK_LINKS.map(({ label, page, photo, alt }) => (
            <button
              key={page}
              onClick={() => goto(page)}
              className="border-2 border-gray-400 h-32 flex flex-col items-center justify-end overflow-hidden relative cursor-pointer group"
            >
              <img
                src={photo}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ filter: "contrast(0.95) brightness(1.0)" }}
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />
              <div className="relative z-10 pb-3 flex flex-col items-center gap-1">
                <span className="font-mono text-sm font-bold text-white uppercase tracking-wider drop-shadow">
                  {label}
                </span>
                <Pill label="Quick Link" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </Shell>
  );
}

// ─── Page 2: Activities ───────────────────────────────────────────────────────

const ACTIVITIES = [
  {
    id: 1,
    title: "Snorkeling at Coral Cove",
    desc: "Explore vibrant coral reefs and tropical marine life in Taniti's crystal-clear lagoon waters.",
    photo: PHOTOS.snorkeling,
    alt: "Colorful coral reef underwater",
  },
  {
    id: 2,
    title: "Rainforest Hiking Trail",
    desc: "Trek through lush jungle paths with guided tours to scenic overlooks and hidden waterfalls.",
    photo: PHOTOS.hiking,
    alt: "Forest hiking trail through trees",
  },
];

function ActivitiesPage({ goto }: { goto: (p: Page) => void }) {
  return (
    <Shell current="activities" goto={goto}>
      <Breadcrumb
        crumbs={[{ label: "Home", page: "home" }, { label: "Activities" }]}
        goto={goto}
      />

      {/* Page title */}
      <section className="mb-8">
        <Anno>Page Title</Anno>
        <div className="border-2 border-gray-400 bg-gray-50 px-6 py-5">
          <h1 className="font-mono text-2xl font-bold text-gray-700">Activities on Tahiti</h1>
        </div>
      </section>

      {/* Activity list */}
      <section className="mb-8">
        <Anno>Activity List</Anno>
        <div className="flex flex-col gap-5">
          {ACTIVITIES.map((act) => (
            <div key={act.id} className="border-2 border-gray-400 bg-gray-50 flex overflow-hidden">
              <div className="w-52 shrink-0 relative">
                <img
                  src={act.photo}
                  alt={act.alt}
                  className="absolute inset-0 w-full h-full object-cover border-r-2 border-gray-400"
                  style={{ filter: "contrast(0.95)" }}
                />
                <span className="absolute bottom-2 left-2 font-mono text-[8px] text-white/70 uppercase tracking-widest">
                  Image Placeholder
                </span>
              </div>
              <div className="flex flex-col justify-between p-5 flex-1 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="border border-gray-300 bg-white px-3 py-2">
                    <span className="font-mono text-sm font-bold text-gray-700">{act.title}</span>
                  </div>
                  <div className="border border-gray-300 bg-white px-3 py-2 min-h-[3rem]">
                    <span className="font-mono text-xs text-gray-500">{act.desc}</span>
                  </div>
                </div>
                <WireBtn onClick={() => goto("activity-detail")}>Learn More</WireBtn>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Anno>CTA Section</Anno>
        <div className="border-2 border-gray-400 bg-gray-50 px-6 py-5 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
            Need to get around the island?
          </span>
          <WireBtn variant="primary" onClick={() => goto("transportation")}>
            View Transportation Options
          </WireBtn>
        </div>
      </section>
    </Shell>
  );
}

// ─── Activity Detail Page ─────────────────────────────────────────────────────

function ActivityDetailPage({ goto }: { goto: (p: Page) => void }) {
  return (
    <Shell current="activities" goto={goto}>
      <Breadcrumb
        crumbs={[
          { label: "Home", page: "home" },
          { label: "Activities", page: "activities" },
          { label: "Activity Detail" },
        ]}
        goto={goto}
      />
      <Anno>Activity Detail Page</Anno>

      <div className="border-2 border-gray-400 bg-gray-50">
        {/* Hero photo */}
        <div className="relative h-56 border-b-2 border-gray-400 overflow-hidden bg-gray-200">
          <img
            src={PHOTOS.hikingPerson}
            alt="Hiker on rainforest trail"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(0.95) brightness(1.05)" }}
          />
          <div className="absolute inset-0 bg-black/25" />
          <span className="absolute bottom-3 left-4 font-mono text-[9px] text-white/70 uppercase tracking-widest">
            Activity Hero Image
          </span>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="border border-gray-300 bg-white px-4 py-3">
            <h1 className="font-mono text-xl font-bold text-gray-700">Activity Title Placeholder</h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["Duration Placeholder", "Difficulty Placeholder", "Price Placeholder"].map((label) => (
              <div key={label} className="border border-gray-300 bg-white px-3 py-3 text-center">
                <Pill label={label} />
              </div>
            ))}
          </div>

          <div className="border border-gray-300 bg-white px-4 py-4 min-h-[8rem]">
            <Anno>Description</Anno>
            <span className="font-mono text-xs text-gray-500">
              Full activity description placeholder text. Details about the experience, what to bring,
              meeting point, and other relevant information for visitors would appear here.
            </span>
          </div>

          <div className="border border-gray-300 bg-white px-4 py-4">
            <Anno>Booking Information Placeholder</Anno>
            <div className="h-10 border border-gray-300 bg-gray-100 flex items-center px-3 mt-1">
              <span className="font-mono text-xs text-gray-400">Contact / Booking details placeholder</span>
            </div>
          </div>

          <div className="flex gap-3">
            <WireBtn variant="primary">Book This Activity</WireBtn>
            <WireBtn onClick={() => goto("activities")}>← Back to Activities</WireBtn>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── Placeholder pages ────────────────────────────────────────────────────────

type SectionData = { label: string; desc: string; photo: string; alt: string };

type PlaceholderConfig = {
  page: Page;
  title: string;
  heroPhoto: string;
  heroAlt: string;
  sections: SectionData[];
};

const PLACEHOLDER_CONFIGS: Record<string, PlaceholderConfig> = {
  dining: {
    page: "dining",
    title: "Dining on Taniti",
    heroPhoto: PHOTOS.diningA,
    heroAlt: "Tropical restaurant dining area",
    sections: [
      { label: "Restaurant List Placeholder",    desc: "Browse local restaurants, cafes, and beachside eateries across the island.", photo: PHOTOS.diningA, alt: "Tropical dining area" },
      { label: "Cuisine Types Placeholder",      desc: "From fresh seafood to island-style BBQ, discover the flavors of Taniti.",   photo: PHOTOS.diningB, alt: "Outdoor restaurant table setting" },
      { label: "Reservations Info Placeholder",  desc: "Booking and reservation details for popular dining establishments.",          photo: PHOTOS.beachAerial, alt: "Aerial beach view" },
    ],
  },
  lodging: {
    page: "lodging",
    title: "Lodging on Taniti",
    heroPhoto: PHOTOS.lodgingA,
    heroAlt: "Island resort room",
    sections: [
      { label: "Hotel List Placeholder",                desc: "Beachfront hotels, boutique resorts, and island retreats for every budget.",  photo: PHOTOS.lodgingA, alt: "Hotel room with white linens" },
      { label: "Hostel / Camping Options Placeholder",  desc: "Budget-friendly hostels and guided camping experiences across the island.",  photo: PHOTOS.lodgingB, alt: "Lodge room with wooden frame" },
      { label: "Booking Information Placeholder",       desc: "Availability, rates, and direct booking links for all lodging options.",      photo: PHOTOS.beachPortrait, alt: "Beach view" },
    ],
  },
  transportation: {
    page: "transportation",
    title: "Transportation Options",
    heroPhoto: PHOTOS.boatA,
    heroAlt: "Island boat on white sand beach",
    sections: [
      { label: "Airport & Arrivals Placeholder",    desc: "Flight information, airport transfers, and arrival guide for Taniti.",                photo: PHOTOS.beachAerial, alt: "Aerial view of island" },
      { label: "Island Bus / Taxi Placeholder",     desc: "Local bus routes, taxi services, and ride options around the island.",               photo: PHOTOS.boatB,       alt: "Ferry crossing open water" },
      { label: "Bike & Rental Info Placeholder",    desc: "Rent bikes, scooters, or cars to explore the island at your own pace.",              photo: PHOTOS.boatA,       alt: "Boat on beach" },
    ],
  },
  faq: {
    page: "faq",
    title: "Frequently Asked Questions",
    heroPhoto: PHOTOS.beachAerial,
    heroAlt: "Aerial view of tropical island shore",
    sections: [
      { label: "General Questions Placeholder",     desc: "Everything you need to know before visiting Taniti Island.",                         photo: PHOTOS.beach,       alt: "Tropical beach" },
      { label: "Safety & Health Placeholder",       desc: "Health requirements, safety tips, and emergency contact information.",                photo: PHOTOS.hikingPerson, alt: "Hiker in forest" },
      { label: "Currency & Payments Placeholder",   desc: "Accepted currencies, ATM locations, and payment options on the island.",              photo: PHOTOS.beachPortrait, alt: "Beach portrait view" },
    ],
  },
};

function PlaceholderPage({
  pageKey,
  goto,
}: {
  pageKey: string;
  goto: (p: Page) => void;
}) {
  const config = PLACEHOLDER_CONFIGS[pageKey];
  if (!config) return null;

  return (
    <Shell current={config.page} goto={goto}>
      <Breadcrumb
        crumbs={[{ label: "Home", page: "home" }, { label: config.title }]}
        goto={goto}
      />
      <Anno>Page · {config.title}</Anno>

      {/* Page title with hero photo banner */}
      <div className="border-2 border-gray-400 mb-8 overflow-hidden">
        <div className="relative h-40 bg-gray-200">
          <img
            src={config.heroPhoto}
            alt={config.heroAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "contrast(0.95) brightness(1.0)" }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-end px-6 pb-5">
            <h1 className="font-mono text-2xl font-bold text-white drop-shadow">{config.title}</h1>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="flex flex-col gap-5 mb-8">
        {config.sections.map((section, i) => (
          <div key={i} className="border-2 border-gray-400 bg-gray-50 flex overflow-hidden">
            <div className="w-48 shrink-0 relative border-r-2 border-gray-400">
              <img
                src={section.photo}
                alt={section.alt}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "contrast(0.95)" }}
              />
            </div>
            <div className="flex flex-col justify-between p-5 flex-1 gap-3">
              <div className="border border-gray-300 bg-white px-3 py-2">
                <span className="font-mono text-sm font-bold text-gray-600">{section.label}</span>
              </div>
              <div className="border border-gray-300 bg-white px-3 py-2 min-h-[3rem]">
                <span className="font-mono text-xs text-gray-500">{section.desc}</span>
              </div>
              <WireBtn className="self-start">View Details</WireBtn>
            </div>
          </div>
        ))}
      </div>

      {/* Back CTA */}
      <div className="border border-gray-300 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
          Continue exploring Taniti
        </span>
        <div className="flex gap-3">
          <WireBtn onClick={() => goto("activities")}>View Activities</WireBtn>
          <WireBtn variant="primary" onClick={() => goto("home")}>← Back to Home</WireBtn>
        </div>
      </div>
    </Shell>
  );
}

// ─── Chrome bar ───────────────────────────────────────────────────────────────

function ChromeBar({ page }: { page: Page }) {
  const labels: Record<Page, string> = {
    home:              "Page 1 · Home",
    activities:        "Page 2 · Activities",
    dining:            "Placeholder · Dining",
    lodging:           "Placeholder · Lodging",
    transportation:    "Placeholder · Transportation",
    faq:               "Placeholder · FAQ",
    "activity-detail": "Detail · Activity Detail",
  };

  return (
    <div className="bg-gray-800 px-6 py-2.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
      </div>
      <span className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em]">
        Iamiti – Taniti Island Tourism · Wireframe Prototype · {labels[page]}
      </span>
      <div className="w-16" />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const goto = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <ChromeBar page={page} />
      {page === "home"              && <HomePage goto={goto} />}
      {page === "activities"        && <ActivitiesPage goto={goto} />}
      {page === "activity-detail"   && <ActivityDetailPage goto={goto} />}
      {page === "dining"            && <PlaceholderPage pageKey="dining"          goto={goto} />}
      {page === "lodging"           && <PlaceholderPage pageKey="lodging"         goto={goto} />}
      {page === "transportation"    && <PlaceholderPage pageKey="transportation"  goto={goto} />}
      {page === "faq"               && <PlaceholderPage pageKey="faq"             goto={goto} />}
    </div>
  );
}
