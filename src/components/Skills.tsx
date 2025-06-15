
import React, { useEffect, useState } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: 'JavaScript/TypeScript', level: 95, color: 'from-yellow-400 to-orange-500' },
    { name: 'React/Next.js', level: 90, color: 'from-blue-400 to-cyan-500' },
    { name: 'Node.js/Express', level: 85, color: 'from-green-400 to-emerald-500' },
    { name: 'Python/Django', level: 80, color: 'from-purple-400 to-pink-500' },
    { name: 'Database Design', level: 88, color: 'from-red-400 to-rose-500' },
    { name: 'UI/UX Design', level: 75, color: 'from-indigo-400 to-purple-500' }
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
    <section id="skills" className="py-20 px-4 bg-white/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
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
            <h3 className="text-2xl font-semibold text-white mb-8">Tools & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="text-gray-300">{tool}</span>
                </div>
              ))}
            </div>

            {/* Experience Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { number: '5+', label: 'Years Experience' },
                { number: '50+', label: 'Projects Completed' },
                { number: '30+', label: 'Happy Clients' }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
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
