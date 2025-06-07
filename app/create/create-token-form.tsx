"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ChevronDown } from "lucide-react"
import NextImage from "next/image"

type Toast = {
  id: number
  message: string
}

export default function CreateTokenForm() {
  const router = useRouter()

  //── form state ────────────────────────────────────────────────────────────────
  const [tokenName, setTokenName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [description, setDescription] = useState<string>("") // optional
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // “More options” toggling
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  // Modal visibility
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  // “Buy Tokens” modal—amount & button selection
  const [amount, setAmount] = useState<string>("")
  const [selectedAmountButton, setSelectedAmountButton] = useState<string | null>(null)

  // File‐input ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  //── TOAST STATE ────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<Toast[]>([])

  //── DRAG‐STATE ─────────────────────────────────────────────────────────────────
  // true while the user is dragging a file anywhere over the window
  const [isDragging, setIsDragging] = useState(false)

  // Prevent default browser "snatch" behavior and track dragging globally
  useEffect(() => {
    const onWindowDragOver = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }
    const onWindowDragLeave = (e: DragEvent) => {
      // If they drag out of the window entirely, cancel the dimming
      if ((e.target as Element).tagName === "HTML") {
        setIsDragging(false)
      }
    }
    const onWindowDrop = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    window.addEventListener("dragover", onWindowDragOver)
    window.addEventListener("dragleave", onWindowDragLeave)
    window.addEventListener("drop", onWindowDrop)

    return () => {
      window.removeEventListener("dragover", onWindowDragOver)
      window.removeEventListener("dragleave", onWindowDragLeave)
      window.removeEventListener("drop", onWindowDrop)
    }
  }, [])

  // Enqueue a new toast (bottom‐right). Auto‐removes after 10 seconds.
  const addToast = (message: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 10_000)
  }

  //── VALIDATION CONSTANTS ─────────────────────────────────────────────────────
  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB
  const MIN_DIMENSION = 100
  const MAX_DIMENSION = 1000
  const ALLOWED_EXTENSIONS = /\.(png|jpe?g|webp|gif)$/i

  //── HELPER: validate file type, size, dimensions ─────────────────────────────
  const handleFileSelect = (file: File) => {
    // 1) check extension / mime
    if (!ALLOWED_EXTENSIONS.test(file.name)) {
      addToast("Invalid file format. Only png, jpeg, jpg, webp & gif are allowed.")
      return
    }

    // 2) size
    if (file.size > MAX_FILE_SIZE) {
      addToast("File too large. Maximum allowed size is 2 MB.")
      return
    }

    // 3) dimensions: load into a DOM <img>
    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.src = objectUrl

    img.onload = () => {
      const w = img.naturalWidth
      const h = img.naturalHeight
      URL.revokeObjectURL(objectUrl)

      if (
        w < MIN_DIMENSION ||
        h < MIN_DIMENSION ||
        w > MAX_DIMENSION ||
        h > MAX_DIMENSION
      ) {
        addToast(
          `Image dimensions must be between ${MIN_DIMENSION}×${MIN_DIMENSION} to ${MAX_DIMENSION}×${MAX_DIMENSION}. Yours is ${w}×${h}.`
        )
        return
      }

      // all checks passed
      setSelectedFile(file)
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      addToast("Could not load image. Please try a different file.")
    }
  }

  //── DRAG & DROP / BROWSE HANDLERS ─────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  //── AMOUNT BUTTON HANDLERS ────────────────────────────────────────────────────
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setSelectedAmountButton(null)
  }
  const handleAmountButtonClick = (value: string) => {
    setAmount(value)
    setSelectedAmountButton(value)
  }

  //── “Create” CLICK: require only Token Name, Symbol, and Image ────────────────
  const onClickCreate = () => {
    if (!tokenName.trim() || !symbol.trim()) {
      addToast("Please fill in Token Name and Symbol before proceeding.")
      return
    }
    if (!selectedFile) {
      addToast("Please upload a valid image before proceeding.")
      return
    }
    // description is optional → open “Buy Tokens” modal
    setShowModal(true)
  }

  //── “Continue” CLICK: close buy‐modal, open success modal ─────────────────────
  const handleContinue = () => {
    setShowModal(false)
    setShowSuccessModal(true)
  }

  return (
    <div className="min-h-screen bg-[#0b152f] flex flex-col">
      {/* ─── GLOBAL DRAG OVERLAY ──────────────────────────────────────────── */}
      {isDragging && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none"
        />
      )}

      {/* ─── Main Form Card ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-[90vw] sm:w-full sm:max-w-md bg-[#0e1a38] border-0 text-white shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">Create Token</h1>

            <div className="space-y-6">
              {/* ─── Token Name ───────────────────────────────────────────── */}
              <div>
                <Input
                  placeholder="Token Name"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  maxLength={32}
                  className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19c0f4]"
                />
              </div>

              {/* ─── Symbol ───────────────────────────────────────────────── */}
              <div>
                <Input
                  placeholder="Symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  maxLength={10}
                  className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19c0f4]"
                />
              </div>

              {/* ─── Description (optional) ───────────────────────────────── */}
              <div className="rounded-xl overflow-hidden border border-[#21325e] focus-within:border-[#19c0f4] focus-within:ring-2 focus-within:ring-[#19c0f4] focus-within:ring-offset-0">
                <Textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                  className="bg-[#132043] border-0 min-h-[100px] text-white placeholder:text-gray-400 resize-none rounded-xl theme-textarea"
                />
              </div>

              {/* ─── Image Upload Dropzone ───────────────────────────────── */}
              <div className="bg-[#21325e] rounded-xl p-4 relative z-50">
                <div
                  className="flex items-center gap-2 max-[335px]:flex-col max-[335px]:items-center"
                  onDragEnter={(e) => {
                    e.stopPropagation()
                    setIsDragging(true)
                  }}
                  onDragLeave={(e) => {
                    e.stopPropagation()
                    // if leaving dropzone but still over window, keep isDragging=true
                    // only clear if the mouse fully leaves this element
                    const rect = (e.target as HTMLElement).getBoundingClientRect()
                    if (
                      e.clientX < rect.left ||
                      e.clientX > rect.right ||
                      e.clientY < rect.top ||
                      e.clientY > rect.bottom
                    ) {
                      setIsDragging(false)
                    }
                  }}
                >
                  <div
                    className="flex-1 bg-[#132043] rounded-xl border border-dashed border-gray-600 p-3 flex items-center justify-center h-12 cursor-pointer hover:border-[#19C0F4] transition-colors relative z-50"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      setIsDragging(false)
                      const files = e.dataTransfer.files
                      if (files.length > 0) {
                        handleFileSelect(files[0])
                      }
                    }}
                    onClick={handleUploadClick}
                  >
                    <p className="text-gray-400 text-sm">
                      {selectedFile
                      ? (() => {
                          const full = selectedFile.name
                          const idx = full.lastIndexOf(".")
                          const base = idx > 0 ? full.slice(0, idx) : full
                          const ext = idx > 0 ? full.slice(idx) : ""
                          return base.length > 9
                            ? base.slice(0, 9) + "..." + ext
                            : full
                        })()
                      : "Drag & Drop image"}
                    </p>
                  </div>
                  <span className="text-gray-400">or</span>
                  <Button
                    className="bg-[#19C0F4] hover:bg-[#16abd9] text-white h-12 rounded-xl transition-colors transform max-[335px]:scale-[0.8] relative z-50"
                    onClick={handleUploadClick}
                    type="button"
                  >
                    Upload
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {/* ─── Expandable Social Links ──────────────────────────────── */}
              {isExpanded && (
                <>
                  <div>
                    <Input
                      placeholder="Twitter Link (optional)"
                      className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Telegram Link (optional)"
                      className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Website URL (optional)"
                      className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* ─── Show More / Show Less Toggle ─────────────────────────── */}
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  className="text-white hover:text-[#19C0F4] hover:bg-transparent flex items-center gap-1"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less options" : "Show more options"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>

              {/* ─── Cancel + Create Buttons ───────────────────────────────── */}
              <div className="flex gap-4 pt-4 max-[335px]:flex-col">
                <Button
                  variant="outline"
                  className="flex-1 border-[#19C0F4] text-[#19C0F4] hover:bg-[#19C0F4] hover:text-white rounded-xl transition-colors bg-transparent duration-300"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Cancel
                </Button>

                {/* Create Button with “Connect Wallet”–style hover */}
                <Button
                  className="
                    flex-1
                    text-white
                    font-bold text-[14px]
                    rounded-[12px]
                    shadow-[inset_0px_2px_2px_0px_#FFFFFF66]
                    transition-all duration-300
                    hover:brightness-110 hover:animate-gradient
                  "
                  style={{
                    backgroundImage: "linear-gradient(96.13deg, #A130E0 -15.21%, #19C0F4 98.39%)",
                    backgroundSize: "200% 200%",
                    height: "40px",
                  }}
                  onClick={onClickCreate}
                >
                  Create
                </Button>
              </div>

              {/* ─── Warning Note ───────────────────────────────────────────── */}
              <div className="flex items-center justify-center gap-2 text-sm max-[400px]:flex-col max-[400px]:gap-1 max-[400px]:text-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <p className="text-gray-400">Coin data cannot be changed after creation.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
            “Buy Tokens” Modal
      ───────────────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0e1a38] rounded-2xl p-4 sm:p-6 w-[90vw] sm:w-full sm:max-w-sm mx-4 border border-[#21325e]">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-8">(Optional) Buy Tokens</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-end mb-1 max-[220px]:flex-col max-[220px]:items-center max-[220px]:gap-3">
                  <span className="text-white text-sm font-medium max-[220px]:order-2">Amount</span>
                  <div className="flex items-center gap-2 bg-[#21325e] rounded-lg px-3 py-1.5 max-[220px]:order-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    <span className="text-white text-sm font-medium">TON</span>
                  </div>
                </div>

                <div className="bg-[#132043] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2 max-[220px]:flex-col max-[220px]:items-center">
                    <input
                      type="number"
                      min={0}
                      placeholder="0.0"
                      value={amount}
                      onKeyDown={(e) => {
                        if (e.key === "-") e.preventDefault()
                      }}
                      onChange={(e) => {
                        const v = e.target.value
                        if (v.startsWith("-")) return
                        handleAmountChange(e)
                      }}
                      className="
                        bg-transparent border-0 text-white text-xl font-bold outline-none
                        w-[65%] text-left max-[221px]:text-center [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        max-[220px]:w-full
                      "
                    />
                    <button className="bg-[#19C0F4] hover:bg-[#16abd9] text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors max-[220px]:mt-3">
                      MAX
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3 max-[330px]:hidden">
                    {["0.1", "0.5", "1.0", "5.0"].map((val) => (
                      <button
                        key={val}
                        className={`
                          ${selectedAmountButton === val ? "bg-[#19C0F4]" : "bg-[#21325e]"}
                          hover:bg-[#19C0F4] text-white px-2 py-1.5 rounded-lg text-xs transition-colors
                        `}
                        onClick={() => handleAmountButtonClick(val)}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4">
                    {/* Continue Button with “Connect Wallet”–style hover */}
                    <Button
                      className="
                        w-full
                        text-white font-medium text-sm sm:text-base
                        rounded-[12px]
                        shadow-[inset_0px_2px_2px_0px_#FFFFFF66]
                        transition-all duration-300
                        hover:brightness-110 hover:animate-gradient
                      "
                      style={{
                        backgroundImage: "linear-gradient(96.13deg, #A130E0 -15.21%, #19C0F4 98.39%)",
                        backgroundSize: "200% 200%",
                        height: "48px",
                      }}
                      onClick={handleContinue}
                    >
                      Continue
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#19C0F4] text-[#19C0F4] hover:bg-[#19C0F4] hover:text-white rounded-xl h-12 bg-transparent font-medium transition-colors"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
            Success Modal (“Token Created Successfully!”)
      ───────────────────────────────────────────────────────────────────── */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="
              bg-[#0e1a38] rounded-2xl p-4 sm:p-6 md:p-8
              w-[95vw] h-auto sm:w-[32rem] sm:h-[32rem] md:w-[36rem] md:h-[36rem]
              max-w-2xl max-h-[90vh] mx-2 sm:mx-4 border border-[#21325e]
              flex flex-col sm:justify-between
            "
          >
            <div className="text-center space-y-3 sm:space-y-4 sm:flex-1 sm:flex sm:flex-col sm:justify-center">
              {/* Heading */}
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                Token Created Successfully!
              </h2>

              {/* Moon and Rocket Illustration */}
              <div className="flex justify-center">
                <NextImage
                  src="/moon-rocket.svg"
                  alt="Moon and Rocket"
                  width={120}
                  height={120}
                  className="
                    object-contain
                    sm:w-[280px] sm:h-[280px]
                    md:w-[320px] md:h-[320px]
                    lg:w-[360px] lg:h-[360px]
                    max-[639px]:w-[280px] max-[639px]:h-[280px]
                    max-[295px]:w-[120px] max-[295px]:h-[120px]
                  "
                />
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm">
                Your token has been created and is now live on the blockchain.
              </p>
            </div>

            {/* Action Button (“View Token”) with the same hover animation */}
            <div className="w-full mt-4 sm:mt-6">
              <Button
                className="
                  w-full text-white font-medium text-sm sm:text-base
                  rounded-[12px]
                  shadow-[inset_0px_2px_2px_0px_#FFFFFF66]
                  transition-all duration-300
                  hover:brightness-110 hover:animate-gradient
                "
                style={{
                  backgroundImage: "linear-gradient(96.13deg, #A130E0 -15.21%, #19C0F4 98.39%)",
                  backgroundSize: "200% 200%",
                  height: "48px",
                }}
                onClick={() => router.push("/token")}
              >
                View Token
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Toast Container (bottom‐right) ─────────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-[99999] max-[640px]:left-1/2 max-[640px]:transform max-[640px]:-translate-x-1/2 max-[640px]:right-auto">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="
              relative
              bg-[#000024] text-white px-4 py-2 rounded shadow-lg
              w-full
              text-base
              max-[640px]:w-[90vw]
              max-[500px]:text-sm
              max-[400px]:text-xs
            "
          >
            <div className="toast-progress"></div>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  )
}