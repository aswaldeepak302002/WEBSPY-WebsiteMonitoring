import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../Breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger, 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsThreeDots } from "react-icons/bs";
import {  useNavigate } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster, toast } from "sonner";


const breadcrumbItems = [{ title: "PageLoad Time", link: "/dashboard/uptime" }];

function Pageload() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [url, setUrl] = useState();
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(false);

  const addUrl = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`/api/pageload/`, {
        url,
        user_id: user._id,
      });
      console.log(res.data);
      toast.success("URL Added");
      fetchUrl();
    } catch (error) {
      console.log(error);
      toast.error("Invalid URL");
    }
    setUrl("");
    setLoading(false)
  };

  const fetchUrl = async () => {
    const res = await axios.get(`/api/pageload/${user._id}`, {
      user_id: user._id,
    });
    console.log(res.data, "here");
    setUrlData(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/api/pageLoad/${id}`);
    console.log(res)
    fetchUrl();
    toast.success("URL Deleted");
    // console.log(id)
  };

  useEffect(() => {
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

        <div className="flex gap-5 items-center">
          {" "}
          <form onSubmit={addUrl} className="flex gap-5">
            <Input
              className="h-10"
              type="text"
              placeholder="https://websitename.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />{" "}
            <Button type="submit">{loading ? 'Loading...' : 'Add'}</Button>
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Table>
            <TableCaption>A list of SSL Details</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[1200px]">Website name</TableHead>
                <TableHead className="w-[300px]">Page Load Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urlData.data &&
                urlData.data 
                  ?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium" 
                      onClick={() => {
                        navigate(`/dashboard/pageloadtime/pageloaddetail/${item._id}`);}}
                      
                      >{item.url}</TableCell>
                      <TableCell>{item.lighthouseMetrics ? item.lighthouseMetrics['speed-index'] : 'N/A'}</TableCell>
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
      <Toaster richColors position="bottom-left" />
    </div>
  );
}

export default Pageload;
