import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "sonner";

export default function Subscription() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planType) => {
    setLoading(true);

    try {
      const res = await API.post("/subscription/create", {
        planType,
        amount: planType === "monthly" ? 99 : 999,
      });

      if (res.data.success) {
        toast.success("Subscription created successfully");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Failed to create subscription");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Choose a Plan</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Monthly</h2>
            <p className="text-gray-500 mb-4">£9.99 / month</p>
            <button
              onClick={() => handleSubscribe("monthly")}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Subscribe Monthly
            </button>
          </div>

          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Yearly</h2>
            <p className="text-gray-500 mb-4">£89.99 / year</p>
            <button
              onClick={() => handleSubscribe("yearly")}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Subscribe Yearly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}