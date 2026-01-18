import { useEffect, useState } from "react";
import api from "../api/axios";
import { Rating } from "@mui/material";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/user/stores").then((res) => setStores(res.data));
  }, []);

  const submitRating = (storeId, value) => {
    api.post("/ratings", { storeId, value });
  };

  return (
    <>
      {stores.map((store) => (
        <div key={store.id}>
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p>Overall Rating: {store.overallRating}</p>
          <Rating
            value={store.userRating || 0}
            onChange={(e, val) => submitRating(store.id, val)}
          />
        </div>
      ))}
    </>
  );
}
