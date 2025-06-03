"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

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
      </div>

      {/* ─── RIGHT SIDE (Icons + Connect Wallet) ─── */}
      <div className="flex items-center gap-4">
        {/* Icon buttons hidden at ≤500px */}
        <div className="flex space-x-0 max-[500px]:hidden">
          <Button variant="ghost" size="icon" className="text-[#19c0f4]">
            <Send className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#19c0f4] transition-colors duration-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
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