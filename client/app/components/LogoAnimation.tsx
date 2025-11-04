"use client";
import { motion } from "framer-motion";
import { IoAirplane } from "react-icons/io5";

export default function LogoAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-white"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="bg-white/20 w-24 h-24 flex items-center justify-center rounded-full shadow-lg mb-4">
        <IoAirplane size={40} color="white" />
      </div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-3xl font-bold"
      >
        Book My Trip
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg text-gray-100 mt-2"
      >
        Make travel easy
      </motion.p>
    </motion.div>
  );
}
