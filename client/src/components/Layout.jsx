import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../auth";

import {
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function Layout({ title, children }) {
  const nav = useNavigate();

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            <FaUsers />
          </div>

          <span>Mini CRM</span>
        </div>

        <nav>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaChartBar />
            Dashboard
          </NavLink>

          <NavLink
            to="/leads"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaUsers />
            Leads Listing
          </NavLink>

        </nav>

        <button
          className="logout-btn"
          onClick={() => {
            signOut();
            nav("/login");
          }}
        >
          <FaSignOutAlt />
          Sign Out
        </button>

      </aside>

      {/* MAIN */}
      <div className="main">

        <header className="topbar">

          <h2>{title}</h2>

          <div className="user">

            <div>
              <b>Admin User</b>
              <div className="muted small">
                Main Admin
              </div>
            </div>

            

          </div>

        </header>

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}