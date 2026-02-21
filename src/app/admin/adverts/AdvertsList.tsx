"use client";

import { useState } from "react";
import { AdvertForm } from "@/components/AdvertForm";
import { createAdvert, updateAdvert, deleteAdvert } from "../actions";

export function AdvertsList({ initialAdverts }: { initialAdverts: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingAdvert, setEditingAdvert] = useState<any>(null);

  const handleSave = async (data: any) => {
    if (editingAdvert) {
      await updateAdvert(editingAdvert.id, data);
    } else {
      await createAdvert(data);
    }
    setShowForm(false);
    setEditingAdvert(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteAdvert(id);
    }
  };

  return (
    <div>
      <button 
        onClick={() => { setShowForm(!showForm); setEditingAdvert(null); }}
        className="mb-6 bg-mango text-white px-4 py-2 rounded font-bold hover:bg-orange-600"
      >
        {showForm ? "Cancel" : "Add New Advert"}
      </button>

      {showForm && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">{editingAdvert ? "Edit Advert" : "New Advert"}</h2>
          <AdvertForm advert={editingAdvert} onSave={handleSave} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {initialAdverts.map(ad => (
          <div key={ad.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold">{ad.title}</p>
              <p className="text-sm text-gray-500">{ad.type} • {ad.description.substring(0, 50)}...</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setEditingAdvert(ad); setShowForm(true); }}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(ad.id)}
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
