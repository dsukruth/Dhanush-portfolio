
import React from 'react';
import { GraduationCap, Award, Users } from 'lucide-react';
import { personalInfo, education, leadership } from '../data/portfolioData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const About = () => {
  const stats = [
    { 
      number: personalInfo.yearsExperience, 
      label: 'Years Experience',
      summary: 'Led capstone project with Twenty39 LLC implementing AI chatbot solutions for federal contracts. Previously worked as Software Test Engineer at ISRO developing satellite systems and as Software Engineer Intern at Dedoco building blockchain networks.'
    },
    { 
      number: personalInfo.projectsCompleted, 
      label: 'Projects Completed',
      summary: 'Built comprehensive house prediction system using ZenML and MLFlow, engineered POA blockchain network improving data validation by 60%, developed AI chatbot solutions reducing procurement cycle time by 30%, and created multiple satellite testing systems.'
    },
    { 
      number: personalInfo.volunteersLed, 
      label: 'Volunteers Led',
      summary: 'As District President of Mother Teresa Charitable Trust, led 800 volunteers teaching underprivileged children basic programming, identified skill gaps, provided tech training, and increased class participation by 150%.'
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
            {/* Stats with Tooltips */}
            <TooltipProvider>
              <div className="grid grid-cols-1 gap-6">
                {stats.map((stat, index) => (
                  <Tooltip key={stat.label}>
                    <TooltipTrigger asChild>
                      <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-gray-300">
                        <div className="text-4xl font-thin text-gray-900 mb-2">{stat.number}</div>
                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-sm p-4 bg-gray-900 text-white rounded-lg shadow-xl">
                      <p className="text-sm leading-relaxed">{stat.summary}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>

            {/* Key Highlights with Tooltips */}
            <div className="p-8 bg-gray-900 rounded-2xl text-white">
              <h4 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Award size={24} />
                Key Achievements
              </h4>
              <TooltipProvider>
                <ul className="space-y-3 text-gray-300">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="cursor-pointer hover:text-white transition-colors">• AI in Food Insecurity Case Competition Winner</li>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs p-3 bg-white text-gray-900 rounded-lg shadow-xl">
                      <p className="text-sm">Won first place in AI competition focused on addressing food insecurity challenges using machine learning and data analytics.</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="cursor-pointer hover:text-white transition-colors">• AI in Business Case Competition Runner Up</li>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs p-3 bg-white text-gray-900 rounded-lg shadow-xl">
                      <p className="text-sm">Secured second place in business-focused AI competition, demonstrating practical applications of AI in enterprise solutions.</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="cursor-pointer hover:text-white transition-colors">• Led 800+ volunteers in educational initiatives</li>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs p-3 bg-white text-gray-900 rounded-lg shadow-xl">
                      <p className="text-sm">As District President, managed large volunteer team teaching programming to underprivileged children, increasing participation by 150%.</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="cursor-pointer hover:text-white transition-colors">• 30% improvement in procurement cycle time</li>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs p-3 bg-white text-gray-900 rounded-lg shadow-xl">
                      <p className="text-sm">Implemented AI chatbot solutions for federal contracts that streamlined document analysis and reduced procurement processing time.</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="cursor-pointer hover:text-white transition-colors">• 20% increase in satellite system reliability</li>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs p-3 bg-white text-gray-900 rounded-lg shadow-xl">
                      <p className="text-sm">Developed comprehensive test plans for ISRO satellite systems, improving overall system reliability through rigorous testing procedures.</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="cursor-pointer hover:text-white transition-colors">• CSPO Certified Product Owner</li>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs p-3 bg-white text-gray-900 rounded-lg shadow-xl">
                      <p className="text-sm">Certified Scrum Product Owner with expertise in defining product visions, prioritizing backlogs, and aligning strategies with business objectives.</p>
                    </TooltipContent>
                  </Tooltip>
                </ul>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
