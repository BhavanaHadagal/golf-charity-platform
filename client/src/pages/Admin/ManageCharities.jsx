import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageCharities() {
  const [charities, setCharities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    featured: false,
  });

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await API.get("/charity/list");
      if (res.data.success) {
        setCharities(res.data.charities || []);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load charities");
    }
  };

  const handleDelete = async (charityId) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/charity/delete",
        { charityId },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        alert("Charity deleted successfully");
        fetchCharities();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete charity");
    }
  };

  const startEdit = (charity) => {
    setEditingId(charity._id);
    setFormData({
      name: charity.name || "",
      description: charity.description || "",
      category: charity.category || "",
      image: charity.image || "",
      featured: charity.featured || false,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/charity/update",
        {
          charityId: editingId,
          ...formData,
        },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        alert("Charity updated successfully");
        setEditingId(null);
        setFormData({
          name: "",
          description: "",
          category: "",
          image: "",
          featured: false,
        });
        fetchCharities();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update charity");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Charities</h1>

        {editingId && (
          <form
            onSubmit={handleUpdate}
            className="border rounded-xl p-6 mb-8 bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Charity</h2>

            <input
              type="text"
              placeholder="Charity Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border px-3 py-2 mb-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border px-3 py-2 mb-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full border px-3 py-2 mb-3 rounded-lg"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border px-3 py-2 mb-3 rounded-lg"
            />

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
              Featured
            </label>

            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Update Charity
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <div key={charity._id} className="border rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-2">{charity.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {charity.category || "General"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {charity.description || "No description"}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(charity)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(charity._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}