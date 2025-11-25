import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Shield, Star } from 'lucide-react';
import { useState } from 'react';

interface Personnel {
  id: string;
  name: string;
  rank: string;
  unit: string;
  role: string;
  status: 'active' | 'on-leave' | 'deployed';
  assignedConvoy?: string;
}

const mockPersonnel: Personnel[] = [
  { id: 'P001', name: 'Col. Arjun Singh', rank: 'Colonel', unit: 'Northern Command HQ', role: 'Admin', status: 'active' },
  { id: 'P002', name: 'Col. Rajesh Kumar', rank: 'Colonel', unit: '14th Infantry Division', role: 'Commander', status: 'deployed', assignedConvoy: 'CNV-001' },
  { id: 'P003', name: 'Maj. Priya Sharma', rank: 'Major', unit: '7th Armored Brigade', role: 'Commander', status: 'active', assignedConvoy: 'CNV-002' },
  { id: 'P004', name: 'Lt. Col. Vikram Singh', rank: 'Lt. Colonel', unit: '21st Mechanized Infantry', role: 'Commander', status: 'deployed', assignedConvoy: 'CNV-003' },
  { id: 'P005', name: 'Capt. Arun Nair', rank: 'Captain', unit: 'Army Medical Corps', role: 'Commander', status: 'active' },
  { id: 'P006', name: 'Maj. Deepak Verma', rank: 'Major', unit: '17th Corps Logistics', role: 'Commander', status: 'deployed', assignedConvoy: 'CNV-005' },
  { id: 'P007', name: 'Col. Tenzin Dorje', rank: 'Colonel', unit: '33rd Corps', role: 'Commander', status: 'deployed', assignedConvoy: 'CNV-006' },
  { id: 'P008', name: 'Hav. Ramesh Kumar', rank: 'Havildar', unit: '14th Infantry Division', role: 'Driver', status: 'deployed', assignedConvoy: 'CNV-001' },
  { id: 'P009', name: 'Nk. Suresh Singh', rank: 'Naik', unit: '14th Infantry Division', role: 'Driver', status: 'deployed', assignedConvoy: 'CNV-001' },
  { id: 'P010', name: 'Hav. Mohan Lal', rank: 'Havildar', unit: '21st Mechanized Infantry', role: 'Driver', status: 'deployed', assignedConvoy: 'CNV-003' },
];

const Personnel = () => {
  const [personnel] = useState<Personnel[]>(mockPersonnel);
  const [search, setSearch] = useState('');

  const filteredPersonnel = personnel.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.unit.toLowerCase().includes(search.toLowerCase()) ||
    p.rank.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: personnel.length,
    active: personnel.filter(p => p.status === 'active').length,
    deployed: personnel.filter(p => p.status === 'deployed').length,
    onLeave: personnel.filter(p => p.status === 'on-leave').length,
  };

  const statusConfig = {
    active: { label: 'Active', className: 'bg-success/20 text-success border-success/30' },
    deployed: { label: 'Deployed', className: 'bg-info/20 text-info border-info/30' },
    'on-leave': { label: 'On Leave', className: 'bg-warning/20 text-warning border-warning/30' },
  };

  return (
    <DashboardLayout title="Personnel" subtitle="Military personnel management">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-info/10">
              <Star className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.deployed}</p>
              <p className="text-sm text-muted-foreground">Deployed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-warning/10">
              <Users className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.onLeave}</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, rank, or unit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Personnel List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Personnel Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPersonnel.map((person) => (
              <div 
                key={person.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.rank} • {person.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{person.role}</Badge>
                  <Badge className={statusConfig[person.status].className}>
                    {statusConfig[person.status].label}
                  </Badge>
                  {person.assignedConvoy && (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {person.assignedConvoy}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Personnel;
