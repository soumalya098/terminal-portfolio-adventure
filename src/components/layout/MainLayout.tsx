
import React from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <footer className="glass mt-auto py-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <p className="mt-1">Made with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
