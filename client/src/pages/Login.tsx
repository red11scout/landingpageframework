import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [showReset, setShowReset] = useState(false);

  const loginMutation = trpc.customAuth.login.useMutation({
    onSuccess: () => {
      toast.success("Login successful!");
      setLocation("/");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid email or PIN");
    },
  });

  const resetMutation = trpc.customAuth.requestReset.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setShowReset(false);
    },
    onError: () => {
      toast.error("Failed to send reset link");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pin) {
      toast.error("Please enter both email and PIN");
      return;
    }
    loginMutation.mutate({ email, pin });
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    resetMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800 mb-4">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">AI Hub</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Intelligence, Refined.</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border-slate-200 dark:border-slate-800">
          {!showReset ? (
            <>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Sign In</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loginMutation.isPending}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin">6-Digit PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="••••••"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                    disabled={loginMutation.isPending}
                    className="h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot your PIN?
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Reset PIN</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Enter your email to receive a reset link
              </p>
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={resetMutation.isPending}
                    className="h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={resetMutation.isPending}
                >
                  {resetMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowReset(false)}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Back to Sign In
                </button>
              </div>
            </>
          )}
        </Card>

        <p className="text-xs text-center text-slate-400 dark:text-slate-600 mt-6">
          Access is restricted to authorized users only
        </p>
      </div>
    </div>
  );
}
