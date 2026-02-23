/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export function MemberForm({ member, onSave }: { member?: any, onSave: (data: any) => Promise<void> }) {
  const [formData, setFormData] = useState(member || { name: '', role: '', location: '', imageUrl: '', category: 'Producer' });
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
        <label className="block text-sm font-bold mb-1">Name</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Role</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.role} 
          onChange={e => setFormData({...formData, role: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Location</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.location} 
          onChange={e => setFormData({...formData, location: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Image URL</label>
        <input 
          className="w-full p-2 border rounded" 
          value={formData.imageUrl} 
          onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Category</label>
        <select 
          className="w-full p-2 border rounded" 
          value={formData.category} 
          onChange={e => setFormData({...formData, category: e.target.value})}
        >
          <option>Producer</option>
          <option>Trader</option>
          <option>Consumer</option>
          <option>Researcher</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="bg-mango text-white px-4 py-2 rounded font-bold hover:bg-orange-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Member'}
      </button>
    </form>
  );
}
