import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../Breadcrumb";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const breadcrumbItems = [
  { title: "Uptime", link: "/dashboard/uptime" },
  { title: "Chart", link: "/uptime/chart" },
];

function Chart() {
  const [result, setResult] = useState();
  const { id } = useParams();
  console.log(id);

  const fetchUrl = async () => {
    try {
      const res = await axios.get(`/api/ping/one/${id}`);
      console.log(res, "here");
      setResult(res.data.data);
    } catch (error) {
      console.error("Error fetching URL data:", error);
    }
  };
  useEffect(() => {
    fetchUrl();
    const interval = setInterval(fetchUrl, 5000); // Fetch data every 5 seconds (adjust interval as needed)
    return () => clearInterval(interval); // Cleanup function to clear interval on component unmountx`x`
  }, []);

  return (
    <div className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      
      {/* className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px mt-10 m-10" */}
      <div>
        <ul
          role="list"
          // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ml-10 mt-10"
          className=""
        >
          <li className=" bg-black rounded-lg shadow pb-6 m-10">
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-sm font-medium truncate">
                    Response Time.
                  </h3>
                </div>
                <div className="mt-10">
                  {result && (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={result.responseTimes.map((ms, date) => ({
                          date,
                          ms,
                        }))}
                      >
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="ms"
                          stroke="#8884d8"
                          strokeWidth={3}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
            <div className="text-black flex justify-between">
              <div>
                <h4>600ms</h4>
                <p>Average</p>
              </div>

              <div>
                <h4>600ms</h4>
                <p>Minimum</p>
              </div>

              <div>
                <h4>600ms</h4>
                <p>Maximum</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <BreadCrumb items={breadcrumbItems} />
  //     <h3 className="text-4xl flex justify-center font-serif ">
  //       Response Time
  //     </h3>{" "}

  //   </div>
  // );
}

export default Chart;
