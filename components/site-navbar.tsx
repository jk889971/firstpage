"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SiteNavbar() {
  const pathname = usePathname();

  return (
    <>
      {/* ─────────── TOP NAVBAR ─────────── */}
      <header
        className="
          z-20 
          flex items-center justify-between px-6 py-4 
          bg-[#132043]
          max-[250px]:flex-col        /* stack vertically at ≤250px */
          max-[250px]:items-center     /* center‐align children at ≤250px */
        "
      >
        {/* ─── LEFT SIDE (Logo) ─── */}
        <Link href="/" className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* full‐logo.png is shown when width > 400px */}
            <img
              src="/fulllogo.png"
              alt="Moonexpress"
              className="h-8 max-[400px]:hidden"
            />

            {/* logo.png is shown when width ≤ 400px */}
            <img
              src="/logo.png"
              alt="M"
              className="hidden max-[400px]:block h-8"
            />
          </div>
        </Link>

        {/* ─── CENTER LINKS (only ≥ 900px) ─── */}
        <nav className="hidden min-[900px]:flex flex-1 justify-center space-x-8">
          <a
            href="/"
            className={`
              text-white hover:text-[#19c0f4] 
              ${pathname === "/" ? "text-[#19c0f4]" : ""}
            `}
          >
            Home
          </a>
          <a
            href="/create"
            className={`
              text-white hover:text-[#19c0f4] 
              ${pathname === "/create" ? "text-[#19c0f4]" : ""}
            `}
          >
            Create Token
          </a>
          <a href="#" className="text-white hover:text-[#19c0f4]">
            Docs
          </a>
        </nav>

        {/* ─── RIGHT SIDE (Icons + Connect Wallet) ─── */}
        {/* At ≤ 250 px, flex-col means this entire div sits below the logo */}
        <div
          className="
            flex items-center gap-4 
            max-[250px]:mt-2           /* small gap above at ≤250px */
          "
        >
          {/* Icon buttons hidden at ≤ 500px */}
          <div className="flex space-x-0 max-[500px]:hidden">
            <Button variant="ghost" size="icon" className="text-[#19c0f4]">
              <Send className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#19c0f4] transition-colors duration-300"
            >
              {/* Custom “X”-style SVG from your cards */}
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

      {/* ─────────── BOTTOM MOBILE MENU (only < 900px) ─────────── */}
      <div
        className="
          fixed bottom-0 left-0 right-0 z-[996]
          flex h-16 items-center justify-around
          border-t border-t-[rgba(248,250,252,0.1)]
          bg-[#132043]
          hidden max-[899px]:flex
        "
      >
        {/* Home link */}
        <a
          href="/"
          className={`
            flex flex-col items-center justify-center p-2
            transition-colors duration-200
            ${
              pathname === "/"
                ? "text-[#19c0f4]"
                : "text-white hover:text-[#19c0f4]"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="h-[30px] w-[30px]"
          >
            <path
              d="M13.8153 2.55582C12.7771 1.64342 11.2229 1.64342 10.1847 2.55582L3.93468 8.04824C3.34056 8.57035 3 9.323 3 10.1139V18.459C3 19.9778 4.23122 21.209 5.75 21.209H8.16057C9.12707 21.209 9.91057 20.4255 9.91057 19.459V17.209C9.91057 16.1044 10.806 15.209 11.9106 15.209H12C13.1046 15.209 14 16.1044 14 17.209V19.459C14 20.4255 14.7835 21.209 15.75 21.209H18.25C19.7688 21.209 21 19.9778 21 18.459V10.1139C21 9.323 20.6594 8.57035 20.0653 8.04824L13.8153 2.55582Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[0.65rem]">Home</span>
        </a>

        {/* Create Token link (rocket instead of plus) */}
        <a
          href="/create"
          data-testid="create-coin-button-mobile-menu"
          className={`
            flex flex-col items-center justify-center p-2
            transition-colors duration-200
            ${
              pathname === "/create"
                ? "text-[#19c0f4]"
                : "text-white hover:text-[#19c0f4]"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="h-[30px] w-[30px]"
          >
            {/* Your rocket path */}
            <path
              d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[0.65rem]">Create</span>
        </a>

        {/* Docs link */}
        <a
          href="#"
          className="
            flex flex-col items-center justify-center p-2
            transition-colors duration-200
            text-white hover:text-[#19c0f4]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="h-[30px] w-[30px]"
          >
            <path
              d="M4 2h12l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2v4h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[0.65rem]">Docs</span>
        </a>
      </div>
    </>
  );
}