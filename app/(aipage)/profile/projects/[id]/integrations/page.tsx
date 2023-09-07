import { fetchProjectById } from "@/utils/auth";
import { SetProject } from "@/hooks/useProject";
import ListIntegrations from "@/components/ListIntegrations";
import { cn } from "@/utils/helpers";

export default async function ProjectIntegrations({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const project = await fetchProjectById(params.id);
  const hasIntegrations = !!(project && project?.integrations?.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <SetProject project={project} />
      <div
        className={cn(
          hasIntegrations
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
            : "flex flex-col flex-1",
        )}
      >
        {hasIntegrations ? (
          <ListIntegrations project={project} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <h2 className="z-10 text-xl font-semibold text-gray-700">
              No Integrations yet
            </h2>
            <img
              alt="No links yet"
              loading="lazy"
              width={500}
              className="pointer-events-none blur-0"
              src="/no-project.png"
            />
          </div>
        )}
      </div>
    </div>
  );
}
