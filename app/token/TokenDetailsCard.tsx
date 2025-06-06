import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Send, Globe } from "lucide-react";

export default function TokenDetailsCard() {
  return (
    <Card className="bg-[#132043] border-[#21325e] rounded-xl">
      <CardContent className="p-6 space-y-6">
        {/* Top row: logo + name + contract link */}
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-[#fac031] text-[#0b152f]">FB</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-semibold">Flappy Bird ($FBD)</div>
            <div className="flex items-center gap-1 text-[#c8cdd1] text-sm">
              <span>Contract</span>
              <button className="flex items-center gap-1 hover:opacity-80">
                <span className="text-[#19c0f4]">2h9xvm...pump</span>
                <div className="w-4 h-4 bg-[#21325e] rounded-full flex items-center justify-center">
                  <span className="text-[#19c0f4] text-xs">↗</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Row: Telegram and Twitter buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white h-10 rounded-md"
          >
            <Send className="w-4 h-4 mr-2" />
            Telegram
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white h-10 rounded-md"
          >
            <X className="w-4 h-4 mr-2" />
            Twitter
          </Button>
        </div>

        {/* Row: Website button centered */}
        <div className="flex justify-center">
          <div className="w-1/2">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent border-[#19c0f4] text-[#19c0f4] hover:bg-[#19c0f4] hover:text-white h-10 rounded-md"
            >
              <Globe className="w-4 h-4 mr-2" />
              Website
            </Button>
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
  );
}