import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import DashboardPage from "./DashboardPage";

const SharedGroupPage = () => {
  const { token } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/groups/share/${token}`)
      .then((res) => setGroup(res.data))
      .catch(() => alert("Invalid or expired link"));
  }, [token]);

  if (!group) return <div style={{ padding: 40 }}>Loading shared group...</div>;

  return <DashboardPage sharedGroup={group} isShared={true} />;
};

export default SharedGroupPage;
