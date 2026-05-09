import { useEffect, useState } from "react";

import {
  FaUsers,
  FaUserCheck,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Layout from "../components/Layout";

import { api } from "../api";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.list().then(setLeads);
  }, []);

  const total = leads.length;

  const newLeads = leads.filter(
    (l) => l.status === "new"
  ).length;

  const contacted = leads.filter(
    (l) => l.status === "contacted"
  ).length;

  const converted = leads.filter(
    (l) => l.status === "converted"
  ).length;

  const conversionRate = total
    ? ((converted / total) * 100).toFixed(1)
    : "0";

  return (
    <Layout title="Dashboard">

      <h1 className="page-title">
        System Analytics
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <FaUsers className="stat-icon" />

          <h3>Total Leads</h3>

          <h1>{total}</h1>
          <p className="label">All leads in the system</p>
        </div>

        <div className="stat-card">
          <FaChartLine className="stat-icon" />

          <h3>Conversion</h3>

          <h1>{conversionRate}%</h1>
          <p className="label">Percentage of converted</p>
        </div>

        <div className="stat-card">
          <FaClock className="stat-icon" />

          <h3>New Leads</h3>

          <h1>{newLeads}</h1>
          <p className="label">New leads in the system</p>
        </div>

        <div className="stat-card">
          <FaUserCheck className="stat-icon" />

          <h3>Contacted</h3>

          <h1>{contacted}</h1>
          <p className="label">Contacted leads in the system</p>
        </div>

      </div>

    </Layout>
  );
}