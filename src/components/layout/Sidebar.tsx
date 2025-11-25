import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Truck,
  Route,
  Map,
  Bell,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Route, label: 'Convoys', path: '/convoys' },
  { icon: Truck, label: 'Fleet Management', path: '/fleet' },
  { icon: Map, label: 'Live Map', path: '/map' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Users, label: 'Personnel', path: '/personnel' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground">Army Logistics</span>
            <span className="text-xs text-muted-foreground">Command Center</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 mb-1',
                  collapsed && 'justify-center px-2',
                  isActive && 'bg-primary/20 text-primary hover:bg-primary/30'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      {user && (
        <div className={cn(
          'px-3 py-4 border-t border-sidebar-border',
          collapsed && 'px-2'
        )}>
          <div className={cn(
            'flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent mb-2',
            collapsed && 'justify-center p-2'
          )}>
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary font-semibold">
              {user.name.charAt(0)}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.rank}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              'w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      )}

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>
    </aside>
  );
};
