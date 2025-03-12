
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
        { name: 'React.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      title: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 85 },
        { name: 'NestJS', level: 75 },
        { name: 'REST API', level: 90 },
        { name: 'GraphQL', level: 80 },
      ],
    },
    {
      title: 'Database',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Redis', level: 70 },
        { name: 'Prisma', level: 75 },
        { name: 'SQL', level: 85 },
      ],
    },
    {
      title: 'DevOps',
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: 'Docker', level: 80 },
        { name: 'CI/CD', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Git/GitHub', level: 90 },
        { name: 'Linux', level: 80 },
      ],
    },
  ];

  const languages = ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'SQL'];
  const tools = ['VS Code', 'Git', 'Docker', 'Figma', 'Postman', 'Chrome DevTools'];
  const other = ['Agile/Scrum', 'RESTful APIs', 'GraphQL', 'Responsive Design', 'Performance Optimization', 'SEO'];
  
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
              year="2021 - Present"
              title="Senior Web Developer"
              company="Tech Innovations Inc."
              description="Leading development of enterprise web applications using React, Node.js, and AWS. Mentoring junior developers and implementing CI/CD workflows."
            />
            
            <TimelineItem 
              year="2018 - 2021"
              title="Full Stack Developer"
              company="Digital Solutions LLC"
              description="Developed and maintained multiple client websites and web applications. Worked with React, Express, and MongoDB."
            />
            
            <TimelineItem 
              year="2016 - 2018"
              title="Frontend Developer"
              company="Web Creations Co."
              description="Created responsive layouts and interactive UIs for client websites. Utilized HTML, CSS, JavaScript, and jQuery."
            />
            
            <TimelineItem 
              year="2014 - 2016"
              title="Bachelor's Degree, Computer Science"
              company="University of Technology"
              description="Focused on web development, algorithms, and software engineering principles. Graduated with honors."
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
