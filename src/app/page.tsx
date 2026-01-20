"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuPrincipal from "./menu/MenuPrincipal";
import SplashScreen from "./splash/SplashScreen";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-slate-900"
      >
        Oi Julio
      </motion.h1>
      <MenuPrincipal />
    </main>
  );
}
