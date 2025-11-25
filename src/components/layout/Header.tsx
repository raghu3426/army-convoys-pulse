import { Bell, Search, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { mockNotifications } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { user } = useAuth();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search convoys, vehicles..."
            className="w-64 pl-9 bg-muted/50"
          />
        </div>

        {/* Notifications */}
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </Link>

        {/* User Badge */}
        {user && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{user.role.toUpperCase()}</span>
          </div>
        )}
      </div>
    </header>
  );
};
