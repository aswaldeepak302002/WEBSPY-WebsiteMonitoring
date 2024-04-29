import { Button } from "@/components/ui/button";
import { FaCircle } from "react-icons/fa6";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useSelector } from "react-redux";
import axios from "axios";

function co2() {
  const { user } = useSelector((state) => state.user);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [co2Value, setCo2Value] = useState(null);
  const [treesToPlant, setTreesToPlant] = useState(null);
  const [percentageDifference, setPercentageDifference] = useState(null);
  const [enteredUrl, setEnteredUrl] = useState("");
  const [value, setValue] = useState(10000);
  const [editValue, setEditValue] = useState(null);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleValueChange = () => {
    setEditValue(value); // Store the current value for editing
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = () => {
    setValue(parseInt(editValue)); // Parse the edited value and update the state
    setEditValue(null); // Reset the edit value state
  };

  const addUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/co`, { url, user_id: user._id });
      console.log(res.data);
      const { estimatedCO2, percentageDifference, treesToPlant } = res.data;
      setCo2Value(estimatedCO2);
      setTreesToPlant(treesToPlant);
      setPercentageDifference(percentageDifference);
    } catch (error) {
      console.log(error);
    }
    setUrl("");
    setLoading(false);
    setShowFirstPage(false);
    setEnteredUrl(url.replace(/^https?:\/\//, ""));
  };

  const calculateMonthlyCO2 = () => {
    if (co2Value && value) {
      const result = co2Value * value;
      if (result >= 0.001 && result <= 1000) {
        return `${result.toString().replace(/(\.\d*?)0+$/, "$1")} gram`;
      } else {
        return `${(result / 1000).toString().replace(/(\.\d*?)0+$/, "$1")} kg`;
      }
    }
    return "0 gram";
  };

  const calculateTreesToPlant = () => {
    const monthlyCO2 = co2Value * value;
    const annualCO2 = monthlyCO2 * 12;
    const annualCO2InKg = annualCO2 / 1000;
    const treesNeeded = Math.ceil(annualCO2InKg / 21.8);
    return treesNeeded;
  };

  return (
    <div>
      {showFirstPage ? (
        <div>
          <div>
            <h1 className="bg-white inline-block text-transparent bg-clip-text flex justify-center p-10">
              WEBSITE CARBON CALCULATOR
            </h1>
          </div>

          <div className="flex flex-col items-center text-lg">
            <p className="font-bold">
              All websites have a carbon footprints. What's is yours?
            </p>
            <p>
              Use the tool below to estimate the digital carbon footprint of any
              website.
            </p>
          </div>

          <form onSubmit={addUrl}>
            <div className="flex flex-col justify-center mt-20">
              <h3 className="px-20 ml-[130px]">Enter your website address:</h3>
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
              <input
                type="text"
                name=""
                id=""
                placeholder="https://yourwebsite.com"
                className="bg-transparent border border-white rounded-2xl w-[900px] h-[38px] pl-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button className="ml-[220px] my-5 pr-10 ">{loading ? "Loading..." : "Calculate"}</Button>
          </form>
        </div>
      ) : (
        <div className="border mx-10 my-2 h-full rounded-3xl border-white">
          <div className="bg-green-200 h-16 rounded-t-3xl flex ">
            <div className="my-4">
              <FaCircle className="size-6" />
            </div>
            <div className=" my-4">
              <FaCircle className="size-6" />
            </div>
            <div className="my-4">
              <FaCircle className="size-6" />
            </div>
            <div className="my-4"></div>
          </div>
          

          <div className="flex flex-col items-center">
            <h1 className="my-20 text-[35px] text-center leading-tight">
              {enteredUrl} <br />
              produces less carbon than <br />
              {percentageDifference}% of websites
            </h1>
            <p className="text-[25px] font-bold">
              Estimated CO<sub>2 </sub> produced per page view: {co2Value} gram
            </p>
          </div>

          <div className="flex justify-center text-[25px] font-bold my-8">
            <p>Now assuming you get </p>
          </div>

          <div className="flex items-center flex-col">
            {/* Show input field for editing if editValue is not null, else show value */}
            {editValue !== null ? (
              <div>
                <input
                  type="number"
                  value={editValue}
                  onChange={handleEditChange}
                  className="bg-gray-100 text-gray-900 border rounded-md px-2 py-1"
                />
                <Button
                  onClick={handleEditSubmit}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  onClick={handleDecrement}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l-md"
                >
                  -
                </Button>
                <p
                  onClick={handleValueChange}
                  className="text-[25px] font-bold mx-2 cursor-pointer"
                >
                  {value}
                </p>
                <Button
                  onClick={handleIncrement}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md"
                >
                  +
                </Button>
              </div>
            )}
            <div className="text-[25px] font-bold my-6">
              <p>page views per year</p>
            </div>
            <div className="text-[35px] font-bold">
              <p>How Much carbon is that per year</p>
            </div>
            <div className="my-10">
              <p className="text-xl">
                Producing {calculateMonthlyCO2()} is like the equivalent of...
              </p>
            </div>
            <div className="my-2">
              <p className="text-xl">
                {co2Value} gram * {value} ={calculateMonthlyCO2()}
              </p>
            </div>
            <div className="my-2">
              <p className="text-xl">
                To offset this, you would need to plant approximately{" "}
                {calculateTreesToPlant()} trees.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default co2;
