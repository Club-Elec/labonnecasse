import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <div>Hello /dashboard/!</div>;
};

export const Route = createFileRoute("/dashboard/")({
  component: Index,

  // Vérification de l'utilisateur / authentification
  beforeLoad: () => null,
});
