import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import momenttimezone from "moment-timezone";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BreadCrumb from "../Breadcrumb";
import { Toaster, toast } from "sonner";
const breadcrumbItems = [{ title: "Uptime", link: "/dashboard/uptime" }];
function Uptime() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  // const [websiteStatus, setWebsiteStatus] = useState(null);

  // console.log(url, user._id);
  const [totalUpCount, setTotalUpCount] = useState(0);
  const [totalDownCount, setTotalDownCount] = useState(0);

  const addUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/ping/`, { url, user_id: user._id });
      console.log(res.data);
      toast.success("URL Added");
      fetchUrl();
    } catch (error) {
      console.log(error);
      toast.error("Invalid URL");
    }
    setUrl("");
    setLoading(false);
    setShowFirstPage(false);
    localStorage.setItem("showFirstPage", "false");
  };

  const fetchUrl = async () => {
    const res = await axios.get(`/api/ping/${user._id}`, {
      user_id: user._id,
    });
    console.log(res, "here");
    setUrlData(res.data);
    setTotalUpCount(res.data.totalUpCount);
    setTotalDownCount(res.data.totalDownCount);
  };

  const handleDelete = async (urlId) => {
    await axios.delete(`/api/ping/${urlId}`);
    toast.success("URL Deleted");
    fetchUrl();
    // console.log(id)
  };

  useEffect(() => {
    const showFirstPageValue = localStorage.getItem("showFirstPage");
    if (showFirstPageValue === "false") {
      setShowFirstPage(false);
    }
    fetchUrl();
  }, []);

  return (
    <div className="overflow-hidden h-full px-10">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex justify-between my-5">
        <h3 className="flex text-3xl font-bold p-2 font-sans">
          Monitors
          <span className="flex mt-7 w-1 h-1 me-3 bg-green-600 rounded-full mx-1"></span>
        </h3>

        <div className="flex">
          <Badge variant="secondary" className="w-32 h-12">
            {" "}
            <ArrowUpRight className="text-green-500" />
            {/* <h3 className="text-lg ml-2">{totalUpCount}</h3> */}
            <h3 className="ml-3 text-lg">{totalUpCount} Up</h3>
          </Badge>
        </div>

        <div className="flex">
          <Badge variant="secondary" className="w-32 h-12">
            {" "}
            <ArrowDownLeft className="text-red-500" />
            {/* <h3 className="text-lg ml-1">{totalDownCount}</h3> */}
            <h3 className="ml-3 text-lg">{totalDownCount} Down</h3>
          </Badge>
        </div>

        <div className="flex gap-5 items-center">
          {" "}
          <form onSubmit={addUrl} className="flex gap-5">
            <Input
              className="h-10"
              type="text"
              placeholder="websitename.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />{" "}
            <Button type="submit"> {loading ? "Loading..." : "Add"}</Button>
          </form>
        </div>
      </div>

      <div>
        {showFirstPage ? (
          <div>
            <h1 className=" p-10 flex tracking-wide justify-center ">
              <span className="text-green-600 px-4">Monitor</span>your website
              in a click
              <span className="flex mt-8 ml-1 w-2 h-2 me-3 bg-green-600 rounded-full"></span>
            </h1>

            <div>
              <div>
                <h3 className="flex justify-center text-center text-xl">
                  Keep an eye on your{" "}
                  <span className="text-green-600 px-2">website</span>and check
                  your webiste is{" "}
                  <span className="text-green-600 px-2">up</span> and{" "}
                  <span className="text-red-600 px-2">down</span>.
                </h3>
              </div>

              <h3 className="flex justify-center text-xl pt-2">
                Get started now, all set up in under 30 seconds!{" "}
              </h3>
              <h3 className="flex justify-center text-lg pt-2">
                Notify When your website is down!
              </h3>
            </div>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table>
              <TableCaption>A list of your Monitor</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] lg:w-[500px]">
                    {" "}
                    Website Name
                  </TableHead>
                  <TableHead className="w-[200px] lg:w-[400px]">
                    Status
                  </TableHead>
                  <TableHead className="w-[200px] lg:w-[400px]">
                    {" "}
                    Performance
                  </TableHead>
                  <TableHead className="lg:w-[300px]">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {urlData.data &&
                  urlData.data
                    ?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="font-medium"
                          onClick={() => {
                            navigate(`/dashboard/uptime/chart/${item._id}`);
                          }}
                        >
                          {" "}
                          {item.url.replace(/^www\./, "")}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(`/dashboard/uptime/chart/${item._id}`);
                          }}
                        >
                          {" "}
                          {item.status === "Up" ? (
                            <span className="flex">
                              {/* <div className="bg-green-600 animate-pulse rounded-full w-5 h-5 flex justify-center items-center"></div> */}
                              <div className="circle pulse-up mt-1 flex justify-center items-center">
                                <RiArrowUpSFill
                                  className="bg-green-400 text-black rounded-full"
                                  size={20}
                                />
                              </div>
                              <h3 className="ml-3 text-xl">Up</h3>
                            </span>
                          ) : (
                            <span className="flex">
                              <div className="circle pulse-down mt-1 flex justify-center items-center">
                                <RiArrowDownSFill
                                  className="bg-red-400 text-black rounded-full"
                                  size={20}
                                />
                              </div>
                              <h3 className="ml-2 text-xl">Down</h3>
                            </span>
                          )}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(`/dashboard/uptime/chart/${item._id}`);
                          }}
                        >
                          {" "}
                          {item.responseTimes[item.responseTimes.length - 1] +
                            "ms"}
                        </TableCell>

                        <TableCell
                          className=""
                          onClick={() => {
                            navigate(`/dashboard/uptime/chart/${item._id}`);
                          }}
                        >
                          {" "}
                          {momenttimezone(item.timestamp)
                            .tz("Asia/Kolkata")
                            .fromNow()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline">
                                <BsThreeDots />{" "}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                    .reverse()}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <Toaster richColors position="bottom-left" />
    </div>
  );
}
export default Uptime;
