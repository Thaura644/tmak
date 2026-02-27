/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createMember, updateMember, deleteMember } from "../actions";

export function MembersList({ initialMembers, categories }: { initialMembers: any[], categories: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (editingMember) {
      await updateMember(editingMember.id, data);
    } else {
      await createMember(data);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteMember(id);
    }
  };

  return (
    <div>
      <button 
        onClick={() => { setShowForm(!showForm); setEditingMember(null); }}
        className="mb-6 bg-leaf text-white px-4 py-2 rounded font-bold hover:bg-green-600"
      >
        {showForm ? "Cancel" : "Add New Member"}
      </button>

      {showForm && (
        <form onSubmit={handleSave} className="mb-10 bg-white p-6 rounded shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">{editingMember ? "Edit Member" : "New Member"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Organization Name</label>
              <input name="organization_name" defaultValue={editingMember?.organization_name} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Slug</label>
              <input name="slug" defaultValue={editingMember?.slug} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Category</label>
              <select name="categoryId" defaultValue={editingMember?.categoryId} className="w-full p-2 border rounded" required>
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">County</label>
              <input name="county" defaultValue={editingMember?.county} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Contact Person</label>
              <input name="contact_person" defaultValue={editingMember?.contact_person} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input name="email" type="email" defaultValue={editingMember?.email} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Verified Since (Year)</label>
              <input name="verified_since" type="number" defaultValue={editingMember?.verified_since} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Status</label>
              <select name="membership_status" defaultValue={editingMember?.membership_status || "inactive"} className="w-full p-2 border rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea name="description" defaultValue={editingMember?.description} className="w-full p-2 border rounded h-32"></textarea>
          </div>
          <button type="submit" className="bg-leaf text-white px-6 py-2 rounded font-bold">Save</button>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4">Organization</th>
              <th className="p-4">Category</th>
              <th className="p-4">County</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialMembers.map(member => (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">{member.organization_name}</td>
                <td className="p-4 text-sm">{member.category?.name}</td>
                <td className="p-4 text-sm">{member.county}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${member.membership_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {member.membership_status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEditingMember(member); setShowForm(true); }} className="text-blue-600 mr-4">Edit</button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
