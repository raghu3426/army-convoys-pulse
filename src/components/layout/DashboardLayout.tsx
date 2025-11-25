import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <Header title={title} subtitle={subtitle} />
        <main className="p-6">
          {children}
        </main>
        {/* Footer Credits */}
        <footer className="px-6 py-4 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 Army Logistics Services. All rights reserved. | Developed by <span className="text-primary font-semibold">syntaxSquad</span>
        </footer>
      </div>
    </div>
  );
};
