"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import { useCentralStore } from "@/Store";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useCentralStore();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-60 flex-shrink-0 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto pt-40 px-10">
          {children}
          <Footer />
        </main>

        {/* Mobile sidebar backdrop */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
              className="fixed top-0 left-0 h-full w-60 bg-white z-50 md:hidden overflow-y-auto"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppLayout;