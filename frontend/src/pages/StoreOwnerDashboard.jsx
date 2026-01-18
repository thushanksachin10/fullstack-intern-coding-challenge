import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StoreOwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/store-owner/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <>
      <h2>{data.storeName}</h2>
      <h3>Average Rating: {data.averageRating}</h3>
      {data.usersWhoRated.map((u, i) => (
        <p key={i}>
          {u.name} ({u.email}) → {u.rating}
        </p>
      ))}
    </>
  );
}
