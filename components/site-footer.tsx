"use client";

import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="relative flex items-center px-6 py-4 border-t border-[#21325e]/30 bg-[#132043]">
      {/* ─── Left‐aligned icons with zero gap ─── */}
      <div className="flex space-x-0">
        <Button variant="ghost" size="icon" className="text-[#19c0f4]">
          <Send className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-[#19c0f4]">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* ─── Absolutely center this text within the footer ─── */}
      <span className="absolute left-1/2 transform -translate-x-1/2 text-sm text-white/60">
        All rights reserved © moonexpress.fun
      </span>
    </footer>
  );
}