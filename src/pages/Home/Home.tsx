import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import LayoutDefault from "../../components/Layout/LayoutDefault";
import { useCategory } from "../../contexts/category";

const HomePage: React.FC = () => {
  const { products } = useCategory();
  useEffect(() => {}, [products]);
  return (
    <LayoutDefault>
      <Main />
    </LayoutDefault>
  );
};

export default HomePage;
