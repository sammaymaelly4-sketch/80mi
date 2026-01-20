"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import WelcomeSplash from "@/components/welcome/WelcomeSplash";
import { markWelcomeSeen, shouldShowWelcomeSplash } from "@/lib/welcomeGate";

export default function WelcomeLayoutClient({ children }) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const shouldShow = shouldShowWelcomeSplash();
    setShowSplash(shouldShow);

    if (shouldShow) {
      markWelcomeSeen();
    }
  }, []);

  const handleDone = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <AnimatePresence>{showSplash ? <WelcomeSplash onDone={handleDone} /> : null}</AnimatePresence>
      {children}
    </>
  );
}
