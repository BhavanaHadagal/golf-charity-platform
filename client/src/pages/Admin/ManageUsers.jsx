import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "sonner";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      setLoading(true);

      const res = await API.get("/user/list", {
        headers: { token },
      });

      if (res.data.success) {
        setUsers(res.data.users || []);
      } else {
        toast.error(res.data.message || "Failed to load users");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await API.post(
        "/user/update-role",
        { userId, role },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("User role updated successfully");
        fetchUsers();
      } else {
        toast.error(res.data.message || "Failed to update role");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
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
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {users.map((user) => (
              <div key={user._id} className="border rounded-xl p-5 bg-white">
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>

                <p className="text-sm text-gray-500 mb-1">
                  Email: {user.email}
                </p>

                <p className="text-sm text-gray-500 mb-1 capitalize">
                  Role: {user.role}
                </p>

                <p className="text-sm text-gray-500 mb-1">
                  Charity: {user.selectedCharity?.name || "Not selected"}
                </p>

                <p className="text-sm text-gray-500 mb-4 capitalize">
                  Subscription: {user.subscription?.status || "none"}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleRoleChange(user._id, "user")}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
                  >
                    Make User
                  </button>

                  <button
                    onClick={() => handleRoleChange(user._id, "admin")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Make Admin
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