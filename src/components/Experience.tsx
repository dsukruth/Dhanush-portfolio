
import React from 'react';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';
import { experience } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 tracking-tight">
            Professional Experience
          </h2>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {experience.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-xl text-gray-700 font-medium">{job.company}</p>
                </div>
                
                <div className="flex flex-col lg:items-end text-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">{job.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="text-sm">{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-gray-600" />
                  <span className="text-lg font-medium text-gray-800">Key Achievements</span>
                </div>
                
                <ul className="space-y-3">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
