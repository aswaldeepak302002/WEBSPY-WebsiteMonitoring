import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
// import { useSelector } from "react-redux";
import { BiSolidUpArrow } from "react-icons/bi";
import { useParams } from "react-router-dom";
// import { network } from "../../../assets";

function PageLoadDetail() {
  // const { user } = useSelector((state) => state.user);
  let websiteId = useParams();
  console.log(websiteId.id);
  const [urlData, setUrlData] = useState([]);

  const fetchUrl = async () => {
    try {
      const res = await axios.get(`/api/pageLoad/one/${websiteId.id}`);
      console.log(res.data);
      setUrlData(res.data);
    } catch (error) {
      console.error("Error fetching URL data:", error);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const getColor = (value) => {
    if (value >= 0 && value <= 35) {
      return "#ff0000"; // Red color for 0-35
    } else if (value > 35 && value <= 75) {
      return "#ffa500"; // Orange color for 36-75
    } else {
      return "#00ff00"; // Green color for 76-100
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 rounded-lg">
      {
        urlData.data && (
          // urlData.data((urlData.data, index) => (
          <React.Fragment>
            <div className="flex h-[350px] w-full items-center justify-evenly ">
              <div className="w-[45%] h-full flex flex-col items-center justify-center gap-2">
                <div className="w-20">
                  {" "}
                  <CircularProgressbar
                    value={urlData.data.performance} // Pass performance value here
                    text={`${urlData.data.performance}`}
                    styles={{
                      root: { width: "100%" },
                      path: {
                        stroke: getColor(urlData.data.performance),
                      },
                      text: { fill: "whitesmoke" },
                      trail: { stroke: "#d6d6d6" },
                    }}
                  />
                </div>
                <div className="font-black text-xl">Performance</div>
                <div className="w-full justify-center text-center text-xs font-sans">
                  <p>The performance score is calculated from this metrics.</p>
                </div>
                <div className="flex w-full justify-evenly">
                  <div>
                    <BiSolidUpArrow className="text-red-600 ml-3" />
                    <span className="text-[14px]">0 - 49</span>
                  </div>
                  <div>
                    <BiSolidUpArrow className="text-orange-400 ml-4" />
                    <span className="text-[14px]">50 - 89</span>
                  </div>
                  <div>
                    <BiSolidUpArrow className="text-green-600 ml-4" />
                    <span className="text-[14px]">90 - 100</span>
                  </div>
                </div>
              </div>
              <div className="w-[10%] flex items-center justify-center">
                <div></div>
                <div className="border border-l-black h-[80px] "></div>
                <div></div>
              </div>
              <div className="w-[45%] flex items-center justify-center">
                <img
                  src={urlData.data.screenshotBase64}
                  alt="Screenshot"
                  className="w-56 h-auto"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl pt-20">Metrics</h2>
            </div>
            <div className="mt-4 flex items-center h-full justify-center ">
              <div className="flex flex-col items-start justify-evenly h-full w-[45%] ">
                <div className="flex justify-start">
                  <div className="flex mx-4">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics[
                      "largest-contentful-paint"
                    ] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics[
                            "largest-contentful-paint"
                          ]
                        ) <= 2.5 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics[
                              "largest-contentful-paint"
                            ]
                          ) <= 4.0 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>Largest Contentful Paint</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? `${parseFloat(
                            urlData.data.lighthouseMetrics[
                              "largest-contentful-paint"
                            ]
                          ).toFixed(2)}s`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="flex mx-4">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics[
                      "cumulative-layout-shift"
                    ] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics[
                            "cumulative-layout-shift"
                          ]
                        ) <= 0.1 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics[
                              "cumulative-layout-shift"
                            ]
                          ) <= 0.25 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>Cumulative Layout Shift</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? urlData.data.lighthouseMetrics[
                            "cumulative-layout-shift"
                          ]
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="flex mx-4">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics["first-contentful-paint"] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics[
                            "first-contentful-paint"
                          ]
                        ) <= 1.8 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics[
                              "first-contentful-paint"
                            ]
                          ) <= 3.0 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>First Contentful Paint</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? `${parseFloat(
                            urlData.data.lighthouseMetrics[
                              "first-contentful-paint"
                            ]
                          ).toFixed(2)}s`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="flex mx-4">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics["interactive"] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics["interactive"]
                        ) <= 3.8 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics["interactive"]
                          ) <= 7.3 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>Time to Interactive</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? `${parseFloat(
                            urlData.data.lighthouseMetrics["interactive"]
                          ).toFixed(2)}s`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Add more content here */}
              </div>
              <div className="w-[10%]"></div>
              <div className="flex flex-col items-start justify-evenly h-full w-[45%]">
                <div className="flex justify-start ">
                  <div className="flex mx-4 ">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics["first-meaningful-paint"] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics[
                            "first-meaningful-paint"
                          ]
                        ) <= 1.8 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics[
                              "first-meaningful-paint"
                            ]
                          ) <= 3.0 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>First Meaningful Paint</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? `${parseFloat(
                            urlData.data.lighthouseMetrics[
                              "first-meaningful-paint"
                            ]
                          ).toFixed(2)}s`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-start ">
                  <div className="flex mx-4 ">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics["network-server-latency"] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics[
                            "network-server-latency"
                          ]
                        ) <= 1.8 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics[
                              "network-server-latency"
                            ]
                          ) <= 3.0 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>Network Server Latency</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? `${parseFloat(
                            urlData.data.lighthouseMetrics[
                              "network-server-latency"
                            ]
                          ).toFixed(2)}s`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-start ">
                  <div className="flex mx-4 ">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics["First Input Delay"] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics["First Input Delay"]
                        ) <= 100 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics["First Input Delay"]
                          ) <= 200 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>First Input Delay</div>
                    <div>
                      {urlData.data.cruxMetrics
                        ? `${parseFloat(
                            urlData.data.cruxMetrics["First Input Delay"]
                          ).toFixed(2)}ms`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-start ">
                  <div className="flex mx-4 ">
                    {urlData.data.lighthouseMetrics &&
                    urlData.data.lighthouseMetrics["total-byte-weight"] ? (
                      <>
                        {parseFloat(
                          urlData.data.lighthouseMetrics["total-byte-weight"]
                        ) <= 1.8 ? (
                          <BiSolidUpArrow className="text-green-600" />
                        ) : parseFloat(
                            urlData.data.lighthouseMetrics["total-byte-weight"]
                          ) <= 3.0 ? (
                          <BiSolidUpArrow className="text-orange-400" />
                        ) : (
                          <BiSolidUpArrow className="text-red-600" />
                        )}
                      </>
                    ) : (
                      <BiSolidUpArrow className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start ">
                    <div>Page</div>
                    <div>
                      {urlData.data.lighthouseMetrics
                        ? `${urlData.data.lighthouseMetrics["total-byte-weight"]}`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Add more content here */}
              </div>
            </div>
          </React.Fragment>
        )
        // ))
      }
    </div>
  );
}

export default PageLoadDetail;
