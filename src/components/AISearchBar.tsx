"use client";

import { useEffect, useState } from "react";
import { img } from "@/lib/img";
import { useAIChat } from "@/lib/aiChatContext";

const PROMPTS = [
  "Pitaj me ...",
  "Trebam obiteljski auto za grad",
  "Najbolji SUV do 20.000€",
  "Koji električni auto mi se isplati?",
  "Pomozi mi izabrati prvi auto",
  "Imam 15.000€, što preporučaš?",
];

const TYPE_SPEED = 45;
const DELETE_SPEED = 25;
const HOLD_FULL_MS = 1800;
const HOLD_EMPTY_MS = 350;

type Props = {
  className?: string;
  innerClassName?: string;
};

export default function AISearchBar({ className = "", innerClassName = "" }: Props) {
  const { open } = useAIChat();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holdFull" | "deleting" | "holdEmpty">("typing");

  const showAnimation = !isFocused && value.length === 0;

  // Reset animation state when it gets hidden so it restarts cleanly when shown again
  useEffect(() => {
    if (!showAnimation) {
      setDisplayed("");
      setPhase("typing");
      setPromptIndex(0);
    }
  }, [showAnimation]);

  useEffect(() => {
    if (!showAnimation) return;
    const fullText = PROMPTS[promptIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayed(fullText.slice(0, displayed.length + 1));
        }, TYPE_SPEED);
      } else {
        timeoutId = setTimeout(() => setPhase("holdFull"), HOLD_FULL_MS);
      }
    } else if (phase === "holdFull") {
      timeoutId = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayed(fullText.slice(0, displayed.length - 1));
        }, DELETE_SPEED);
      } else {
        timeoutId = setTimeout(() => setPhase("holdEmpty"), HOLD_EMPTY_MS);
      }
    } else if (phase === "holdEmpty") {
      setPromptIndex((i) => (i + 1) % PROMPTS.length);
      setPhase("typing");
    }

    return () => clearTimeout(timeoutId);
  }, [displayed, phase, promptIndex, showAnimation]);

  const handleSubmit = () => {
    const query = value.trim();
    open(query || undefined);
    setValue("");
  };

  return (
    <div
      className={`relative rounded-lg p-[1px] ${className}`}
      style={{
        background: "linear-gradient(to right, #00CCFF 4.97%, #80CEAA 94.75%)",
      }}
    >
      <div
        className={`flex items-center gap-2 px-4 md:px-6 py-1.5 rounded-[7px] relative ${innerClassName}`}
        style={{ backgroundColor: "#ECFCFF" }}
      >
        <img
          src={img("/images/icon-sparkle.svg")}
          alt=""
          className="w-5 h-5 flex-none relative z-10"
        />

        {/* Animated overlay shown when input is empty + unfocused */}
        {showAnimation && (
          <div
            className="absolute inset-0 flex items-center gap-2 px-4 md:px-6 pointer-events-none"
            aria-hidden="true"
          >
            <span className="w-5 h-5 flex-none invisible" />
            <span className="text-[13px] md:text-[13.2px] text-[#222] whitespace-nowrap overflow-hidden">
              {displayed}
              <span className="inline-block w-[1px] h-[14px] align-middle ml-0.5 bg-[#222] animate-[blink_1s_steps(2,start)_infinite]" />
            </span>
          </div>
        )}

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          aria-label="Pitaj AI savjetnika"
          className="flex-1 min-w-0 bg-transparent outline-none text-[13px] md:text-[13.2px] text-[#222] placeholder-transparent"
        />
      </div>
    </div>
  );
}
