import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Laptop from "./Assets/laptop.jpg";
import { useHistory } from "react-router-dom";
import Typed from "react-typed";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import Navbar from "./Navbar";

const Landing = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

 
  const history = useHistory();

  return (
    <div className="bg-[#000300]">
      <Navbar></Navbar>
      <div className=" text-white">
        <div className="max-w-[900px] mt-[-20px] w-full h-screen text-center mx-auto flex flex-col justify-center ">
          <p className="text-[#00df9a] font-bold p-2 uppercase">
            {" "}
            Growing As a developer{" "}
          </p>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
            Grow with SQLi
          </h1>
          <div className="flex justify-center items-center">
            <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
              Fast , Flexible tracking for{" "}
            </p>

            <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold  pl-2"
              strings={["Collabs", "Managers", "HR"]}
              typeSpeed={150}
              backSpeed={200}
              loop
            />
          </div>
          <p className="md:text-2xl text-xl font-bold text-gray-500 mt-2 md:pl-4">
            Monitor your progress to increase your chances to get promoted
          </p>
          <button
            onClick={() => {
              history.push("/login", { replace: true });
            }}
            className="bg-[#00df9a] hover:bg-[#00865c]  w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* end hero section */}

      <div className="w-full bg-white py-16 px-4" id="analytics">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <img
            src={Laptop}
            alt="laptop pic"
            className="w-[500px] mx-auto my-4"
          />
          <div className=" flex flex-col justify-center">
            <p className="text-[#00df9a] font-bold text-center">
              COLLABS DATA ANALYTICS DASHBOARD
            </p>
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center pb-6">
              {" "}
              Manage your career and progression
            </h1>
            <p className="text-center">
              TLRH is a way to manage collabs careers , Standardize best
              practices within its agencies, to strengthen the quality of teams
              at individual and collective level. Make Human Resources
              management a criterion of differentiation in order to attract the
              best candidates and retain employees.
            </p>
            <button onClick={() => {
              history.push("/login", { replace: true });
            }} className="text-[#00df9a] hover:bg-[#191919]  w-[200px] rounded-md font-medium my-6 mx-auto  py-3 bg-black ">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* analytics */}

      <div
        className="max-w-[1240px] mx-auto py-7 px-4 grid lg:grid-cols-3 md:grid-cols-3 gap-6 text-gray-300 "
        id="contact"
      >
        <div className="lg:col-span-2 md:col-span-2 w-full">
          <h1 className="text-xl font-bold text-[#00df9a]">TLRH.</h1>
          <p className="py-4">
            SQLI is a company that favors networking and promotes the
            mobilization of its employees on cross-functional projects.This
            project has just concretized this conception of management, which
            allows the company on the one hand to involve its employees in the
            management of Human Resources with a centralized and purely
            administrative approach.
          </p>
          <div className="flex justify-around md:w-[75%] md:mx-auto my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
          </div>
        </div>
        <div className="lg:col-span-1 flex justify-around mt-6">
          <div>
            <h6 className="font-medium text-[#00df9a]">Company</h6>
            <ul>
              <li className="py-2 text-sm">About</li>
              <li className="py-2 text-sm">Jobs</li>
              <li className="py-2 text-sm">Careers</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-[#00df9a]">Legal</h6>
            <ul>
              <li className="py-2 text-sm">Claim</li>
              <li className="py-2 text-sm">Policy</li>
              <li className="py-2 text-sm">Terms</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3 md:col-span-3 text-center font-bold w-full">
          &copy; 2022 Copyright TLRH.
        </div>
      </div>
      {/* end of foooter */}
    </div>
  );
};

export default Landing;
