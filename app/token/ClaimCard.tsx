import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClaimCard() {
  return (
    <Card className="bg-[#132043] border-[#21325e] rounded-xl">
      <CardHeader className="pb-4">
        <h3 className="text-white font-semibold text-lg text-center">
          Claim Tokens
        </h3>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Countdown display */}
        <div className="text-center">
          <div
            className="
              flex items-center justify-center gap-2 flex-nowrap
              text-white font-mono
              /* Parent still defaults to text-xl, but we’ll override as needed */
              text-xl
              max-[480px]:text-lg
              max-[380px]:text-base
              max-[320px]:text-sm
              max-[289px]:text-[0.65rem]
              /* Tighten horizontal gap below 289px */
              max-[289px]:gap-1
            "
          >
            {/* ─── Days ─── */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-2xl font-bold
                  max-[480px]:text-xl
                  max-[380px]:text-lg
                  max-[320px]:text-base
                  max-[289px]:text-sm
                "
              >
                07
              </span>
              <span
                className="
                  text-xs text-[#c8cdd1]
                  max-[480px]:text-[0.6rem]
                  max-[380px]:text-[0.55rem]
                  max-[320px]:text-[0.5rem]
                  max-[289px]:text-[0.45rem]
                "
              >
                Days
              </span>
            </div>

            {/* ─── Colon ─── */}
            <span
              className="
                text-[#c8cdd1]
                /* override parent text-size for colon */
                text-xl
                max-[480px]:text-lg
                max-[380px]:text-base
                max-[320px]:text-sm
                max-[289px]:text-[0.65rem]
              "
            >
              :
            </span>

            {/* ─── Hours ─── */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-2xl font-bold
                  max-[480px]:text-xl
                  max-[380px]:text-lg
                  max-[320px]:text-base
                  max-[289px]:text-sm
                "
              >
                23
              </span>
              <span
                className="
                  text-xs text-[#c8cdd1]
                  max-[480px]:text-[0.6rem]
                  max-[380px]:text-[0.55rem]
                  max-[320px]:text-[0.5rem]
                  max-[289px]:text-[0.45rem]
                "
              >
                Hours
              </span>
            </div>

            {/* ─── Colon ─── */}
            <span
              className="
                text-[#c8cdd1]
                text-xl
                max-[480px]:text-lg
                max-[380px]:text-base
                max-[320px]:text-sm
                max-[289px]:text-[0.65rem]
              "
            >
              :
            </span>

            {/* ─── Minutes ─── */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-2xl font-bold
                  max-[480px]:text-xl
                  max-[380px]:text-lg
                  max-[320px]:text-base
                  max-[289px]:text-sm
                "
              >
                59
              </span>
              <span
                className="
                  text-xs text-[#c8cdd1]
                  max-[480px]:text-[0.6rem]
                  max-[380px]:text-[0.55rem]
                  max-[320px]:text-[0.5rem]
                  max-[289px]:text-[0.45rem]
                "
              >
                Minutes
              </span>
            </div>

            {/* ─── Colon ─── */}
            <span
              className="
                text-[#c8cdd1]
                text-xl
                max-[480px]:text-lg
                max-[380px]:text-base
                max-[320px]:text-sm
                max-[289px]:text-[0.65rem]
              "
            >
              :
            </span>

            {/* ─── Seconds ─── */}
            <div className="flex flex-col items-center">
              <span
                className="
                  text-2xl font-bold
                  max-[480px]:text-xl
                  max-[380px]:text-lg
                  max-[320px]:text-base
                  max-[289px]:text-sm
                "
              >
                59
              </span>
              <span
                className="
                  text-xs text-[#c8cdd1]
                  max-[480px]:text-[0.6rem]
                  max-[380px]:text-[0.55rem]
                  max-[320px]:text-[0.5rem]
                  max-[289px]:text-[0.45rem]
                "
              >
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Claim button */}
        <Button className="w-full text-white py-3 font-medium rounded-[12px] transition-all duration-300 bg-[#19c0f4] hover:bg-[#19c0f4] hover:ring-4 hover:ring-[#19c0f4]/30 active:brightness-90">
          Claim Rewards
        </Button>
      </CardContent>
    </Card>
  );
}