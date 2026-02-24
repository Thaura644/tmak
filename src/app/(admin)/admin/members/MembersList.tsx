"use client";

import { useState } from "react";
import Image from "next/image";
import { MemberForm } from "@/components/MemberForm";
import { createMember, updateMember, deleteMember } from "../actions";

export function MembersList({ initialMembers }: { initialMembers: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const handleSave = async (data: any) => {
    const { category, user, ...rest } = data; // Clean up relation objects if present
    if (editingMember) {
      await updateMember(editingMember.id, rest);
    } else {
      await createMember(rest);
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
        className="mb-6 bg-mangogreen text-white px-4 py-2 rounded font-bold hover:bg-opacity-90 transition"
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
          <div key={member.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                {member.logoUrl ? (
                    <Image src={member.logoUrl} className="object-cover" alt="" fill />
                ) : (
                    <div className="flex items-center justify-center h-full text-xs font-bold">{member.organizationName.substring(0,2)}</div>
                )}
              </div>
              <div>
                <p className="font-bold text-slate-800">{member.organizationName}</p>
                <p className="text-sm text-gray-500">{member.county} County • {member.membershipStatus}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => { setEditingMember(member); setShowForm(true); }}
                className="text-tmak-green font-bold hover:underline text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(member.id)}
                className="text-red-600 font-bold hover:underline text-sm"
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
