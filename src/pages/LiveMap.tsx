import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockConvoys } from '@/data/mockData';
import { MapPin, Navigation, RefreshCw, Maximize2, Layers, Truck } from 'lucide-react';

const LiveMap = () => {
  const activeConvoys = mockConvoys.filter(c => c.status === 'active' || c.status === 'delayed');

  return (
    <DashboardLayout title="Live Map" subtitle="Real-time convoy tracking and positioning">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                Convoy Positions
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Layers className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Map Placeholder - In production, this would be a real map integration */}
              <div className="relative h-[600px] bg-muted/30">
                {/* India Map SVG Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="text-[300px] font-bold text-primary">🇮🇳</div>
                </div>
                
                {/* Map Grid Overlay */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }} />

                {/* Convoy Markers */}
                {activeConvoys.map((convoy, index) => {
                  // Calculate positions based on progress
                  const positions = [
                    { top: '20%', left: '70%' },
                    { top: '60%', left: '30%' },
                    { top: '40%', left: '50%' },
                    { top: '70%', left: '60%' },
                  ];
                  const pos = positions[index % positions.length];
                  
                  return (
                    <div
                      key={convoy.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow cursor-pointer group"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${convoy.status === 'delayed' ? 'bg-destructive' : 'bg-primary'}
                        shadow-lg
                      `}>
                        <Truck className="w-4 h-4 text-primary-foreground" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
                          <p className="font-semibold text-sm">{convoy.name}</p>
                          <p className="text-xs text-muted-foreground">{convoy.id}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <MapPin className="w-3 h-3" />
                            <span>{convoy.origin} → {convoy.destination}</span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Progress: {convoy.progress}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold mb-2">Legend</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Active Convoy</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span>Delayed Convoy</span>
                    </div>
                  </div>
                </div>

                {/* Map Notice */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                  <p className="text-xs text-muted-foreground">
                    🗺️ Interactive map integration available with Google Maps / Mapbox API
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Convoy List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Active Convoys ({activeConvoys.length})</h3>
          <div className="space-y-3">
            {activeConvoys.map((convoy) => (
              <Card key={convoy.id} className="glass-card cursor-pointer hover:border-primary/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{convoy.name}</p>
                      <p className="text-xs text-muted-foreground">{convoy.id}</p>
                    </div>
                    <Badge className={convoy.status === 'delayed' ? 'status-delayed' : 'status-active'}>
                      {convoy.status}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {convoy.origin}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Navigation className="w-3 h-3" />
                      {convoy.destination}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{convoy.vehicleCount} vehicles</span>
                    <span className="text-primary font-medium">{convoy.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveMap;
