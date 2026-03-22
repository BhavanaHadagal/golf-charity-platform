import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Trophy,
  Heart,
  Target,
  Calendar,
  Plus,
  Trash2,
} from "lucide-react";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [scores, setScores] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [scoresRes, subscriptionRes] = await Promise.all([
        API.get("/score/my"),
        API.get("/subscription/my"),
      ]);

      if (scoresRes.data.success) {
        setScores(scoresRes.data.scores || []);
      }

      if (subscriptionRes.data.success) {
        setSubscription(subscriptionRes.data.subscription || null);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const addScore = async () => {
    const val = parseInt(newScore);

    if (isNaN(val) || val < 1 || val > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    try {
      const res = await API.post("/score/add", {
        score: val,
        date: newDate,
      });

      if (res.data.success) {
        setNewScore("");
        fetchDashboardData();
        alert("Score added successfully");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add score");
    }
  };

  const removeScore = async (id) => {
    try {
      setScores((prev) => prev.filter((score) => score._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const subscriptionStatus = subscription?.status || "inactive";
  const planType = subscription?.planType || "No Plan";
  const renewalDate = subscription?.renewalDate
    ? new Date(subscription.renewalDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              GolfGives
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Target,
              label: "Scores Entered",
              value: scores.length.toString(),
              sub: "of 5 max",
            },
            {
              icon: Trophy,
              label: "Plan",
              value: planType,
              sub: subscriptionStatus,
            },
            {
              icon: Heart,
              label: "Subscription",
              value: subscriptionStatus,
              sub: `Renewal: ${renewalDate}`,
            },
            {
              icon: Calendar,
              label: "Next Draw",
              value: "Apr 1",
              sub: "2026",
            },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="rounded-2xl bg-white border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">{label}</span>
              </div>

              <div className="text-2xl font-bold text-gray-900 capitalize">
                {value}
              </div>
              <div className="text-xs text-gray-500 capitalize">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Enter Score
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Enter your latest Stableford score (1–45). Only your last 5
              scores are kept.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="score"
                  className="block text-sm font-medium text-gray-700"
                >
                  Score
                </label>
                <input
                  id="score"
                  type="number"
                  min={1}
                  max={45}
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  placeholder="e.g. 36"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1 space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={addScore}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>

            {scores.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  No scores yet. Enter your first round above!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {scores.map((score) => (
                  <div
                    key={score._id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-blue-600">
                          {score.score}
                        </span>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Stableford Score
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(score.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeScore(score._id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Subscription
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    subscriptionStatus === "active"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                />
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {subscriptionStatus}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Plan: <span className="capitalize">{planType}</span>
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Renewal Date: {renewalDate}
              </p>

              <button className="w-full rounded-lg bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition">
                Manage Subscription
              </button>
            </div>

            <div className="rounded-2xl bg-white border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Charity
              </h2>

              <div className="text-center py-6">
                <Heart size={32} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500 mb-3">
                  Charity selection connected earlier from your backend flow
                </p>

                <button
                  onClick={() => navigate("/charities")}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
                >
                  Choose a Charity
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}