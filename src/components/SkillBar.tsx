import React, { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  proficiency: number;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, proficiency, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(proficiency);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [proficiency, delay]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-slate-700 dark:text-slate-300 font-medium">{name}</span>
        <span className="text-slate-600 dark:text-slate-400 text-sm">{proficiency}%</span>
      </div>
      <div className="h-2.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;