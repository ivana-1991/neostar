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

const TYPE_SPEED = 45;       // ms per character while typing
const DELETE_SPEED = 25;     // ms per character while deleting
const HOLD_FULL_MS = 1800;   // pause after fully typed
const HOLD_EMPTY_MS = 350;   // pause before starting next prompt

type Props = {
  className?: string;
  innerClassName?: string;
};

export default function AISearchBar({ className = "", innerClassName = "" }: Props) {
  const { open } = useAIChat();
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holdFull" | "deleting" | "holdEmpty">("typing");

  useEffect(() => {
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
  }, [displayed, phase, promptIndex]);

  return (
    <button
      type="button"
      onClick={open}
      className={`relative rounded-lg p-[1px] block w-full text-left cursor-pointer ${className}`}
      style={{
        background: "linear-gradient(to right, #00CCFF 4.97%, #80CEAA 94.75%)",
      }}
      aria-label="Otvori AI savjetnika"
    >
      <div
        className={`flex items-center gap-2 px-4 md:px-6 py-1.5 rounded-[7px] ${innerClassName}`}
        style={{ backgroundColor: "#ECFCFF" }}
      >
        <img
          src={img("/images/icon-sparkle.svg")}
          alt=""
          className="w-5 h-5 flex-none"
        />
        <span className="text-[13px] md:text-[13.2px] text-[#222] whitespace-nowrap overflow-hidden">
          {displayed}
          <span className="inline-block w-[1px] h-[14px] align-middle ml-0.5 bg-[#222] animate-[blink_1s_steps(2,start)_infinite]" />
        </span>
      </div>
    </button>
  );
}
