/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Signature sonore opt-in : confirmations courtes, ambiance atelier indépendante et retours haptiques sans lecture automatique.
 */
import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AudioLines, MoonStar, SlidersHorizontal, Vibrate, Volume2, VolumeX, Waves } from "lucide-react";

type SoundKind = "tap" | "navigate" | "share" | "success" | "error" | "toggle";
type HapticKind = "success" | "error" | "tap";
type AmbienceMode = "atelier" | "calme" | "production";
type SoundContextValue = {
  enabled: boolean;
  activeAmbience: AmbienceMode | null;
  hapticsEnabled: boolean;
  volume: number;
  play: (kind: SoundKind, force?: boolean) => void;
  haptic: (kind: HapticKind) => void;
  toggle: () => void;
  selectAmbience: (mode: AmbienceMode) => void;
  toggleHaptics: () => void;
  setVolume: (value: number) => void;
};
const SoundDesignContext = createContext<SoundContextValue | undefined>(undefined);
const ambienceSources: Record<AmbienceMode, string> = {
  atelier: "/manus-storage/ets-pro-ambiance-atelier_5df43234.mp3",
  calme: "/manus-storage/ets-pro-ambiance-calme_8ca06fce.mp3",
  production: "/manus-storage/ets-pro-ambiance-production_6951dd4c.mp3",
};
const ambienceLabels: Record<AmbienceMode, string> = { atelier: "Atelier", calme: "Calme", production: "Production" };

const isReduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
const storedVolume = () => {
  const saved = localStorage.getItem("ets-pro-sound-volume");
  if (saved === null) return 36;
  const value = Number(saved);
  return Number.isFinite(value) && value >= 0 && value <= 100 ? value : 36;
};

function emitTone(context: AudioContext, kind: SoundKind, volume: number) {
  const now = context.currentTime;
  const presets: Record<SoundKind, { notes: number[]; duration: number; wave: OscillatorType; volume: number }> = {
    tap: { notes: [640], duration: 0.055, wave: "sine", volume: 0.028 },
    navigate: { notes: [440, 660], duration: 0.09, wave: "sine", volume: 0.032 },
    share: { notes: [523, 784], duration: 0.1, wave: "triangle", volume: 0.03 },
    success: { notes: [523, 659, 784], duration: 0.13, wave: "sine", volume: 0.035 },
    error: { notes: [220, 196], duration: 0.12, wave: "sine", volume: 0.024 },
    toggle: { notes: [587, 880], duration: 0.11, wave: "triangle", volume: 0.03 },
  };
  const preset = presets[kind];
  preset.notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.045;
    oscillator.type = preset.wave;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, preset.volume * (volume / 100)), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + preset.duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + preset.duration + 0.012);
  });
}

export function SoundDesignProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem("ets-pro-sound") === "on");
  const [activeAmbience, setActiveAmbience] = useState<AmbienceMode | null>(null);
  const [hapticsEnabled, setHapticsEnabled] = useState(() => localStorage.getItem("ets-pro-haptics") !== "off");
  const [volume, setVolumeState] = useState(storedVolume);
  const audioContext = useRef<AudioContext | null>(null);
  const ambienceAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { localStorage.setItem("ets-pro-sound", enabled ? "on" : "off"); }, [enabled]);
  useEffect(() => { localStorage.setItem("ets-pro-haptics", hapticsEnabled ? "on" : "off"); }, [hapticsEnabled]);
  useEffect(() => { localStorage.setItem("ets-pro-sound-volume", String(volume)); }, [volume]);
  useEffect(() => () => { ambienceAudio.current?.pause(); }, []);
  useEffect(() => { if (ambienceAudio.current) ambienceAudio.current.volume = Math.min(0.24, volume / 100 * 0.24); }, [volume]);

  const play = useCallback((kind: SoundKind, force = false) => {
    if ((!enabled && !force) || isReduced() || typeof window === "undefined" || !window.AudioContext) return;
    const context = audioContext.current ?? new window.AudioContext();
    audioContext.current = context;
    const emit = () => emitTone(context, kind, volume);
    if (context.state === "suspended") void context.resume().then(emit).catch(() => undefined);
    else emit();
  }, [enabled, volume]);

  const haptic = useCallback((kind: HapticKind) => {
    if (!hapticsEnabled || typeof navigator === "undefined" || !("vibrate" in navigator) || !window.matchMedia("(pointer: coarse)").matches) return;
    const patterns: Record<HapticKind, number | number[]> = { success: [14, 30, 28], error: [18, 26, 18], tap: 10 };
    navigator.vibrate(patterns[kind]);
  }, [hapticsEnabled]);

  const selectAmbience = useCallback((mode: AmbienceMode) => {
    const next = activeAmbience === mode ? null : mode;
    const audio = ambienceAudio.current ?? new Audio();
    ambienceAudio.current = audio;
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = Math.min(0.24, volume / 100 * 0.24);
    if (next) {
      audio.pause();
      audio.src = ambienceSources[next];
      audio.currentTime = 0;
      void audio.play().catch(() => setActiveAmbience(null));
      localStorage.setItem("ets-pro-ambience-mode", next);
    }
    else { audio.pause(); audio.currentTime = 0; }
    setActiveAmbience(next);
  }, [activeAmbience, volume]);

  const setVolume = useCallback((value: number) => setVolumeState(Math.max(0, Math.min(100, value))), []);

  useEffect(() => {
    const onInteraction = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest<HTMLElement>("[data-sound], button:not([disabled]), a[href], summary, [role='button']");
      if (!control || control.closest("[data-sound-ignore]")) return;
      const kind = (control.dataset.sound as SoundKind | undefined) ?? (control.classList.contains("share-action") ? "share" : control.matches("summary") ? "toggle" : control.matches("a") ? "navigate" : "tap");
      play(kind);
    };
    document.addEventListener("click", onInteraction, true);
    return () => document.removeEventListener("click", onInteraction, true);
  }, [play]);

  return <SoundDesignContext.Provider value={{ enabled, activeAmbience, hapticsEnabled, volume, play, haptic, toggle: () => setEnabled((value) => !value), selectAmbience, toggleHaptics: () => setHapticsEnabled((value) => !value), setVolume }}>{children}</SoundDesignContext.Provider>;
}

