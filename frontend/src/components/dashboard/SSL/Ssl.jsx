import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { Toaster, toast } from "sonner";
import { BsThreeDots } from "react-icons/bs";

function Ssl() {
  const { user } = useSelector((state) => state.user);
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading

  //   console.log(url, user._id);

  const addUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/ssl", { url, user_id: user._id });
      //   console.log(res.data.message);
      fetchUrl();
      toast.success("URL Added");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Invalid URL");
    }
    setUrl("");
    setLoading(false);
  };

  const fetchUrl = async () => {
    const res = await axios.get(`/api/ssl/${user._id}`, {
      user_id: user._id,
    });
    setUrlData(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/api/ssl/${id}`);
    console.log(res)
    toast.success("URL Deleted");
    fetchUrl();
    // console.log(id)
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div>
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col sm:flex-row justify-between pt-10 px-12 items-center">
          <h1 className="text-2xl">
            Check Your SSL Details And Get Notification When Expire
          </h1>
          <div className="flex gap-5 items-center">
            <Input
              className="h-10"
              type="text"
              placeholder="websitename.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" onClick={addUrl}> {loading ? "Loading..." : "Add"}</Button>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
          <Table>
            <TableCaption>A list of SSL Details</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[500px]">WEBSITE NAME</TableHead>
                <TableHead className="w-[500px]">DAYS REMAINING</TableHead>
                <TableHead>EXPIRY DATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urlData.data &&
                urlData.data
                  ?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.url}</TableCell>
                      <TableCell className="">{item.daysRemaining} days left</TableCell>
                        <TableCell>{item.validTo}</TableCell>
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
      </div>
      <Toaster richColors position="bottom-left" />
    </div>
  );
}

export default Ssl;
