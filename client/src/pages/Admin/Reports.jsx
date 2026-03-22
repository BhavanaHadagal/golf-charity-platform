import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "sonner";

export default function Reports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      setLoading(true);

      const res = await API.get("/report/admin", {
        headers: { token },
      });

      if (res.data.success) {
        setReports(res.data.reports);
      } else {
        toast.error(res.data.message || "Failed to load reports");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Reports</h1>
          <p className="text-gray-500">No report data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{reports.totalUsers}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Total Charities</h2>
            <p className="text-3xl font-bold mt-2">{reports.totalCharities}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Total Draws</h2>
            <p className="text-3xl font-bold mt-2">{reports.totalDraws}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Total Winners</h2>
            <p className="text-3xl font-bold mt-2">{reports.totalWinners}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Active Subscriptions</h2>
            <p className="text-3xl font-bold mt-2">
              {reports.activeSubscriptions}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Subscription Revenue</h2>
            <p className="text-3xl font-bold mt-2">
              £{reports.totalSubscriptionRevenue}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold">Total Payout</h2>
            <p className="text-3xl font-bold mt-2">£{reports.totalPayout}</p>
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4">Charity Distribution</h2>

          {Object.keys(reports.charityTotals || {}).length === 0 ? (
            <p className="text-gray-500">No charity contribution data yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(reports.charityTotals).map(([name, total]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border rounded-lg px-4 py-3"
                >
                  <span className="font-medium">{name}</span>
                  <span className="text-gray-600">{total}% total assigned</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}