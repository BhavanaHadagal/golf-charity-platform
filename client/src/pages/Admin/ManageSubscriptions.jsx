import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "sonner";

export default function ManageSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      setLoading(true);

      const res = await API.get("/subscription/list", {
        headers: { token },
      });

      if (res.data.success) {
        setSubscriptions(res.data.subscriptions || []);
      } else {
        toast.error(res.data.message || "Failed to load subscriptions");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (subscriptionId, status) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/subscription/update-status",
        {
          subscriptionId,
          status,
        },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("Subscription updated successfully");
        fetchSubscriptions();
      } else {
        toast.error(res.data.message || "Failed to update subscription");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update subscription");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Subscriptions</h1>

        {subscriptions.length === 0 ? (
          <p className="text-gray-500">No subscriptions found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptions.map((item) => (
              <div key={item._id} className="border rounded-xl p-5 bg-white">
                <h2 className="text-xl font-semibold mb-2">
                  {item.user?.name || "Unknown User"}
                </h2>

                <p className="text-sm text-gray-500 mb-1">
                  Email: {item.user?.email || "N/A"}
                </p>

                <p className="text-sm text-gray-500 mb-1 capitalize">
                  Plan: {item.planType}
                </p>

                <p className="text-sm text-gray-500 mb-1 capitalize">
                  Status: {item.status}
                </p>

                <p className="text-sm text-gray-500 mb-1">
                  Amount: £{item.amount}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  Renewal:{" "}
                  {item.renewalDate
                    ? new Date(item.renewalDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(item._id, "active")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Mark Active
                  </button>

                  <button
                    onClick={() => handleStatusChange(item._id, "inactive")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Mark Inactive
                  </button>

                  <button
                    onClick={() => handleStatusChange(item._id, "cancelled")}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
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