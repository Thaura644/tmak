"use client";

import { useState } from "react";
import { MemberForm } from "@/components/MemberForm";
import { createMember, updateMember, deleteMember } from "../actions";

export function MembersList({ initialMembers }: { initialMembers: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const handleSave = async (data: any) => {
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
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">{editingMember ? "Edit Member" : "New Member"}</h2>
          <MemberForm member={editingMember} onSave={handleSave} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {initialMembers.map(member => (
          <div key={member.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={member.imageUrl} className="w-12 h-12 rounded-full object-cover" alt="" />
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role} • {member.location}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditingMember(member); setShowForm(true); }}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(member.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
