import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";

const Index = () => {
  // On utilise ce hook pour récupèrer les query params de l'url
  const params = useSearch({ from: "/search/" });

  return <div>Hello /search/?query={params.query}</div>;
};

// Zod est une librairie de validation au runtime, ça permet d'éviter les erreurs liées aux utilisateurs
const searchParams = z.object({
  query: z.string().optional(),

  // on peut ajouter d'autres options...
});

export const Route = createFileRoute("/search/")({
  component: Index,

  // on valide les search params de l'url
  validateSearch: (s) => searchParams.parse(s),
});
