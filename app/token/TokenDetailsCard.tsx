import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Globe } from "lucide-react";

export default function TokenDetailsCard() {
  return (
    <Card className="bg-[#132043] border-[#21325e] rounded-xl">
      <CardContent className="p-6 space-y-6">
        {/* ─── Top row: logo + name + contract link ─── */}
        <div
  className="
    flex items-center gap-4 
    max-[480px]:flex-col max-[480px]:gap-2 max-[480px]:items-center
  "
>
  {/* ─── Avatar ─── */}
  <Avatar
    className="
      w-12 h-12 
      max-[640px]:w-10 max-[640px]:h-10 
      max-[480px]:w-8  max-[480px]:h-8
    "
  >
    <AvatarImage src="/placeholder.svg?height=48&width=48" />
    <AvatarFallback className="bg-[#fac031] text-[#0b152f]">FB</AvatarFallback>
  </Avatar>

  {/* ─── Text container ─── */}
  <div
    className="
      flex flex-col 
      /* On small screens, center everything horizontally */
      max-[480px]:items-center 
      /* Otherwise, left-align under the avatar */
      items-start
    "
  >
    {/* ─── “Flappy Bird ($FBD)” ─── */}
    <div
      className="
        text-white font-semibold 
        text-lg 
        max-[640px]:text-base 
        max-[480px]:text-sm
      "
    >
      Flappy Bird ($FBD)
    </div>

    {/* ─── “Contract 2h9xvm…pump” ─── */}
    <div
      className="
        flex items-center gap-1 text-[#c8cdd1]
        /* On small screens, stack “Contract” above “2h9xvm…pump” */
        max-[480px]:flex-col max-[480px]:items-center
      "
    >
      <button className="flex items-center gap-1 hover:opacity-80">
        <span className="text-[#19c0f4] text-sm max-[480px]:text-xs">
          2h9xvm…pump
        </span>
        <div className="w-4 h-4 bg-[#21325e] rounded-full flex items-center justify-center">
          <span className="text-[#19c0f4] text-xs">↗</span>
        </div>
      </button>
    </div>
  </div>
</div>

        {/* ─── Row: Telegram and Twitter buttons ─── */}
        <div
          className="
            flex gap-3
            max-[480px]:flex-col max-[480px]:space-y-3
          "
        >
          <Button
            variant="outline"
            size="sm"
            className="
              min-[481px]:flex-1
              bg-transparent border-[#19c0f4] text-[#19c0f4] 
              hover:bg-[#19c0f4] hover:text-white 
              h-10 rounded-md
            "
          >
            <Send className="w-4 h-4 mr-2" />
            Telegram
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="
              min-[481px]:flex-1
              bg-transparent border-[#19c0f4] text-[#19c0f4] 
              hover:bg-[#19c0f4] hover:text-white 
              h-10 rounded-md
            "
          >
            <svg className="w-4 h-4 mr-2 max-[480px]:-translate-x-[5px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            <div className="max-[480px]:-translate-x-[2px]">
            Twitter
            </div>
          </Button>
        </div>

        {/* ─── Row: Website button centered ─── */}
        <div className="flex justify-center">
          <div className="w-1/2 max-[480px]:w-full">
            <Button
              variant="outline"
              size="sm"
              className="
                w-full 
                bg-transparent border-[#19c0f4] text-[#19c0f4] 
                hover:bg-[#19c0f4] hover:text-white 
                h-10 rounded-md
              "
            >
              <Globe className="w-4 h-4 mr-2" />
              Website
            </Button>
          </div>
        </div>

        {/* ─── Bonding curve section ─── */}
        <div className="space-y-2">
          {/* Labels row (progress text + percentage) */}
          <div className="flex items-center justify-between">
            <span
              className="
                text-white font-medium 
                text-base 
                max-[640px]:text-sm 
                max-[480px]:text-xs
              "
            >
              Bonding curve progress
            </span>
            <span
              className="
                text-white font-medium 
                text-base 
                max-[640px]:text-sm 
                max-[480px]:text-xs
              "
            >
              18%
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-2 bg-[#0e1a38] rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[18%] bg-gradient-to-r from-[#a130e0] to-[#19c0f4]" />
          </div>

          {/* Three explanatory paragraphs */}
          <p
            className="
              text-[#c8cdd1] 
              text-s 
              leading-relaxed 
              text-center 
              max-[480px]:text-xs
            "
          >
            When the market cap reaches 20,000 USD, 65% of the liquidity from the bonding curve will be deposited into
            DEX and burned.
          </p>
          <p
            className="
              text-[#c8cdd1] 
              text-s 
              leading-relaxed 
              text-center 
              max-[480px]:text-xs
            "
          >
            All the leftover tokens will also be burned out of circulation.
          </p>
          <p
            className="
              text-[#c8cdd1] 
              text-s 
              leading-relaxed 
              text-center 
              max-[480px]:text-xs
            "
          >
            There are 10 BNB worth of tokens still available for sale in the bonding curve and there is 6.0115 BNB collected in
            the bonding curve.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}