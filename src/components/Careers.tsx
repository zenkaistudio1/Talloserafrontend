import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Award, TrendingUp, Heart } from 'lucide-react';

const Careers = () => {
  const positions = [
    "Civil Engineers",
    "Project Managers", 
    "Structural Engineers",
    "Site Supervisors",
    "Quality Control Managers",
    "Environmental Specialists"
  ];

  const benefits = [
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work with industry experts and talented professionals"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning and advancement opportunities"
    },
    {
      icon: Award,
      title: "Excellence Recognition",
      description: "Performance-based rewards and recognition programs"
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Comprehensive benefits and flexible work arrangements"
    }
  ];

  return (
    <section id="careers" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Join Our Team
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
              At Everest Infra Group, we believe our people are our greatest strength. 
              We offer opportunities for engineers, project managers, and skilled professionals 
              to grow with us while building the infrastructure that shapes the future of South Asia.
            </p>

            <div className="space-y-6 mb-8">
              <h3 className="text-2xl font-playfair font-semibold text-foreground mb-4">
                Current Openings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {positions.map((position, index) => (
                  <motion.div
                    key={position}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary/10 text-primary px-4 py-3 rounded-2xl text-center font-medium"
                  >
                    {position}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button variant="cta" size="lg">
                Apply Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-playfair font-semibold text-foreground mb-8">
              Why Choose Everest Infra Group?
            </h3>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <benefit.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground font-inter">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-primary rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-playfair font-bold mb-6">
              Build Your Career With Us
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto font-inter">
              Join a team of passionate professionals dedicated to creating infrastructure 
              that makes a difference in people's lives across South Asia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "1000+", label: "Team Members" },
                { number: "95%", label: "Employee Satisfaction" },
                { number: "40+", label: "Years Experience" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-playfair font-bold mb-2">{stat.number}</div>
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

export default Careers;