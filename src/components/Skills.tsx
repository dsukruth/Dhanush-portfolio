
import React, { useEffect, useState } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: 'JavaScript/TypeScript', level: 95, color: 'bg-gray-900' },
    { name: 'React/Next.js', level: 90, color: 'bg-gray-800' },
    { name: 'Node.js/Express', level: 85, color: 'bg-gray-700' },
    { name: 'Python/Django', level: 80, color: 'bg-gray-600' },
    { name: 'Database Design', level: 88, color: 'bg-gray-500' },
    { name: 'UI/UX Design', level: 75, color: 'bg-gray-400' }
  ];

  const tools = [
    'Git & GitHub', 'Docker', 'AWS/Cloud', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST APIs', 'Jest/Testing', 'Webpack', 'Figma', 'Adobe XD'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 tracking-tight">
            Skills & Expertise
          </h2>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Technical Skills */}
          <div>
            <h3 className="text-3xl font-light text-gray-900 mb-12">Technical Skills</h3>
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-3xl font-light text-gray-900 mb-12">Tools & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool}
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 group"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>

            {/* Experience Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: '5+', label: 'Years Experience' },
                { number: '50+', label: 'Projects Completed' },
                { number: '30+', label: 'Happy Clients' }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-300"
                >
                  <div className="text-3xl font-light text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
