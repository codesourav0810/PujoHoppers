import React from "react";

export default function FestiveLoader({ text = "Loading Sharod 2026..." }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4A84F]/30 border-t-[#D62828] animate-spin" />
        <span className="absolute text-lg">🪔</span>
      </div>
      <p className="font-serif text-lg font-bold text-[#5A0909]">{text}</p>
      <p className="text-xs text-[#181313]/55 mt-1 font-bengali">আনন্দময়ী মা আসছেন</p>
    </div>
  );
}
