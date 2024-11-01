import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rental/$id")({
  component: () => <div>Hello /rental/$id!</div>,
});
