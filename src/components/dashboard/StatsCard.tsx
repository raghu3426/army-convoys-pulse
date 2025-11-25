import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  suffix?: string;
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  suffix,
  className 
}: StatsCardProps) => {
  return (
    <Card className={cn('glass-card hover:border-primary/30 transition-all duration-300', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold">{value}</p>
              {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
            </div>
            {change && (
              <p className={cn(
                'text-xs',
                changeType === 'positive' && 'text-success',
                changeType === 'negative' && 'text-destructive',
                changeType === 'neutral' && 'text-muted-foreground'
              )}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
