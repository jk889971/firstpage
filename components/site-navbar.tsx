"use client";

import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";

export default function SiteNavbar() {
  return (
    <header className="z-20 flex items-center justify-between px-6 py-4 bg-[#132043] max-[240px]:flex-col max-[240px]:gap-2 max-[240px]:items-center">
      {/* ─── LEFT SIDE (Logo) ─── */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Circle always visible */}
          <div className="w-8 h-8 bg-gradient-to-r from-[#ffbb69] to-[#fac031] rounded-full flex items-center justify-center">
            <span className="text-[#000025] font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold text-white max-[400px]:hidden">
            moonexpress.fun
          </span>
        </div>

        {/* (Optional) Nav links, still hidden below 768px */}
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

      {/* ─── RIGHT SIDE (Icons + Connect Wallet) ─── */}
      <div className="flex items-center gap-4">
        {/* Icon buttons hidden at ≤500px */}
        <div className="flex space-x-0 max-[500px]:hidden">
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <Send className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Connect Wallet (always visible) */}
        <Button
          className="
            text-white
            w-[144px] h-[40px] rounded-[12px] shadow-[inset_0px_2px_2px_0px_#FFFFFF66]
            font-bold text-[14px]
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