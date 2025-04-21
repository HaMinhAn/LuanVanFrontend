import React, { useEffect, useState } from "react";
import { data, options } from "../../utils/Chart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { ChartProps } from "../../types/Chart";
import moment from "moment";
import { ApiGateway } from "../../service/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function convertMonthWithYear(monthWithYear: string): string {
  const monthsDict: { [key: string]: string } = {
    JANUARY: "Tháng 1",
    FEBRUARY: "Tháng 2",
    MARCH: "Tháng 3",
    APRIL: "Tháng 4",
    MAY: "Tháng 5",
    JUNE: "Tháng 6",
    JULY: "Tháng 7",
    AUGUST: "Tháng 8",
    SEPTEMBER: "Tháng 9",
    OCTOBER: "Tháng 10",
    NOVEMBER: "Tháng 11",
    DECEMBER: "Tháng 12",
  };

  const [month, year] = monthWithYear.split(" ");
  const uppercasedMonth = month.toUpperCase();
  const vietnameseMonth = monthsDict[uppercasedMonth] || "Invalid month";
  return `${vietnameseMonth} ${year || "Invalid year"}`;
}
type MonthlyData = [string, number];

function sortArrayByMonth(
  array: [string, { [key: string]: number }][]
): [string, { [key: string]: number }][] {
  const monthToNumber = (month: string): number => {
    const monthMap: { [key: string]: number } = {
      JANUARY: 1,
      FEBRUARY: 2,
      MARCH: 3,
      APRIL: 4,
      MAY: 5,
      JUNE: 6,
      JULY: 7,
      AUGUST: 8,
      SEPTEMBER: 9,
      OCTOBER: 10,
      NOVEMBER: 11,
      DECEMBER: 12,
    };
    return monthMap[month.toUpperCase()];
  };

  const compareMonths = (
    a: [string, { [key: string]: number }],
    b: [string, { [key: string]: number }]
  ): number => {
    const monthA = monthToNumber(a[0].split(" ")[0]);
    const yearA = parseInt(a[0].split(" ")[1]);
    const monthB = monthToNumber(b[0].split(" ")[0]);
    const yearB = parseInt(b[0].split(" ")[1]);

    if (yearA === yearB) {
      return monthA - monthB;
    } else {
      return yearA - yearB;
    }
  };

  array.sort(compareMonths);

  return array;
}
const ChartCustom = () => {
  const [data, setDate] = useState({
    labels: [""],
    datasets: [
      {
        label: "Dataset 1",
        data: [1],
        borderColor: "blue",
        backgroundColor: "lightBlue",
      },
    ],
  });
  useEffect(() => {
    const label: string[] = [];
    const total: number[] = [];
    ApiGateway.get({ url: "/order/createDate" }).then(
      (res: { data: { [key: string]: number }[] }) => {
        const test = Object.entries(res.data);
        const afterSort = sortArrayByMonth(test);
        test.map((order: any) => {
          label.push(convertMonthWithYear(order[0]));
          total.push(order[1]);
        });
        setDate({
          labels: label,
          datasets: [
            {
              label: "Doanh thu",
              data: label.map((v, i) => {
                return total[i];
              }),
              borderColor: "blue",
              backgroundColor: "lightBlue",
            },
          ],
        });
      }
    );
  }, [JSON.stringify(data)]);
  return (
    <div className="App">
      <Line options={options} data={data} width={1000} height={500} />
    </div>
  );
};

export default ChartCustom;
