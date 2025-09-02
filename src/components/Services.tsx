import React from 'react';
import { motion } from 'framer-motion';
import { 
  Construction, 
  Route, 
  Building, 
  Zap, 
  Droplets, 
  Plane, 
  Waves, 
  Power 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Construction,
      title: "Bridges",
      description: "Design and construction of suspension, cable-stayed, and arch bridges connecting communities across challenging terrains."
    },
    {
      icon: Route,
      title: "Roads & Highways",
      description: "Development of modern road networks with advanced drainage systems and sustainable materials for long-lasting infrastructure."
    },
    {
      icon: Building,
      title: "Buildings",
      description: "Commercial, residential, and institutional construction combining modern design with traditional architectural elements."
    },
    {
      icon: Zap,
      title: "Hydropower",
      description: "Sustainable energy solutions through run-of-river and storage hydropower projects utilizing Nepal's water resources."
    },
    {
      icon: Droplets,
      title: "Water Supply & Treatment",
      description: "Comprehensive water infrastructure including treatment plants, distribution networks, and sewage management systems."
    },
    {
      icon: Plane,
      title: "Airports",
      description: "Airport infrastructure development including runways, terminals, and supporting facilities meeting international standards."
    },
    {
      icon: Waves,
      title: "Irrigation Systems",
      description: "Advanced irrigation networks to support agricultural development and food security across rural communities."
    },
    {
      icon: Power,
      title: "Transmission & Distribution Lines",
      description: "Electrical infrastructure development for reliable power transmission and distribution across urban and rural areas."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Comprehensive infrastructure solutions designed to meet the evolving needs 
            of modern South Asian development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-card rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 hover:-translate-y-1">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-inter">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-primary rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-playfair font-bold mb-6">
              Ready to Start Your Next Infrastructure Project?
            </h3>
            <p className="text-xl mb-8 opacity-90 font-inter">
              Let our expert team help you bring your vision to life with world-class engineering solutions
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all font-inter"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;