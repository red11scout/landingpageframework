import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { toast } from "sonner";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const token = searchParams.get("token") || "";

  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const verifyQuery = trpc.customAuth.verifyToken.useQuery(
    { token },
    {
      enabled: !!token,
      retry: false,
    }
  );

  useEffect(() => {
    if (verifyQuery.error) {
      toast.error(verifyQuery.error.message || "Invalid or expired reset link");
      setTimeout(() => setLocation("/login"), 2000);
    }
  }, [verifyQuery.error, setLocation]);

  const resetMutation = trpc.customAuth.resetPin.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("PIN reset successfully!");
      setTimeout(() => setLocation("/login"), 3000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset PIN");
    },
  });

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPin || !confirmPin) {
      toast.error("Please enter and confirm your new PIN");
      return;
    }

    if (newPin !== confirmPin) {
      toast.error("PINs do not match");
      return;
    }

    if (newPin.length !== 6) {
      toast.error("PIN must be exactly 6 digits");
      return;
    }

    resetMutation.mutate({ token, newPin });
  };

  if (!token) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 p-4">
        <Card className="p-8 max-w-md text-center">
          <p className="text-slate-600 dark:text-slate-400">Invalid reset link</p>
          <Button onClick={() => setLocation("/login")} className="mt-4">
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (verifyQuery.isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 p-4">
        <div className="w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-100 dark:bg-green-900/30 dark:border-green-800 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">PIN Reset Complete</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800 mb-4">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Reset Your PIN</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {verifyQuery.data?.email}
          </p>
        </div>

        {/* Reset Form */}
        <Card className="p-8 border-slate-200 dark:border-slate-800">
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPin">New 6-Digit PIN</Label>
              <Input
                id="newPin"
                type="password"
                placeholder="••••••"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
                disabled={resetMutation.isPending}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPin">Confirm PIN</Label>
              <Input
                id="confirmPin"
                type="password"
                placeholder="••••••"
                maxLength={6}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
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
                  Resetting...
                </>
              ) : (
                "Reset PIN"
              )}
            </Button>
          </form>
        </Card>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setLocation("/login")}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
