const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`rounded-lg shadow p-6 text-white ${color}`}>
      <h2 className="text-lg">{title}</h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;