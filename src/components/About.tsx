import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle } from 'lucide-react';

const About = () => {
  const missions = [
    "Deliver innovative and sustainable infrastructure",
    "Uphold quality, safety, and efficiency",
    "Build trust through integrity"
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            About Everest Infra Group
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
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-inter">
              Everest Infra Group is a leading construction and infrastructure development company, 
              established with a vision to transform the landscape of South Asia. We deliver 
              comprehensive projects in roads, bridges, hydropower, airports, irrigation, and 
              urban infrastructure with unparalleled excellence.
            </p>

            <div className="space-y-6">
              {/* Mission */}
              <div>
                <div className="flex items-center mb-4">
                  <Target className="text-primary mr-3" size={24} />
                  <h3 className="text-2xl font-playfair font-semibold text-foreground">Our Mission</h3>
                </div>
                <div className="space-y-3">
                  {missions.map((mission, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={16} />
                      <span className="text-muted-foreground">{mission}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-card rounded-2xl p-8 shadow-xl border border-border"
          >
            <div className="flex items-center mb-6">
              <Eye className="text-primary mr-3" size={24} />
              <h3 className="text-2xl font-playfair font-semibold text-foreground">Our Vision</h3>
            </div>
            <blockquote className="text-xl font-inter text-foreground italic leading-relaxed">
              "To be South Asia's most trusted and innovative infrastructure company, 
              setting new standards in construction excellence while contributing to 
              sustainable development and community growth."
            </blockquote>
            <div className="mt-6 flex items-center">
              <div className="w-12 h-0.5 bg-primary mr-4"></div>
              <span className="text-sm text-muted-foreground font-medium">Everest Infra Group</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "40+", label: "Years Experience" },
              { number: "500+", label: "Completed Projects" },
              { number: "1000+", label: "Expert Engineers" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-playfair font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-inter">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;