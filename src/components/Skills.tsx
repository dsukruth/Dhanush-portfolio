import React, { useEffect, useState } from 'react';
import { Code, Database, Wrench, Target, Brain, Cloud } from 'lucide-react';
import { technicalSkills } from '../data/portfolioData';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skillCategories = [
    {
      icon: Code,
      title: 'Programming Languages',
      skills: technicalSkills.languages,
      color: 'bg-blue-600'
    },
    {
      icon: Brain,
      title: 'AI/ML Frameworks',
      skills: technicalSkills.aiMlFrameworks,
      color: 'bg-green-600'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: technicalSkills.cloudDevOps,
      color: 'bg-purple-600'
    },
    {
      icon: Database,
      title: 'Data & Analytics',
      skills: technicalSkills.dataAnalytics,
      color: 'bg-orange-600'
    },
    {
      icon: Wrench,
      title: 'Blockchain',
      skills: technicalSkills.blockchain,
      color: 'bg-red-600'
    },
    {
      icon: Target,
      title: 'Project Management',
      skills: technicalSkills.projectManagement,
      color: 'bg-indigo-600'
    }
  ];

  const proficiencyLevels = [
    { name: 'Python', level: 95, category: 'Programming' },
    { name: 'JavaScript', level: 85, category: 'Programming' },
    { name: 'SQL', level: 90, category: 'Database' },
    { name: 'Machine Learning', level: 88, category: 'AI/ML' },
    { name: 'Product Strategy', level: 92, category: 'Management' },
    { name: 'Cloud Platforms', level: 80, category: 'Infrastructure' }
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
            Technical Expertise
          </h2>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Skill Categories */}
          <div className="space-y-12">
            <h3 className="text-3xl font-light text-gray-900 mb-8">Core Competencies</h3>
            
            {skillCategories.map((category, index) => (
              <div key={category.title} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${category.color} rounded-lg`}>
                    <category.icon size={20} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{category.title}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                      style={{
                        animationDelay: `${(index * category.skills.length + skillIndex) * 50}ms`
                      }}
                    >
                      <span className="text-gray-700 font-medium text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency Levels */}
          <div className="space-y-12">
            <h3 className="text-3xl font-light text-gray-900 mb-8">Proficiency Levels</h3>
            
            <div className="space-y-8">
              {proficiencyLevels.map((skill, index) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-900 font-semibold">{skill.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({skill.category})</span>
                    </div>
                    <span className="text-gray-600 text-sm font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 150}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-12 p-8 bg-gray-900 rounded-2xl">
              <h4 className="text-xl font-semibold text-white mb-4">Recent Certification</h4>
              <div className="text-gray-300">
                <p className="font-medium">Certified Scrum Product Owner (CSPO)</p>
                <p className="text-sm text-gray-400">Scrum Alliance • March 2025</p>
                <p className="text-sm mt-2">Product vision definition, backlog prioritization, and stakeholder alignment expertise.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
