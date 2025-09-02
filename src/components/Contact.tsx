import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      info: "Kathmandu, Nepal",
      detail: "Serving Nepal, Bhutan & South Asia"
    },
    {
      icon: Phone,
      title: "Phone Number",
      info: "+977-XXXXXXXX",
      detail: "Mon - Fri, 9:00 AM - 6:00 PM"
    },
    {
      icon: Mail,
      title: "Email Address",
      info: "info@everestinfra.com",
      detail: "24/7 Support Available"
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon - Fri: 9:00 AM - 6:00 PM",
      detail: "Saturday: 9:00 AM - 2:00 PM"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Ready to start your next infrastructure project? Contact our expert team 
            for consultation and project planning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-playfair font-semibold text-foreground mb-8">
              Contact Information
            </h3>
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-foreground font-medium mb-1 font-inter">
                    {item.info}
                  </p>
                  <p className="text-muted-foreground text-sm font-inter">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="bg-gradient-card rounded-2xl p-8 border border-border">
                <h4 className="font-playfair font-semibold text-foreground mb-4">
                  Our Location
                </h4>
                <div className="bg-muted rounded-2xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="text-primary mx-auto mb-2" size={32} />
                    <p className="text-muted-foreground font-inter">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-playfair font-semibold text-foreground mb-8">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                    placeholder="Project inquiry, consultation, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-inter"
                    placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                  />
                </div>
                <Button type="submit" variant="cta" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;