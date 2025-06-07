import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TradesTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b border-[#21325e]">
            <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Account</th>
            <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Type</th>
            <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">BNB</th>
            <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">$FBD</th>
            <th className="text-left text-[#c8cdd1] text-sm font-medium py-3 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Example hard-coded rows; swap out with your real data if you have */}
          {[
            { name: "cosmos", type: "Buy", bnb: "1.2", fbd: "2,400", date: "3:33:19 PM" },
            { name: "alice", type: "Sell", bnb: "0.8", fbd: "1,600", date: "3:31:45 PM" },
            { name: "bob",   type: "Buy", bnb: "3.5", fbd: "7,000", date: "3:29:12 PM" },
            { name: "dev",   type: "Buy", bnb: "0.5", fbd: "1,000", date: "3:27:33 PM" },
          ].map((row) => (
            <tr className="border-b border-[#21325e]/50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="bg-[#565656] text-xs">
                      {row.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm">{row.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`text-sm font-medium ${
                    row.type === "Buy" ? "text-[#19c0f4]" : "text-[#ff6b6b]"
                  }`}
                >
                  {row.type}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-white text-sm">{row.bnb}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-white text-sm">{row.fbd}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-[#c8cdd1] text-sm">{row.date}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}