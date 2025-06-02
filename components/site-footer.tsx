"use client";

import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="z-20 bg-[#132043] border-t border-[#21325e]/30 px-6 py-4">
      {/** ─── layout for md and up (≥768px) ─── **/}
      <div className="hidden md:flex items-center relative">
        {/* Icons on the left, zero gap */}
        <div className="flex space-x-0">
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <Send className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Text absolutely centered in the footer */}
        <span className="absolute left-1/2 transform -translate-x-1/2 text-sm text-white/60">
          All rights reserved © moonexpress.fun
        </span>
      </div>

      {/** ─── layout for small (<768px) ─── **/}
      <div className="flex flex-col items-center md:hidden">
        {/* Centered text first */}
        <span className="text-sm text-white/60 text-center">
          All rights reserved © moonexpress.fun
        </span>

        {/* Icons below, centered */}
        <div className="mt-2 flex space-x-0">
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <Send className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </footer>
  );
}