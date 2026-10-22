'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountPercent: '',
    validUntil: '',
    active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/coupons').catch(() => ({ ok: false } as Response));
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons || data || []);
      }
    } catch (error) {
      console.error('Error fetching coupons', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/coupons/${editingId}` : '/api/coupons';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        discountPercent: parseFloat(formData.discountPercent as string),
        validUntil: formData.validUntil ? new Date(formData.validUntil).toISOString() : null
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('Failed to save coupon');
      }
    } catch (error) {
      console.error('Error saving coupon', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      code: item.code || '',
      description: item.description || '',
      discountPercent: item.discountPercent?.toString() || '',
      validUntil: item.validUntil ? new Date(item.validUntil).toISOString().split('T')[0] : '',
      active: item.active ?? true
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      try {
        const res = await fetch(`/api/coupons/${item.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchData();
        } else {
          alert('Failed to delete coupon');
        }
      } catch (error) {
        console.error('Error deleting coupon', error);
      }
    }
  };

  const openNewModal = () => {
    setFormData({
      code: '', description: '', discountPercent: '', validUntil: '', active: true
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'code', label: 'Code', render: (item: any) => <span className="font-mono font-bold">{item.code}</span> },
    { key: 'discountPercent', label: 'Discount', render: (item: any) => `${item.discountPercent}%` },
    { key: 'validUntil', label: 'Valid Until', render: (item: any) => item.validUntil ? formatDate(item.validUntil) : 'Forever' },
    {
      key: 'active',
      label: 'Status',
      render: (item: any) => {
        const isExpired = item.validUntil && new Date(item.validUntil) < new Date();
        const isActive = item.active && !isExpired;

        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {isActive ? 'Active' : (isExpired ? 'Expired' : 'Inactive')}
          </span>
        );
      }
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-brand-green font-bold">Coupons</h2>
          <p className="text-sm text-gray-500">Manage discount codes</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center px-4 py-2 bg-brand-green text-white rounded-md hover:bg-[#1f3621] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Coupon
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-white h-64 rounded-xl border border-gray-100"></div>
      ) : (
        <DataTable
          columns={columns}
          data={coupons}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Coupon' : 'Add New Coupon'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border font-mono uppercase"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Percentage (%)</label>
            <input
              type="number"
              required
              min="1"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.discountPercent}
              onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valid Until (Leave blank for no expiry)</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-[#1f3621]"
            >
              Save Coupon
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
