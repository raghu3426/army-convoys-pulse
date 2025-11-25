import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockConvoys, mockVehicles, dashboardStats } from '@/data/mockData';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Truck,
  Route,
  Users,
  Fuel,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('convoy');
  const [dateRange, setDateRange] = useState('week');

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    toast({
      title: 'Report Generated',
      description: `Your ${reportType} report has been exported as ${format.toUpperCase()}.`,
    });
  };

  const convoyStats = {
    total: mockConvoys.length,
    completed: mockConvoys.filter(c => c.status === 'completed').length,
    onTime: mockConvoys.filter(c => c.status === 'completed').length,
    delayed: mockConvoys.filter(c => c.status === 'delayed').length,
  };

  const fleetStats = {
    total: mockVehicles.length,
    operational: mockVehicles.filter(v => v.status !== 'retired').length,
    inMission: mockVehicles.filter(v => v.status === 'in-mission').length,
    maintenance: mockVehicles.filter(v => v.status === 'maintenance').length,
  };

  return (
    <DashboardLayout title="Reports & Analytics" subtitle="Generate and export operational reports">
      {/* Report Configuration */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-3">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="convoy">Convoy Operations</SelectItem>
              <SelectItem value="fleet">Fleet Status</SelectItem>
              <SelectItem value="personnel">Personnel</SelectItem>
              <SelectItem value="fuel">Fuel Consumption</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="hero" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Route className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{convoyStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Convoys</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dashboardStats.onTimeDelivery}%</p>
                <p className="text-sm text-muted-foreground">On-Time Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-info/10">
                <Truck className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{fleetStats.operational}</p>
                <p className="text-sm text-muted-foreground">Active Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Fuel className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dashboardStats.fuelEfficiency}%</p>
                <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Convoy Status Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Convoy Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {/* Chart Placeholder */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { label: 'Completed', value: convoyStats.completed, color: 'bg-success' },
                  { label: 'Active', value: mockConvoys.filter(c => c.status === 'active').length, color: 'bg-info' },
                  { label: 'Pending', value: mockConvoys.filter(c => c.status === 'pending').length, color: 'bg-warning' },
                  { label: 'Delayed', value: convoyStats.delayed, color: 'bg-destructive' },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Status Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Fleet Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'In Mission', value: fleetStats.inMission, max: fleetStats.total, color: 'bg-primary' },
                { label: 'Available', value: mockVehicles.filter(v => v.status === 'available').length, max: fleetStats.total, color: 'bg-success' },
                { label: 'Maintenance', value: fleetStats.maintenance, max: fleetStats.total, color: 'bg-warning' },
                { label: 'Retired', value: mockVehicles.filter(v => v.status === 'retired').length, max: fleetStats.total, color: 'bg-muted' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Weekly Convoy Operations Summary', date: '2025-05-25', type: 'convoy' },
                { name: 'Fleet Maintenance Report', date: '2025-05-24', type: 'fleet' },
                { name: 'Monthly Fuel Consumption Analysis', date: '2025-05-20', type: 'fuel' },
                { name: 'Personnel Deployment Report', date: '2025-05-18', type: 'personnel' },
                { name: 'Quarterly Performance Review', date: '2025-05-01', type: 'convoy' },
              ].map((report, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{report.type}</Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
