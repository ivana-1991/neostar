"use client";

import { useEffect, useRef, useState } from "react";
import { useAIChat } from "@/lib/aiChatContext";
import { img } from "@/lib/img";
import { CARS, type Car } from "@/lib/cars";

// ──────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────

type Message =
  | { kind: "ai"; text: string }
  | { kind: "user"; text: string }
  | { kind: "cars"; intro: string; cars: Car[] }
  | { kind: "car-detail"; car: Car };

type Stage = "welcome" | "inquiry" | "recommendations" | "car-detail" | "free";

// ──────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────

const SUGGESTIONS_INITIAL = [
  {
    id: "find-car",
    text: "Tražim auto - pomozi mi ga pronaći",
    borderColor: "#00CCFF",
    textColor: "#01A5CE",
    iconColor: "#00CCFF",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M19 17h2a1 1 0 0 0 1-1v-3c0-.8-.4-1.5-1.1-1.8L19 10l-1.6-3.5A2 2 0 0 0 15.6 5H8.4a2 2 0 0 0-1.8 1.1L5 10l-1.9.9A2 2 0 0 0 2 12.6V16a1 1 0 0 0 1 1h2" />
        <path d="M9 17h6" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    id: "leasing-info",
    text: "Kako funkcionira lizing?",
    borderColor: "#7FE5C0",
    textColor: "#74B999",
    iconColor: "#74B999",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 7h14M5 12h14M5 17h14" />
        <circle cx="9" cy="7" r="1.5" fill={color} stroke="none" />
        <circle cx="15" cy="17" r="1.5" fill={color} stroke="none" />
      </svg>
    ),
  },
  {
    id: "promos",
    text: "Pokaži mi aktualne akcije",
    borderColor: "#FFD292",
    textColor: "#E9941B",
    iconColor: "#E9941B",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <circle cx="7" cy="7" r="1" fill={color} stroke="none" />
      </svg>
    ),
  },
];

const SUGGESTIONS_CAR_DETAIL = [
  {
    id: "equip",
    text: "Pokaži opremu",
    borderColor: "#00CCFF",
    textColor: "#01A5CE",
    iconColor: "#00CCFF",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M19 17h2a1 1 0 0 0 1-1v-3c0-.8-.4-1.5-1.1-1.8L19 10l-1.6-3.5A2 2 0 0 0 15.6 5H8.4a2 2 0 0 0-1.8 1.1L5 10l-1.9.9A2 2 0 0 0 2 12.6V16a1 1 0 0 0 1 1h2" />
        <path d="M9 17h6" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    id: "leasing-calc",
    text: "Izračunaj leasing ratu",
    borderColor: "#7FE5C0",
    textColor: "#74B999",
    iconColor: "#74B999",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h3M13 11h3M8 15h3M13 15h3M8 19h3M13 19h3" />
      </svg>
    ),
  },
  {
    id: "test-drive",
    text: "Dogovori probnu vožnju",
    borderColor: "#FFD292",
    textColor: "#E9941B",
    iconColor: "#E9941B",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
    ),
  },
];

// ──────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────

function AiBubble({ text }: { text: string }) {
  return (
    <div
      className="self-start max-w-[85%] md:max-w-[480px] px-3.5 py-3"
      style={{
        backgroundColor: "#F7F7FC",
        borderRadius: "4px 12px 12px 12px",
      }}
    >
      <p className="text-[14px] text-[#212529] leading-[1.5] whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div
      className="self-end max-w-[85%] md:max-w-[480px] px-3.5 py-3"
      style={{
        backgroundColor: "rgba(127,229,255,0.25)",
        borderRadius: "12px 12px 4px 12px",
      }}
    >
      <p className="text-[14px] leading-[1.5]" style={{ color: "#01A5CE" }}>
        {text}
      </p>
    </div>
  );
}

function Chip({
  label,
  filled,
  onClick,
}: {
  label: string;
  filled?: boolean;
  onClick?: () => void;
}) {
  if (filled) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="px-3.5 py-2 rounded-full text-[13px] font-bold text-white whitespace-nowrap hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(102deg, #00CCFF 6.85%, #80CEAA 95.45%)",
          border: "1px solid #7FE5FF",
        }}
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3.5 py-2 rounded-full text-[13px] font-medium text-[#01A5CE] whitespace-nowrap border border-[#00CCFF] hover:bg-[#ECFCFF] transition-colors"
    >
      {label}
    </button>
  );
}

