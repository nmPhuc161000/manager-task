import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faTable,
  faHome,
  faStar,
  faUsers,
  faCog,
  faAngleDown,
  faImage, // For "Hình" (Images)
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);

  const toggleWorkspace = () => {
    setIsWorkspaceOpen(!isWorkspaceOpen);
  };

  // Main menu items (top section)
  const mainMenuItems = [
    { icon: faColumns, text: "Bảng", path: "/dashboard" },
    { icon: faTable, text: "Mẫu", path: "/templates" },
    { icon: faHome, text: "Trang chủ", path: "/" },
  ];

  // Workspace items (under "TeamSync Không gian làm việc")
  const workspaces = [
    {
      icon: faColumns,
      name: "TeamSync Không gian làm việc",
      items: [
        { icon: faColumns, text: "Bảng", path: "/teamsync/boards" },
        { icon: faStar, text: "Điểm nổi bật", path: "/teamsync/starred" },
        { icon: faImage, text: "Hình", path: "/teamsync/images" },
        { icon: faUsers, text: "Thành viên", path: "/teamsync/members" },
        { icon: faCog, text: "Cài đặt", path: "/settings" },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="menu">
        {mainMenuItems.map((item, index) => (
          <Link to={item.path} key={index} className="menu-item">
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.text}</span>
          </Link>
        ))}
      </div>
      <div className="workspaces-section">
        <div className="workspaces-header">
          <span>Các Không gian làm việc</span>
        </div>
        {workspaces.map((workspace, index) => (
          <div key={index} className="workspace-item">
            <div className="workspace-title" onClick={toggleWorkspace}>
              <FontAwesomeIcon icon={workspace.icon} style={{ color: "#0055D1" }} />
              <span>{workspace.name}</span>
              <FontAwesomeIcon icon={faAngleDown} className={`arrow ${isWorkspaceOpen ? "open" : ""}`} />
            </div>
            {isWorkspaceOpen && (
              <div className="workspace-subitems">
                {workspace.items.map((subitem, subIndex) => (
                  <Link to={subitem.path} key={subIndex} className="subitem">
                    <FontAwesomeIcon icon={subitem.icon} />
                    <span>{subitem.text}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;