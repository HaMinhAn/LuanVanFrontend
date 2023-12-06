import React, { useEffect } from "react";
import ChartCustom from "../../components/Chart";
import { useAuth } from "../../contexts/auth";
import LayoutDefault from "../../components/Layout/LayoutDefault";

const ChartPage = () => {
  const { isAdmin } = useAuth();
  console.log("Innnnnn");
  useEffect(() => {
    isAdmin();
  }, []);
  return (
    <LayoutDefault>
      <ChartCustom />
    </LayoutDefault>
  );
};

export default ChartPage;
