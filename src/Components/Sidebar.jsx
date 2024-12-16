import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { BsDatabaseUp } from "react-icons/bs";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { AllLeads } from "../DashboardComponets/AllLeads";
import { AllUser } from "../DashboardComponets/AllUser";
import SidebarLogo from "../assets/margdarshakendra-logo.webp";
import Admin from "../DashboardComponets/Admin";

import { ScheduleTask } from "../DashboardComponets/ScheduleTask";
import { ValidEmails } from "../DashboardComponets/ValidateEmail";

 const Sidebar = () => {
  const [profileComplete, setProfileComplete] = useState(false);

  const menus = [
    { name: "Admin", link: "admin", icon: TbReportAnalytics },
    { name: "All Lead", link: "allleads", icon: MdOutlineDashboard },
    { name: "User", link: "alluser", icon: AiOutlineUser },
    // { name: "Google Data", link: "googledata", icon: BsDatabaseUp },
    {
      name: "Schedule Task",
      link: "scheduletask",
      icon: RiCalendarScheduleLine,
    },
    {
      name: "validate emails",
      link: "validate-email",
      icon: TbReportAnalytics,
    },
    { name: "Analytics", link: "#", icon: TbReportAnalytics },
    { name: "Saved", link: "#", icon: AiOutlineHeart },
    { name: "Setting", link: "#", icon: RiSettings4Line },
  ];

  useEffect(() => {
    const checkProfile = localStorage.getItem("picUrl");
    if (!checkProfile || checkProfile == "null" || checkProfile === undefined) {
      setProfileComplete(false);
    } else {
      setProfileComplete(true);
    }
  }, []);

  const [open, setOpen] = useState(true); // Track sidebar open/closed state

  return (
    <section className="flex gap-6">
      {profileComplete ? (
        <>
          <div
            className={`bg-gradient-to-br from-gray-800 to-gray-900 h-screen fixed ${
              open ? "w-64" : "w-16"
            } duration-500 text-gray-100 px-4`}
          >
            <div className="py-3 flex justify-between items-center">
              {open && (
                <div className="flex w-full items-center">
                  <img
                    src={SidebarLogo}
                    className="pr-5 py-2 w-full"
                    alt="Sidebar-logo"
                  />
                </div>
              )}
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 relative">
              {menus.map((menu, i) => (
                <Link
                  to={menu.link}
                  key={i}
                  className={`group flex items-center text-lg gap-3.5 p-3 rounded-xl ${
                    !open
                      ? "justify-center hover:bg-blue-600"
                      : "hover:bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                  }`}
                >
                  <div className={`${!open ? "ml-3 px-2" : "ml-0"}`}>
                    {React.createElement(menu.icon, { size: "25" })}
                  </div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`${
              open ? "ml-64" : "ml-16"
            } duration-500 m-3 text-xl text-gray-900 font-semibold w-full`}
          >
            <Routes>
              <Route path="/" element={<Navigate to="admin" />} />
              <Route path="allleads" element={<AllLeads />} />
              <Route path="alluser" element={<AllUser />} />
              <Route path="admin" element={<Admin />} />
              {/* <Route path="googledata" element={<GoogleData />} /> */}
              <Route path="scheduletask" element={<ScheduleTask />} />
              <Route path="validate-email" element={<ValidEmails />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          
        </>
      )}
    </section>
  );
};

export default Sidebar