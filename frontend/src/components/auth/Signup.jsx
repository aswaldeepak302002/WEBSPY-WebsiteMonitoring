import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { Toaster, toast } from "sonner";
import { setUserLocalStorage } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import OAuth from "../oauth";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevStat) => ({ ...prevStat, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", formData);
      const data = res.data;
      dispatch(setUserLocalStorage(data));

      // console.log(data.user);
      navigate("/dashboard/uptime");
      toast.success("SIGNUP SUCCESS")
    } catch (error) {
      const { all, email, password } = error.response.data.error;
      if (all) {
        toast.error(all);
      }
      if (email) {
        toast.error(email);
      }
      if (password) {
        toast.error(password);
      }
    }
  };

  return (
    // <section className="flex flex-col md:flex-row h-screen items-center text-black bg-stone-950">
    //   <div className=" hidden  w-full md:w-1/2 xl:w-2/3 h-full">
        
    //   </div>
    //   <div
    //     className=" w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
    //   flex items-center justify-center"
    //   >
    //     <div className="w-full h-100">
          // <div className="inline-block ">
          //   <Link
          //     to="/"
          //     className="flex group text-blue-500 hover:text-blue-700 font-semibold  "
          //   >
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       className="h-6 w-6 group-hover:animate-pulse"
          //       fill="none"
          //       viewBox="0 0 24 23"
          //       stroke="currentColor"
          //       strokeWidth="2"
          //     >
          //       <path
          //         strokeLinecap="round"
          //         strokeLinejoin="round"
          //         d="M7 16l-4-4m0 0l4-4m-4 4h18"
          //       />
          //     </svg>
          //     <span className="px-2 ">Home</span>
          //   </Link>
          //   </div>
    //       {/* {error && 
    //       <div
    //         className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
    //         role="alert"
    //       >
    //         {error}
    //       </div>
    //     } */}
    //       <form className="mt-6" method="POST" onSubmit={handleSubmit}>

    //       <Card>
    //   <CardHeader className="space-y-2">
    //     <CardTitle className="text-2xl">Create an account</CardTitle>
    //     <CardDescription>
    //       Enter your email below to create your account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="grid gap-4">
    //     <div className="">
    //     <button
    //           type="button"
    //           className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
    //         >
    //           <div className="flex items-center justify-center">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="w-6 h-6"
    //               viewBox="0 0 48 48"
    //             >
    //               <defs>
    //                 <path
    //                   id="a"
    //                   d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
    //                 />
    //               </defs>
    //               <clipPath id="b">
    //                 <use xlinkHref="#a" overflow="visible" />
    //               </clipPath>
    //               <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
    //               <path
    //                 clipPath="url(#b)"
    //                 fill="#EA4335"
    //                 d="M0 11l17 13 7-6.1L48 14V0H0z"
    //               />
    //               <path
    //                 clipPath="url(#b)"
    //                 fill="#34A853"
    //                 d="M0 37l30-23 7.9 1L48 0v48H0z"
    //               />
    //               <path
    //                 clipPath="url(#b)"
    //                 fill="#4285F4"
    //                 d="M48 48L17 24l-4-3 35-10z"
    //               />
    //             </svg>
    //             <span className="ml-4">Log in with Google</span>
    //           </div>
    //         </button> 
    //     </div>
    //     <div className="relative">
    //       <div className="absolute inset-0 flex items-center">
    //         <span className="w-full border-t" />
    //       </div>
    //       <div className="relative flex justify-center text-xs uppercase">
    //         <span className="bg-background px-2 text-muted-foreground">
    //           Or continue with
    //         </span>
    //       </div>
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="email">Email</Label>
    //       <Input id="email" name="email" type="email" placeholder="m@example.com" onChange={handleChange}
    //       value={formData.email} />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="Username">Username</Label>
    //       <Input id="username " name="username" type="username " placeholder="deepakaswal30" onChange={handleChange}
    //       value={formData.username} />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="password">Password</Label>
    //       <Input id="password" name="password" type="password" placeholder= "*************" onChange={handleChange} 
    //       value={formData.password}/>
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Button type="submit" className="w-full">Create account</Button>
    //   </CardFooter>
    // </Card>
            // {/* <div>
            //   <label className="block text-gray-400">Username</label>
            //   <input
            //     type="username"
            //     name="username"
            //     placeholder="Enter Username"
            //     className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            //     required
            //     onChange={handleChange}
            //   />
            // </div>
            // <div className="mt-4">
            //   <label className="block text-gray-400">Email Address</label>
            //   <input
            //     type="email"
            //     name="email"
            //     placeholder="Enter Email Address"
            //     className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            //     required
            //     onChange={handleChange}
            //   />
            // </div>
            // <div className="mt-4">
            //   <label className="block text-gray-400">Password</label>
            //   <input
            //     type="password"
            //     name="password"
            //     placeholder="Enter Password"
            //     minLength={6}
            //     className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
            // focus:bg-white focus:outline-none"
            //     required
            //     onChange={handleChange}
            //   />
            // </div>
            // <Button
            //   type="submit"
            //   className="w-full p-6 mt-10 dark:black"

            //   // className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            //   // px-4 py-3 mt-6"
            // >
            //   Sign Up
            // </Button>
            // <hr className="my-6 border-gray-300 w-full" />
            // <button
            //   type="button"
            //   className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            // >
            //   <div className="flex items-center justify-center">
            //     <svg
            //       xmlns="http://www.w3.org/2000/svg"
            //       className="w-6 h-6"
            //       viewBox="0 0 48 48"
            //     >
            //       <defs>
            //         <path
            //           id="a"
            //           d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            //         />
            //       </defs>
            //       <clipPath id="b">
            //         <use xlinkHref="#a" overflow="visible" />
            //       </clipPath>
            //       <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
            //       <path
            //         clipPath="url(#b)"
            //         fill="#EA4335"
            //         d="M0 11l17 13 7-6.1L48 14V0H0z"
            //       />
            //       <path
            //         clipPath="url(#b)"
            //         fill="#34A853"
            //         d="M0 37l30-23 7.9 1L48 0v48H0z"
            //       />
            //       <path
            //         clipPath="url(#b)"
            //         fill="#4285F4"
            //         d="M48 48L17 24l-4-3 35-10z"
            //       />
            //     </svg>
            //     <span className="ml-4">Log in with Google</span>
            //   </div>
            // </button> */}
    //       </form>
          // <p className="mt-1 text-gray-400">
          //   Already have a account?{" "}
          //   <Link to="/login">
          //     <a className="text-blue-500 hover:text-blue-700 font-semibold">
          //       Login
          //     </a>
          //   </Link>
          // </p>
    //     </div>
    //   </div>
    // </section>
    <div>
      
      <div className="md:hidden">
        
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Home
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            WEBSPY
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Signup for monitor your website&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email, username, password below to create your account
              </p>
            </div>
            {/* <UserAuthForm /> */}
            <form className="mt-6" method="POST" onSubmit={handleSubmit}>
            <div>
               <label className="block text-gray-400">Username</label>
               <input
                 type="username"
                 name="username"
                 placeholder="Enter Username"
                 className="w-full px-4 py-3 rounded-lg bg-black mt-2 border focus:border-blue-500 focus:bg-black focus:outline-none"
                 required
                 onChange={handleChange}
                 value={formData.username}
               />
             </div>
             <div className="mt-4">
               <label className="block text-gray-400">Email Address</label>
               <input                type="email"
             name="email"
                 placeholder="Enter Email Address"
                 className="w-full px-4 py-3 rounded-lg bg-black mt-2 border focus:border-blue-500 focus:bg-black focus:outline-none"
                 required
                 onChange={handleChange}
                 value={formData.email}

               />
             </div>
             <div className="mt-4">
               <label className="block text-gray-400">Password</label>
               <input                type="password"
                 name="password"
                 placeholder="Enter Password"
                 minLength={6}
                 className="w-full px-4 py-3 rounded-lg bg-black mt-2 border focus:border-blue-500 focus:bg-black focus:outline-none"
                 required
                 onChange={handleChange}
                 value={formData.password}
               />
             </div>
             <Button
               type="submit"
               className="w-full p-6 mt-10 dark:black
               // className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
               // px-4 py-3 mt-6"
             >
               Sign Up
             </Button>
             <hr className="my-6 border-gray-300 w-full" />
             {/* <OAuth /> */}
             <p className="mt-1 text-gray-400">
            Already have a account?{" "}
            <Link to="/login">
              <a className="text-blue-500 hover:text-blue-700 font-semibold">
                Login
              </a>
            </Link>
          </p>
          </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom left" />
    </div>
    
  );
};

export default Signup;
