import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "sonner";

export default function AddCharity() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("adminToken");
  console.log("ADMIN TOKEN:", token);

  try {
    const res = await API.post(
      "/charity/add",
      { name, description, category },
      {
        headers: { token },
      }
    );

    console.log("ADD CHARITY RESPONSE:", res.data);

    if (res.data.success) {
      toast.success("Charity added successfully");
      setName("");
      setDescription("");
      setCategory("");
    } else {
      toast.error(res.data.message || "Failed to add charity");
    }
  } catch (error) {
    console.log("ADD CHARITY ERROR:", error);
    console.log("ERROR RESPONSE:", error.response?.data);
    toast.error(error.response?.data?.message || "Failed to add charity");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-6 rounded-xl shadow-sm"
      >
        <h1 className="text-2xl font-bold mb-2">Add Charity</h1>

        <button
          type="button"
          onClick={() => navigate("/admin/manage-charities")}
          className="text-blue-600 text-sm hover:underline inline-block mb-4"
        >
          View All Charities
        </button>

        <input
          type="text"
          placeholder="Charity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded-lg"
          rows="4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Add Charity
        </button>
      </form>
    </div>
  );
}