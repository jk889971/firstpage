import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClaimCard() {
  return (
    <Card className="bg-[#132043] border-[#21325e] rounded-xl">
      <CardHeader className="pb-4">
        <h3 className="text-white font-semibold text-lg text-center">Claim Tokens</h3>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Countdown display */}
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

        {/* Claim button */}
        <Button className="w-full text-white py-3 font-medium rounded-[12px] transition-all duration-300 bg-[#19c0f4] hover:bg-[#19c0f4] hover:ring-4 hover:ring-[#19c0f4]/30 active:brightness-90">
          Claim Rewards
        </Button>
      </CardContent>
    </Card>
  );
}