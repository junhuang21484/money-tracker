"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-6xl lg:text-5xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              MoneyMinder
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Expense Tracking Made Effortless.",
                1000,
                "Budget Better, Live Smarter.",
                1000,
                "Simplify Spending, Amplify Savings.",
                1000,
                "Track Every Penny, Reach Every Goal.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-10 lg:text-xl">
            We're on a mission to empower individuals and families to take
            control of their finances and achieve financial freedom. Whether
            you're saving for a dream vacation, planning for retirement, or
            simply aiming to build healthier spending habits, we're here to
            support you every step of the way.
          </p>
          <div>
            <Link
              href="/register"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-primary-900 rounded-full px-8 py-2">
                Get Started
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="w-[250px] h-[250px] lg:w-[420px] lg:h-[420px] relative">
            <Image
              src="/homepage/hero-image.png"
              alt="hero image"
              className="absolute inset-0 object-cover"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 640px) 50vw, 100vw"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
