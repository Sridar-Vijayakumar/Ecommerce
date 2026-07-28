import { useEffect, useState } from "react";
import API from "../../services/api";
import Loader from "../../components/Loader";
import UserTable from "../../components/admin/UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");

      setUsers(data.users || data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await API.delete(`/users/${id}`);

      alert("User deleted successfully");

      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="text-gray-500 mt-1">
            Manage registered users
          </p>
        </div>
      </div>

      {/* Users Table */}
      <UserTable
        users={users}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Users;