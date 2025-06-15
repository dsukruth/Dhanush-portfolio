
import React from 'react';
import { Code, Palette, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code following best practices."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces with attention to user experience and accessibility."
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed, efficiency, and seamless user interactions."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience creating 
              digital solutions that make a difference. I specialize in modern web technologies 
              and love turning complex problems into simple, beautiful designs.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community. I believe 
              in writing code that not only works but also inspires.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-gray-300 border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
