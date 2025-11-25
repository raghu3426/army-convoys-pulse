import { Convoy, ConvoyStatus, Priority } from '@/types/convoy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Clock,
  Users,
  Truck,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Circle,
  Timer,
} from 'lucide-react';

interface ConvoyCardProps {
  convoy: Convoy;
  onClick: () => void;
}

const statusConfig: Record<ConvoyStatus, { label: string; className: string; icon: React.ReactNode }> = {
  active: { label: 'Active', className: 'status-active', icon: <Circle className="w-3 h-3 fill-current" /> },
  pending: { label: 'Pending', className: 'status-pending', icon: <Timer className="w-3 h-3" /> },
  delayed: { label: 'Delayed', className: 'status-delayed', icon: <AlertTriangle className="w-3 h-3" /> },
  completed: { label: 'Completed', className: 'status-completed', icon: <CheckCircle className="w-3 h-3" /> },
};

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High Priority', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  medium: { label: 'Medium', className: 'bg-warning/20 text-warning border-warning/30' },
  low: { label: 'Low', className: 'bg-muted text-muted-foreground border-muted' },
};

export const ConvoyCard = ({ convoy, onClick }: ConvoyCardProps) => {
  const status = statusConfig[convoy.status];
  const priority = priorityConfig[convoy.priority];

  return (
    <Card 
      className="glass-card hover:border-primary/40 transition-all duration-300 cursor-pointer group animate-fade-in"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
              {convoy.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{convoy.id}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={cn('gap-1.5', status.className)}>
              {status.icon}
              {status.label}
            </Badge>
            <Badge variant="outline" className={cn('text-xs', priority.className)}>
              {priority.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{convoy.origin}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="truncate">{convoy.destination}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{convoy.progress}%</span>
          </div>
          <Progress value={convoy.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-muted-foreground" />
            <span>{convoy.vehicleCount}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{convoy.personnelCount}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(convoy.estimatedArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Commander */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-sm text-muted-foreground">{convoy.commander}</span>
          <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
            View Details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
