import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";
import { ApiGateway } from "../../service/api";
import ImageBox from "../Image";
import { Detail } from "../Detail";
import Payment from "../Payment";

const Book = () => {
  //@ts-ignore
  const { id } = useParams();
  const [book, setBook] = useState<Product>();
  useEffect(() => {
    ApiGateway.get({ url: `/book/${id}` }).then((res) => {
      setBook(res.data);
    });
  }, []);
  return (
    <div style={{ height: 500 }}>
      {book ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <ImageBox images={book.pictureList} />
            <div>
              <Detail data={book} />
              <Payment data={book} />
            </div>
          </div>
          <div style={{ margin: 10 }}>
            <p>Mô tả quyển sách:</p>
            <div> {book.description} </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Book;
