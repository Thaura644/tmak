/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export function AdvertForm({ advert, onSave }: { advert?: any, onSave: (data: any) => Promise<void> }) {
  const [formData, setFormData] = useState(advert || { title: '', description: '', type: 'SPONSORED', link: '#', memberDiscount: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-sm">
      <div>
        <label className="block text-sm font-bold mb-1">Title</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Description</label>
        <textarea 
          className="w-full p-2 border rounded" 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Type (e.g. SPONSORED, LOGISTICS, TECH)</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.type} 
          onChange={e => setFormData({...formData, type: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Link</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.link} 
          onChange={e => setFormData({...formData, link: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Member Discount Text (Optional)</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.memberDiscount} 
          onChange={e => setFormData({...formData, memberDiscount: e.target.value})} 
        />
      </div>
      <button 
        type="submit" 
        className="bg-leaf text-white px-4 py-2 rounded font-bold hover:bg-green-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Advert'}
      </button>
    </form>
  );
}
