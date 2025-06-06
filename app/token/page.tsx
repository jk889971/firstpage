"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, BarChart3, Zap, Settings, Download, Upload } from "lucide-react"
import TradeFormBottomSheet from "./TradeFormBottomSheet";
import TokenDetailsCard from "./TokenDetailsCard";
import ClaimCard from "./ClaimCard";
import TradesTable from "./TradesTable";
import DiscussionPanel from "./DiscussionPanel"
import TradingPanel from "./TradingPanel";

export default function MoonexpressTradingInterface() {
  const [selectedPercentage, setSelectedPercentage] = useState<string>("")
  const [activeTab, setActiveTab] = useState("comments")
  const [tradingTab, setTradingTab] = useState("buy")
  const [amount, setAmount] = useState("")
  const [inputFocused, setInputFocused] = useState(false)
  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [mountedSheet, setMountedSheet] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [bottomSheetTab, setBottomSheetTab] = useState<"buy" | "sell">("buy");
  const [mobileTab, setMobileTab] = useState<"details" | "discussion" | "trades">("details");

  // 1) Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("moon-comments");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch { }
    }
  }, []);

  // 2) Save to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem("moon-comments", JSON.stringify(comments));
  }, [comments]);

  // 3) Autosize logic for the main “Post Comment” textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const maxHeight = parseFloat(getComputedStyle(ta).lineHeight) * 3;
    const newHeight = Math.min(ta.scrollHeight, maxHeight);
    ta.style.height = newHeight + "px";
    ta.style.overflowY = ta.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [commentText]);

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10">
      <div className="grid gap-6 lg:gap-x-6 lg:gap-y-0 p-6 lg:[grid-template-columns:1fr_clamp(18rem,22vw,26rem)] items-start">
        {/* Main Content */}
        <div className="lg:grid lg:[grid-template-rows:auto_1fr] flex flex-col gap-6">
          <div className="order-1 lg:order-none lg:row-start-1 lg:col-start-1 flex flex-col gap-6">
            {/* ─────── TOKEN INFO + CHART ─────── */}
            <Card className="bg-[#132043] border-[#21325e] rounded-xl">
              {/* ─── TOKEN HEADER ─── */}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#fac031] text-[#0b152f]">FB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">Flappy Bird ($FBD)</h1>
                  </div>
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-[#c8cdd1] text-sm">Symbol</div>
                      <div className="text-white font-semibold">$FBD</div>
                    </div>
                    <div>
                      <div className="text-[#c8cdd1] text-sm">Market cap</div>
                      <div className="text-white font-semibold">4100.84</div>
                    </div>
                    <div>
                      <div className="text-[#c8cdd1] text-sm">Replies</div>
                      <div className="text-white font-semibold">07</div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* ─── TOKEN DESCRIPTION + CHART ─── */}
              <CardContent className="space-y-6">
                <p className="text-[#c8cdd1] text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the
                  1500s, when an unknown printer took a galley of type and scrambled it to
                  make a type specimen book. It has survived not only five centuries.
                </p>

                {/* CHART HEADER  –– removed border-t to kill the grey line */}
                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">1m</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#c8cdd1] text-sm">Price/MCap</span>
                      <span className="text-[#c8cdd1] text-sm">USD/SOL</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-[#c8cdd1]">
                      Save
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#c8cdd1]">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#c8cdd1]">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#c8cdd1]">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* CHART BODY –– taller (h-[26rem]) + even padding bottom-4 */}
                <div className="h-[32rem] bg-[#0e1a38] rounded-lg p-4 relative overflow-hidden">
                  {/* Icons top-left */}
                  <div className="absolute left-4 top-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#c8cdd1]" />
                      <TrendingUp className="w-4 h-4 text-[#c8cdd1]" />
                      <Zap className="w-4 h-4 text-[#c8cdd1]" />
                    </div>
                  </div>

                  {/* Price scale top-right */}
                  <div className="absolute right-4 top-4 text-right space-y-1">
                    <div className="text-[#c8cdd1] text-xs">50.65</div>
                    <div className="text-[#c8cdd1] text-xs">50.60</div>
                    <div className="text-[#c8cdd1] text-xs">50.55</div>
                    <div className="text-[#c8cdd1] text-xs">50.50</div>
                  </div>

                  {/* Placeholder bars – bottom offset changed to 4 to match padding */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-64 h-32 relative">
                      <div className="absolute bottom-0 left-8  w-2 h-16 bg-gradient-to-t from-[#19c0f4] to-[#a130e0]" />
                      <div className="absolute bottom-0 left-12 w-2 h-24 bg-gradient-to-t from-[#19c0f4] to-[#a130e0]" />
                      <div className="absolute bottom-0 left-16 w-2 h-12 bg-gradient-to-t from-[#ff6b6b] to-[#fac031]" />
                      <div className="absolute bottom-0 left-20 w-2 h-8  bg-gradient-to-t from-[#ff6b6b] to-[#fac031]" />
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="absolute bottom-4 left-4 text-[#c8cdd1] text-xs">
                    17:34:08&nbsp;UTC
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── Desktop: Discussion vs. Trades tab ─── */}
          <Card className="hidden lg:block bg-[#132043] border-[#21325e] rounded-xl order-5 lg:row-start-2 lg:col-start-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex gap-6">
                  <button
                    className={`font-medium pb-2 transition-colors ${
                      activeTab === "comments"
                        ? "text-[#19c0f4] border-b-2 border-[#19c0f4]"
                        : "text-[#c8cdd1] hover:text-white"
                    }`}
                    onClick={() => setActiveTab("comments")}
                  >
                    Discussion
                  </button>
                  <button
                    className={`font-medium pb-2 transition-colors ${
                      activeTab === "trades"
                        ? "text-[#19c0f4] border-b-2 border-[#19c0f4]"
                        : "text-[#c8cdd1] hover:text-white"
                    }`}
                    onClick={() => setActiveTab("trades")}
                  >
                    Trades
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col">
              {activeTab === "comments" ? (
                <DiscussionPanel
                  commentText={commentText}
                  setCommentText={setCommentText}
                  comments={comments}
                  setComments={setComments}
                  replyToId={replyToId}
                  setReplyToId={setReplyToId}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  textareaRef={textareaRef}
                />
              ) : (
                <TradesTable />
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="order-2 lg:order-none lg:row-start-1 lg:row-span-2 lg:col-start-2 flex flex-col gap-6">
          {/* Trading Panel */}
          <div className="hidden lg:block">
            <TradingPanel initialTab={tradingTab} />
          </div>

          {/** ─── MOBILE-ONLY TABS CARD (<1024px) ─── **/}
          <Card className="bg-[#132043] border-[#21325e] rounded-xl lg:hidden">
            <CardHeader className="pb-0">
              <div className="flex gap-6 justify-center">
                {(["details", "discussion", "trades"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setMobileTab(t)}
                    className={`font-medium pb-2 transition-colors ${
                      mobileTab === t
                        ? "text-[#19c0f4] border-b-2 border-[#19c0f4]"
                        : "text-[#c8cdd1] hover:text-white"
                    }`}
                  >
                    {t === "details" ? "Details" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-6">
              {mobileTab === "details" && (
                <>
                  <ClaimCard />
                  <TokenDetailsCard />
                </>
              )}

              {mobileTab === "discussion" && (
                <DiscussionPanel
                  commentText={commentText}
                  setCommentText={setCommentText}
                  comments={comments}
                  setComments={setComments}
                  replyToId={replyToId}
                  setReplyToId={setReplyToId}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  textareaRef={textareaRef}
                />
              )}

              {mobileTab === "trades" && <TradesTable />}
            </CardContent>
          </Card>

        {/* Right Sidebar */}
          <div className="hidden lg:flex flex-col gap-6">
            <TokenDetailsCard />
            <ClaimCard />
          </div>
        </div>
      </div>
      {/* ─── Mobile Buy/Sell bar (only on <1024px) ─── */}
      <div
       className="
         fixed 
         left-0 right-0 
         z-50 
         flex 
         h-13 
         items-end 
         justify-center 
         bg-gradient-to-t 
           from-[#1B1D27] 
           via-[#1B1D27]/70 
           to-[#1B1D27]/0 
         backdrop-blur-md
         bg-opacity-50
         px-4 
         pb-1 
         lg:hidden
       "
       style={{ bottom: "64px" }}
     >
       {/* BUY pill */}
       <button
         className="
           mx-1
           flex
           h-10
           flex-1
           items-center
           justify-center
           rounded-full
           bg-green-500
           text-black
           font-medium
           text-base
           transition-all duration-200
           hover:brightness-90
           active:brightness-75
         "
         onClick={() => {
           setBottomSheetTab("buy");
           setMountedSheet(true);
           setTimeout(() => setIsSheetOpen(true), 10);
         }}
       >
         Buy
       </button>

       {/* SELL pill */}
       <button
         className="
           mx-1
           flex
           h-10
           flex-1
           items-center
           justify-center
           rounded-full
           bg-red-700
           text-white
           font-medium
           text-base
           transition-all duration-200
           hover:brightness-90
           active:brightness-75
         "
         onClick={() => {
           setBottomSheetTab("sell");
           setMountedSheet(true);
           setTimeout(() => setIsSheetOpen(true), 10);
         }}
       >
         Sell
       </button>
     </div>

     {/* ─── Conditionally render the bottom-sheet when showTradeSheet === true ─── */}
     {mountedSheet && (
       <TradeFormBottomSheet
        initialTab={bottomSheetTab}
        isOpen={isSheetOpen}
        onClose={() => {
        setIsSheetOpen(false);
        setTimeout(() => setMountedSheet(false), 300);
        }}
       />
     )}
    </div>
  )
}
