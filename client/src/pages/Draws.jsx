import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "sonner";

export default function Draws() {
  const [draws, setDraws] = useState([]);

  useEffect(() => {
    fetchDraws();
  }, []);

  const fetchDraws = async () => {
    try {
      const res = await API.get("/draw/list");
      if (res.data.success) {
        setDraws(res.data.draws || []);
      } else {
        toast.error("Failed to load draws");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load draws");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Draw History</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {draws.map((draw) => (
            <div key={draw._id} className="border rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-2">
                {draw.month}/{draw.year}
              </h2>
              <p className="text-gray-500 mb-2">Type: {draw.drawType}</p>
              <p className="text-gray-500 mb-2">Status: {draw.status}</p>
              <p className="text-gray-500 mb-2">
                Prize Pool: £{draw.prizePool}
              </p>
              <p className="text-gray-700">
                Numbers: {draw.drawNumbers?.join(", ") || "Not published"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}