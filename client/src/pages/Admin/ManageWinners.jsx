import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "sonner";

export default function ManageWinners() {
  const [winners, setWinners] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    drawId: "",
    matchType: "",
    winningAmount: "",
  });

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.get("/winner/list", {
        headers: { token },
      });

      if (res.data.success) {
        setWinners(res.data.winners || []);
      } else {
        toast.error(res.data.message || "Failed to load winners");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load winners");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/winner/add",
        {
          ...form,
          winningAmount: Number(form.winningAmount),
        },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Winner added successfully");
        setForm({
          userId: "",
          drawId: "",
          matchType: "",
          winningAmount: "",
        });
        fetchWinners();
      } else {
        toast.error(res.data.message || "Failed to add winner");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add winner");
    }
  };

  const handleVerify = async (winnerId, verificationStatus) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/winner/verify",
        {
          winnerId,
          verificationStatus,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Winner verification updated");
        fetchWinners();
      } else {
        toast.error(res.data.message || "Failed to verify winner");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify winner");
    }
  };

  const handleMarkPaid = async (winnerId) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/winner/pay",
        { winnerId },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Winner marked as paid");
        fetchWinners();
      } else {
        toast.error(res.data.message || "Failed to mark winner paid");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark winner paid");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Winners</h1>

        <form onSubmit={handleSubmit} className="border rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="User ID"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              className="border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Draw ID"
              value={form.drawId}
              onChange={(e) => setForm({ ...form, drawId: e.target.value })}
              className="border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Match Type (3/4/5)"
              value={form.matchType}
              onChange={(e) => setForm({ ...form, matchType: e.target.value })}
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Winning Amount"
              value={form.winningAmount}
              onChange={(e) =>
                setForm({ ...form, winningAmount: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Winner
          </button>
        </form>

        {winners.length === 0 ? (
          <p className="text-gray-500">No winners found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {winners.map((winner) => (
              <div key={winner._id} className="border rounded-xl p-5 bg-white">
                <h2 className="text-xl font-semibold mb-2">
                  Match: {winner.matchType}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                  Amount: £{winner.winningAmount}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  User: {winner.user?.name || winner.user?._id || "N/A"}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  Draw: {winner.draw?._id || "N/A"}
                </p>

                <p className="text-sm text-gray-600 mb-1 capitalize">
                  Verification: {winner.verificationStatus}
                </p>

                <p className="text-sm text-gray-600 mb-4 capitalize">
                  Payment: {winner.paymentStatus}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleVerify(winner._id, "approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleVerify(winner._id, "rejected")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleMarkPaid(winner._id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Mark Paid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}