function CarCard({ car, onClick }: { car: Car; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-white rounded-xl p-3 flex gap-3 hover:shadow-sm transition-all text-left"
      style={{ border: "1px solid rgba(0,204,255,0.3)" }}
    >
      <div className="w-[84px] h-[76px] flex-none rounded-lg overflow-hidden relative">
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ backgroundColor: "rgba(0,204,255,0.12)" }}
        />
        <img
          src={img(car.image)}
          alt={car.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-[14px] font-bold text-[#212529] leading-tight">{car.name}</p>
        <p className="text-[11px] text-[#5F6D7A] leading-tight">
          {car.year} · {car.km} · {car.location}
        </p>
        <div className="flex gap-1.5 flex-wrap pt-0.5">
          {[car.fuel, car.transmission, car.power].map((spec) => (
            <span
              key={spec}
              className="text-[10px] text-[#5F6D7A] bg-[#F7F7FC] px-1.5 py-0.5 rounded"
            >
              {spec}
            </span>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-1.5 mt-0.5 flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#212529]">{car.price}</span>
          <span className="text-[11px] text-[#00CCFF] font-bold">{car.monthly}</span>
        </div>
      </div>
    </button>
  );
}

function SuggestionButton({
  s,
  onClick,
}: {
  s: (typeof SUGGESTIONS_INITIAL)[number];
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 px-3.5 md:px-4 py-3 md:py-3.5 bg-white rounded-xl border hover:bg-gray-50 transition-colors text-left"
      style={{ borderColor: s.borderColor }}
    >
      <span className="flex-none">{s.icon(s.iconColor)}</span>
      <span
        className="flex-1 text-[13.5px] md:text-[14px] font-medium"
        style={{ color: s.textColor }}
      >
        {s.text}
      </span>
      <span
        className="hidden md:inline-block flex-none text-[18px] leading-none"
        style={{ color: s.textColor }}
      >
        →
      </span>
    </button>
  );
}

function TypingIndicator() {
  return (
    <div
      className="self-start px-4 py-3.5"
      style={{
        backgroundColor: "#F7F7FC",
        borderRadius: "4px 12px 12px 12px",
      }}
    >
      <span className="flex gap-1 items-center">
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#5F6D7A] animate-[chat-dot_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#5F6D7A] animate-[chat-dot_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#5F6D7A] animate-[chat-dot_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: "0.4s" }}
        />
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// Smart response generator
// ──────────────────────────────────────────────────────────────────

function generateAIResponse(userMsg: string): Message[] {
  const lower = userMsg.toLowerCase();

  const has = (...keywords: string[]) => keywords.some((k) => lower.includes(k));

  // Car recommendations — user is asking for a car
  if (
    has(
      "auto",
      "vozilo",
      "tražim",
      "trebam",
      "obitelj",
      "suv",
      "gradski",
      "kombi",
      "preporuč",
      "fiat",
      "polo",
      "corsa",
      "hatchback",
      "električ",
      "hibrid",
      "polov"
    )
  ) {
    return [
      {
        kind: "ai",
        text:
          "Super! Evo 3 provjerena vozila iz naše ponude. Svi s Neostar jamstvom i pregledom u 59 točaka.",
      },
      { kind: "cars", intro: "Preporuke za tebe:", cars: CARS },
    ];
  }

  // Leasing / kredit / mjesečna rata
  if (has("lizing", "leasing", "kredit", "rata", "mjesečn", "financ", "izračun")) {
    return [
      {
        kind: "ai",
        text:
          "Mjesečna rata ovisi o cijeni auta, učešću i trajanju ugovora. Za primjer:\n• 10.000 € · 60 mj · 20% učešće → od 145 €/mj\n• 15.000 € · 60 mj · 20% učešće → od 218 €/mj\n• 25.000 € · 84 mj · 30% učešće → od 270 €/mj\n\nKamatna stopa od 5,99% EKS. Želiš li detaljniji izračun za konkretni auto?",
      },
    ];
  }

  // Probna vožnja
  if (has("probna", "test drive", "isprobaj", "vožnj")) {
    return [
      {
        kind: "ai",
        text:
          "Super! Probnu vožnju možeš dogovoriti online u 3 koraka:\n1. Odaberi auto\n2. Izaberi dan i vrijeme\n3. Potvrdi termin\n\nMožemo to napraviti odmah — koje vrijeme ti odgovara ovog tjedna?",
      },
    ];
  }

  // Oprema / specifikacije
  if (has("oprema", "specifikacij", "specs", "dodaci", "navig", "klima")) {
    return [
      {
        kind: "ai",
        text:
          "Sva naša vozila imaju standardno: klima uređaj, ABS, ESP, 6+ airbaga i tempomat. Premium oprema (kožni volan, navigacija, parking senzori, kamera) je dostupna na većini modela. Koje opcije te zanimaju?",
      },
    ];
  }

  // Usporedba
  if (has("uspored", "razlik", "bolj")) {
    return [
      {
        kind: "ai",
        text:
          "Mogu ti pripremiti usporedbu po cijeni, potrošnji, prostranosti i opremi. Koja 2-3 modela te najviše zanimaju, ili da ti predložim slične opcije po istom budžetu?",
      },
    ];
  }

  // Akcije / promocije
  if (has("akcij", "promo", "popust", "snižen", "ponuda", "snižen")) {
    return [
      {
        kind: "ai",
        text:
          "Trenutno imamo super akcije: 0% kamata u prvih 6 mjeseci na sve rabljene aute do 15.000 €, te ekstra povoljne uvjete na električne i hibride. Želiš da ti pokažem ponudu?",
      },
    ];
  }

  // Cijene / budžet
  if (has("cijena", "košta", "koliko", "budžet", "€", "eur")) {
    return [
      {
        kind: "ai",
        text:
          "Imamo vozila od 5.000 € do 50.000 €. Mjesečne rate kreću od 99 €. Reci mi tvoj okvirni budžet ili tip auta koji tražiš pa ću ti pokazati konkretne opcije.",
      },
    ];
  }

  // Kontakt / telefon
  if (has("kontakt", "telefon", "nazov", "zovi", "broj", "showroom", "lokacij")) {
    return [
      {
        kind: "ai",
        text:
          "Možeš nas nazvati na 01/234-5678 ili posjetiti naš showroom u Zagrebu, Vinogradska 25. Radimo pon–pet 8–20h, sub 9–14h. Da ti dogovorim termin?",
      },
    ];
  }

  // Pozdrav
  if (has("bok", "zdravo", "pozdrav", "halo", "hej", "hello", "hi")) {
    return [
      {
        kind: "ai",
        text:
          "Bok! 👋 Kako ti mogu pomoći? Mogu ti pronaći auto, objasniti lizing ili pokazati aktualne akcije.",
      },
    ];
  }

  // Hvala
  if (has("hvala", "thx", "thanks")) {
    return [
      {
        kind: "ai",
        text: "Nema na čemu! 😊 Ako trebaš još nešto, samo pitaj.",
      },
    ];
  }

  // Default
  return [
    {
      kind: "ai",
      text:
        "Hmm, reci mi malo više — tražiš auto, zanima te lizing, ili nešto drugo? Možeš mi npr. napisati budžet, tip vozila ili namjenu.",
    },
  ];
}

// ──────────────────────────────────────────────────────────────────
// Main modal
// ──────────────────────────────────────────────────────────────────

export default function AIChatModal() {
  const { isOpen, initialQuery, close } = useAIChat();
  const [stage, setStage] = useState<Stage>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when reopening
  useEffect(() => {
    if (!isOpen) {
      // Cancel any pending typing response when modal closes
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setIsTyping(false);
      return;
    }
    setSelectedCar(null);
    setInputValue("");
    setIsTyping(false);
    if (initialQuery) {
      // User typed a question into the search bar → jump straight to recommendations
      setMessages([
        { kind: "user", text: initialQuery },
        {
          kind: "ai",
          text:
            "Super! Evo 3 provjerena vozila iz naše ponude. Svi s Neostar jamstvom i pregledom u 59 točaka.",
        },
        { kind: "cars", intro: "Preporuke za tebe:", cars: CARS },
      ]);
      setStage("recommendations");
    } else {
      setStage("welcome");
      setMessages([]);
    }
  }, [isOpen, initialQuery]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, stage, isTyping]);

  if (!isOpen) return null;

  // Free-form chat: add user message, show typing, then add AI response
  const sendMessage = (rawText: string) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    setMessages((m) => [...m, { kind: "user", text }]);
    setInputValue("");
    // Hide welcome buttons and stage chips once user enters free-form chat
    setStage("free");
    setIsTyping(true);

    // Simulate AI thinking with variable delay
    const delay = 700 + Math.random() * 600;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      const response = generateAIResponse(text);
      setMessages((m) => [...m, ...response]);
      setIsTyping(false);
    }, delay);
  };

  const handleInitialSuggestion = (id: string) => {
    if (id === "find-car") {
      setMessages([
        { kind: "user", text: "Tražim auto - pomozi mi ga pronaći" },
        { kind: "ai", text: "Bok! 👋 Reci mi kakav auto tražiš pa krećemo." },
      ]);
      setStage("inquiry");
    } else if (id === "leasing-info") {
      setMessages([
        { kind: "user", text: "Kako funkcionira lizing?" },
        {
          kind: "ai",
          text:
            "Lizing ti omogućuje da voziš auto uz mjesečnu ratu, bez velikog početnog ulaganja. Možeš birati između operativnog i financijskog lizinga, s rokovima od 12 do 84 mjeseca.",
        },
      ]);
      setStage("inquiry");
    } else if (id === "promos") {
      setMessages([
        { kind: "user", text: "Pokaži mi aktualne akcije" },
        {
          kind: "ai",
          text:
            "Trenutno imamo super akcije na rabljena vozila do 15.000 €. Mjesečne rate od 99 €, bez kamata u prvih 6 mjeseci. Želiš li vidjeti ponudu?",
        },
      ]);
      setStage("inquiry");
    }
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    setMessages((m) => [
      ...m,
      { kind: "user", text: `Volim ${car.name}` },
      {
        kind: "ai",
        text: `Bok! 👋 Vidim da gledaš ${car.name}. Mogu ti pomoći s konkretnim koracima — što te zanima?`,
      },
      { kind: "car-detail", car },
    ]);
    setStage("car-detail");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-[420px] md:max-w-[750px] max-h-[85vh] md:max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 flex-none"
          style={{ backgroundColor: "#00CCFF" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center rounded-full w-8 h-8 flex-none"
              style={{ backgroundColor: "#F7F7FC" }}
            >
              <img src={img("/images/icon-sparkle.svg")} alt="" className="w-5 h-5" />
            </div>
            <p className="font-bold text-[15px] md:text-base text-white leading-6">
              AI prodajni savjetnik
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Zatvori"
            className="flex items-center justify-center w-8 h-8 rounded-full text-white hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-5 py-4 md:py-5 flex flex-col gap-3 bg-white"
        >
          {/* Welcome stage */}
          {stage === "welcome" && (
            <>
              <AiBubble text="Bok! 👋 Ja sam Neostarov AI prodajni savjetnik." />
              <AiBubble text="Pomažem ti pronaći idealan auto i objasnim ti sve o lizingu i kreditu." />
              <p className="font-bold text-[13.3px] text-black pt-2">Evo s čime mogu pomoći:</p>
              <div className="flex flex-col gap-2.5">
                {SUGGESTIONS_INITIAL.map((s) => (
                  <SuggestionButton
                    key={s.id}
                    s={s}
                    onClick={() => handleInitialSuggestion(s.id)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Render conversation messages */}
          {messages.map((m, i) => {
            if (m.kind === "ai") return <AiBubble key={i} text={m.text} />;
            if (m.kind === "user") return <UserBubble key={i} text={m.text} />;
            if (m.kind === "cars") {
              return (
                <div key={i} className="flex flex-col gap-2.5">
                  <p className="font-bold text-[13.3px] text-black pt-1">{m.intro}</p>
                  {m.cars.map((car) => (
                    <CarCard key={car.id} car={car} onClick={() => handleCarClick(car)} />
                  ))}
                </div>
              );
            }
            if (m.kind === "car-detail") return <CarCard key={i} car={m.car} />;
            return null;
          })}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Stage-specific actions */}
          {stage === "inquiry" && !isTyping && (
            <div className="flex gap-2 pt-1 flex-wrap">
              <Chip
                label="Trebam obiteljski auto"
                filled
                onClick={() => sendMessage("Trebam obiteljski auto za grad, do 25.000 €")}
              />
              <Chip
                label="Drugo"
                filled
                onClick={() => inputRef.current?.focus()}
              />
            </div>
          )}

          {stage === "recommendations" && !isTyping && (
            <div className="flex gap-2 pt-1 flex-wrap">
              <Chip
                label="Izračun rate"
                filled
                onClick={() => sendMessage("Možeš mi izračunati ratu?")}
              />
              <Chip
                label="Probna vožnja"
                filled
                onClick={() => sendMessage("Želim probnu vožnju")}
              />
            </div>
          )}

          {stage === "car-detail" && selectedCar && !isTyping && (
            <>
              <p className="font-bold text-[13.3px] text-black pt-2">Što te zanima za ovaj auto:</p>
              <div className="flex flex-col gap-2.5">
                {SUGGESTIONS_CAR_DETAIL.map((s) => (
                  <SuggestionButton
                    key={s.id}
                    s={s}
                    onClick={() => sendMessage(s.text)}
                  />
                ))}
              </div>
              <div className="flex gap-2 pt-1 flex-wrap">
                <Chip
                  label="Usporedi s drugima"
                  filled
                  onClick={() => sendMessage("Možeš li usporediti s drugim vozilima?")}
                />
                <Chip
                  label="Pozovi prodavača"
                  filled
                  onClick={() => sendMessage("Kako mogu kontaktirati prodavača?")}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer – input */}
        <div className="flex-none p-3 md:p-4 border-t border-gray-100 bg-white">
          <div className="relative flex items-center bg-[#F7F7FC] rounded-full pl-4 md:pl-5 pr-1.5 py-1.5">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
              disabled={isTyping}
              placeholder={isTyping ? "AI piše..." : "Napiši poruku..."}
              className="flex-1 bg-transparent outline-none text-[14px] text-[#212529] placeholder-[#5F6D7A] py-2 disabled:opacity-60"
            />
            <button
              aria-label="Pošalji"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full flex-none hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#00CCFF" }}
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
