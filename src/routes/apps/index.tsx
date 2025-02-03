import Loader from "@/components/loader";
import { transformSearchParams } from "@/lib/criteria";
import { AppListPage } from "@/modules/app/query/app-list-page";
import { findAllQueryOptions } from "@/modules/app/query/services/query-options";
import { searchSchema } from "@/types/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/apps/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context: { queryClient }, deps: { search } }) => {
    await queryClient.ensureQueryData(
      findAllQueryOptions(transformSearchParams(search)),
    );
  },
  pendingComponent: () => <Loader />,
  component: () => (
    <main className="flex justify-center w-screen h-screen mt-24">
      <div className="container ml-auto mr-auto">
        <AppListPage />
      </div>
    </main>
  ),
});
