import React from 'react';
import { 
  FaBell, FaSun, FaMoon, FaUser, FaShoppingBag, 
  FaUserAlt, FaDollarSign, FaStore 
} from 'react-icons/fa';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import Chart from 'react-apexcharts'; // Importing ApexCharts

const Admin = () => {
  // Dummy data for the new charts
  const lineChartOptions = {
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#34D399'],
  };

  const lineChartSeries = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60],
    },
  ];

  const columnChartOptions = {
    chart: {
      id: 'column-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    colors: ['#f79306'],
  };

  const columnChartSeries = [
    {
      name: 'Revenue',
      data: [80, 90, 70, 110],
    },
  ];

  return (
    <div className="bg-gray-100 p-2">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-md">
  <div className="text-lg lg:text-base font-medium text-gray-800">
    Great Day, Manimala!
  </div>
  <div className="flex items-center space-x-8 ml-auto">
    <FaSun className="text-yellow-500 w-5 h-5 lg:w-6 lg:h-6" title="Light Mode" />
    <FaMoon className="text-blue-500 w-5 h-5 lg:w-6 lg:h-6" title="Dark Mode" />
    <FaBell className="text-gray-600 w-5 h-5 lg:w-6 lg:h-6" title="Notifications" />
    <FaUser className="text-gray-600 w-7 h-7 lg:w-8 lg:h-8 rounded-full border-gray-400" title="Profile" />
  </div>
    
</header>



      {/* Notification Banner */}
      <div className="bg-orange-100 text-orange-600 p-2 lg:p-3 rounded-lg mb-4 lg:mb-6 text-sm lg:text-base">
        You are under a trial plan, and your account will expire in 6 days. Kindly contact your account manager to renew.
      </div>

      {/* Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
        {/* Total Sales */}
        <div className="text-black rounded-lg p-4 shadow-lg items-center h-full bg-green-500">
          <div className="flex items-center">
            <div className="bg-white text-green-500 rounded-2xl p-3 shadow-lg">
              <FaShoppingBag className="w-6 h-6" />
            </div>
            <div className="ml-4 flex items-center">
              <p className="uppercase text-2xl font-medium text-white-50 mb-0">0</p>
            </div>
          </div>
          <div className="mr-14 mt-2">
            <p className="uppercase text-sm font-medium text-white-50 mb-1">Today's Lead</p>
          </div>
        </div>

        {/* Fresh Lead */}
        <div className="text-black rounded-lg p-4 shadow-lg items-center h-full bg-blue-500">
          <div className="flex items-center">
            <div className="bg-white text-green-500 rounded-2xl p-3 shadow-lg">
              <FaUserAlt className="w-6 h-6" />
            </div>
            <div className="ml-4 flex items-center">
              <p className="uppercase text-2xl font-bold text-white-50 mb-0">0</p>
            </div>
          </div>
          <div className="mr-14 mt-2">
            <p className="uppercase text-sm font-medium text-white-50 mb-1">Fresh Lead</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="text-black rounded-lg p-4 shadow-lg items-center h-full bg-purple-500">
          <div className="flex items-center">
            <div className="bg-white text-green-500 rounded-2xl p-3 shadow-lg">
              <FaDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-4 flex items-center">
              <p className="uppercase text-2xl font-medium text-white-50 mb-0">0</p>
            </div>
          </div>
          <div className="mr-14 mt-2">
            <p className="uppercase text-sm font-medium text-white-50 mb-1">Assigned Lead</p>
          </div>
        </div>

        {/* Number of Stores */}
        <div className="text-black rounded-lg p-4 shadow-lg items-center h-full bg-red-500">
          <div className="flex items-center">
            <div className="bg-white text-green-500 rounded-2xl p-3 shadow-lg">
              <FaStore className="w-6 h-6" />
            </div>
            <div className="ml-4 flex items-center">
              <p className="uppercase text-2xl font-medium text-white-50 mb-0">0</p>
            </div>
          </div>
          <div className="mr-14 mt-2">
            <p className="uppercase text-sm font-medium text-white-50 mb-1">Followup Lead</p>
          </div>
        </div>

        {/* Today's Deal */}
        <div className="text-black rounded-lg p-4 shadow-lg items-center h-full bg-yellow-500">
          <div className="flex items-center">
            <div className="bg-white text-green-500 rounded-2xl p-3 shadow-lg">
              <FaUser className="w-6 h-6" />
            </div>
            <div className="ml-4 flex items-center">
              <p className="uppercase text-2xl font-medium text-white-50 mb-0">0</p>
            </div>
          </div>
          <div className="mr-14 mt-2">
            <p className="uppercase text-sm font-medium text-white-50 mb-1">Today's Deal</p>
          </div>
        </div>

        {/* Followup Deal */}
        <div className="text-black rounded-lg p-4 shadow-lg items-center h-full bg-indigo-500">
          <div className="flex items-center">
            <div className="bg-white text-green-500 rounded-2xl p-3 shadow-lg">
              <FaDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-4 flex items-center">
              <p className="uppercase text-2xl font-medium text-white-50 mb-0">0</p>
            </div>
          </div>
          <div className="mr-14 mt-2">
            <p className="uppercase text-sm font-medium text-white-50 mb-1">Followup Deal</p>
          </div>
        </div>
      </div>

      {/* Target vs Achievement and Lead vs Deal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Target vs Achievement */}
        <div className="bg-white p-4 lg:p-5 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-semibold">Target vs Achievement</h2>
            <button className="text-green-500 text-xs lg:text-sm">Manage Target</button>
          </div>
          <p className="text-sm lg:text-base">Achieved out of</p>
          <p className="text-3xl lg:text-4xl font-bold">0/0</p>
          <p className="text-gray-400 text-xs lg:text-sm">Achievement 0%</p>
          <div className="flex justify-between mt-3 lg:mt-4">
            <div className="text-center">
              <p className="text-lg lg:text-xl font-semibold">0</p>
              <p className="text-xs lg:text-sm">In Pipeline</p>
            </div>
            <div className="text-center">
              <p className="text-lg lg:text-xl font-semibold">0</p>
              <p className="text-xs lg:text-sm">Expected Closures</p>
            </div>
          </div>
        </div>

        {/* Lead vs Deal */}
        <div className="bg-white p-4 lg:p-5 rounded-lg shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Lead vs Deal</h2>
          <p className="text-sm lg:text-base">Overview for the month</p>
          <p className="text-3xl lg:text-4xl font-bold">0</p>
          <div className="text-center mt-3 lg:mt-4">
            <p className="text-xs lg:text-sm">Total Active Lead</p>
            <p className="text-lg lg:text-xl font-semibold">0</p>
          </div>
          <div className="text-center mt-3 lg:mt-4">
            <p className="text-xs lg:text-sm">Total Active Deal</p>
            <p className="text-lg lg:text-xl font-semibold">0</p>
          </div>
        </div>
      </div>

      {/* New Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart 1 */}
        <div className="bg-white p-4 lg:p-5 rounded-lg shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Sales Over Time</h2>
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Column Chart 1 */}
        <div className="bg-white p-4 lg:p-5 rounded-lg shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Quarterly Revenue</h2>
          <Chart
            options={columnChartOptions}
            series={columnChartSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* Line Chart 2 */}
        <div className="bg-white p-4 lg:p-5 rounded-lg shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">User Growth</h2>
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={300}
          />
        </div>

        {/* Column Chart 2 */}
        <div className="bg-white p-4 lg:p-5 rounded-lg shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Product Performance</h2>
          <Chart
            options={columnChartOptions}
            series={columnChartSeries}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
