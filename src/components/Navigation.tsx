import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Construction,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/", hasDropdown: false },
    { 
      label: "Projects", 
      href: "/projects",
      hasDropdown: true,
      dropdownItems: [
        { label: "Civil Infrastructure", href: "/projects/civil" },
        { label: "High-Rise Construction", href: "/projects/highrise" },
        { label: "Industrial & EPC", href: "/projects/industrial" },
        { label: "Structural & RCC", href: "/projects/structural" },
      ]
    },
    { label: "About Us", href: "/about", hasDropdown: false },
    { 
      label: "Services", 
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Design & Planning", href: "/services/design" },
        { label: "Construction Management", href: "/services/management" },
        { label: "Quality Assurance", href: "/services/quality" },
        { label: "Project Consulting", href: "/services/consulting" },
      ]
    },
    { label: "Contact Us", href: "/contact", hasDropdown: false },
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="grid h-10 w-10 lg:h-12 lg:w-12 place-items-center rounded-xl bg-amber-600 shadow-lg shadow-amber-600/30">
              <Construction className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="font-jakarta">
              <div className="text-lg lg:text-xl font-semibold text-black tracking-tight">
                BuildCorp
              </div>
              <div className="text-xs text-black/60 font-medium tracking-wider uppercase">
                Construction
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
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
                  className="group flex items-center gap-1 font-inter text-sm font-medium text-black/70 hover:text-black transition-colors duration-200"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-amber-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-gray-200/50 bg-white/95 backdrop-blur-sm shadow-xl shadow-black/10 py-2"
                      >
                        {item.dropdownItems?.map((dropItem) => (
                          <a
                            key={dropItem.label}
                            href={dropItem.href}
                            className="flex items-center px-4 py-2.5 font-inter text-sm text-black/70 hover:text-black hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            {dropItem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden xl:flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-black/60">
                <Phone className="h-4 w-4" />
                <span className="font-inter">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-black/60">
                <Mail className="h-4 w-4" />
                <span className="font-inter">info@buildcorp.com</span>
              </div>
            </div>

            {/* CTA Button - Hidden on mobile */}
            <a
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-black/10 bg-amber-600 px-4 py-2 text-sm font-inter text-white transition-all duration-300 hover:bg-amber-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-600/20"
            >
              Get Quote
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-gray-200/50 bg-white/80 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-black/70" />
              ) : (
                <Menu className="h-5 w-5 text-black/70" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-sm"
            >
              <nav className="py-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 font-inter text-base text-black/70 hover:text-black hover:bg-gray-50/80 transition-colors duration-200"
                      onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </a>
                    {/* Mobile Dropdown */}
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="bg-gray-50/50 border-l-2 border-amber-600/20 ml-4">
                        {item.dropdownItems.map((dropItem) => (
                          <a
                            key={dropItem.label}
                            href={dropItem.href}
                            className="block px-4 py-2 font-inter text-sm text-black/60 hover:text-black transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Contact Info */}
                <div className="mt-4 pt-4 border-t border-gray-200/50 px-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-black/60">
                      <Phone className="h-4 w-4" />
                      <span className="font-inter">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-black/60">
                      <Mail className="h-4 w-4" />
                      <span className="font-inter">info@buildcorp.com</span>
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-inter text-white transition-all duration-300 hover:bg-amber-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Quote
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;