import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, Mail, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const [newEmail, setNewEmail] = useState("");
  const utils = trpc.useUtils();

  const { data: authorizedEmails, isLoading } = trpc.admin.listAuthorizedEmails.useQuery();

  const addEmailMutation = trpc.admin.addAuthorizedEmail.useMutation({
    onSuccess: () => {
      toast.success("Email added successfully");
      setNewEmail("");
      utils.admin.listAuthorizedEmails.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add email");
    },
  });

  const removeEmailMutation = trpc.admin.removeAuthorizedEmail.useMutation({
    onSuccess: () => {
      toast.success("Email removed successfully");
      utils.admin.listAuthorizedEmails.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove email");
    },
  });

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    addEmailMutation.mutate({ email: newEmail.trim() });
  };

  const handleRemoveEmail = (id: number, email: string) => {
    if (confirm(`Are you sure you want to remove ${email}?`)) {
      removeEmailMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage authorized users who can access the AI Hub
          </p>
        </div>

        {/* Add Email Form */}
        <Card className="p-6 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Authorized Email
          </h2>
          <form onSubmit={handleAddEmail} className="flex gap-3">
            <Input
              type="email"
              placeholder="user@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={addEmailMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {addEmailMutation.isPending ? "Adding..." : "Add Email"}
            </Button>
          </form>
        </Card>

        {/* Authorized Emails List */}
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Authorized Emails ({authorizedEmails?.length || 0})
          </h2>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : authorizedEmails && authorizedEmails.length > 0 ? (
            <div className="space-y-2">
              {authorizedEmails.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {item.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Added {item.addedBy ? `by ${item.addedBy}` : "by system"} on{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEmail(item.id, item.email)}
                    disabled={removeEmailMutation.isPending}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No authorized emails yet. Add one above to get started.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
