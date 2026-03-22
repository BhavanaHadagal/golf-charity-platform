import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Heart } from "lucide-react";

export default function Charities() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCharity = async (charityId) => {
    try {
      const res = await API.post("/charity/select", {
        charityId,
        charityPercentage: 10,
      });

      if (res.data.success) {
        alert("Charity selected successfully");
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert("Failed to select charity");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Choose a Charity
          </h1>
          <p className="text-gray-600">
            Select a charity to support with your subscription contribution.
          </p>
        </div>

        {charities.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No charities available right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charities.map((charity) => (
              <div
                key={charity._id}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                  <Heart size={22} className="text-pink-500" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {charity.name}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  {charity.category || "General"}
                </p>

                <p className="text-sm text-gray-600 mb-6">
                  {charity.description || "No description available."}
                </p>

                <button
                  onClick={() => handleSelectCharity(charity._id)}
                  className="w-full rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                >
                  Select Charity
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}