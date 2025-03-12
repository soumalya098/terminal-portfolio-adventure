
import React from 'react';
import CommandLine from '../components/terminal/CommandLine';

const Terminal: React.FC = () => {
  return (
    <div className="min-h-screen bg-terminal-background flex justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl h-[80vh] flex flex-col rounded-md overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(157,70,255,0.3)]">
        <div className="bg-black p-2 flex items-center border-b border-white/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow text-center text-xs text-white/70 font-mono">
            Terminal - Portfolio
          </div>
        </div>
        <div className="flex-grow overflow-hidden">
          <CommandLine />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
