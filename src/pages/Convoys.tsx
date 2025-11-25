import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ConvoyCard } from '@/components/convoy/ConvoyCard';
import { CreateConvoyDialog } from '@/components/convoy/CreateConvoyDialog';
import { ConvoyDetailDialog } from '@/components/convoy/ConvoyDetailDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockConvoys } from '@/data/mockData';
import { Convoy, ConvoyStatus } from '@/types/convoy';
import { Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Convoys = () => {
  const { isAuthenticated, isAuthorized } = useAuth();
  const [convoys, setConvoys] = useState<Convoy[]>(mockConvoys);
  const [selectedConvoy, setSelectedConvoy] = useState<Convoy | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConvoyStatus | 'all'>('all');

  const canCreate = isAuthenticated && isAuthorized(['admin', 'commander']);

  const filteredConvoys = convoys.filter((convoy) => {
    const matchesSearch = convoy.name.toLowerCase().includes(search.toLowerCase()) ||
      convoy.id.toLowerCase().includes(search.toLowerCase()) ||
      convoy.commander.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || convoy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConvoyClick = (convoy: Convoy) => {
    setSelectedConvoy(convoy);
    setDetailOpen(true);
  };

  const handleConvoyCreated = (newConvoy: Convoy) => {
    setConvoys([newConvoy, ...convoys]);
  };

  const stats = {
    total: convoys.length,
    active: convoys.filter(c => c.status === 'active').length,
    pending: convoys.filter(c => c.status === 'pending').length,
    delayed: convoys.filter(c => c.status === 'delayed').length,
    completed: convoys.filter(c => c.status === 'completed').length,
  };

  return (
    <DashboardLayout title="Convoy Management" subtitle="Track and manage all convoy operations">
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search convoys by name, ID, or commander..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ConvoyStatus | 'all')}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="hero" onClick={() => setCreateOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Convoy
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="p-4 bg-card rounded-lg border border-border text-center">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="p-4 bg-success/10 rounded-lg border border-success/30 text-center">
          <p className="text-2xl font-bold text-success">{stats.active}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="p-4 bg-warning/10 rounded-lg border border-warning/30 text-center">
          <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30 text-center">
          <p className="text-2xl font-bold text-destructive">{stats.delayed}</p>
          <p className="text-xs text-muted-foreground">Delayed</p>
        </div>
        <div className="p-4 bg-info/10 rounded-lg border border-info/30 text-center">
          <p className="text-2xl font-bold text-info">{stats.completed}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Convoy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConvoys.map((convoy) => (
          <ConvoyCard
            key={convoy.id}
            convoy={convoy}
            onClick={() => handleConvoyClick(convoy)}
          />
        ))}
      </div>

      {filteredConvoys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No convoys found matching your criteria.</p>
        </div>
      )}

      {/* Dialogs */}
      <ConvoyDetailDialog
        convoy={selectedConvoy}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
      <CreateConvoyDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onConvoyCreated={handleConvoyCreated}
      />
    </DashboardLayout>
  );
};

export default Convoys;
