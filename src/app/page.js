"use client";

import { baseUrl } from "@/utils/baseUrl";
import image1 from "../../public/img1.png";
import image2 from "../../public/img2.png";
import image3 from "../../public/img3.png";
import image4 from "../../public/img4.png";
import roketAnimation from "@/../public/rocket launch.json";
import main_logo from "../../public/main_logo_svg.svg";
import Lottie from "lottie-react";

import Hero from "../../public/laptop.svg";

import fbIcon from "../../public/facebook.svg";
import twitterIcon from "../../public/twitter.svg";
import ytIcon from "../../public/youtube.svg";
import { HowWorks } from "@/components/HowWorks";
import PopularService from "@/components/PopularService";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let savedTarget = localStorage.getItem("targetDate");
    let targetDate;

    if (savedTarget) {
      targetDate = new Date(savedTarget);
    } else {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 90);
      localStorage.setItem("targetDate", targetDate.toISOString());
    }

    const updateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      email,
      phone,
      role,
    };
    console.log("send toDB----->", data);

    try {
      const response = await fetch(`${baseUrl()}/subscriber/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Subscription successful!", {
          style: {
            background: "#dcfce7",
            color: "#166534",
            border: "1px solid #bbf7d0",
          },
        });
        setName("");
        setEmail("");
        setPhone("");
        setRole("");
      } else {
        toast.error(responseData.message || "Failed to submit. Please try again.", {
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please check your connection and try again.", {
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#F9FAFB] scroll-smooth">
      {/* navbar */}
      <nav className="shadow-2xl py-4">
        <div className="max-w-[1340px] px-4 md:px-10 mx-auto">
          <Image alt="main_logo" src={main_logo} className="h-12 w-40" />
        </div>
      </nav>
      {/* navbar */}

      <section className="relative mb-16 md:mb-24">
        <div
          className="bg-cover h-[600px] md:h-[800px] flex items-center"
          style={{
            backgroundImage: "url('/close-up-delivery-person-with-parcel.jpg')",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>

          <div className="relative z-10 max-w-[1340px] mx-auto w-full px-4 md:px-10">
            <div className="flex justify-center items-center gap-8 md:gap-12 py-12 md:py-20">
              <div className=" text-white text-center md:text-left max-w-3xl">
                <h6 className="text-lg sm:text-xl text-center md:text-2xl text-green-700 font-semibold">
                  Welcome to TaskAlley
                </h6>

                <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center">
                  Your trusted Alley for smarter tasking in Nigeria
                </h1>

                <p className="mt-4 text-sm sm:text-base text-white  leading-relaxed text-center ">
                  TaskAlley is more than a marketplace — post, find, and manage
                  tasks with verified providers. Fast, secure and reliable.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center items-center sm:items-start gap-12">
                  <button
                    onClick={() => scrollToSection("subscribe")}
                    className="inline-block bg-[#115f59] hover:bg-[#0e7c73] text-white px-6 py-3 rounded-md font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Tasker
                  </button>
                  <button
                    onClick={() => scrollToSection("subscribe")}
                    className="inline-block border border-white/40 hover:bg-white/10 text-white px-6 py-2.5 rounded-md font-medium transition-all duration-300 hover:scale-105 active:scale-95 "
                  >
                    Freelancer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TaskAlley Section */}
      <div className="max-w-[1340px] mx-auto px-4 md:px-10">
        <div className="text-center flex flex-col gap-4 mb-12 md:mb-20">
          <h4 className="font-bold text-3xl lg:text-4xl">
            Why Choose TaskAlley?
          </h4>
          <p className="text-[#6B7280] max-w-3xl mx-auto">
            Experience excellence in digital craftsmanship with our team of
            skilled professionals dedicated to delivering exceptional results.
          </p>
        </div>
        {/* features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-white transition-all duration-300 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <Image src={image1} alt="Save Time Icon" className="w-16" />
              <p className="text-xl font-medium">Save Time</p>
            </div>
            <div>
              <p className="text-[#6B7280]">
                No more endless searching or waiting. Task Alley connects you
                with skilled service providers instantly. Post a task in
                minutes, get quick responses, and hire the right person without
                delays. From home repairs to business support, save valuable
                time by letting the right people come to you.
              </p>
            </div>
          </div>
          {/* first */}
          <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-white transition-all duration-300 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <Image src={image2} className="w-16 " alt="image2" />
              <p className="text-xl font-medium">Smarter Collaboration</p>
            </div>
            <div>
              <p className="text-[#6B7280]">
                Stay on the same page with real-time updates and built-in
                messaging. Task Alley ensures transparency from start to finish
                — discuss details, track progress, and manage tasks all in one
                place. Collaboration becomes effortless, even across different
                locations or busy schedules.
              </p>
            </div>
          </div>
          {/* first */}
          <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-white transition-all duration-300 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <Image src={image3} className="w-16 " alt="image3" />
              <p className="text-xl font-medium">Secure & Reliable</p>
            </div>
            <div>
              <p className="text-[#6B7280]">
                Your safety and trust are our top priorities. Every task
                provider goes through verification checks, and all payments are
                held securely until the job is completed to your satisfaction.
                With Task Alley’s fraud detection signals and dispute resolution
                center, you’re always protected.
              </p>
            </div>
          </div>
          {/* first */}
          <div className="flex flex-col gap-4 p-6 md:p-8 hover:bg-white transition-all duration-300 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <Image alt="image4" src={image4} className="w-16 " />
              <p className="text-xl font-medium">Insightful Tracking</p>
            </div>
            <div>
              <p className="text-[#6B7280]">
                Track the status of your tasks from start to finish with ease.
                Task Alley gives you clear visibility — from bids and approvals
                to completion and payments. With smart notifications and a
                transparent process, you always know where your project stands.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* lottie section */}
      <section className=" pb-5">
        <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center gap-10 flex-col md:flex-row">
          {/* left side */}
          <div className="flex flex-col gap-6 pl-2">
            <h3 className="text-2xl font-medium md:leading-normal text-[#6B7280]">
              We’re Almost There!
            </h3>
            <p className="text-3xl font-bold ">
              TaskAlley is launching soon. Be the first to experience the future
              of smarter workflows.
            </p>
            <p className="md:leading-normal text-[#6B7280]">
              Join thousands of innovators already on the waitlist. Early
              signups get exclusive access + 20% off.
            </p>
            <div className="flex gap-2 text-center">
              {/* Days */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#E6F4F1] w-20">
                <span className="text-2xl md:text-4xl font-bold text-[#115E59]">
                  {timeLeft.days}
                </span>
                <span className="text-base text-[#115E59] font-medium">
                  days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#E6F4F1] w-20">
                <span className="text-2xl md:text-4xl font-bold text-[#115E59]">
                  {timeLeft.hours}
                </span>
                <span className="text-base text-[#115E59] font-medium">
                  hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#E6F4F1] w-20">
                <span className="text-2xl md:text-4xl font-bold text-[#115E59]">
                  {timeLeft.minutes}
                </span>
                <span className="text-base text-[#115E59] font-medium">
                  min
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#E6F4F1] w-20">
                <span className="text-2xl md:text-4xl font-bold text-[#115E59]">
                  {timeLeft.seconds}
                </span>
                <span className="text-base text-[#115E59] font-medium">
                  sec
                </span>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="relative">
            <Lottie animationData={roketAnimation} />
          </div>
        </div>
      </section>
      {/* lottie section */}

      {/* popular Category */}
      <PopularService />

      <HowWorks />

      {/* CTA Section */}
      <section id="subscribe" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-between rounded-lg overflow-hidden shadow-lg">
          {/* Left Side */}
          <div className="relative flex-1 bg-teal-700 text-white p-8 sm:p-10 lg:p-12 flex items-center justify-center">
            {/* Background Shapes */}
            <div className="absolute hidden md:block -top-20 -left-28 w-80 sm:w-96 h-80 sm:h-96 bg-teal-800 rounded-full opacity-30"></div>
            <div className="absolute hidden md:block -bottom-20 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-teal-500 rounded-full opacity-40"></div>

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                Start Posting Tasks for Free
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-100">
                Subscribe today and unlock smarter ways to get work done.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6 text-center md:text-left">
              Join WaitingList
            </h3>

            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              {/* Name Input */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Email Input */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Role Dropdown */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <select
                  className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Provider">Tasker</option>
                  <option value="Customer">Freelancer</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#115e59] hover:bg-teal-800 text-white px-8 py-3 rounded-md font-medium cursor-pointer transition w-full sm:w-auto mx-auto sm:mx-0 shadow-md flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>

            {/* Small Note */}
            <p className="text-gray-500 text-sm mt-4 text-center md:text-left">
              * We’ll never share your email or phone number.
            </p>
          </div>
        </div>
      </section>

      {/* navbarrrrrrrrrr */}

      <section className="bg-black py-4 mt-20">
        <div className="project_container px-6 flex flex-wrap items-center  justify-between">
          <div>
            {/* link main logo to homepage */}
            <Link href="/">
              <Image src={main_logo} alt="TaskAlley logo" className="h-16 w-40" />
            </Link>
          </div>
          <div className="text-white">Copyright 2025 TaskAlley.com</div>
          <div className="flex gap-4 items-center">
            {/* social icons - each icon links to its proper external URL */}
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src={fbIcon} alt="Facebook" className="h-6 w-6" />
            </Link>

            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src={twitterIcon} alt="Twitter" className="h-5 w-5" />
            </Link>

            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <Image src={ytIcon} alt="YouTube" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
