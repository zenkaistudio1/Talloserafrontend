import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Handshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const News = () => {
  const newsItems = [
    {
      icon: Award,
      date: "December 2024",
      title: "Awarded Best Infrastructure Developer 2024",
      description: "Everest Infra Group recognized for outstanding contributions to South Asian infrastructure development and sustainable construction practices.",
      category: "Awards"
    },
    {
      icon: Calendar,
      date: "November 2024", 
      title: "New Hydropower Project Inaugurated in Western Nepal",
      description: "Successfully completed and inaugurated the 50MW Seti Hydropower Project, providing clean energy to over 100,000 households.",
      category: "Projects"
    },
    {
      icon: Handshake,
      date: "October 2024",
      title: "Partnership Announcement with Regional Engineering Firms",
      description: "Strategic partnerships formed with leading engineering firms to enhance our capabilities and expand our reach across South Asia.",
      category: "Partnerships"
    }
  ];

  return (
    <section id="news" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Latest News & Updates
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Stay informed about our latest achievements, project completions, and company developments
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-card rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar size={16} className="mr-2" />
                  {item.date}
                </div>

                <h3 className="text-xl font-playfair font-semibold text-foreground mb-4 leading-tight">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 font-inter">
                  {item.description}
                </p>

                <Button 
                  variant="ghost" 
                  className="group-hover:text-primary p-0 h-auto font-semibold"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-primary rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-playfair font-bold mb-6">
              Stay Updated with Our Latest News
            </h3>
            <p className="text-xl mb-8 opacity-90 font-inter">
              Subscribe to our newsletter and be the first to know about our new projects, 
              achievements, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-2xl text-foreground font-inter focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default News;