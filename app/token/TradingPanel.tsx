import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TradingPanelProps {
  initialTab?: "buy" | "sell";
  centerHeader?: boolean;
}

export default function TradingPanel({ initialTab = "buy", centerHeader = false, }: TradingPanelProps) {
  // Use the prop as the initial state
  const [tradingTab, setTradingTab] = useState<"buy" | "sell">(initialTab);
  const [amount, setAmount] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState<string>("");

  // If someone re‐renders TradingPanel with a different initialTab,
  // make sure we switch the tab accordingly. (Optional, but often helpful.)
  useEffect(() => {
    setTradingTab(initialTab);
  }, [initialTab]);

  return (
    <Card className="bg-[#132043] border-[#21325e] rounded-xl w-full">
      {/* ─── TAB HEADER ─── */}
      <CardHeader className="pb-4">
        <div className={`flex items-center ${centerHeader ? "justify-center" : "justify-between"}`}>
          <div className="flex gap-6">
            <button
              className={`font-medium pb-1 transition-colors ${
                tradingTab === "buy"
                  ? "text-[#19c0f4] border-b-2 border-[#19c0f4]"
                  : "text-[#c8cdd1] hover:text-white"
              }`}
              onClick={() => setTradingTab("buy")}
            >
              Buy
            </button>
            <button
              className={`font-medium pb-1 transition-colors ${
                tradingTab === "sell"
                  ? "text-[#19c0f4] border-b-2 border-[#19c0f4]"
                  : "text-[#c8cdd1] hover:text-white"
              }`}
              onClick={() => setTradingTab("sell")}
            >
              Sell
            </button>
          </div>
        </div>
      </CardHeader>

      {/* ─── PANEL CONTENT ─── */}
      <CardContent className="space-y-6">
        {/* Amount Input */}
        <div className="text-center">
          <Input
            type="number"
            min={0}
            placeholder={inputFocused ? "" : "0"}
            value={amount}
            onKeyDown={(e) => {
              if (e.key === "-") e.preventDefault();
            }}
            onChange={(e) => {
              const v = e.target.value;
              if (v.startsWith("-")) return;
              setAmount(v);
            }}
            onFocus={(e) => {
              setInputFocused(true);
              if (e.target.value === "" || e.target.value === "0") {
                setAmount("");
              }
            }}
            onBlur={(e) => {
              setInputFocused(false);
              if (e.target.value === "") {
                setAmount("");
              }
            }}
            className="
              !h-12
              !text-2xl
              sm:!text-3xl
              w-full
              text-center
              font-bold
              text-white
              bg-transparent
              border-0
              p-0
              focus-visible:ring-0
              focus-visible:ring-offset-0
              placeholder:text-white/50
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            "
          />
          <div className="text-[#c8cdd1] text-sm mt-1">
            - $0.243
          </div>
        </div>

        {/* Token + Balance Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#19c0f4] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            <span className="text-white font-medium">TON</span>
            <button className="flex items-center justify-center ml-1 hover:opacity-80 transition-colors duration-200 group">
              <div className="flex items-center gap-0.5 group">
                <svg
                  width="12"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    text-white
                    group-hover:text-[#19c0f4]
                    transition-colors duration-200
                    group-hover:-translate-y-1
                    transition-transform duration-200 ease-in-out
                  "
                >
                  <path
                    d="M12 24V2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 9L12 2L19 9"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="12"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    text-white
                    group-hover:text-[#19c0f4]
                    transition-colors duration-200
                    group-hover:translate-y-1
                    transition-transform duration-200 ease-in-out
                  "
                >
                  <path
                    d="M12 0V22"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 15L12 22L19 15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div className="text-[#c8cdd1] text-sm">Balance 2597 TON</div>
        </div>

        {/* Percentage Presets + Custom % Input */}
        <div className="flex gap-1">
          {["25%", "50%", "75%", "100%"].map((percentage) => (
            <Button
              key={percentage}
              variant="outline"
              size="sm"
              className={`flex-1 h-8 text-xs px-1 ${
                selectedPercentage === percentage
                  ? "bg-[#19c0f4] text-white border-[#19c0f4] hover:bg-[#19c0f4] hover:border-[#19c0f4] hover:text-white"
                  : "bg-transparent border-[#21325e] text-[#c8cdd1] hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4]"
              }`}
              onClick={() => setSelectedPercentage(percentage)}
            >
              {percentage}
            </Button>
          ))}
          <input
            type="text"
            placeholder="0.00"
            className="
              w-[calc(20%-0.25rem)]
              h-8
              text-xs
              px-1
              bg-transparent
              border border-[#21325e]
              text-[#c8cdd1]
              rounded-md
              text-center
              focus:outline-none
              focus:ring-1
              focus:ring-[#19c0f4]
              focus:border-[#19c0f4]
              placeholder:text-[#c8cdd1]
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            "
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value;
              if (
                value &&
                (isNaN(Number(value)) ||
                  Number(value) < 0.01 ||
                  Number(value) > 100)
              ) {
                (e.target as HTMLInputElement).value = value.slice(0, -1);
              }
            }}
            onChange={() => setSelectedPercentage("")}
            onFocus={() => setSelectedPercentage("")}
          />
        </div>

        {/* Place Trade Button */}
        <Button
          className={`
            w-full
            text-white
            py-3
            font-medium
            rounded-[12px]
            transition-all duration-300
            ${tradingTab === "buy"
              ? "bg-green-500 hover:bg-green-700 hover:ring-4 hover:ring-green-500/20 active:brightness-90"
              : "bg-red-700 hover:bg-red-800 hover:ring-4 hover:ring-red-500/20 active:brightness-90"
            }
          `}
        >
          {tradingTab === "buy" ? "Buy Now" : "Sell Now"}
        </Button>
      </CardContent>
    </Card>
  );
}