'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import { formatPrice } from '@/lib/utils';
import { Plus } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    mrp: '',
    categoryId: '',
    imageUrl: '',
    flipkartUrl: '',
    amazonUrl: '',
    benefits: '',
    ingredients: '',
    howToUse: '',
    featured: false,
    inStock: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products').catch(() => ({ ok: false } as Response)),
        fetch('/api/categories').catch(() => ({ ok: false } as Response))
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || prodData || []);
      }

      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || catData || []);
      }
    } catch (error) {
      console.error('Error fetching data', error);
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
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        price: parseFloat(formData.price as string),
        mrp: formData.mrp ? parseFloat(formData.mrp as string) : null
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
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name || '',
      slug: item.slug || '',
      description: item.description || '',
      price: item.price?.toString() || '',
      mrp: item.mrp?.toString() || '',
      categoryId: item.categoryId || '',
      imageUrl: item.image || item.imageUrl || '',
      flipkartUrl: item.flipkartUrl || '',
      amazonUrl: item.amazonUrl || '',
      benefits: item.benefits || '',
      ingredients: item.ingredients || '',
      howToUse: item.howToUse || '',
      featured: item.featured || false,
      inStock: item.inStock ?? true
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${item.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchData();
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };

  const openNewModal = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      mrp: '',
      categoryId: '',
      imageUrl: '',
      flipkartUrl: '',
      amazonUrl: '',
      benefits: '',
      ingredients: '',
      howToUse: '',
      featured: false,
      inStock: true
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category', render: (item: any) => item.category?.name || 'Uncategorized' },
    { key: 'price', label: 'Price', render: (item: any) => formatPrice(item.price) },
    {
      key: 'inStock',
      label: 'Stock',
      render: (item: any) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
    {
      key: 'flipkartUrl', label: 'Flipkart', render: (item: any) => item.flipkartUrl
        ? <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#2874F0]/10 text-[#2874F0]">Linked</span>
        : <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-400">—</span>
    },
    {
      key: 'amazonUrl', label: 'Amazon', render: (item: any) => item.amazonUrl
        ? <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#FF9900]/10 text-[#FF9900]">Linked</span>
        : <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-400">—</span>
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-brand-green font-bold">Products</h2>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center px-4 py-2 bg-brand-green text-white rounded-md hover:bg-[#1f3621] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-white h-64 rounded-xl border border-gray-100"></div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">MRP (₹)</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                label="Product Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="guthali-products"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Flipkart URL</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.flipkartUrl}
                onChange={(e) => setFormData({ ...formData, flipkartUrl: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Amazon URL</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.amazonUrl}
                onChange={(e) => setFormData({ ...formData, amazonUrl: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Benefits (comma separated)</label>
              <textarea
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
              <textarea
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">How to Use</label>
              <textarea
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm p-2 border"
                value={formData.howToUse}
                onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
              ></textarea>
            </div>
            <div className="flex items-center space-x-4 md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-700">Featured</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
            </div>
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
              Save Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
