import { Trash2, ShieldCheck, User } from "lucide-react";

const UserTable = ({ users = [], onDelete, onRoleChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-center">Role</th>
            <th className="px-6 py-3 text-center">Joined</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Name */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User size={18} className="text-blue-600" />
                  </div>

                  <span className="font-medium">
                    {user.name}
                  </span>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  {user.email}
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-center">
                  <select value={user.role || "user"} onChange={(e) => onRoleChange(user._id, e.target.value)} className="rounded-lg border bg-white px-2 py-1 text-sm font-semibold">
                    <option value="user">Customer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Joined Date */}
                <td className="px-6 py-4 text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition flex items-center gap-2 mx-auto"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
