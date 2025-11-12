import React, { useEffect, useState } from 'react';
import { Code, Database, Wrench, Target, Brain, Cloud, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { technicalSkills } from '../data/portfolioData';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Core expertise areas with detailed proficiency
  const coreExpertise = [
    {
      name: 'Product Management',
      icon: Target,
      level: 92,
      color: '#6366f1',
      gradient: 'from-indigo-500 to-purple-600',
      skills: ['Product Strategy', 'Roadmap Planning', 'Stakeholder Management', 'Agile/Scrum'],
      description: '3+ years managing mission-critical products serving $500M+ programs'
    },
    {
      name: 'AI/ML Engineering',
      icon: Brain,
      level: 88,
      color: '#10b981',
      gradient: 'from-green-500 to-emerald-600',
      skills: ['TensorFlow', 'PyTorch', 'LangChain', 'RAG', 'Vector Databases'],
      description: 'Scaled AI platform from 0→50K users with 92% satisfaction'
    },
    {
      name: 'Cloud Technologies',
      icon: Cloud,
      level: 85,
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-600',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'],
      description: 'Architected scalable cloud infrastructure with 99% uptime'
    }
  ];

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
    { name: 'Product Strategy', level: 92, category: 'Product Management', icon: Target },
    { name: 'Python & ML', level: 90, category: 'AI/ML', icon: Brain },
    { name: 'Cloud Platforms (AWS/GCP)', level: 85, category: 'Infrastructure', icon: Cloud },
    { name: 'Stakeholder Management', level: 88, category: 'Leadership', icon: Users },
    { name: 'Data Analysis', level: 86, category: 'Analytics', icon: TrendingUp },
    { name: 'Innovation & Vision', level: 90, category: 'Strategy', icon: Lightbulb }
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
          <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Comprehensive skill set spanning product management, AI/ML engineering, and cloud technologies
          </p>
        </div>

        {/* Core Expertise Visualization */}
        <div className="mb-32">
          <h3 className="text-3xl font-light text-gray-900 mb-12 text-center">Core Expertise Areas</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {coreExpertise.map((expertise, index) => {
              const Icon = expertise.icon;
              const circumference = 2 * Math.PI * 70;
              const strokeDashoffset = circumference - (circumference * expertise.level) / 100;
              
              return (
                <div
                  key={expertise.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredSkill(expertise.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:scale-105">
                    {/* Circular Progress */}
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <svg className="transform -rotate-90 w-48 h-48">
                        {/* Background circle */}
                        <circle
                          cx="96"
                          cy="96"
                          r="70"
                          stroke="#f3f4f6"
                          strokeWidth="12"
                          fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="96"
                          cy="96"
                          r="70"
                          stroke={expertise.color}
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={isVisible ? strokeDashoffset : circumference}
                          className="transition-all duration-1500 ease-out"
                          style={{ transitionDelay: `${index * 200}ms` }}
                        />
                      </svg>
                      
                      {/* Center content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className={`p-4 bg-gradient-to-br ${expertise.gradient} rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={32} className="text-white" />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{expertise.level}%</span>
                      </div>
                    </div>

                    {/* Expertise Info */}
                    <h4 className="text-2xl font-semibold text-gray-900 text-center mb-3">
                      {expertise.name}
                    </h4>
                    <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                      {expertise.description}
                    </p>

                    {/* Skills List */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {expertise.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 bg-gradient-to-r ${expertise.gradient} text-white text-xs rounded-full font-medium opacity-90 hover:opacity-100 transition-opacity duration-300`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          {/* Skill Categories */}
          <div className="space-y-12">
            <h3 className="text-3xl font-light text-gray-900 mb-8">All Technical Skills</h3>
            
            {skillCategories.map((category, index) => (
              <div key={category.title} className="space-y-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${category.color} rounded-lg`}>
                    <category.icon size={20} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{category.title}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 cursor-pointer group"
                    >
                      <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency Levels */}
          <div className="space-y-12">
            <h3 className="text-3xl font-light text-gray-900 mb-8">Key Proficiencies</h3>
            
            <div className="space-y-6">
              {proficiencyLevels.map((skill, index) => {
                const SkillIcon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <SkillIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <span className="text-gray-900 font-semibold block">{skill.name}</span>
                          <span className="text-gray-500 text-xs">{skill.category}</span>
                        </div>
                      </div>
                      <span className="text-gray-900 text-lg font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 150}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Recent Certification</h4>
                  <p className="text-white font-medium text-lg">Certified Scrum Product Owner (CSPO)</p>
                  <p className="text-gray-300 text-sm mb-3">Scrum Alliance • March 2025</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Leveraged expertise to define clear product visions, prioritize backlog items effectively, 
                    and align product strategies with stakeholder needs and business objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
