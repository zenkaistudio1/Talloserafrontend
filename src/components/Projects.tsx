import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hydropowerImage from '@/assets/hydropower-project.jpg';
import bridgeImage from '@/assets/bridge-project.jpg';
import assemblyImage from '@/assets/assembly-complex.jpg';

const Projects = () => {
  const projects = [
    {
      title: "Kathmandu Urban Road Development",
      location: "Kathmandu, Nepal",
      type: "Roads & Infrastructure",
      year: "2023",
      team: "150+ Engineers",
      description: "Comprehensive city road networks with modern drainage systems, smart traffic management, and sustainable urban planning solutions.",
      image: hydropowerImage,
      features: ["Smart Traffic Systems", "Modern Drainage", "LED Lighting", "Sustainable Materials"]
    },
    {
      title: "Seti Hydropower Project",
      location: "Western Nepal",
      type: "Renewable Energy",
      year: "2022",
      team: "200+ Specialists",
      description: "50MW run-of-river hydropower facility providing clean energy to over 100,000 households while maintaining environmental sustainability.",
      image: hydropowerImage,
      features: ["50MW Capacity", "Run-of-River Design", "Environmental Protection", "Community Benefits"]
    },
    {
      title: "Everest Suspension Bridge",
      location: "Himalayan Region",
      type: "Bridge Construction",
      year: "2023",
      team: "80+ Engineers",
      description: "Engineering marvel connecting remote mountain communities with modern cable-stayed design and seismic-resistant technology.",
      image: bridgeImage,
      features: ["Seismic Resistant", "Cable-Stayed Design", "Remote Access", "Weather Resistant"]
    },
    {
      title: "National Assembly Complex",
      location: "Kathmandu, Nepal",
      type: "Government Buildings",
      year: "2024",
      team: "300+ Professionals",
      description: "Iconic government complex blending modern architectural design with traditional Nepali cultural elements and sustainable building practices.",
      image: assemblyImage,
      features: ["Cultural Integration", "Modern Design", "Sustainable Building", "Advanced Security"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Showcasing our commitment to excellence through transformative infrastructure 
            projects across South Asia
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm mb-2">
                      <MapPin size={16} className="mr-2" />
                      {project.location}
                    </div>
                    <div className="text-xs opacity-90">{project.type}</div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-playfair font-bold text-foreground">
                      {project.title}
                    </h3>
                    <Button variant="ghost" size="icon" className="opacity-60 hover:opacity-100">
                      <ExternalLink size={20} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {project.year}
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      {project.team}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 font-inter">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium text-center"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    View Project Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button variant="cta" size="lg">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;