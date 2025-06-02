"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Globe } from "lucide-react"

// (Helper timer, unchanged)
function CountdownTimer({ initialTime }: { initialTime: number }) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${secs}`
  }

  if (timeLeft <= 0) {
    return <div className="text-xs text-red-400">Expired</div>
  }

  return <div className="text-xs text-[#19c0f4] font-mono">{formatTime(timeLeft)}</div>
}

export default function Component() {
  const allMemecoins = Array.from({ length: 45 }).map((_, i) => ({
    name: "Flappy Bird",
    symbol: "$FBD",
    creator: "Devmoa",
    marketCap: "4100.84",
    replies: "07",
    createdOn: "14-03-2024",
    avatar: "/placeholder.svg?height=40&width=40",
  }));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(15);

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentCoins = allMemecoins.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allMemecoins.length / cardsPerPage);

  const router = useRouter();

  // ── (A) Two refs: one for hero, one for the rest of the page ──
  const canvasHeroRef = useRef<HTMLCanvasElement | null>(null)
  const canvasBodyRef = useRef<HTMLCanvasElement | null>(null)

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const newTotal = Math.ceil(allMemecoins.length / cardsPerPage);
    if (currentPage > newTotal) {
      setCurrentPage(newTotal);
    }
  }, [cardsPerPage]);

  useEffect(() => {
    function updateCardsPerPage() {
      const w = window.innerWidth;
      let columns = 1;

      if (w >= 1024) {
        columns = 3;   // lg:grid-cols-3
      } else if (w >= 768) {
        columns = 2;   // md:grid-cols-2
      } else {
        columns = 1;   // grid-cols-1
      }

      // if exactly 2 cards/row, show 14 per page; else show 15
      setCardsPerPage(columns === 2 ? 14 : 15);
    }

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // ── (B) First effect: animate “hero” particles ──
  useEffect(() => {
    const canvas = canvasHeroRef.current
    if (!canvas) {
      console.error("Hero canvas not found!")
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error("Could not get 2D context for hero!")
      return
    }

    // You can tweak these values for hero vs body:
    const heroParticleColor = "rgba(255,255,255,0.6)"  // e.g. bright white
    const heroParticleRadius = 2.0

    let particles: HeroParticle[] = []
    const mouse = { x: undefined as number | undefined, y: undefined as number | undefined, radius: 80 }

    // Mouse events (identical shape, but separate closure from body)
    function handleMouseMoveHero(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function handleMouseOutHero() {
      mouse.x = undefined
      mouse.y = undefined
    }
    window.addEventListener("mousemove", handleMouseMoveHero)
    window.addEventListener("mouseout", handleMouseOutHero)

    // A small Particle class for the hero. You could give a different density/speed than the body.
    class HeroParticle {
      x: number
      y: number
      baseX: number
      baseY: number
      density: number
      size: number
      color: string
      driftVx: number
      driftVy: number
      vx: number
      vy: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.density = Math.random() * 10 + 3    // smaller density range
        this.size = heroParticleRadius
        this.color = heroParticleColor
        this.driftVx = (Math.random() - 0.5) * 0.1
        this.driftVy = (Math.random() - 0.5) * 0.1
        this.vx = this.driftVx
        this.vy = this.driftVy
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        // Drift “base” point
        this.baseX += this.driftVx
        this.baseY += this.driftVy

        // Bounce at edges of the hero canvas
        if (this.baseX <= 0 || this.baseX >= canvas.width) {
          this.driftVx *= -1
          this.baseX += this.driftVx * 2
        }
        if (this.baseY <= 0 || this.baseY >= canvas.height) {
          this.driftVy *= -1
          this.baseY += this.driftVy * 2
        }

        // Mouse repulsion (hero-specific radius)
        let repX = 0
        let repY = 0
        const isMouseActiveHero = mouse.x !== undefined && mouse.y !== undefined
        if (isMouseActiveHero) {
          const dx = mouse.x! - this.x
          const dy = mouse.y! - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            repX = -Math.cos(angle) * force * this.density * 0.4
            repY = -Math.sin(angle) * force * this.density * 0.4
          }
        }

        const returnSpeed = 0.05
        const returnX = (this.baseX - this.x) * returnSpeed
        const returnY = (this.baseY - this.y) * returnSpeed

        this.vx = returnX + repX + this.driftVx
        this.vy = returnY + repY + this.driftVy

        this.x += this.vx
        this.y += this.vy

        // Clamp to hero canvas
        this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x))
        this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y))
      }
    }

    function initHeroParticles() {
      particles = []
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.floor((window.innerWidth * window.innerHeight) / 6000) // adjust density
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new HeroParticle(x, y))
      }
    }

    function animateHeroParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.update()
        p.draw()
      }
      requestAnimationFrame(animateHeroParticles)
    }

    let resizeTimeoutHero: NodeJS.Timeout
    function handleResizeHero() {
      clearTimeout(resizeTimeoutHero)
      resizeTimeoutHero = setTimeout(() => {
        initHeroParticles()
      }, 200)
    }

    window.addEventListener("resize", handleResizeHero)

    initHeroParticles()
    animateHeroParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveHero)
      window.removeEventListener("mouseout", handleMouseOutHero)
      window.removeEventListener("resize", handleResizeHero)
    }
  }, []) // ← only once on mount

  // ── (C) Second effect: animate “body” (rest‐of‐page) particles ──
  useEffect(() => {
    const canvas = canvasBodyRef.current
    if (!canvas) {
      console.error("Body canvas not found!")
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error("Could not get 2D context for body!")
      return
    }

    // Body can have different parameters (e.g. darker, slower, fewer/larger particles)
    const bodyParticleColor = "rgba(100,100,110,0.4)"
    const bodyParticleRadius = 3.0

    let particles: BodyParticle[] = []
    const mouse = { x: undefined as number | undefined, y: undefined as number | undefined, radius: 120 }

    function handleMouseMoveBody(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function handleMouseOutBody() {
      mouse.x = undefined
      mouse.y = undefined
    }
    window.addEventListener("mousemove", handleMouseMoveBody)
    window.addEventListener("mouseout", handleMouseOutBody)

    class BodyParticle {
      x: number
      y: number
      baseX: number
      baseY: number
      density: number
      size: number
      color: string
      driftVx: number
      driftVy: number
      vx: number
      vy: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.density = Math.random() * 20 + 8
        this.size = bodyParticleRadius
        this.color = bodyParticleColor
        this.driftVx = (Math.random() - 0.5) * 0.05
        this.driftVy = (Math.random() - 0.5) * 0.05
        this.vx = this.driftVx
        this.vy = this.driftVy
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        // Drift base
        this.baseX += this.driftVx
        this.baseY += this.driftVy

        // Bounce on body canvas edges
        if (this.baseX <= 0 || this.baseX >= canvas.width) {
          this.driftVx *= -1
          this.baseX += this.driftVx * 2
        }
        if (this.baseY <= 0 || this.baseY >= canvas.height) {
          this.driftVy *= -1
          this.baseY += this.driftVy * 2
        }

        // Mouse repulsion for body
        let repX = 0
        let repY = 0
        const isMouseActiveBody = mouse.x !== undefined && mouse.y !== undefined
        if (isMouseActiveBody) {
          const dx = mouse.x! - this.x
          const dy = mouse.y! - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            repX = -Math.cos(angle) * force * this.density * 0.25
            repY = -Math.sin(angle) * force * this.density * 0.25
          }
        }

        const returnSpeed = 0.04
        const returnX = (this.baseX - this.x) * returnSpeed
        const returnY = (this.baseY - this.y) * returnSpeed

        this.vx = returnX + repX + this.driftVx
        this.vy = returnY + repY + this.driftVy

        this.x += this.vx
        this.y += this.vy

        // Clamp inside body canvas
        this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x))
        this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y))
      }
    }

    function initBodyParticles() {
      particles = []
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // maybe fewer particles for the body, e.g. area/12000
      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000)
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new BodyParticle(x, y))
      }
    }

    function animateBodyParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.update()
        p.draw()
      }
      requestAnimationFrame(animateBodyParticles)
    }

    let resizeTimeoutBody: NodeJS.Timeout
    function handleResizeBody() {
      clearTimeout(resizeTimeoutBody)
      resizeTimeoutBody = setTimeout(() => {
        initBodyParticles()
      }, 200)
    }

    window.addEventListener("resize", handleResizeBody)

    initBodyParticles()
    animateBodyParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveBody)
      window.removeEventListener("mouseout", handleMouseOutBody)
      window.removeEventListener("resize", handleResizeBody)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#000025] text-white relative overflow-x-hidden">
      {/** ─────────── HERO SECTION ─────────── **/}
      <section className="relative z-10 text-center py-16 px-6 overflow-hidden">
        {/*
          (1) Hero‐only canvas sits behind everything in this section.
          It’s positioned absolutely to fill the hero’s area.
        */}
        <canvas
          id="heroCanvas"
          ref={canvasHeroRef}
          className="absolute inset-0 z-0 w-full h-full bg-transparent"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between justify-center">
            <div className="lg:w-1/2 mb-0">
              <div className="relative w-[576px] h-[576px] mx-auto">
                {/* Moon image */}
                <img
                  src="/moon.svg"
                  alt="Moon"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {/* Rocket image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/rocket.png"
                    alt="Rocket"
                    className="w-64 h-64 object-contain animate-bounce-slow"
                    style={{ animationDuration: "6s" }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight font-['Space_Grotesk'] text-center lg:text-left">
                Memecoins Express
                <br />
                Way to the Moon
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-md text-center lg:text-left mx-auto lg:mx-0">
                Turn your meme into a Supra sensation in 30 seconds, no code, no hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="text-white w-[150px] h-[40px] rounded-[12px] shadow-[inset_0px_2px_2px_0px_#FFFFFF66] text-sm hover:brightness-110 hover:animate-gradient transition-all duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(96.13deg, #A130E0 -15.21%, #19C0F4 98.39%)",
                    backgroundSize: "200% 200%",
                  }}
                  onClick={() => router.push("/create")}
                >
                  Create Coin
                </Button>
                <Button
                  variant="outline"
                  className="border-[#19c0f4] text-[#19c0f4] bg-transparent hover:bg-[#19C0F4] hover:text-white w-[155px] h-[40px] rounded-[12px] border text-sm transition-colors duration-300"
                >
                  How it works?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** ─────────── BODY SECTION (everything else) ─────────── **/}
      {/* Place a full‐page (or below-hero) fixed/absolute canvas here. */}
      <div className="relative z-0">
      <canvas
        id="bodyCanvas"
        ref={canvasBodyRef}
        className="absolute inset-0 z-0 w-full h-full bg-transparent"
      />

      {/* All the sections below “sit on top” (z-10) so they don’t get covered */}
      <section className="relative z-10 px-6 pb-16 pt-4">
        <div className="max-w-7xl mx-auto bg-[#0B152F] p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 max-[400px]:items-center">
            <div className="flex items-center space-x-4 max-[400px]:flex-col max-[400px]:items-center max-[400px]:space-y-1 max-[400px]:space-x-0">
              <span className="text-3xl font-bold">3570</span>
              <span className="text-xl text-white/60 max-[400px]:text-center">Coins Created</span>
            </div>

            <div className=" flex items-center space-x-4 w-full md:w-auto max-[400px]:flex-col max-[400px]:items-center max-[400px]:space-y-2 max-[400px]:space-x-0">
              {/** ─── Search field ─── **/}
              <div className="relative w-full md:w-80">
                <Input
                  placeholder="Search for Coins"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#21325e]/50 border-[#21325e] text-white placeholder:text-white/50 pr-12 w-full"
                />
                {/** Hide magnifier when width ≤ 300px */}
                <Button className="absolute right-0 top-0 bottom-0 bg-[#19c0f4] hover:bg-[#16abd9] text-white rounded-l-none hover:brightness-110 transition-all duration-300">
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {/** ─── Sort dropdown ─── **/}
              <Select>
                <SelectTrigger className="bg-[#21325e]/50 border-[#21325e] text-white w-full md:w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#0e1a38] border border-[#21325e] text-white">
                  <SelectItem
                    value="newest"
                    className="cursor-pointer text-white/80 hover:text-white data-[highlighted]:bg-[#19c0f4] data-[selected]:bg-[#19c0f4]/20"
                  >
                    Newest
                  </SelectItem>
                  <SelectItem
                    value="oldest"
                    className="cursor-pointer text-white/80 hover:text-white data-[highlighted]:bg-[#19c0f4] data-[selected]:bg-[#19c0f4]/20"
                  >
                    Oldest
                  </SelectItem>
                  <SelectItem
                    value="market-cap"
                    className="cursor-pointer text-white/80 hover:text-white data-[highlighted]:bg-[#19c0f4] data-[selected]:bg-[#19c0f4]/20"
                  >
                    Market Cap
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCoins.map((coin, index) => (
              <div key={index} className="cursor-pointer" onClick={() => router.push("/token")}>
              <Card
                className="bg-[#21325e]/30 border-[#21325e] backdrop-blur-sm hover:bg-[#21325e]/50 transition-colors duration-300 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex items-center p-6 mb-0 max-[400px]:flex-col max-[400px]:items-center max-[400px]:space-y-2 max-[400px]:space-x-0">
                    <div className="flex items-center space-x-3 max-[400px]:flex-col max-[400px]:space-y-2 max-[400px]:space-x-0">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={coin.avatar || "/placeholder.svg"} alt={coin.name} />
                        <AvatarFallback className="bg-[#ffbb69] text-[#000025]">FB</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-white text-center max-[400px]:mt-0">
                        {coin.name} ({coin.symbol})
                      </h3>
                    </div>
                  </div>

                  <div className="bg-[#21325e]/50 p-4 mx-4 rounded-xl">
                    <div className="grid grid-cols-3 gap-4 text-center max-[400px]:grid-cols-1 max-[400px]:gap-y-2">
                      <div>
                        <div className="text-xs text-white/60 mb-1">Symbol</div>
                        <div className="font-semibold text-white">{coin.symbol}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Market cap</div>
                        <div className="font-semibold text-white">{coin.marketCap}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Replies</div>
                        <div className="font-semibold text-white">{coin.replies}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <div className="relative w-full h-2 bg-[#0e1a38] rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-[18%] bg-gradient-to-r from-[#a130e0] to-[#19c0f4]"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 max-[400px]:flex-col max-[400px]:items-center max-[400px]:space-y-2 max-[400px]:space-x-0">
                    <div className="flex space-x-2 max-[400px]:justify-center max-[400px]:space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#19c0f4] hover:bg-[#19c0f4]/10 w-8 h-8 transition-colors duration-300"
                      >
                        <Globe className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#19c0f4] hover:bg-[#19c0f4]/10 w-8 h-8 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#19c0f4] hover:bg-[#19c0f4]/10 w-8 h-8 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </Button>
                    </div>
                    <CountdownTimer initialTime={Math.floor(Math.random() * 86400) + 3600} />
                  </div>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4 items-center">
            {/* Left arrow: go to previous page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`
                px-3 py-1 rounded-md text-sm
                ${currentPage === 1 ? "text-white/50 cursor-not-allowed" : "text-white hover:text-[#19c0f4]"}
              `}
            >
              «
            </button>

            {/* Just show the active page */}
            <span className="px-3 py-1 rounded-md text-sm text-[#19c0f4]">
              {currentPage}
            </span>

            {/* Right arrow: go to next page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`
                px-3 py-1 rounded-md text-sm
                ${currentPage === totalPages ? "text-white/50 cursor-not-allowed" : "text-white hover:text-[#19c0f4]"}
              `}
            >
              »
            </button>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}