import { Vehicle } from '@/types/convoy';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Truck, Fuel, Wrench, Calendar, User, Gauge } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

const typeIcons: Record<string, string> = {
  truck: '🚛',
  tanker: '⛽',
  ambulance: '🚑',
  apc: '🛡️',
  jeep: '🚙',
  bus: '🚌',
};

const statusConfig = {
  available: { label: 'Available', className: 'bg-success/20 text-success border-success/30' },
  'in-mission': { label: 'In Mission', className: 'bg-info/20 text-info border-info/30' },
  maintenance: { label: 'Maintenance', className: 'bg-warning/20 text-warning border-warning/30' },
  retired: { label: 'Retired', className: 'bg-muted text-muted-foreground border-muted' },
};

export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const status = statusConfig[vehicle.status];

  return (
    <Card 
      className="glass-card hover:border-primary/40 transition-all duration-300 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
              {typeIcons[vehicle.type] || '🚗'}
            </div>
            <div>
              <p className="font-bold">{vehicle.registrationNumber}</p>
              <p className="text-sm text-muted-foreground">{vehicle.model}</p>
            </div>
          </div>
          <Badge className={cn('text-xs', status.className)}>
            {status.label}
          </Badge>
        </div>

        {/* Fuel Level */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Fuel className="w-4 h-4" /> Fuel
            </span>
            <span className={cn(
              'font-medium',
              vehicle.fuelLevel < 30 && 'text-destructive',
              vehicle.fuelLevel >= 30 && vehicle.fuelLevel < 60 && 'text-warning',
              vehicle.fuelLevel >= 60 && 'text-success'
            )}>{vehicle.fuelLevel}%</span>
          </div>
          <Progress value={vehicle.fuelLevel} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-muted-foreground" />
            <span>{vehicle.capacity.toLocaleString()} kg</span>
          </div>
        </div>

        {/* Driver & Service */}
        <div className="pt-3 border-t border-border/50 space-y-2 text-sm">
          {vehicle.driver && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{vehicle.driver}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wrench className="w-4 h-4" />
            <span>Next Service: {vehicle.nextServiceDue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
