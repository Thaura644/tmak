"use client";

import { useState } from "react";

export function MemberForm({ member, onSave }: { member?: any, onSave: (data: any) => Promise<void> }) {
  const [formData, setFormData] = useState(member || {
    organizationName: '',
    slug: '',
    county: '',
    logoUrl: '',
    categoryId: '',
    membershipStatus: 'ACTIVE'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Ensure slug is generated if not present
    if (!formData.slug) {
        formData.slug = formData.organizationName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.floor(Math.random() * 1000);
    }
    await onSave(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-sm border border-slate-200">
      <div>
        <label className="block text-sm font-bold mb-1 text-slate-700">Organization Name</label>
        <input 
          className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mangogreen outline-none"
          value={formData.organizationName}
          onChange={e => setFormData({...formData, organizationName: e.target.value})}
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1 text-slate-700">County</label>
        <input 
          className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mangogreen outline-none"
          value={formData.county}
          onChange={e => setFormData({...formData, county: e.target.value})}
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1 text-slate-700">Logo URL</label>
        <input 
          className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mangogreen outline-none"
          value={formData.logoUrl}
          onChange={e => setFormData({...formData, logoUrl: e.target.value})}
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1 text-slate-700">Category ID</label>
        <input 
          className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-mangogreen outline-none"
          value={formData.categoryId}
          onChange={e => setFormData({...formData, categoryId: e.target.value})}
          placeholder="Enter category ID"
          required 
        />
      </div>
      <button 
        type="submit" 
        className="bg-mangogreen text-white px-6 py-2 rounded font-bold hover:bg-opacity-90 disabled:opacity-50 transition"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Member'}
      </button>
    </form>
  );
}