export function useSoundDesign() {
  const context = useContext(SoundDesignContext);
  if (!context) throw new Error("useSoundDesign must be used within SoundDesignProvider");
  return context;
}

export function SoundSettingsPanel() {
  const { activeAmbience, enabled, hapticsEnabled, haptic, play, selectAmbience, toggle, toggleHaptics, volume, setVolume } = useSoundDesign();
  const handleToggle = () => { const next = !enabled; toggle(); haptic("tap"); if (next) play("toggle", true); };
  const handleAmbience = (mode: AmbienceMode) => { selectAmbience(mode); haptic("tap"); };
  return <div data-sound-ignore className="sound-settings-panel mt-7 border p-3">
    <div className="flex items-center gap-1.5">
      <button type="button" onClick={handleToggle} aria-pressed={enabled} aria-label={enabled ? "Désactiver les sons d’interface" : "Activer les sons d’interface"} className={`sound-toggle inline-flex items-center gap-2 px-2.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] ${enabled ? "sound-toggle-active" : "sound-toggle-muted"}`}>{enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}<span className="hidden md:inline">Sons</span></button>
      <label className="sound-volume-control flex items-center gap-1.5" aria-label="Volume sonore"><AudioLines className="h-3.5 w-3.5" aria-hidden="true" /><input type="range" min="0" max="100" step="1" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume sonore" aria-valuetext={`${volume} %`} /><span className="hidden lg:inline">{volume}%</span></label>
      <button type="button" onClick={toggleHaptics} aria-pressed={hapticsEnabled} aria-label={hapticsEnabled ? "Désactiver les vibrations mobiles" : "Activer les vibrations mobiles"} className={`sound-haptic-toggle inline-flex items-center gap-1.5 px-2.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] ${hapticsEnabled ? "sound-haptic-active" : "sound-haptic-muted"}`}><Vibrate className="h-4 w-4" /><span className="hidden xl:inline">Vibre</span></button>
    </div>
    <div className="sound-ambience-row mt-1.5 flex items-center gap-1.5 border-t border-slate-200 pt-1.5">
      <span className="sound-ambience-label hidden text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-500 sm:inline">Ambiance</span>
      <button type="button" onClick={() => handleAmbience("atelier")} aria-pressed={activeAmbience === "atelier"} aria-label="Activer ou arrêter l’ambiance Atelier" className={`sound-ambience-toggle inline-flex items-center gap-1 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] ${activeAmbience === "atelier" ? "sound-ambience-active" : "sound-ambience-muted"}`}><Waves className="h-3.5 w-3.5" /><span className="hidden sm:inline">Atelier</span></button>
      <button type="button" onClick={() => handleAmbience("calme")} aria-pressed={activeAmbience === "calme"} aria-label="Activer ou arrêter l’ambiance Calme" className={`sound-ambience-toggle inline-flex items-center gap-1 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] ${activeAmbience === "calme" ? "sound-ambience-active" : "sound-ambience-muted"}`}><MoonStar className="h-3.5 w-3.5" /><span className="hidden sm:inline">Calme</span></button>
      <button type="button" onClick={() => handleAmbience("production")} aria-pressed={activeAmbience === "production"} aria-label="Activer ou arrêter l’ambiance Production" className={`sound-ambience-toggle inline-flex items-center gap-1 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] ${activeAmbience === "production" ? "sound-ambience-active" : "sound-ambience-muted"}`}><SlidersHorizontal className="h-3.5 w-3.5" /><span className="hidden sm:inline">Production</span></button>
      {activeAmbience && <span className="ambience-active-indicator ml-auto inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-cyan-800" role="status" aria-live="polite"><span aria-hidden />{ambienceLabels[activeAmbience]}</span>}
    </div>
  </div>;
}
