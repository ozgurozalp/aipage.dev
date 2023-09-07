"use client";
import Badge, { BadgeVariant } from "@/components/Badge";
import { Project } from "@/types";
import GoogleMaps from "@/components/GoogleMaps";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import useProject, { SetProject } from "@/hooks/useProject";
import { useEffect, useMemo, useRef, useState } from "react";

interface ListIntegrationsProps {
  project: Project | null;
}

export default function ListIntegrations({ project }: ListIntegrationsProps) {
  const firstRender = useRef(false);
  const _project = useProject((state) => state.project);

  const list = useMemo(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return project;
    } else {
      return _project;
    }
  }, [_project]);

  return (
    <>
      {list?.integrations?.map((integration) => (
        <div
          key={integration._id}
          className="flex h-full flex-col space-y-10 rounded-lg border border-gray-100 bg-white p-4 sm:p-6 transition-all"
        >
          <div className="flex flex-1 items-start justify-between gap-1">
            <div className="flex space-x-3 flex-1">
              {integration.type === "maps" && (
                <GoogleMaps className="w-10 h-10" />
              )}
              {integration.type === "analytics" && (
                <GoogleAnalytics className="w-10 h-10" />
              )}
              <div className="flex-1">
                <h2 className="text-lg leading-[1.2] font-medium text-gray-700 truncate max-w-[15ch] md:max-w-[10ch] lg:max-w-[15ch] xl:max-w-[15ch]">
                  {integration?.name}
                </h2>
                <div className="flex items-center">
                  <p className="text-gray-500 text-sm leading-[1]">
                    {integration.token}
                  </p>
                </div>
              </div>
            </div>
            <Badge
              variant={badgeMap[integration.status ?? "inactive"]}
              text={integration.status ?? "inactive"}
            />
          </div>
        </div>
      ))}
    </>
  );
}

const badgeMap: Record<string, BadgeVariant> = {
  inactive: "black",
  active: "green",
};
