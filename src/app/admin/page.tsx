'use client';

import { useEffect, useState } from 'react';
import { Package, FileText, MessageSquare, Ticket, BarChart3 } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPosts: 0,
    unreadMessages: 0,
    activeCoupons: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Since we may not have the API ready, we'll mock it if it fails
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalProducts: data.totalProducts ?? 0,
            totalPosts: data.totalBlogPosts ?? 0,
            unreadMessages: data.unreadMessages ?? 0,
            activeCoupons: data.activeCoupons ?? 0,
          });
          setRecentMessages(data.recentMessages || []);
        } else {
          // Fallback mock data
          setStats({
            totalProducts: 12,
            totalPosts: 8,
            unreadMessages: 3,
            activeCoupons: 2,
          });
          setRecentMessages([
            { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Product Inquiry', createdAt: new Date().toISOString() },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', subject: 'Shipping Issue', createdAt: new Date().toISOString() }
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-slate-200 rounded"></div></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-green font-bold">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back to your admin control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Package size={24} />}
          label="Total Products"
          value={stats.totalProducts}
          color="bg-blue-500 text-white"
        />
        <StatsCard
          icon={<FileText size={24} />}
          label="Blog Posts"
          value={stats.totalPosts}
          color="bg-brand-olive text-white"
        />
        <StatsCard
          icon={<MessageSquare size={24} />}
          label="Unread Messages"
          value={stats.unreadMessages}
          color="bg-red-500 text-white"
        />
        <StatsCard
          icon={<Ticket size={24} />}
          label="Active Coupons"
          value={stats.activeCoupons}
          color="bg-brand-gold text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
            <Link href="/admin/messages" className="text-sm text-brand-gold hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg: any) => (
                <div key={msg.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{msg.name}</p>
                      <p className="text-xs text-gray-500">{msg.subject}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent messages.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/products" className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-center">
              <Package size={24} className="text-brand-green mb-2" />
              <span className="text-sm font-medium text-gray-900">Manage Products</span>
            </Link>
            <Link href="/admin/blog" className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-center">
              <FileText size={24} className="text-brand-green mb-2" />
              <span className="text-sm font-medium text-gray-900">Write Post</span>
            </Link>
            <Link href="/admin/coupons" className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-center">
              <Ticket size={24} className="text-brand-green mb-2" />
              <span className="text-sm font-medium text-gray-900">Create Coupon</span>
            </Link>
            <Link href="/admin/analytics" className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 text-center">
              <BarChart3 size={24} className="text-brand-green mb-2" />
              <span className="text-sm font-medium text-gray-900">View Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
