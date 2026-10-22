'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { formatDate } from '@/lib/utils';
import { Mail } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/contact').catch(() => ({ ok: false } as Response));
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || data || []);
      }
    } catch (error) {
      console.error('Error fetching messages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    if (currentStatus) return;
    
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      });
      
      if (res.ok) {
        fetchData();
        if (viewingMessage && viewingMessage.id === id) {
          setViewingMessage({ ...viewingMessage, read: true });
        }
      }
    } catch (error) {
      console.error('Error updating message status', error);
    }
  };

  const handleDelete = async (item: any) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const res = await fetch(`/api/contact/${item.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchData();
        } else {
          alert('Failed to delete message');
        }
      } catch (error) {
        console.error('Error deleting message', error);
      }
    }
  };

  const handleView = (item: any) => {
    setViewingMessage(item);
    if (!item.read) {
      handleMarkAsRead(item.id, item.read);
    }
  };

  const columns = [
    { 
      key: 'name', 
      label: 'Sender',
      render: (item: any) => (
        <div className="flex flex-col cursor-pointer" onClick={() => handleView(item)}>
          <span className={`font-medium ${!item.read ? 'text-brand-green' : 'text-gray-900'}`}>{item.name}</span>
          <span className="text-xs text-gray-500">{item.email}</span>
        </div>
      )
    },
    { 
      key: 'subject', 
      label: 'Subject',
      render: (item: any) => (
        <div className="cursor-pointer truncate max-w-[200px]" onClick={() => handleView(item)}>
          <span className={!item.read ? 'font-semibold' : ''}>{item.subject}</span>
        </div>
      )
    },
    { 
      key: 'createdAt', 
      label: 'Date', 
      render: (item: any) => formatDate(item.createdAt) 
    },
    { 
      key: 'read', 
      label: 'Status', 
      render: (item: any) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.read ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
          {item.read ? 'Read' : 'New'}
        </span>
      ) 
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-brand-green font-bold">Messages</h2>
          <p className="text-sm text-gray-500">Contact form submissions</p>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse bg-white h-64 rounded-xl border border-gray-100"></div>
      ) : (
        <DataTable
          columns={columns}
          data={messages}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={!!viewingMessage}
        onClose={() => setViewingMessage(null)}
        title="Message Details"
      >
        {viewingMessage && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{viewingMessage.subject}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Mail size={14} className="mr-1" />
                  <a href={`mailto:${viewingMessage.email}`} className="hover:text-brand-gold transition-colors">
                    {viewingMessage.name} ({viewingMessage.email})
                  </a>
                </div>
                {viewingMessage.phone && (
                  <p className="text-sm text-gray-500 mt-1">Phone: {viewingMessage.phone}</p>
                )}
              </div>
              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                {formatDate(viewingMessage.createdAt)}
              </span>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-gray-800 font-sans leading-relaxed min-h-[150px]">
              {viewingMessage.message}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setViewingMessage(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
