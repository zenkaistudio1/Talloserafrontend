import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Hammer, Wrench, Shield } from 'lucide-react';

const Resources = () => {
  const equipment = [
    {
      category: "Heavy Machinery",
      items: ["Bulldozers", "Excavators", "Wheel Loaders", "Motor Graders"]
    },
    {
      category: "Construction Equipment",
      items: ["Concrete Pumps", "Batching Plants", "Tower Cranes", "Mobile Cranes"]
    },
    {
      category: "Specialized Tools",
      items: ["Piling Rigs", "Tunnel Boring Machines", "Road Pavers", "Compactors"]
    },
    {
      category: "Safety & Quality",
      items: ["Testing Equipment", "Safety Gear", "Monitoring Systems", "Quality Control Tools"]
    }
  ];

  const icons = [Truck, Hammer, Wrench, Shield];

  return (
    <section id="resources" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Plant & Resources
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-inter">
              Everest Infra Group owns a wide range of modern equipment including bulldozers, 
              batching plants, excavators, piling rigs, and concrete pumps. With skilled operators 
              and advanced resources, we ensure efficiency, safety, and timely delivery of 
              large-scale projects.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                  <Truck className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-foreground mb-1">Modern Fleet</h4>
                  <p className="text-muted-foreground text-sm">Latest construction machinery and equipment</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                  <Shield className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-foreground mb-1">Safety First</h4>
                  <p className="text-muted-foreground text-sm">Comprehensive safety protocols and equipment</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                  <Wrench className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-foreground mb-1">Expert Operators</h4>
                  <p className="text-muted-foreground text-sm">Skilled professionals operating all equipment</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Equipment Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {equipment.map((category, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-border hover:border-primary/20"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-playfair font-semibold text-foreground mb-3">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground font-inter">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-primary rounded-2xl p-12 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Equipment Units" },
                { number: "200+", label: "Skilled Operators" },
                { number: "24/7", label: "Maintenance Support" },
                { number: "100%", label: "Safety Compliance" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl lg:text-4xl font-playfair font-bold mb-2">{stat.number}</div>
                  <div className="text-white/90 font-inter">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;