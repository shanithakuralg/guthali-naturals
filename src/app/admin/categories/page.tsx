'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { Plus } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/categories').catch(() => ({ ok: false } as Response));
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || data || []);
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug === generateSlug(prev.name) || prev.slug === '' ? generateSlug(name) : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name || '',
      slug: item.slug || '',
      description: item.description || '',
      icon: item.icon || ''
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const res = await fetch(`/api/categories/${item.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchData();
        } else {
          alert('Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category', error);
      }
    }
  };

  const openNewModal = () => {
    setFormData({ name: '', slug: '', description: '', icon: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'description', label: 'Description', render: (item: any) => (
        <div className="max-w-xs truncate">{item.description}</div>
      )
    },
    { key: 'products', label: 'Products', render: (item: any) => item._count?.products || 0 }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-brand-green font-bold">Categories</h2>
          <p className="text-sm text-gray-500">Manage product categories</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center px-4 py-2 bg-brand-green text-white rounded-md hover:bg-[#1f3621] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-white h-64 rounded-xl border border-gray-100"></div>
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
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
              Save Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
