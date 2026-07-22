import DashboardCard from "../../components/admin/DashboardCard";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Products"
          value="25"
          color="bg-blue-600"
        />

        <DashboardCard
          title="Orders"
          value="18"
          color="bg-green-600"
        />

        <DashboardCard
          title="Users"
          value="12"
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Revenue"
          value="₹1,20,000"
          color="bg-red-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;