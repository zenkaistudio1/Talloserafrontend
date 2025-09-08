import React, { useState, useEffect, useRef, type ComponentProps } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Construction,
  Droplet,
  Building2,
  Factory,
  Hammer,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Shield,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
  Gauge,
  BatteryCharging,
  Mountain,
} from "lucide-react";

/* ============================ Theme (Sky Blue) ============================ */
const brand = {
  grad: "from-sky-400 to-sky-600",
  solid: "bg-sky-600",
  hover: "hover:bg-sky-700",
  ring: "focus:ring-sky-500/30",
  accent: "text-sky-600",
};
const GlobalFixes = () => (
  <style>{`
    .clamp-2{
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
  `}</style>
);

/* ============================ Reusable Card ============================ */
const BlueCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
  >
    <div className="p-6 sm:p-7">{children}</div>
  </div>
);

/* ============================ Scroll Progress ============================ */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-sky-600"
    />
  );
};

/* ============================ Header ============================ */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#", hasDropdown: false },
    {
      label: "Projects",
      href: "#projects",
      hasDropdown: true,
      dropdownItems: [
        { label: "Run-of-River Plants", href: "/projects/ror" },
        { label: "Reservoir Plants", href: "/projects/reservoir" },
        { label: "Transmission & Substations", href: "/projects/transmission" },
        { label: "O&M & Upgrades", href: "/projects/om" },
      ],
    },
    { label: "About Us", href: "/about", hasDropdown: false },
    {
      label: "Services",
      href: "#services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Feasibility & DPR", href: "/services/feasibility" },
        { label: "EPC & Commissioning", href: "/services/epc" },
        { label: "Grid Integration", href: "/services/grid" },
        { label: "Environmental & Social", href: "/services/esg" },
      ],
    },
    { label: "Contact", href: "#contact", hasDropdown: false },
  ];

  


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg shadow-black/10 border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="grid h-10 w-10 lg:h-12 lg:w-12 place-items-center rounded-xl bg-sky-600 shadow-lg shadow-sky-600/30">
              <Droplet className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="font-jakarta">
              <div className="text-lg lg:text-xl font-semibold text-black tracking-tight">
                Yeti Hydropower
              </div>
              <div className="text-[10px] lg:text-xs text-black/60 font-medium tracking-wider uppercase">
                Clean Energy
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="group flex items-center gap-1 font-inter text-sm font-medium text-black/70 hover:text-black transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-sky-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>

                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-gray-200/60 bg-white/95 backdrop-blur-sm shadow-xl shadow-black/10 py-2"
                  >
                    {item.dropdownItems?.map((drop) => (
                      <a
                        key={drop.label}
                        href={drop.href}
                        className="flex items-center px-4 py-2.5 font-inter text-sm text-black/70 hover:text-black hover:bg-gray-50"
                      >
                        {drop.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-black/60">
                <Phone className="h-4 w-4" />
                <span className="font-inter">+977 1-4440000</span>
              </div>
              <div className="flex items-center gap-2 text-black/60">
                <Mail className="h-4 w-4" />
                <span className="font-inter">info@yetihydro.com</span>
              </div>
            </div>

            <a
              href="#contact"
              className={`hidden lg:inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-inter text-white transition-all ${brand.solid} ${brand.hover} ${brand.ring}`}
            >
              Get Proposal
            </a>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-gray-200/60 bg-white/80 backdrop-blur-sm hover:bg-gray-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-black/70" /> : <Menu className="h-5 w-5 text-black/70" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-sm"
            >
              <nav className="py-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 font-inter text-base text-black/70 hover:text-black hover:bg-gray-50"
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </a>
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="bg-gray-50/60 border-l-2 border-sky-600/30 ml-4">
                        {item.dropdownItems.map((drop) => (
                          <a
                            key={drop.label}
                            href={drop.href}
                            className="block px-4 py-2 font-inter text-sm text-black/60 hover:text-black"
                          >
                            {drop.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

/* ============================ Hero ============================ */
const SLIDES = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1727344751168-03790785caf2?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Run-of-River",
    titleA: "Powering Nepal",
    titleB: "With Clean Water",
    desc:
      "High-efficiency RoR projects engineered for reliable output and minimal footprint.",
    icon: Droplet,
    cta: { label: "View Projects", href: "/projects" },
  },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1678446510354-5c39e3409c59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHlkcm9wb3dlciUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
    tag: "Reservoir",
    titleA: "Energy Storage",
    titleB: "That Scales",
    desc:
      "Reservoir hydropower with robust civil works, optimized turbines, and grid-ready dispatch.",
    icon: Mountain,
    cta: { label: "Explore Reservoir", href: "/projects#reservoir" },
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1655683975875-28f03121ac89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHlkcm9wb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
    tag: "Grid Integration",
    titleA: "From River",
    titleB: "To Grid",
    desc:
      "Substations and lines EPC for seamless synchronization and stability.",
    icon: Gauge,
    cta: { label: "Grid Portfolio", href: "/projects#grid" },
  },
  {
    id: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1678446515230-27058cefe800?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh5ZHJvcG93ZXJ8ZW58MHx8MHx8fDA%3D",
    tag: "O&M & Upgrades",
    titleA: "Uptime You",
    titleB: "Can Trust",
    desc:
      "Predictive maintenance and uprates for higher capacity factors.",
    icon: BatteryCharging,
    cta: { label: "O&M Services", href: "/projects#om" },
  },
];

const AUTOPLAY_MS = 6000;

function useAutoplay(enabled: boolean, delay: number, cb: () => void) {
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(cb, delay);
    return () => t.current && clearTimeout(t.current);
  }, [enabled, delay, cb]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && t.current) clearTimeout(t.current);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
}

type MotionButtonProps = ComponentProps<typeof motion.button>;
type NavButtonProps = MotionButtonProps & { side: "left" | "right" };

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ side, className = "", ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute ${
        side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-4"
      } top-1/2 -translate-y-1/2 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full 
      bg-white/95 backdrop-blur-sm border border-sky-100 shadow-md hover:shadow-lg 
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/30 ${className}`}
      {...props}
    >
      {side === "left" ? (
        <ChevronLeft className="h-4 w-4 text-black/70" />
      ) : (
        <ChevronRight className="h-4 w-4 text-black/70" />
      )}
    </motion.button>
  )
);
NavButton.displayName = "NavButton";


const Hero: React.FC = () => {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const total = SLIDES.length;
  const wrap = (n: number) => (n + total) % total;

  // Parallax on the hero text block
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // swipe
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    setPlaying(false);
    setI((x) => wrap(x + (dx < 0 ? 1 : -1)));
  };

  useAutoplay(playing && !isHovered && !shouldReduceMotion, AUTOPLAY_MS, () =>
    setI((x) => wrap(x + 1))
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setI((x) => wrap(x + 1));
        setPlaying(false);
      } else if (e.key === "ArrowLeft") {
        setI((x) => wrap(x - 1));
        setPlaying(false);
      } else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const s = SLIDES[i];
  const progressEnabled = playing && !isHovered && !shouldReduceMotion;
  const slideLabel = `${s.tag} – ${s.titleA} ${s.titleB}`;

  return (
    <section id="top" className="relative pt-24 pb-16 sm:pb-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          ref={heroRef}
          className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_8px_50px_-12px_rgba(0,0,0,0.25)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured hydropower projects"
        >
          <div className="relative">
            <div className="relative h-[450px] sm:h-[550px] lg:h-[650px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={s.id}
                  src={s.image}
                  alt={slideLabel}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.3 : 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
            </div>

            {/* content with parallax */}
           <motion.div style={{ y: yParallax }} className="absolute inset-0 flex items-end p-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
    <motion.div
      key={`content-${s.id}`}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-white pl-8 sm:pl-12"
    >

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-white/90">
                    <s.icon className="h-4 w-4 text-white/90" />
                    {s.tag}
                  </div>

                  <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white tracking-tight mb-2">
                    {s.titleA}
                  </h2>
                  <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-sky-400 tracking-tight mb-4">
                    {s.titleB}
                  </h2>

                  <p className="font-inter text-sm sm:text-base leading-relaxed text-white/80 max-w-lg mb-6">
                    {s.desc}
                  </p>

                  <a
                    href={s.cta.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-inter text-white transition-all hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-600/20"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-600 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="relative">
                      {s.cta.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px bg-white/30 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </a>
                </motion.div>

                {/* right controls */}
                <div className="flex justify-end items-end">
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-2">
                      {SLIDES.map((_, di) => (
                        <button
                          key={di}
                          onClick={() => {
                            setI(di);
                            setPlaying(false);
                          }}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600/40 ${
                            di === i
                              ? "bg-sky-600 shadow-md shadow-sky-600/30"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                          aria-label={`Go to slide ${di + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setPlaying((p) => !p)}
                      className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 ${
                        playing
                          ? "border-white/30 bg-white/10 hover:bg-white/20 text-white"
                          : "border-sky-600 bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/30"
                      }`}
                      aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                    >
                      {playing ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4 ml-0.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* progress */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <motion.div
              key={`progress-${s.id}-${progressEnabled}`}
              className="h-full bg-sky-600"
              initial={{ width: 0 }}
              animate={{ width: progressEnabled ? "100%" : "0%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>

          {/* arrows */}
          <NavButton
            side="left"
            onClick={() => {
              setI((x) => wrap(x - 1));
              setPlaying(false);
            }}
          />
          <NavButton
            side="right"
            onClick={() => {
              setI((x) => wrap(x + 1));
              setPlaying(false);
            }}
          />
        </div>
      </div>
    </section>
  );
};

/* ============================ Logo Marquee ============================ */
const LogoMarquee: React.FC = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Siemens-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/ABB_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/SAP_2011_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Philips_logo_new.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_TV_2015.png",
  ];
  return (
    <section className="py-10 bg-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 w-[200%] px-8"
        >
          {[...logos, ...logos].map((src, idx) => (
            <img key={idx} src={src} alt="" className="h-8 opacity-70" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================ Stats (BlueCard) ============================ */
const StatsSection: React.FC = () => {
  const stats = [
    { icon: Droplet, value: "1.2 GW+", label: "Installed Capacity" },
    { icon: Users, value: "300+", label: "Engineers & Staff" },
    { icon: Clock, value: "20+ yrs", label: "Hydro Experience" },
    { icon: Award, value: "ISO 9001/14001", label: "Certified Systems" },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-lg transition-all"
            >
              <div className="p-5 flex flex-col">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-3">
                  <stat.icon className="h-6 w-6 text-sky-600" />
                </div>
                <div className="font-jakarta text-2xl sm:text-3xl font-semibold text-black leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-sm text-black/60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================ Why Choose Us (BlueCard) ============================ */
/* ============================ Why Choose Us (revamped) ============================ */
const WhyUs: React.FC = () => {
  const pills = [
    { label: "Bankable DPRs" },
    { label: "Lender Standards" },
    { label: "Zero-Harm Safety" },
    { label: "Grid Code Ready" },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Risk-Controlled Delivery",
      desc: "Stage-gated schedules, QA/QC plans, and HSE playbooks reduce delays and rework.",
      points: ["Detailed risk registers", "Independent QA/QC", "HSE audits"],
    },
    {
      icon: Gauge,
      title: "High Capacity Factors",
      desc: "Hydrology, EM selection, and protection studies tuned for reliable output.",
      points: ["Hydro & sediment studies", "Optimal turbine selection", "Relay coordination"],
    },
    {
      icon: BatteryCharging,
      title: "Lower OpEx Over Life",
      desc: "Predictive maintenance and uprates extend asset life and cut outages.",
      points: ["CBM & spares strategy", "Efficiency testing", "SCADA & remote ops"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-sky-50/40">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Headline card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 rounded-3xl border border-sky-100 bg-white shadow-md p-8 sm:p-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 text-sky-700 px-3 py-1 text-xs font-medium mb-4">
              Why Yeti Hydropower
            </div>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black">
              Bankable hydropower. <span className="text-sky-600">Built for the grid.</span>
            </h2>
            <p className="mt-3 text-black/70 max-w-2xl">
              From feasibility to COD and O&M, we deliver lender-grade documentation, safe execution,
              and dispatch-ready plants that perform.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {pills.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50/60 px-3 py-1 text-xs text-sky-800"
                >
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Snapshot card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-3xl bg-gradient-to-br from-sky-600 to-sky-500 text-white p-8 sm:p-10 shadow-md"
          >
            <div className="text-white/90 text-sm">Snapshot</div>
            <div className="mt-2 text-3xl font-semibold">1.2 GW+</div>
            <div className="text-white/90">Installed Capacity</div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-white/80">Projects</div>
                <div className="text-xl font-semibold">120+</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-white/80">Avg. COD Slip</div>
                <div className="text-xl font-semibold">&lt; 3%</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-4">
                <b.icon className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-black">{b.title}</h3>
              <p className="text-sm text-black/70 mt-2">{b.desc}</p>
              <ul className="mt-4 space-y-2">
                {b.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-black/70">
                    <CheckCircle className="h-4 w-4 text-sky-600" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================ Services (BlueCard) ============================ */
const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Mountain,
      title: "Feasibility, DPR & Permitting",
      desc: "Hydrology, geotech, ESIA, and bankable DPRs with regulatory approvals.",
      features: ["Hydrology & Sediment", "Geotech & Access", "ESIA & Permits", "Financial Models"],
    },
    {
      icon: Droplet,
      title: "Civil & Electro-Mechanical EPC",
      desc: "Weirs, headrace, penstocks, turbines, governors, switchgear—end-to-end EPC.",
      features: ["Intake & Desanding", "Headrace/Tunnel", "Turbine & Generator", "SCADA & Controls"],
    },
    {
      icon: Gauge,
      title: "Grid Integration & Protection",
      desc: "Substations, lines, relay settings, and grid code compliance.",
      features: ["Substation (66–220kV)", "Transmission Lines", "Protection Studies", "Grid Code Compliance"],
    },
    {
      icon: BatteryCharging,
      title: "O&M, Upgrades & Digitalization",
      desc: "Condition monitoring, uprating, efficiency tests, and predictive maintenance.",
      features: ["CM/CBM & Spares", "Turbine Uprates", "Efficiency Audits", "Remote SCADA"],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-sky-50 px-3 py-1 text-xs uppercase tracking-wider text-black/70">
            <Droplet className="h-4 w-4 text-sky-600" />
            Our Services
          </div>
          <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-black tracking-tight">
            Hydropower Excellence
          </h2>
          <p className="font-inter text-lg text-black/60 max-w-2xl mx-auto mt-3">
            From river studies to commissioning and long-term O&M.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <BlueCard>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-5">
                  <service.icon className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="font-jakarta text-xl font-semibold text-black mb-2">
                  {service.title}
                </h3>
                <p className="font-inter text-sm text-black/60 mb-5 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-black/70">
                      <CheckCircle className="h-4 w-4 text-sky-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </BlueCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================ Process Timeline (kept, sky accents) ============================ */
const ProcessSection: React.FC = () => {
  const steps = [
    { title: "Feasibility & ESIA", text: "Hydrology, geotech, environment, and community consultations." },
    { title: "Design & DPR", text: "Optimized civil/EM design, BOQs, and financial modeling." },
    { title: "EPC & Testing", text: "Construction, installation, pre-commissioning, and reliability runs." },
    { title: "Grid Sync & O&M", text: "Grid code compliance, COD, and long-term services." },
  ];
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-12">
          Our Proven Process
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-sky-200 via-sky-400 to-sky-600" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative ${idx % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}
              >
                <div
                  className={`absolute top-2 h-3 w-3 rounded-full bg-sky-600 shadow-[0_0_0_6px_rgba(56,189,248,0.25)] ${
                    idx % 2 === 0 ? "right-[-7px] md:right-[-9px]" : "left-[-7px] md:left-[-9px]"
                  }`}
                />
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="font-semibold">{s.title}</div>
                  <p className="text-sm text-black/60 mt-1.5">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================ Projects (BlueCard) ============================ */
const ProjectsSection: React.FC = () => {
  const projects = [
    {
      image: "https://plus.unsplash.com/premium_photo-1678446510354-5c39e3409c59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHlkcm9wb3dlciUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
      category: "Reservoir",
      title: "Upper Himal Reservoir HPP (120 MW)",
      location: "Gandaki Province",
      year: "2024",
      desc: "Concrete gravity dam, Pelton turbines, 132 kV GIS substation.",
    },
    {
      image: "https://images.unsplash.com/photo-1606049910442-36d2f218a5ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHlkcm9wb3dlciUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
      category: "Run-of-River",
      title: "Bhote Koshi RoR HPP (48 MW)",
      location: "Bagmati Province",
      year: "2023",
      desc: "Headrace tunnel, steel penstock, digital governor & SCADA.",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1727344751168-03790785caf2?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Grid",
      title: "Substation & TL Package",
      location: "Province 1",
      year: "2022",
      desc: "220/132 kV AIS, protection coordination, OPGW integration.",
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 sm:mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black">
              Recent Projects
            </h2>
            <p className="mt-3 font-inter text-black/60 max-w-2xl">
              Clean, reliable hydropower delivered with safety, quality, and community partnership.
            </p>
          </div>
          <a
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-inter transition-all hover:bg-black/5"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* equal-height cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl overflow-hidden border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {/* fixed image ratio + proper rounding */}
              <div className="relative aspect-[16/10]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute left-4 bottom-3 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black backdrop-blur-sm">
                    {p.category}
                  </span>
                  <span className="text-white/90 text-xs inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {p.year}
                  </span>
                </div>
              </div>

              {/* body as grid so footer stays aligned */}
              <div className="p-6 grid grid-rows-[auto_auto_1fr_auto] gap-3 h-full">
                <h3 className="font-jakarta text-lg font-semibold text-black">
                  {p.title}
                </h3>
                <div className="text-sm text-black/60 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {p.location}
                </div>

                {/* clamp to 2 lines for consistency */}
                <p className="text-sm text-black/70 clamp-2">
                  {p.desc}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-800"
                  >
                    Case Study <ExternalLink className="h-4 w-4" />
                  </a>
                  <div className="flex items-center gap-1 text-sky-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ============================ Testimonials (BlueCard) ============================ */
const Testimonials: React.FC = () => {
  const items = [
    {
      quote:
        "Yeti Hydropower delivered our RoR plant on schedule with exceptional safety and grid performance.",
      author: "Kiran Shrestha",
      role: "Project Director, Himalayan Power Ltd.",
      avatar:
        "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote:
        "Their protection studies and substation EPC made grid synchronization smooth and audit-ready.",
      author: "Anita Gurung",
      role: "GM (Transmission), East Grid Co.",
      avatar:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote:
        "Predictive maintenance upgrades improved our capacity factor and reduced forced outages materially.",
      author: "Rahul Bista",
      role: "O&M Head, Green Valley Energy",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    },
  ];
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-12">
          What Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <BlueCard>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-black">{t.author}</div>
                    <div className="text-xs text-black/60">{t.role}</div>
                  </div>
                </div>
                <p className="text-black/80 leading-relaxed">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-1 text-sky-600">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </BlueCard>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================ FAQ ============================ */
const FAQ: React.FC = () => {
  const faqs = [
    { q: "Do you provide EPC for both RoR and reservoir projects?", a: "Yes, we handle full EPC from civil to electro-mechanical for both plant types." },
    { q: "How do you ensure environmental compliance?", a: "ESIA, biodiversity plans, and continuous community engagement aligned with national guidelines." },
    { q: "Can you support grid code compliance?", a: "We execute protection studies, relay settings, and FAT/SAT to meet grid codes." },
    { q: "Do you offer O&M after COD?", a: "Yes, including predictive maintenance, uprates, and remote SCADA." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-10">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faqs.map((f, idx) => (
            <div key={f.q} className="p-5 sm:p-6">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${open === idx ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-black/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================ CTA Banner (sky) ============================ */
const CTABanner: React.FC = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-sky-600 to-sky-500">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-white text-2xl font-semibold">Ready to power your project?</h3>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
          >
            Get a Free Proposal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ============================ Contact (BlueCard) ============================ */
/* ============================ Contact (revamped) ============================ */
const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black">
            Let’s talk about your project
          </h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            Send your scope and timeline—we’ll respond within one business day with next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-6 shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-3">
                <Droplet className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-black">Yeti Hydropower HQ</h3>
              <p className="text-sm text-black/70 mt-1">Pulchowk, Lalitpur 44700, Nepal</p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-sky-600" />
                  <span className="font-medium">+977 1-4440000</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-sky-600" />
                  <span className="font-medium">tenders@yetihydro.com</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-800">
                  RFPs & Tenders
                </span>
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-800">
                  Grid & Substation
                </span>
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-800">
                  O&amp;M / Upgrades
                </span>
              </div>

              {/* Mini map / image */}
              <div className="mt-6 overflow-hidden rounded-xl border border-sky-100">
                <img
                  src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop"
                  alt="Office vicinity"
                  className="h-36 w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-6 shadow-md">
              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-black/60">Full Name</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/60">Work Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/60">Company</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Organization"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/60">Project Type</label>
                  <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40">
                    <option>Run-of-River</option>
                    <option>Reservoir</option>
                    <option>Substation / Lines</option>
                    <option>O&amp;M / Upgrades</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-black/60">Message</label>
                  <textarea
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                    placeholder="Brief your site, scope, MW, and timeline…"
                  />
                </div>

                {/* Action strip */}
                <div className="sm:col-span-2 mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                  >
                    Send Inquiry <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="text-xs text-black/50">
                    We’ll review and reply within 1 business day.
                  </div>
                </div>
              </form>
            </div>

            {/* CTA panel under form */}
            <div className="mt-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white p-5 sm:p-6 flex items-center justify-between gap-4">
              <div className="text-sm sm:text-base">
                Prefer a quick call? Our proposals team can walk through options in 15 minutes.
              </div>
              <a
                href="tel:+97714440000"
                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ============================ Footer (sky accents) ============================ */
const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white">
      <div className="h-2 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600" />
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-600">
                <Droplet className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-semibold">Yeti Hydropower</div>
            </div>
            <p className="mt-4 text-sm text-black/70">
              Engineering and delivering clean hydropower across Nepal with safety, quality, and community partnership.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-black/70">
                ISO 9001
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-black/70">
                ISO 14001
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-black/70">
                OHS
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li><a href="/about" className="hover:text-black">About</a></li>
              <li><a href="#services" className="hover:text-black">Services</a></li>
              <li><a href="#projects" className="hover:text-black">Projects</a></li>
              <li><a href="#contact" className="hover:text-black">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li><a href="#" className="hover:text-black">Whitepapers</a></li>
              <li><a href="#" className="hover:text-black">Case Studies</a></li>
              <li><a href="#" className="hover:text-black">Careers</a></li>
              <li><a href="#" className="hover:text-black">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-black/70">Monthly insights on hydro, grid, and O&M.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex items-center gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
              <button className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">
                Join
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3 text-black/70">
              <a href="#" aria-label="Facebook" className="rounded-md p-2 hover:bg-gray-100">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-md p-2 hover:bg-gray-100">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-md p-2 hover:bg-gray-100">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="rounded-md p-2 hover:bg-gray-100">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-black/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Yeti Hydropower. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ============================ Page ============================ */
const YetiHydroHome: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <StatsSection />
        <WhyUs />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default YetiHydroHome;
