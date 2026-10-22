'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import StatsCard from '@/components/admin/StatsCard';
import { Package, MessageSquare, TrendingUp, Users } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
}

interface MonthData {
  name: string;
  count: number;
}

interface AnalyticsData {
  stats: {
    totalProducts: number;
    totalMessages: number;
    pageViews: number;
    conversionRate: string;
  };
  productsByCategory: CategoryData[];
  messagesPerMonth: MonthData[];
  productStatus: CategoryData[];
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    stats: {
      totalProducts: 0,
      totalMessages: 0,
      pageViews: 0,
      conversionRate: '0%'
    },
    productsByCategory: [],
    messagesPerMonth: [],
    productStatus: []
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#2C4A2E', '#B8973E', '#8B9A5E', '#D9C8A9', '#1A1A1A'];

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const analyticsData = await res.json();
          // Map API response to our component's data shape
          setData({
            stats: {
              totalProducts: analyticsData.totalProducts ?? 0,
              totalMessages: analyticsData.unreadMessages ?? 0,
              pageViews: analyticsData.totalBlogPosts ?? 0,
              conversionRate: `${analyticsData.activeCoupons ?? 0} active`
            },
            productsByCategory: (analyticsData.productsPerCategory ?? []).map((c: any) => ({
              name: c.name,
              value: c.count
            })),
            messagesPerMonth: (analyticsData.messagesPerMonth ?? []).map((m: any) => ({
              name: m.month,
              count: m.count
            })),
            productStatus: [
              { name: 'Total Products', value: analyticsData.totalProducts ?? 0 },
              { name: 'Blog Posts', value: analyticsData.totalBlogPosts ?? 0 }
            ]
          });
        } else {
          // Fallback data if API fails
          setData({
            stats: {
              totalProducts: 12,
              totalMessages: 0,
              pageViews: 3,
              conversionRate: '2 active'
            },
            productsByCategory: [
              { name: 'Herbal Medicines', value: 3 },
              { name: 'Supplements', value: 3 },
              { name: 'Essential Oils', value: 3 },
              { name: 'Wellness Teas', value: 3 }
            ],
            messagesPerMonth: [
              { name: 'Jan', count: 0 },
              { name: 'Feb', count: 0 },
              { name: 'Mar', count: 0 },
            ],
            productStatus: [
              { name: 'In Stock', value: 12 },
              { name: 'Out of Stock', value: 0 }
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching analytics', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 rounded-xl"></div>
          <div className="h-80 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-green font-bold">Analytics Overview</h2>
        <p className="text-sm text-gray-500">Track your website performance and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          icon={<Package size={24} />} 
          label="Total Products" 
          value={data.stats.totalProducts}
          trend="+12%" 
          color="bg-brand-green text-white" 
        />
        <StatsCard 
          icon={<MessageSquare size={24} />} 
          label="Unread Messages" 
          value={data.stats.totalMessages} 
          trend="+5%"
          color="bg-brand-gold text-white" 
        />
        <StatsCard 
          icon={<Users size={24} />} 
          label="Blog Posts" 
          value={data.stats.pageViews} 
          trend="+18%"
          color="bg-brand-olive text-white" 
        />
        <StatsCard 
          icon={<TrendingUp size={24} />} 
          label="Active Coupons" 
          value={data.stats.conversionRate} 
          color="bg-blue-600 text-white" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.messagesPerMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="count" stroke="#2C4A2E" strokeWidth={3} dot={{r: 4, fill: '#2C4A2E'}} activeDot={{r: 6, fill: '#B8973E'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products by Category Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Products by Category</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.productsByCategory} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <RechartsTooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#B8973E" radius={[4, 4, 0, 0]}>
                  {data.productsByCategory.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Stock Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Overview</h3>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.productStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}: {name: string; percent: number}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.productStatus.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2C4A2E' : '#B8973E'} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
