import React from "react";
import styles from "./style.module.css";
const mockA = (amount: number) => {
  const goods = [];
  for (let index = 0; index < amount; index++) {
    goods.push({ label: `good${index}`, key: index });
  }
  return goods;
};
const Main = () => {
  return (
    <div className={styles.container}>
      {mockA(80).map((mock) => {
        return (
          <div className={styles.goods} key={mock.key}>
            {mock.label}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
