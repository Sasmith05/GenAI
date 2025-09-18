import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Mock revenue data
  const revenueData = [
    { month: 'Jul', revenue: 2400, orders: 32, avgOrder: 75 },
    { month: 'Aug', revenue: 3200, orders: 45, avgOrder: 71 },
    { month: 'Sep', revenue: 2800, orders: 38, avgOrder: 74 },
    { month: 'Oct', revenue: 4100, orders: 52, avgOrder: 79 },
    { month: 'Nov', revenue: 3800, orders: 48, avgOrder: 79 },
    { month: 'Dec', revenue: 5200, orders: 67, avgOrder: 78 }
  ];

  const payoutHistory = [
    {
      id: 1,
      date: '2025-01-15',
      amount: 1840.50,
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'PAY-2025-001'
    },
    {
      id: 2,
      date: '2025-01-01',
      amount: 2156.75,
      status: 'completed',
      method: 'PayPal',
      reference: 'PAY-2024-012'
    },
    {
      id: 3,
      date: '2024-12-15',
      amount: 1923.25,
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'PAY-2024-011'
    },
    {
      id: 4,
      date: '2024-12-01',
      amount: 2487.90,
      status: 'pending',
      method: 'Bank Transfer',
      reference: 'PAY-2024-010'
    }
  ];

  const currentBalance = {
    available: 1247.85,
    pending: 892.40,
    total: 2140.25
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const totalRevenue = revenueData?.reduce((sum, item) => sum + item?.revenue, 0);
  const totalOrders = revenueData?.reduce((sum, item) => sum + item?.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Revenue Tracking</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor your earnings and payout information
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Current Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Wallet" size={20} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">Available Balance</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              {formatCurrency(currentBalance?.available)}
            </p>
            <Button variant="default" size="sm" className="mt-3" fullWidth>
              Request Payout
            </Button>
          </div>
          
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              {formatCurrency(currentBalance?.pending)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Processing orders</p>
          </div>
          
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Earned</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              {formatCurrency(currentBalance?.total)}
            </p>
            <p className="text-sm text-success">+18% this month</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">Revenue Trends</h4>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>Orders</span>
              </div>
            </div>
          </div>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="var(--color-secondary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg border border-border p-4 text-center">
            <Icon name="DollarSign" size={24} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">
              {formatCurrency(totalRevenue)}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          
          <div className="bg-background rounded-lg border border-border p-4 text-center">
            <Icon name="ShoppingCart" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">{totalOrders}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          
          <div className="bg-background rounded-lg border border-border p-4 text-center">
            <Icon name="TrendingUp" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">
              {formatCurrency(avgOrderValue)}
            </p>
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
          </div>
        </div>

        {/* Payout History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">Payout History</h4>
            <Button variant="outline" size="sm" iconName="History" iconPosition="left">
              View All
            </Button>
          </div>
          
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Method</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory?.map((payout) => (
                    <tr key={payout?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                      <td className="p-4 text-card-foreground">{formatDate(payout?.date)}</td>
                      <td className="p-4 font-semibold text-card-foreground">
                        {formatCurrency(payout?.amount)}
                      </td>
                      <td className="p-4 text-card-foreground">{payout?.method}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout?.status)}`}>
                          {payout?.status?.charAt(0)?.toUpperCase() + payout?.status?.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground font-mono text-sm">
                        {payout?.reference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {payoutHistory?.map((payout) => (
                <div key={payout?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-card-foreground">
                      {formatCurrency(payout?.amount)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout?.status)}`}>
                      {payout?.status?.charAt(0)?.toUpperCase() + payout?.status?.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{formatDate(payout?.date)} • {payout?.method}</p>
                    <p className="font-mono">{payout?.reference}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTracking;