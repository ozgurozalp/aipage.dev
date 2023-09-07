"use client";
import useSearchParams from "@/hooks/useSearchParams";
import Modal from "@/components/Modal";
import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/loadingSpinner";
import Image from "next/image";
import Switch from "@/components/Switch";
import { useParams, useRouter } from "next/navigation";
import useProject from "@/hooks/useProject";
import { APIError } from "altogic";
import { IntegrationType } from "@/types";
import { cn } from "@/utils/helpers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleMaps from "@/components/GoogleMaps";

export default function AddIntegrationsModal() {
  const { deleteByKey, has } = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState<IntegrationType | null>(null);
  const [error, setError] = useState<APIError | null>(null);
  const { id } = useParams();
  const { addIntegration } = useProject();
  const { refresh } = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
      name,
      token,
      type,
    };

    setLoading(true);
    setHasError(false);
    try {
      const res = await fetch(`/api/project/${id}/integration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { errors, data: integrationFromAPI } = await res.json();

      if (!errors) {
        close();
        addIntegration(integrationFromAPI);
        refresh();
      } else {
        setHasError(true);
        setError(errors);
      }
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  console.log(type);

  function close() {
    setName("");
    setToken("");
    setType(null);
    deleteByKey("integrationModal");
    setError(null);
    setHasError(false);
  }

  return (
    <Modal
      close={close}
      isOpen={has("integrationModal")}
      className="p-0 sm:w-[400px] w-[96%]"
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center space-y-3 border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-10">
          <h3 className="text-lg font-semibold">Add Integration</h3>
        </div>
        <div className="bg-gray-50 p-4 space-y-4 border-t">
          <div className="space-y-2">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700"
            >
              Integration Type
            </label>
            <div className="relative grid grid-cols-4 gap-4">
              <label
                className={cn(
                  type === "maps" && "ring-2",

                  "hover:ring-2 cursor-pointer ring-offset-2 ring-slate-500 border flex items-center justify-center p-2 rounded aspect-square",
                )}
              >
                <GoogleMaps className="max-h-full" />
                <input
                  type="radio"
                  name="type"
                  value="maps"
                  onChange={(e) => setType(e.target.value as IntegrationType)}
                  className="hidden"
                  required
                />
              </label>
              <label
                className={cn(
                  type === "analytics" && "ring-2",
                  "hover:ring-2 cursor-pointer ring-offset-2 ring-slate-500 border flex items-center justify-center p-2 rounded aspect-square",
                )}
              >
                <GoogleAnalytics className="max-h-full" />
                <input
                  type="radio"
                  name="type"
                  value="analytics"
                  onChange={(e) => setType(e.target.value as IntegrationType)}
                  className="hidden"
                  required
                />
              </label>
              <label
                className={cn(
                  "cursor-pointer ring-offset-2 ring-slate-500 border flex items-center justify-center p-2 rounded aspect-square",
                )}
              />
              <label
                className={cn(
                  "cursor-pointer ring-offset-2 ring-slate-500 border flex items-center justify-center p-2 rounded aspect-square",
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700"
            >
              Integration Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md focus:outline-none sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700"
            >
              Integration Token or API Key
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                autoComplete="off"
                className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md focus:outline-none sm:text-sm"
                required
              />
            </div>
          </div>

          {hasError && (
            <div className="py-2">
              {error && error.items.length > 0 ? (
                error?.items.map((item) => (
                  <h2 className="text-red-500 text-sm">{item.message}</h2>
                ))
              ) : (
                <h2 className="text-red-500 text-sm">
                  There was an error adding your domain. Please try again later.
                </h2>
              )}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="light" onClick={close}>
              Cancel
            </Button>
            <Button
              className="gap-2"
              type="submit"
              disabled={loading || !type}
              variant="default"
            >
              {loading && <LoadingSpinner className="h-4 w-4" />}
              Add Integration
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
