const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 text-white ${color} hover:shadow-xl transition duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm uppercase tracking-wide opacity-80">
            {title}
          </h2>

          <p className="text-3xl font-bold mt-2">
            {value}
          </p>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;