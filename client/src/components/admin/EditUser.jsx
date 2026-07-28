import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/Loader";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/users/${id}`);

        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Failed to fetch user"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/users/${id}`, {
        name,
        email,
        isAdmin,
      });

      alert("User updated successfully");

      navigate("/admin/users");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update user"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit User
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white shadow rounded-xl p-6"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) =>
              setIsAdmin(e.target.checked)
            }
          />

          <label htmlFor="isAdmin">
            Admin User
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;