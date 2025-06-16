
import React from 'react';
import { GraduationCap, Award, Users } from 'lucide-react';
import { personalInfo, education, leadership } from '../data/portfolioData';

const About = () => {
  const stats = [
    { number: personalInfo.yearsExperience, label: 'Years Experience' },
    { number: personalInfo.projectsCompleted, label: 'Projects Completed' },
    { number: personalInfo.volunteersLed, label: 'Volunteers Led' }
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {personalInfo.bio}
            </p>
            
            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <GraduationCap size={28} />
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{edu.degree}</h4>
                  <p className="text-gray-700 mb-2">{edu.institution}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{edu.location}</span>
                    <span>{edu.period}</span>
                  </div>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-600">• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Leadership */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <Users size={28} />
                Leadership
              </h3>
              {leadership.map((lead, index) => (
                <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{lead.title}</h4>
                  <p className="text-gray-700 mb-2">{lead.organization}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{lead.location}</span>
                    <span>{lead.period}</span>
                  </div>
                  <ul className="space-y-1">
                    {lead.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-600">• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl font-thin text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="p-8 bg-gray-900 rounded-2xl text-white">
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Award size={24} />
                Key Achievements
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>• AI in Food Insecurity Case Competition Winner</li>
                <li>• AI in Business Case Competition Runner Up</li>
                <li>• Led 800+ volunteers in educational initiatives</li>
                <li>• 30% improvement in procurement cycle time</li>
                <li>• 20% increase in satellite system reliability</li>
                <li>• CSPO Certified Product Owner</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
