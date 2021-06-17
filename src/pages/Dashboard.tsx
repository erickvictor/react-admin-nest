import Wrapper from "../components/Wrapper";
import * as c3 from "c3";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const chart = c3.generate({
        bindto: "#chart",
        data: {
          x: "x",
          columns: [["x"], ["Sales"]],
          types: {
            Sales: "bar",
          },
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y-%m-%d",
            },
          },
        },
      });
      const { data } = await axios.get('chart');

      chart.load({
        columns: [
          ['x', ...data.map((r: any) => r.date)],
          ['Sales', ...data.map((r: any) => r.sum)]
        ]
      })
    })();
  });

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div>
        <h3 className="h3">Daily Sales</h3>
        <div id="chart" />
      </div>
    </Wrapper>
  );
};

export default Dashboard;
