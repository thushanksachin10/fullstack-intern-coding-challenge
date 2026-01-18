import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <>
      <h2>Total Users: {stats.totalUsers}</h2>
      <h2>Total Stores: {stats.totalStores}</h2>
      <h2>Total Ratings: {stats.totalRatings}</h2>
    </>
  );
}
