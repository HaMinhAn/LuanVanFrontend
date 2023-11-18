import React from "react";
import { useParams } from "react-router-dom";
import LayoutDefault from "../../components/Layout/LayoutDefault";
import Book from "../../components/Book";

const InforBookPage = () => {
  //@ts-ignore
  const { name } = useParams();
  console.log(name);
  return (
    <LayoutDefault>
      <Book />
    </LayoutDefault>
  );
};

export default InforBookPage;
