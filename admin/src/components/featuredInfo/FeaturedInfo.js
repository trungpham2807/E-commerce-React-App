import {useEffect, useState} from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../apiService";

export default function FeaturedInfo() {

  const [income, setIncome] = useState([]);
  const [fraction, setFraction] = useState(0);

  useEffect(() => {
    const getIncome = async() => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setFraction((res.data[1].total*100) / res.data[0].total - 100);
      } catch {}
    }
    getIncome()
  }, []);


  console.log(income, fraction);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(fraction)}{" "} 
            {fraction < 0 ? (

              <ArrowDownward  className="featuredIcon negative"/>
            ) : (
              <ArrowUpward className="featuredIcon"/>
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}