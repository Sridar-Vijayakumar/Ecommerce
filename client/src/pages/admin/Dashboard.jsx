import { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import API from "../../services/api";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await API.get("/admin/dashboard");

        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Products"
          value={stats.totalProducts}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Orders"
          value={stats.totalOrders}
          color="bg-green-600"
        />

        <DashboardCard
          title="Users"
          value={stats.totalUsers}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          color="bg-red-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;