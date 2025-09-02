import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Bridge Construction',
    'Road Development',
    'Hydropower Projects',
    'Building Construction',
    'Water Treatment'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-playfair font-bold text-primary mb-6">
              Everest Infra Group
            </h3>
            <p className="text-secondary-foreground/80 leading-relaxed mb-6 font-inter">
              Shaping the future of infrastructure across South Asia with world-class 
              construction and engineering solutions focused on quality, safety, and sustainability.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-playfair font-semibold text-secondary-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors font-inter"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-playfair font-semibold text-secondary-foreground mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-secondary-foreground/80 font-inter">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-playfair font-semibold text-secondary-foreground mb-6">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-primary mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-secondary-foreground font-inter">
                    Kathmandu, Nepal
                  </p>
                  <p className="text-secondary-foreground/80 text-sm font-inter">
                    Serving Nepal, Bhutan & South Asia
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-primary mr-3 flex-shrink-0" size={18} />
                <p className="text-secondary-foreground font-inter">
                  +977-XXXXXXXX
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="text-primary mr-3 flex-shrink-0" size={18} />
                <p className="text-secondary-foreground font-inter">
                  info@everestinfra.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-secondary-foreground/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-foreground/80 text-sm font-inter">
              © 2024 Everest Infra Group. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-secondary-foreground/80 hover:text-primary text-sm transition-colors font-inter">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-primary text-sm transition-colors font-inter">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-primary text-sm transition-colors font-inter">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;