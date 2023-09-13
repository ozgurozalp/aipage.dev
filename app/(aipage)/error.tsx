"use client";

import Button from "@/components/Button";

export default function ErrorPage() {
  return (
    <div className="flex space-y-6 flex-col w-full min-h-screen bg-gradient-to-b from-white via-white to-slate-300 mx-auto px-4 md:px-16 lg:px-24 overflow-hidden items-center pt-24 md:pt-36">
      <p className="text-4xl">Something went wrong</p>
      <Button variant="pill" onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
    </div>
  );
}
