import { CheckCircle2, Download, Share as ShareIcon, WifiOff, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaStatus() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [online, setOnline] = useState(() => navigator.onLine);
  const [offlineReady, setOfflineReady] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [installed, setInstalled] = useState(() => window.matchMedia("(display-mode: standalone)").matches);
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => { setInstalled(true); setInstallPrompt(null); };
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    const onOfflineReady = () => setOfflineReady(true);
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("revolution-pwa-offline-ready", onOfflineReady);
    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("revolution-pwa-offline-ready", onOfflineReady);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) {
      if (isIos) setShowIosHelp(true);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstallPrompt(null);
  };

  const canOfferInstall = !installed && (Boolean(installPrompt) || isIos);

  return <>
    {!online && <div className="fixed inset-x-0 top-16 z-[60] flex items-center justify-center gap-2 bg-[#D8B76C] px-4 py-2 font-[var(--font-sans)] text-xs font-bold text-[#071522]"><WifiOff className="h-4 w-4" /> Offline mode — saved lessons and progress still work.</div>}
    {offlineReady && online && <button onClick={() => setOfflineReady(false)} className="fixed bottom-24 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#17344C] px-4 py-2.5 font-[var(--font-sans)] text-xs font-bold text-white shadow-2xl md:bottom-6"><CheckCircle2 className="h-4 w-4 text-[#78B087]" /> Ready offline <X className="ml-1 h-3.5 w-3.5 text-[#9AAAB6]" /></button>}
    {canOfferInstall && <button onClick={install} className="fixed bottom-24 right-4 z-[55] flex min-h-11 items-center gap-2 rounded-full bg-[#B83B3F] px-4 font-[var(--font-sans)] text-xs font-bold text-white shadow-2xl shadow-black/35 transition active:scale-95 md:bottom-6 md:right-6"><Download className="h-4 w-4" /> Install app</button>}
    {showIosHelp && <div className="fixed inset-0 z-[80] flex items-end bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-label="Install Revolution Nights"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#10283B] p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="font-[var(--font-sans)] text-[10px] font-bold uppercase tracking-[.18em] text-[#D95A5F]">Install on iPhone or iPad</p><h2 className="mt-1 text-2xl font-bold">Keep Revolution Nights on your home screen</h2></div><button onClick={() => setShowIosHelp(false)} aria-label="Close install instructions" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5"><X className="h-5 w-5" /></button></div><ol className="mt-6 space-y-4 text-sm leading-6 text-[#C8D2D9]"><li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17344C] font-bold">1</span><span>Open this site in Safari.</span></li><li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17344C] font-bold">2</span><span>Tap the <ShareIcon className="mx-1 inline h-4 w-4" /> Share button.</span></li><li className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17344C] font-bold">3</span><span>Choose <strong className="text-white">Add to Home Screen</strong>.</span></li></ol></div></div>}
  </>;
}
