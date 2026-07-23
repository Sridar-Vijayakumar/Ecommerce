import { useState } from "react";
import UserTable from "../../components/admin/UserTable";

const Users = () => {
  const [users] = useState([
    {
      _id: "1",
      name: "Sridar",
      email: "sridar@gmail.com",
      role: "admin",
      createdAt: "2026-07-20",
    },
    {
      _id: "2",
      name: "Rahul",
      email: "rahul@gmail.com",
      role: "user",
      createdAt: "2026-07-18",
    },
    {
      _id: "3",
      name: "Priya",
      email: "priya@gmail.com",
      role: "user",
      createdAt: "2026-07-15",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Delete User:", id);

      // TODO:
      // DELETE /api/users/:id
    }
  };

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