import { Fragment } from "react";
import TradingPanel from "./TradingPanel";

interface TradeFormBottomSheetProps {
  onClose: () => void;
  initialTab: "buy" | "sell";
  isOpen: boolean;
}

export default function TradeFormBottomSheet({
  onClose,
  initialTab,
  isOpen,
}: TradeFormBottomSheetProps) {
  return (
    <Fragment>
      {/* 1) Full‐screen, semi-transparent backdrop */}
      <div
        className="
          fixed inset-0 
          z-50 
          bg-black/60 opacity-0
          data-[open=true]:opacity-60
          transition-opacity duration-200
        "
        onClick={onClose}
      />

      {/* 2) Bottom sheet container */}
      <div
        className={`
          fixed inset-x-0 bottom-[52px]
          z-50
          bg-[#132043]
          rounded-t-xl
          transition-transform
          duration-300
          ease-in-out
          max-h-[calc(100vh-64px)]
          overflow-y-auto
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── TradingPanel Instance ─── */}
        <div>
          <TradingPanel initialTab={initialTab} centerHeader />
        </div>
      </div>
    </Fragment>
  );
}