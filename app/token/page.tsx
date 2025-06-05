"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, TrendingUp, BarChart3, Zap, Settings, Download, Upload, ChevronDown, Globe } from "lucide-react"

type Comment = {
  id: string;
  text: string;
  createdAt: number;
  replies: Comment[];
};

interface CommentItemProps {
  comment: Comment;
  allComments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  replyToId: string | null;
  setReplyToId: (id: string | null) => void;
  replyText: string;
  setReplyText: (val: string) => void;
}

function countAllItems(list: Comment[]): number {
  let count = 0
  list.forEach((c) => {
    count += 1
    if (c.replies.length > 0) {
      count += countAllItems(c.replies)
    }
  })
  return count
}

function CommentItem({
  comment,
  allComments,
  setComments,
  replyToId,
  setReplyToId,
  replyText,
  setReplyText,
}: CommentItemProps) {
  // Recursively insert a new reply under the comment with ID = targetId
  function appendToNestedReplies(
    root: Comment,
    targetId: string,
    newReply: Comment
  ): Comment {
    if (root.id === targetId) {
      return { ...root, replies: [...root.replies, newReply] };
    }
    if (root.replies.length === 0) return root;
    return {
      ...root,
      replies: root.replies.map((child) =>
        appendToNestedReplies(child, targetId, newReply)
      ),
    };
  }

  function handlePostReply() {
    if (replyText.trim() === "") return;
    const newReply: Comment = {
      id: Date.now().toString(),
      text: replyText.trim(),
      createdAt: Date.now(),
      replies: [],
    };
    // Update the entire comments tree
    const updated = allComments.map((c) =>
      appendToNestedReplies(c, comment.id, newReply)
    );
    setComments(updated);
    setReplyToId(null);
    setReplyText("");
  }

  return (
    <div className="space-y-2">
      {/* ─── Single comment row ─── */}
      <div className="flex gap-3 w-full">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-[#565656]">U</AvatarFallback>
        </Avatar>
        <div className="flex-1 pr-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-sm">Anonymous</span>
            <span className="text-[#c8cdd1] text-xs">
              {new Date(comment.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-[#c8cdd1] text-sm mt-1 break-all">{comment.text}</p>
          <button
            onClick={() => {
              setReplyToId(comment.id)
              setReplyText("")
            }}
            className="mt-1 text-[#19c0f4] text-xs hover:underline"
          >
            Reply
          </button>
        </div>
      </div>

      {/* ─── Nested “Reply” textarea, if active ─── */}
      {replyToId === comment.id && (
        <div className="ml-10 mt-2 pr-4 pt-1 pl-1 max-w-full overflow-x-hidden">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={1}
            maxLength={250}
            className="
              theme-textarea  
              w-full 
              max-w-full
              bg-[#0e1a38] 
              border border-[#21325e] 
              rounded-md 
              px-3 py-2 
              text-white 
              placeholder:text-[#c8cdd1] 
              focus:outline-none focus:ring-2 focus:ring-[#19c0f4]
              resize-none 
              text-sm 
              overflow-y-auto 
              scrollbar-thin scrollbar-thumb-[#19c0f4]/60 scrollbar-track-[#21325e]
              max-h-[4.5rem] 
              leading-6
            "
            placeholder="Write a reply…"
          />
          <span className="block text-left text-xs text-white/50">
            {replyText.length}/250
          </span>
          <div className="flex justify-end">
            <Button
     onClick={handlePostReply}
     size="sm"
     variant="outline"
     className="text-[#19c0f4] bg-transparent border-[#19c0f4] hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4] rounded-md px-3 py-1 text-xs"
   >
     Reply
   </Button>
          </div>
        </div>
      )}

      {/* ─── Recursively render any nested replies ─── */}
      {comment.replies.length > 0 && (
        <div className="ml-10 space-y-4 mt-4 w-full">
          {comment.replies.map((r) => (
            <div key={r.id} className="flex gap-3 w-full">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#565656]">U</AvatarFallback>
              </Avatar>
              <div className="flex-1 pr-16">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Anonymous</span>
                  <span className="text-[#c8cdd1] text-xs">
                    {new Date(r.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-[#c8cdd1] text-sm mt-1 break-all">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
  </div>
  );
}

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


  // 4) Handler to post a new top‐level comment
  function handlePostComment() {
    if (commentText.trim() === "") return;
    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText.trim(),
      createdAt: Date.now(),
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
    setReplyToId(null);
  }

  const totalItems = countAllItems(comments)

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

          {/* Comments Section */}
          <Card className="bg-[#132043] border-[#21325e] rounded-xl order-5 lg:row-start-2 lg:col-start-1">
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
                    Comments
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
                <>
                  {/* ─── INPUT + LIVE COUNTER ─── */}
                  <div className="relative pt-2 w-full">
                    <textarea
                      ref={textareaRef}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      maxLength={250}
                      rows={1}
                      className="
                        theme-textarea
                        w-full
                        bg-[#0e1a38]
                        border border-[#21325e]
                        rounded-md
                        px-3 py-2
                        text-white
                        placeholder:text-[#c8cdd1]
                        focus:outline-none focus:ring-2 focus:ring-[#19c0f4]
                        resize-none
                        text-sm
                        overflow-hidden
                        scrollbar-thin scrollbar-thumb-[#19c0f4]/60 scrollbar-track-[#21325e]
                        max-h-[4.5rem]
                        leading-6
                      "
                      placeholder="Enter Comment"
                    />
                  </div>
                  <span className="block text-left text-xs text-white/50 ml-1">
                      {commentText.length}/250
                  </span>

                  {/* ─── POST COMMENT BUTTON ─── */}
                  <div className="flex justify-end pb-4 w-full">
                    <Button
                      onClick={handlePostComment}
                      className={`bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4] font-normal rounded-md px-4 py-2 text-sm`}
                      size="sm"
                      variant="outline"
                    >
                      Comment
                    </Button>
                  </div>

                  {/* ─── SCROLLABLE COMMENTS LIST (only scroll once totalItems ≥ 4) ─── */}
                  <div
                    className={
                      totalItems >= 4
                        ? "theme-textarea overflow-y-auto overflow-x-hidden space-y-4 px-2 scrollbar-thin scrollbar-thumb-[#19c0f4]/60 scrollbar-track-[#21325e] max-h-[36rem]"
                        : "space-y-4 px-2 overflow-x-hidden"
                    }
                  >
                    {comments.length === 0 ? (
                      <p className="text-[#c8cdd1] text-sm text-center">
                        No comments yet.
                      </p>
                    ) : (
                      comments.map((c) => (
                        <CommentItem
                          key={c.id}
                          comment={c}
                          allComments={comments}
                          setComments={setComments}
                          replyToId={replyToId}
                          setReplyToId={setReplyToId}
                          replyText={replyText}
                          setReplyText={setReplyText}
                        />
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {/* Trades Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#21325e]">
                          <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Account</th>
                          <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Type</th>
                          <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">SOL</th>
                          <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">$FBD</th>
                          <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Date</th>
                          <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Transaction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#21325e]/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback className="bg-[#565656] text-xs">C</AvatarFallback>
                              </Avatar>
                              <span className="text-white text-sm">cosmos</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm font-medium">Buy</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">1.2</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">2,400</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#c8cdd1] text-sm">3:33:19 PM</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm cursor-pointer hover:underline">abc123...def</span>
                          </td>
                        </tr>
                        <tr className="border-b border-[#21325e]/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback className="bg-[#565656] text-xs">A</AvatarFallback>
                              </Avatar>
                              <span className="text-white text-sm">alice</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#ff6b6b] text-sm font-medium">Sell</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">0.8</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">1,600</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#c8cdd1] text-sm">3:31:45 PM</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm cursor-pointer hover:underline">xyz789...ghi</span>
                          </td>
                        </tr>
                        <tr className="border-b border-[#21325e]/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback className="bg-[#565656] text-xs">B</AvatarFallback>
                              </Avatar>
                              <span className="text-white text-sm">bob</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm font-medium">Buy</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">3.5</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">7,000</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#c8cdd1] text-sm">3:29:12 PM</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm cursor-pointer hover:underline">mno456...pqr</span>
                          </td>
                        </tr>
                        <tr className="border-b border-[#21325e]/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback className="bg-[#565656] text-xs">D</AvatarFallback>
                              </Avatar>
                              <span className="text-white text-sm">dev</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm font-medium">Buy</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">0.5</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white text-sm">1,000</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#c8cdd1] text-sm">3:27:33 PM</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#19c0f4] text-sm cursor-pointer hover:underline">stu901...vwx</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="order-2 lg:order-none lg:row-start-1 lg:row-span-2 lg:col-start-2 flex flex-col gap-6">
          {/* Trading Panel */}
          <Card className="bg-[#132043] border-[#21325e] rounded-xl order-2 lg:order-none">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
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
            <CardContent className="space-y-6">
              <div className="text-center">
                <Input
                  type="number"
                  min={0}
                  placeholder={inputFocused ? "" : "0"}
                  value={amount}
                  onKeyDown={(e) => {
                    if (e.key === "-") {
                      e.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    const v = e.target.value
                    // in case someone pastes “-5”:
                    if (v.startsWith("-")) return
                    setAmount(v)
                  }}
                  onFocus={(e) => {
                    setInputFocused(true)
                    if (e.target.value === "" || e.target.value === "0") {
                      setAmount("")
                    }
                  }}
                  onBlur={(e) => {
                    setInputFocused(false)
                    if (e.target.value === "") {
                      setAmount("")
                    }
                  }}
                  className="
                    !h-12
                    !text-2xl
                    sm:!text-3xl
                    w-full text-center font-bold text-white
                    bg-transparent border-0 p-0
                    focus-visible:ring-0 focus-visible:ring-offset-0
                    placeholder:text-white/50
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />
                <div className="text-[#c8cdd1] text-sm mt-1">- $0.243</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#19c0f4] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <span className="text-white font-medium">TON</span>
                  <button className="flex items-center justify-center ml-1 hover:opacity-80 transition-colors duration-200 group">
                    <div className="flex items-center gap-0.5 group">
                      {/* Up Arrow */}
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
                        {/* Arrow line */}
                        <path
                          d="M12 24V2"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Arrow head */}
                        <path
                          d="M5 9L12 2L19 9"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Down Arrow */}
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
                        {/* Arrow line */}
                        <path
                          d="M12 0V22"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Arrow head */}
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

              <div className="flex gap-1">
                {["25%", "50%", "75%", "100%"].map((percentage) => (
                  <Button
                    key={percentage}
                    variant="outline"
                    size="sm"
                    className={`flex-1 h-8 text-xs px-1 ${
                      selectedPercentage === percentage
                        ? "bg-[#19c0f4] text-white border-[#19c0f4]"
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
                  className="w-[calc(20%-0.25rem)] h-8 text-xs px-1 bg-transparent border border-[#21325e] text-[#c8cdd1] rounded-md text-center focus:outline-none focus:ring-1 focus:ring-[#19c0f4] focus:border-[#19c0f4] placeholder:text-[#c8cdd1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onInput={(e) => {
                    const value = e.target.value
                    if (value && (isNaN(Number(value)) || Number(value) < 0.01 || Number(value) > 100)) {
                      e.target.value = value.slice(0, -1)
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedPercentage("")
                    }
                  }}
                  onFocus={() => setSelectedPercentage("")}
                />
              </div>

              <Button
                className={`
                  w-full text-white py-3 font-medium rounded-[12px]
                  transition-all duration-300
                  ${tradingTab === "buy"
                    ? "bg-green-600 hover:bg-green-700 hover:ring-4 hover:ring-green-500/20 active:brightness-90"
                    : "bg-red-700   hover:bg-red-800   hover:ring-4 hover:ring-red-500/20 active:brightness-90"
                  }
                `}
              >
                {tradingTab === "buy" ? "Buy Now" : "Sell Now"}
              </Button>
            </CardContent>
          </Card>

        {/* Right Sidebar */}
          {/* Token Details */}
          <Card className="bg-[#132043] border-[#21325e] rounded-xl order-3 lg:order-none">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback className="bg-[#fac031] text-[#0b152f]">FB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-semibold">Flappy Bird ($FBD)</div>
                  <div className="flex items-center gap-1 text-[#c8cdd1] text-sm">
                    <span>Contract</span>
                    <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                      <span className="text-[#19c0f4]">2h9xvm...pump</span>
                      <div className="w-4 h-4 bg-[#21325e] rounded-full flex items-center justify-center">
                        <span className="text-[#19c0f4] text-xs">↗</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex flex-col items-center">
                {/** Row 1: two buttons side-by-side, each 50% of the wrapper */}
                <div className="flex w-full max-w-xs gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4] h-10 font-normal rounded-md"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Telegram
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4] h-10 font-normal rounded-md"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>

                {/** Row 2: one button, full width of the same wrapper */}
                <div className="flex justify-center w-full max-w-xs">
                  <div className="w-1/2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4] h-10 font-normal rounded-md"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Bonding curve progress</span>
                  <span className="text-white font-medium">18%</span>
                </div>
                <div className="relative w-full h-2 bg-[#0e1a38] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[18%] bg-gradient-to-r from-[#a130e0] to-[#19c0f4]"></div>
                </div>
                <p className="text-[#c8cdd1] text-s leading-relaxed text-center">
                  When the market cap reaches 20,000 USD, 65% of the liquidity from the bonding curve will be deposited into
                  DEX and burned.
                </p>
                <p className="text-[#c8cdd1] text-s leading-relaxed text-center">
                  All the leftover tokens will also be burned out of circulation.
                </p>
                <p className="text-[#c8cdd1] text-s leading-relaxed text-center">
                  There are 10 BNB worth of tokens still available for sale in the bonding curve and there is 6.0115 BNB collected in
                  the bonding curve.
                </p>
              </div>
            </CardContent>
          </Card>
          {/* Claim Card */}
          <Card className="bg-[#132043] border-[#21325e] rounded-xl order-4 lg:order-none">
            <CardHeader className="pb-4">
              <h3 className="text-white font-semibold text-lg text-center">Claim Tokens</h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-white font-mono text-xl">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">07</span>
                    <span className="text-xs text-[#c8cdd1]">Days</span>
                  </div>
                  <span className="text-[#c8cdd1]">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">23</span>
                    <span className="text-xs text-[#c8cdd1]">Hours</span>
                  </div>
                  <span className="text-[#c8cdd1]">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">59</span>
                    <span className="text-xs text-[#c8cdd1]">Minutes</span>
                  </div>
                  <span className="text-[#c8cdd1]">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">59</span>
                    <span className="text-xs text-[#c8cdd1]">Seconds</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full text-white py-3 font-medium rounded-[12px] transition-all duration-300 bg-[#19c0f4] hover:bg-[#19c0f4] hover:ring-4 hover:ring-[#19c0f4]/30 active:brightness-90"
              >
                Claim Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
