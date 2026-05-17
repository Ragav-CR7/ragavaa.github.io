"use client";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { toast } from "sonner";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark">("dark");

  useEffect(() => {
    // Always set to dark mode
    document.documentElement.dataset.theme = "dark";
    try {
      localStorage.setItem("theme", "dark");
    } catch {}
  }, []);

  const handleClick = () => {
    toast("Space is always dark ✨", {
      description: "The cosmos doesn't do light mode",
      duration: 3000,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="theme-orb"
      aria-label="Theme toggle"
      title="Dark mode"
    >
      <span className="theme-orb-icon is-moon">
        <Moon size={16} strokeWidth={1.5} />
      </span>
    </button>
  );
}
