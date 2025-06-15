
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
    <section id="about" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              I'm a passionate full-stack developer with over 5 years of experience creating 
              digital solutions that make a difference. I specialize in modern web technologies 
              and love turning complex problems into simple, beautiful designs.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
            <div className="flex flex-wrap gap-3 pt-6">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
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
