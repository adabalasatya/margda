import React from 'react';
import { 
  FaBell, FaSun, FaMoon, FaUser, FaShoppingBag, 
  FaUserAlt, FaDollarSign, FaStore 
} from 'react-icons/fa';
import Chart from 'react-apexcharts';

const Admin = () => {
  // Chart configurations
  const lineChartOptions = {
    chart: { id: 'line-chart', toolbar: { show: false } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    stroke: { curve: 'smooth' },
    colors: ['#34D399'],
  };

  const lineChartSeries = [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60] }];

  const columnChartOptions = {
    chart: { id: 'column-chart', toolbar: { show: false } },
    xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    colors: ['#F59E0B'],
  };

  const columnChartSeries = [{ name: 'Revenue', data: [80, 90, 70, 110] }];

  // Sample dynamic data (replace with real API data)
  const widgetsData = [
    { title: "Today's Lead", count: 0, bgColor: 'bg-green-500', icon: <FaShoppingBag /> },
    { title: 'Fresh Lead', count: 0, bgColor: 'bg-blue-500', icon: <FaUserAlt /> },
    { title: 'Assigned Lead', count: 0, bgColor: 'bg-purple-500', icon: <FaDollarSign /> },
    { title: 'Followup Lead', count: 0, bgColor: 'bg-red-500', icon: <FaStore /> },
    { title: "Today's Deal", count: 0, bgColor: 'bg-yellow-500', icon: <FaUser /> },
    { title: 'Followup Deal', count: 0, bgColor: 'bg-indigo-500', icon: <FaDollarSign /> },
  ];

  return (
    <div className="bg-gray-100 p-4 lg:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="text-lg font-medium text-gray-800">Great Day, Manimala!</div>
        <div className="flex items-center space-x-6">
          <FaSun className="text-yellow-500 w-6 h-6" title="Light Mode" />
          <FaMoon className="text-blue-500 w-6 h-6" title="Dark Mode" />
          <FaBell className="text-gray-600 w-6 h-6" title="Notifications" />
          <FaUser className="text-gray-600 w-8 h-8 rounded-full border-gray-400" title="Profile" />
        </div>
      </header>

      {/* Notification Banner */}
      <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mb-6 text-sm">
        You are under a trial plan, and your account will expire in 6 days. Kindly contact your account manager to renew.
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {widgetsData.map((widget, index) => (
          <div key={index} className={`text-white rounded-lg p-4 shadow-lg flex items-center ${widget.bgColor}`}>
            <div className="bg-white text-gray-800 rounded-2xl p-3 shadow-lg">{widget.icon}</div>
            <div className="ml-4">
              <p className="text-2xl font-semibold">{widget.count}</p>
              <p className="uppercase text-sm font-medium">{widget.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
          <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={300} />
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Quarterly Revenue</h2>
          <Chart options={columnChartOptions} series={columnChartSeries} type="bar" height={300} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
