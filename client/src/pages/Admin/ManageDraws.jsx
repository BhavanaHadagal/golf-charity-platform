import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "sonner";

export default function ManageDraws() {
  const [draws, setDraws] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [form, setForm] = useState({
    month: "",
    year: "",
    drawNumbers: "",
    drawType: "random",
    prizePool: "",
    status: "pending",
  });

  useEffect(() => {
    fetchDraws();
  }, []);

  const fetchDraws = async () => {
    try {
      const res = await API.get("/draw/list");
      if (res.data.success) setDraws(res.data.draws || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load draws");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      month: "",
      year: "",
      drawNumbers: "",
      drawType: "random",
      prizePool: "",
      status: "pending",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const payload = {
      ...form,
      drawNumbers: form.drawNumbers
        ? form.drawNumbers
            .split(",")
            .map((n) => Number(n.trim()))
            .filter(Boolean)
        : [],
      month: Number(form.month),
      year: Number(form.year),
      prizePool: Number(form.prizePool),
    };

    try {
      const res = editingId
        ? await API.post(
            "/draw/update",
            { drawId: editingId, ...payload },
            { headers: { token } }
          )
        : await API.post("/draw/create", payload, { headers: { token } });

      if (res.data.success) {
        toast.success(
          editingId ? "Draw updated successfully" : "Draw created successfully"
        );
        resetForm();
        fetchDraws();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(editingId ? "Failed to update draw" : "Failed to create draw");
    }
  };

  const handleDelete = async (drawId) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/draw/delete",
        { drawId },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Draw deleted successfully");
        fetchDraws();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete draw");
    }
  };

  const handleRunDraw = async (drawId) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/draw/run",
        { drawId },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Draw run successfully");
        fetchDraws();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to run draw");
    }
  };

  const handleSimulate = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/draw/simulate",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setSimulation(res.data);
        toast.success("Simulation completed");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Simulation failed");
    }
  };

  const startEdit = (draw) => {
    setEditingId(draw._id);
    setForm({
      month: draw.month || "",
      year: draw.year || "",
      drawNumbers: draw.drawNumbers?.join(", ") || "",
      drawType: draw.drawType || "random",
      prizePool: draw.prizePool || "",
      status: draw.status || "pending",
    });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Draws</h1>

        <button
          onClick={handleSimulate}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-purple-700"
        >
          Simulate Draw
        </button>

        {simulation && (
          <div className="border rounded-xl p-5 mb-8 bg-gray-50">
            <h2 className="text-xl font-semibold mb-3">Simulation Result</h2>

            <p className="mb-3">
              <span className="font-medium">Draw Numbers:</span>{" "}
              {simulation.drawNumbers?.join(", ") || "N/A"}
            </p>

            {simulation.winners?.length === 0 ? (
              <p className="text-gray-500">No winners found</p>
            ) : (
              <div className="space-y-2">
                {simulation.winners?.map((winner, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 bg-white"
                  >
                    <p>
                      <span className="font-medium">User:</span>{" "}
                      {winner.user || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Matches:</span>{" "}
                      {winner.matches}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="border rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Month"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className="border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Draw Numbers comma separated"
              value={form.drawNumbers}
              onChange={(e) =>
                setForm({ ...form, drawNumbers: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Prize Pool"
              value={form.prizePool}
              onChange={(e) => setForm({ ...form, prizePool: e.target.value })}
              className="border px-3 py-2 rounded-lg"
            />
            <select
              value={form.drawType}
              onChange={(e) => setForm({ ...form, drawType: e.target.value })}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="random">Random</option>
              <option value="algorithmic">Algorithmic</option>
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              {editingId ? "Update Draw" : "Create Draw"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid md:grid-cols-2 gap-6">
          {draws.map((draw) => (
            <div key={draw._id} className="border rounded-xl p-5">
              <h2 className="text-xl font-semibold">
                {draw.month}/{draw.year}
              </h2>
              <p>Status: {draw.status}</p>
              <p>Type: {draw.drawType}</p>
              <p>Prize Pool: £{draw.prizePool}</p>
              <p>Numbers: {draw.drawNumbers?.join(", ") || "Not generated"}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => startEdit(draw)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(draw._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleRunDraw(draw._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Run Draw
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}