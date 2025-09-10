"use client";

import { useState } from "react";
import Modal from "./Modal";

const defaultMoods = [
  "Cozy",
  "Adventurous",
  "Chill",
  "Romantic",
  "Lively",
  "Productive",
];

export default function MoodLocationCard() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  function toggleMood(mood: string) {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  }

  function useMockGps() {
    setLocation("Current location");
  }

  function onSubmit() {
    if (selectedMoods.length === 0) {
      setError("Select at least one mood.");
      return;
    }
    if (!location.trim()) {
      setError("Enter a location or use GPS.");
      return;
    }
    setError("");
    setOpen(true);
  }

  return (
    <div className="rounded-xl border border-border/60 bg-muted p-4 md:p-6">
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">What’s your mood?</div>
        <div className="flex flex-wrap gap-2">
          {defaultMoods.map((chip) => {
            const isActive = selectedMoods.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                onClick={() => toggleMood(chip)}
                className={`px-3 h-9 rounded-full border text-sm transition-colors ${
                  isActive
                    ? "bg-brand text-white border-brand hover:bg-brand-600"
                    : "border-border/60 bg-background hover:bg-muted/60"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Your location</div>
        <div className="flex gap-2">
          <input
            placeholder="Downtown, Brooklyn…"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 h-10 px-3 rounded-md border border-border/60 bg-background outline-none focus:ring-2 focus:ring-brand/40"
          />
          <button
            type="button"
            onClick={useMockGps}
            className="h-10 px-3 rounded-md border border-border/60"
          >
            Use my GPS
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
      <button onClick={onSubmit} className="w-full h-11 rounded-md bg-brand text-white hover:bg-brand-600 transition-colors">
        Get recommendations
      </button>

      {selectedMoods.length > 0 && (
        <div className="mt-3 text-xs text-muted">
          Selected: {selectedMoods.join(", ")}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Sign in required">
        <p className="text-muted">To see personalized recommendations and save them, please sign in or create an account.</p>
        <div className="mt-4 flex gap-2">
          <a href="/auth/login" className="h-9 px-4 rounded-md border border-border/60 inline-flex items-center justify-center">Sign in</a>
          <a href="/auth/signup" className="h-9 px-4 rounded-md bg-brand text-white inline-flex items-center justify-center hover:bg-brand-600">Create account</a>
        </div>
      </Modal>
    </div>
  );
} 