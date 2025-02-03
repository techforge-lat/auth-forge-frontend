import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/apps/$appCode")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/apps/$appCode"!</div>;
}
