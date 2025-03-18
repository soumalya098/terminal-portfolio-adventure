import React from 'react';
import { Code, Server, Database, Globe, Layout, Terminal } from 'lucide-react';

type Skill = {
  name: string;
  level: number;
};

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: <Layout className="w-6 h-6" />,
      skills: [
        { name: 'HTML', level: 85 },
        { name: 'CSS', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'React.js', level: 65 },
      ],
    },
    {
      title: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: 'Python', level: 85 },
      ],
    },
    {
      title: 'Database',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'SQL', level: 75 },
        { name: 'MongoDB', level: 65 },
      ],
    },
    {
      title: 'Tools',
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: 'Git/GitHub', level: 80 },
        { name: 'VS Code', level: 85 },
        { name: 'Linux', level: 80 },
      ],
    },
  ];

  const languages = ['HTML', 'CSS', 'JavaScript', 'Python'];
  const tools = ['VS Code', 'Git', 'Linux', 'Chrome DevTools'];
  const other = ['Responsive Design', 'Problem Solving', 'Self-Learning', 'Version Control'];
  
  return (
    <div className="min-h-screen py-20">
      <div className="section-container">
        <h1 className="text-4xl font-bold heading-gradient mb-10 text-center">
          Skills & Experience
        </h1>
        
        {/* Skill Categories with Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-portfolio-primary/20 text-portfolio-secondary">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/90">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%`, transitionDelay: `${skillIndex * 100}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline */}
        <h2 className="text-3xl font-bold heading-gradient mb-8 text-center">
          Experience & Education
        </h2>
        <div className="glass p-6 sm:p-8 mb-16 max-w-4xl mx-auto">
          <div className="relative border-l-2 border-portfolio-accent/50 pl-8 pb-8 ml-4">
            {/* Timeline Items */}
            <TimelineItem 
              year="2023 - Present"
              title="Learning Coding"
              company="Self-taught"
              description="Learning various programming languages including HTML, CSS, JavaScript, and Python. Working on personal projects to improve skills."
              isLast
            />
          </div>
        </div>
        
        {/* Additional Skills */}
        <h2 className="text-3xl font-bold heading-gradient mb-8 text-center">
          Additional Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <SkillList title="Languages" icon={<Code />} items={languages} />
          <SkillList title="Tools" icon={<Terminal />} items={tools} />
          <SkillList title="Other" icon={<Globe />} items={other} />
        </div>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{
  year: string;
  title: string;
  company: string;
  description: string;
  isLast?: boolean;
}> = ({ year, title, company, description, isLast = false }) => (
  <div className={`mb-8 ${isLast ? '' : 'pb-8'}`}>
    <div className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-portfolio-accent shadow-[0_0_10px_rgba(157,70,255,0.5)]"></div>
    <span className="text-portfolio-secondary font-semibold">{year}</span>
    <h3 className="text-xl font-semibold text-white mt-1">{title}</h3>
    <p className="text-white/80 font-medium">{company}</p>
    <p className="text-white/60 mt-2">{description}</p>
  </div>
);

const SkillList: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: string[];
}> = ({ title, icon, items }) => (
  <div className="glass p-6 animate-fade-in">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-md bg-portfolio-primary/20 text-portfolio-secondary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span key={index} className="skill-badge">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default Skills;
