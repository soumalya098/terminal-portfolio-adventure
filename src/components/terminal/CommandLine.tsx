
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

type TerminalHistory = Array<{
  command: string;
  response: React.ReactNode;
  isError?: boolean;
}>;

const CommandLine: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalHistory>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [passwordInput, setPasswordInput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initial terminal greeting
  useEffect(() => {
    setHistory([
      {
        command: '',
        response: (
          <div className="space-y-2">
            <pre className="text-portfolio-accent font-mono text-xs sm:text-sm mb-2">
{`  _____           _    __      _ _       
 |  __ \\         | |  / _|    | (_)      
 | |__) |__  _ __| |_| |_ ___ | |_  ___  
 |  ___/ _ \\| '__| __|  _/ _ \\| | |/ _ \\ 
 | |  | (_) | |  | |_| || (_) | | | (_) |
 |_|   \\___/|_|   \\__|_| \\___/|_|_|\\___/ 
                                         
`}
            </pre>
            <p>Welcome to my interactive terminal portfolio!</p>
            <p>Type <span className="text-terminal-command">/help</span> to see available commands.</p>
          </div>
        ),
      },
    ]);
  }, []);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on initial load and clicks
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    // If waiting for password input
    if (passwordInput === 'admin') {
      const correctPassword = 'tgsoumalya098';
      
      if (trimmedInput === correctPassword) {
        setHistory([...history, {
          command: '********', // Hide password in history
          response: <p>Authentication successful. Redirecting to admin panel...</p>
        }]);
        
        // Set admin authentication in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        
        // Navigate to admin after a short delay
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        setHistory([...history, {
          command: '********', // Hide password in history
          response: <p className="text-red-500">Authentication failed. Invalid password.</p>,
          isError: true
        }]);
      }
      
      setPasswordInput(null);
      setInput('');
      return;
    }
    
    // Save command to history
    const newCommandHistory = [trimmedInput, ...commandHistory.slice(0, 9)];
    setCommandHistory(newCommandHistory);
    setHistoryIndex(-1);
    
    processCommand(trimmedInput);
    setInput('');
  };

  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let response: React.ReactNode = '';
    let isError = false;

    // Command processing
    if (command === '/help') {
      response = (
        <div className="space-y-1">
          <p>Available commands:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-terminal-command">/start</span> - Enter the main website</li>
            <li><span className="text-terminal-command">/about</span> - About me preview</li>
            <li><span className="text-terminal-command">/skills</span> - My skills overview</li>
            <li><span className="text-terminal-command">/projects</span> - View my projects</li>
            <li><span className="text-terminal-command">/contact</span> - Contact information</li>
            <li><span className="text-terminal-command">/time</span> - Current date and time</li>
            <li><span className="text-terminal-command">/clear</span> - Clear terminal screen</li>
            <li><span className="text-terminal-command">/help</span> - Show this help message</li>
          </ul>
          <p className="mt-2 text-xs text-white/60">Try to discover some hidden commands! 😉</p>
        </div>
      );
    } else if (command === '/start') {
      response = <p>Launching main portfolio site...</p>;
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else if (command === '/about') {
      response = (
        <div>
          <p className="font-semibold text-portfolio-accent">About Me:</p>
          <p>Full-stack developer with expertise in modern web technologies.</p>
          <p>Passionate about creating elegant, efficient solutions to complex problems.</p>
          <p className="mt-2">Type <span className="text-terminal-command">/start</span> to see my full portfolio.</p>
        </div>
      );
    } else if (command === '/skills') {
      response = (
        <div>
          <p className="font-semibold text-portfolio-accent">Skills Overview:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 my-2">
            <div>
              <p className="text-portfolio-secondary">Frontend:</p>
              <ul className="list-disc pl-5 text-sm">
                <li>React.js</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <p className="text-portfolio-secondary">Backend:</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
              <p className="text-portfolio-secondary">Other:</p>
              <ul className="list-disc pl-5 text-sm">
                <li>CI/CD</li>
                <li>Docker</li>
                <li>Git/GitHub</li>
                <li>AWS</li>
              </ul>
            </div>
          </div>
          <p className="mt-2">Type <span className="text-terminal-command">/start</span> to see my full portfolio.</p>
        </div>
      );
    } else if (command === '/projects') {
      response = (
        <div>
          <p className="font-semibold text-portfolio-accent">Project Highlights:</p>
          <ul className="list-disc pl-5 mt-2">
            <li><span className="text-portfolio-secondary">E-commerce Platform</span> - React, Node.js, MongoDB</li>
            <li><span className="text-portfolio-secondary">Portfolio Website</span> - React, TypeScript, Tailwind CSS</li>
            <li><span className="text-portfolio-secondary">Task Management App</span> - Next.js, PostgreSQL</li>
          </ul>
          <p className="mt-2">Type <span className="text-terminal-command">/start</span> to see detailed project information.</p>
        </div>
      );
    } else if (command === '/contact') {
      response = (
        <div>
          <p className="font-semibold text-portfolio-accent">Contact Information:</p>
          <ul className="list-none pl-0 mt-2 space-y-1">
            <li>📧 Email: example@portfolio.com</li>
            <li>🌐 GitHub: github.com/username</li>
            <li>🔗 LinkedIn: linkedin.com/in/username</li>
          </ul>
          <p className="mt-2">Type <span className="text-terminal-command">/start</span> to visit my contact page.</p>
        </div>
      );
    } else if (command === '/clear') {
      setHistory([]);
      return;
    } else if (command === '/time') {
      const now = new Date();
      response = <p>Current time: {now.toLocaleString()}</p>;
    } else if (command === '/admin') {
      setPasswordInput('admin');
      response = <p>Enter admin password:</p>;
    } else if (command === '/coffee') {
      response = (
        <div>
          <p>☕ Coffee brewing...</p>
          <p className="mt-1">Error: Coffee maker not connected.</p>
          <p className="mt-1 text-xs text-white/60">You found an easter egg! Try finding more hidden commands.</p>
        </div>
      );
    } else if (command === '/sudo') {
      response = <p>Nice try, but you don't have admin privileges here! 😄</p>;
    } else if (command === '/whoami') {
      response = <p>Visitor@portfolio:~$</p>;
    } else if (command === '/matrix') {
      response = (
        <div>
          <p>Entering the Matrix...</p>
          <p className="mt-1 font-mono text-terminal-command">
            Wake up, Neo...
          </p>
        </div>
      );
    } else {
      response = <p>Command not recognized. Type <span className="text-terminal-command">/help</span> for available commands.</p>;
      isError = true;
    }

    // Add command and response to history
    setHistory([...history, { command: cmd, response, isError }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      // Tab completion
      e.preventDefault();
      const commands = ['/help', '/start', '/about', '/skills', '/projects', '/contact', '/time', '/clear', '/admin'];
      const matchingCommands = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  return (
    <div 
      className="terminal-container h-full flex flex-col" 
      onClick={handleFocusClick}
      ref={terminalRef}
    >
      <div className="flex-grow overflow-y-auto pb-4 space-y-4">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.command && (
              <div className="flex">
                <span className="terminal-prompt mr-2">Visitor@portfolio:~$</span>
                <span className="terminal-command">{item.command}</span>
              </div>
            )}
            <div className={item.isError ? "terminal-error" : ""}>{item.response}</div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex border-t border-white/10 pt-2 mt-2">
        <div className="terminal-prompt mr-2">Visitor@portfolio:~$</div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="command-input flex-grow"
          autoFocus
          spellCheck="false"
          autoComplete="off"
          type={passwordInput ? "password" : "text"}
        />
      </form>
    </div>
  );
};

export default CommandLine;
