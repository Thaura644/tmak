/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createStatistic, updateStatistic, deleteStatistic } from "../actions";

export function StatisticsList({ initialStats }: { initialStats: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingStat, setEditingStat] = useState<any>(null);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      label: formData.get("label"),
      value: formData.get("value"),
      year: formData.get("year"),
      category: formData.get("category"),
    };

    if (editingStat) {
      await updateStatistic(editingStat.id, data);
    } else {
      await createStatistic(data);
    }
    setShowForm(false);
    setEditingStat(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteStatistic(id);
    }
  };

  return (
    <div>
      <button
        onClick={() => { setShowForm(!showForm); setEditingStat(null); }}
        className="mb-6 bg-leaf text-white px-4 py-2 rounded font-bold hover:bg-green-600"
      >
        {showForm ? "Cancel" : "Add New Statistic"}
      </button>

      {showForm && (
        <form onSubmit={handleSave} className="mb-10 bg-white p-6 rounded shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">{editingStat ? "Edit Statistic" : "New Statistic"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Label (e.g. County Name)</label>
              <input name="label" defaultValue={editingStat?.label} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Value</label>
              <input name="value" type="number" step="0.01" defaultValue={editingStat?.value} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Year</label>
              <input name="year" type="number" defaultValue={editingStat?.year || 2023} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Category</label>
              <select name="category" defaultValue={editingStat?.category || "production"} className="w-full p-2 border rounded" required>
                <option value="production">Production</option>
                <option value="export">Export</option>
                <option value="membership">Membership</option>
              </select>
            </div>
          </div>
          <button type="submit" className="bg-leaf text-white px-6 py-2 rounded font-bold">Save</button>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4">Label</th>
              <th className="p-4">Value</th>
              <th className="p-4">Year</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialStats.map(stat => (
              <tr key={stat.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">{stat.label}</td>
                <td className="p-4">{stat.value.toLocaleString()}</td>
                <td className="p-4">{stat.year}</td>
                <td className="p-4 uppercase text-xs font-bold text-gray-500">{stat.category}</td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEditingStat(stat); setShowForm(true); }} className="text-blue-600 mr-4">Edit</button>
                  <button onClick={() => handleDelete(stat.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
