import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales/")({
  component: () => <div>Hello /sales/!</div>,
});
