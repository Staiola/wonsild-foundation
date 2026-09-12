import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("editorial-theme") === "dark" || (!localStorage.getItem("editorial-theme") && matchMedia("(prefers-color-scheme: dark)").matches); } catch { return false; }
  });
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return <Button variant="ghost" size="icon" aria-label={dark ? "Use light theme" : "Use dark theme"} onClick={() => { const value = !dark; setDark(value); try { localStorage.setItem("editorial-theme", value ? "dark" : "light"); } catch { /* Preference remains in memory. */ } }}>{dark ? <Sun /> : <Moon />}</Button>;
}

