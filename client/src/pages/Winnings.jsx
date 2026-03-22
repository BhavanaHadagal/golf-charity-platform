import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "sonner";

export default function Winnings() {
  const [winnings, setWinnings] = useState([]);

  useEffect(() => {
    fetchWinnings();
  }, []);

  const fetchWinnings = async () => {
    try {
      const res = await API.get("/winner/my");
      if (res.data.success) {
        setWinnings(res.data.winnings || []);
      } else {
        toast.error("Failed to load winnings");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load winnings");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Winnings</h1>

        {winnings.length === 0 ? (
          <p className="text-gray-500">No winnings yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {winnings.map((item) => (
              <div key={item._id} className="border rounded-2xl p-5">
                <h2 className="text-xl font-semibold mb-2">
                  Match Type: {item.matchType}
                </h2>
                <p className="text-gray-500 mb-2">
                  Amount: £{item.winningAmount}
                </p>
                <p className="text-gray-500 mb-2">
                  Verification: {item.verificationStatus}
                </p>
                <p className="text-gray-500">
                  Payment: {item.paymentStatus}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}