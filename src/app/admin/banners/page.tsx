'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus } from 'lucide-react';

export default function AdminBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    ctaText: '',
    ctaLink: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/banners').catch(() => ({ ok: false } as Response));
      if (res.ok) {
        const data = await res.json();
        setBanners(data.banners || data || []);
      }
    } catch (error) {
      console.error('Error fetching banners', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/banners/${editingId}` : '/api/banners';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        order: parseInt(formData.order.toString(), 10)
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
        alert('Failed to save banner');
      }
    } catch (error) {
      console.error('Error saving banner', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title || '',
      subtitle: item.subtitle || '',
      imageUrl: item.imageUrl || '',
      ctaText: item.ctaText || '',
      ctaLink: item.ctaLink || '',
      order: item.order || 0,
      active: item.active ?? true
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        const res = await fetch(`/api/banners/${item.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchData();
        } else {
          alert('Failed to delete banner');
        }
      } catch (error) {
        console.error('Error deleting banner', error);
      }
    }
  };

  const openNewModal = () => {
    setFormData({
      title: '', subtitle: '', imageUrl: '', ctaText: '', ctaLink: '', order: 0, active: true
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
    {
      key: 'active',
      label: 'Status',
      render: (item: any) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {item.active ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-brand-green font-bold">Banners</h2>
          <p className="text-sm text-gray-500">Manage homepage hero banners</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center px-4 py-2 bg-brand-green text-white rounded-md hover:bg-[#1f3621] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Banner
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-white h-64 rounded-xl border border-gray-100"></div>
      ) : (
        <DataTable
          columns={columns}
          data={banners}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Banner' : 'Add New Banner'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
          <div>
            <ImageUpload
              label="Banner Image"
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              folder="guthali-banners"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CTA Text</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CTA Link</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Order</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            />
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
              Save Banner
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
