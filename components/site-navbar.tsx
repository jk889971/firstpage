"use client";

import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";

export default function SiteNavbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#132043] max-[500px]:justify-center max-[500px]:gap-4">
      {/* ─── LEFT SIDE ─── */}
      <div className="flex items-center gap-4">
        {/*
          Logo & text:
          - Hidden at <= 450px
          - Visible at 451px+
          */}
        <div className="flex items-center gap-2 max-[450px]:hidden">
          <div className="w-8 h-8 bg-gradient-to-r from-[#ffbb69] to-[#fac031] rounded-full flex items-center justify-center">
            <span className="text-[#000025] font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold text-white">moonexpress.fun</span>
        </div>

        {/*
          (Optional) Nav links, still hidden below 768px:
          Change or remove if you don’t want them at all.
        */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-white/80 hover:text-white">
            How it works?
          </a>
          <a href="#" className="text-white/80 hover:text-white">
            Support
          </a>
          <a href="/token" className="text-white/80 hover:text-white">
            Token page
          </a>
        </nav>
      </div>

      {/* ─── RIGHT SIDE ─── */}
      <div className="flex items-center gap-4">
        {/*
          Icon buttons:
          - Visible above 500px (i.e. hide at <= 500px)
          - Use `max-[500px]:hidden` to hide when width ≤ 500px
        */}
        <div className="flex space-x-0 max-[500px]:hidden">
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <Send className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Connect Wallet stays visible at all sizes */}
        <Button
          className="
            w-[144px] h-[40px] rounded-[12px] shadow-[inset_0px_2px_2px_0px_#FFFFFF66]
            font-bold text-[14px] text-white
            hover:brightness-110 hover:animate-gradient transition-all duration-300
          "
          style={{
            backgroundImage:
              "linear-gradient(96.13deg, #A130E0 -15.21%, #19C0F4 98.39%)",
            backgroundSize: "200% 200%",
          }}
        >
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}