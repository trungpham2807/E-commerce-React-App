import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import {useState, useMemo, useEffect} from "react";
import "./home.css";
import { userRequest } from "../../apiService";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const [saleStats, setSaleStats] = useState([]);

  const MONTHS = useMemo (() => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
  ], []); //MONTHS will be dependency but will never change

  useEffect (() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        });
        list.map((item) => {
          setUserStats((prev) => [
            ...prev,
            {name: MONTHS[item._id - 1], "Active User": item.total}
          ])
        })
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  useEffect (() => {
    const getSaleStats = async () => {
      try {
        const res = await userRequest.get("/orders/monthlysales");
        console.log("res", res);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        });
        list.map((item) => {
          setSaleStats((prev) => [
            ...prev,
            {name: MONTHS[item._id - 1], "Recorded Sales": item.total}
          ])
        })
      } catch {}
    };
    getSaleStats();
  }, [MONTHS]);

  // console.log("here", userStats);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <Chart data={saleStats} title="Sales Analytics" grid dataKey="Recorded Sales"/>
    </div>
  );
}