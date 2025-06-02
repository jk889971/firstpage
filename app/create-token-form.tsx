"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"

export default function CreateTokenForm() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [amount, setAmount] = useState<string>("")
  const [selectedAmountButton, setSelectedAmountButton] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
    }
  }

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setSelectedAmountButton(null)
  }

  const handleAmountButtonClick = (value: string) => {
    setAmount(value)
    setSelectedAmountButton(value)
  }

  const handleContinue = () => {
    setShowModal(false)
    setShowSuccessModal(true)
  }

  return (
    <div className="min-h-screen bg-[#0b152f] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-[90vw] sm:w-full sm:max-w-md bg-[#0e1a38] border-0 text-white shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">Create Token</h1>

            <div className="space-y-6">
              <div>
                <Input
                  placeholder="Name of token"
                  className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                />
              </div>

              <div>
                <Input
                  placeholder="Ticker"
                  className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Description"
                  className="bg-[#132043] border-0 min-h-[100px] text-white placeholder:text-gray-400 resize-none rounded-xl"
                />
              </div>

              <div className="bg-[#21325e] rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 bg-[#132043] rounded-xl border border-dashed border-gray-600 p-3 flex items-center justify-center h-12 cursor-pointer hover:border-[#19C0F4] transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <p className="text-gray-400 text-sm">
                      {selectedFile ? selectedFile.name : "Drag & Drop your image"}
                    </p>
                  </div>
                  <span className="text-gray-400">or</span>
                  <Button
                    className="bg-[#19C0F4] hover:bg-[#16abd9] text-white h-12 rounded-xl transition-colors"
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

              {isExpanded && (
                <>
                  <div>
                    <Input
                      placeholder="Twitter link"
                      className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>

                  <div>
                    <Input
                      placeholder="Telegram link"
                      className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>

                  <div>
                    <Input
                      placeholder="Website url"
                      className="bg-[#132043] border-0 h-12 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  className="text-white hover:text-[#19C0F4] hover:bg-transparent flex items-center gap-1"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less options" : "Show more options"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </Button>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-[#19C0F4] text-[#19C0F4] hover:bg-[#19C0F4] hover:text-white rounded-xl transition-colors bg-transparent duration-300"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] hover:from-[#8b5cf6] hover:to-[#60a5fa] text-white rounded-xl transition-all transform hover:scale-105"
                  onClick={() => setShowModal(true)}
                >
                  Create
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <p className="text-gray-400">Coin data cannot be changed after creation.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Buy Tokens Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0e1a38] rounded-2xl p-4 sm:p-6 w-[90vw] sm:w-full sm:max-w-sm mx-4 border border-[#21325e]">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-8">(Optional) Buy Tokens</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white text-sm font-medium">Amount</span>
                  <div className="flex items-center gap-2 bg-[#21325e] rounded-lg px-3 py-1.5">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    <span className="text-white text-sm font-medium">TON</span>
                  </div>
                </div>

                <div className="bg-[#132043] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-5">
                    <input
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={handleAmountChange}
                      className="bg-transparent border-0 text-white text-xl font-bold outline-none w-[65%] text-left [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button className="bg-[#19C0F4] hover:bg-[#16abd9] text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                      MAX
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <button
                      className={`${selectedAmountButton === "0.1" ? "bg-[#19C0F4]" : "bg-[#21325e]"} hover:bg-[#19C0F4] text-white px-2 py-1.5 rounded-lg text-xs transition-colors`}
                      onClick={() => handleAmountButtonClick("0.1")}
                    >
                      0.1
                    </button>
                    <button
                      className={`${selectedAmountButton === "0.5" ? "bg-[#19C0F4]" : "bg-[#21325e]"} hover:bg-[#19C0F4] text-white px-2 py-1.5 rounded-lg text-xs transition-colors`}
                      onClick={() => handleAmountButtonClick("0.5")}
                    >
                      0.5
                    </button>
                    <button
                      className={`${selectedAmountButton === "1.0" ? "bg-[#19C0F4]" : "bg-[#21325e]"} hover:bg-[#19C0F4] text-white px-2 py-1.5 rounded-lg text-xs transition-colors`}
                      onClick={() => handleAmountButtonClick("1.0")}
                    >
                      1.0
                    </button>
                    <button
                      className={`${selectedAmountButton === "5.0" ? "bg-[#19C0F4]" : "bg-[#21325e]"} hover:bg-[#19C0F4] text-white px-2 py-1.5 rounded-lg text-xs transition-colors`}
                      onClick={() => handleAmountButtonClick("5.0")}
                    >
                      5.0
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] hover:from-[#8b5cf6] hover:to-[#60a5fa] text-white rounded-xl h-12 font-medium"
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#19C0F4] text-[#19C0F4] hover:bg-[#19C0F4] hover:text-white rounded-xl h-12 bg-transparent font-medium"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0e1a38] rounded-2xl p-4 sm:p-6 md:p-8 w-[95vw] h-auto sm:w-[32rem] sm:h-[32rem] md:w-[36rem] md:h-[36rem] max-w-2xl max-h-[90vh] mx-2 sm:mx-4 border border-[#21325e] flex flex-col sm:justify-between">
            <div className="text-center space-y-3 sm:space-y-4 sm:flex-1 sm:flex sm:flex-col sm:justify-center">
              {/* Heading */}
              <h2 className="text-lg sm:text-2xl font-bold text-white">Token Created Successfully!</h2>

              {/* Moon and Rocket Illustration */}
              <div className="flex justify-center">
                <Image
                  src="/moon-rocket.svg"
                  alt="Moon and Rocket"
                  width={120}
                  height={120}
                  className="object-contain sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px]"
                />
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm">
                Your token has been created and is now live on the blockchain.
              </p>
            </div>

            {/* Action Button */}
            <div className="w-full mt-4 sm:mt-6">
              <Button
                className="w-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] hover:from-[#8b5cf6] hover:to-[#60a5fa] text-white rounded-xl h-10 sm:h-12 font-medium text-sm sm:text-base"
                onClick={() => setShowSuccessModal(false)}
              >
                View Token
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
