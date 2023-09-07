"use client";
import Button from "@/components/Button";
import useSearchParams from "@/hooks/useSearchParams";
import { ReactNode } from "react";
import AddIntegrationsModal from "@/components/AddIntegrationsModal";

export default function IntegrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { set } = useSearchParams();

  return (
    <>
      <AddIntegrationsModal />
      <div className="bg-gray-50 flex-1">
        <div className="flex h-36 items-center border-b border-gray-200 bg-white">
          <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl text-gray-600">Integrations</h1>
              </div>
              <Button
                onClick={() => set("integrationModal", "true")}
                variant="default"
              >
                Add Integration
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-10">
          {children}
        </div>
      </div>
    </>
  );
}
