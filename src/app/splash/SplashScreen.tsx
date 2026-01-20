"use client";

import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center"
      >
        <span className="text-3xl font-semibold tracking-wide text-white">
          JULIO SAÚDE
        </span>
      </motion.div>
    </div>
  );
}
