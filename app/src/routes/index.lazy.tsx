import { useHealthz } from "@/api/apiComponents";
import { createLazyFileRoute } from "@tanstack/react-router";

// Ce composant correspond à la page d'accueil comme serait l'index.html
// C'est cette page qui sera chargée par défaut
const Index = () => {
  // On utilise un hook qui requête sur l'api
  // Il est générer automatiquement lors du npm run gen:queries
  const { data, isLoading } = useHealthz({});

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        {isLoading ? <p>Loading...</p> : <p>Healthz: {data?.status}</p>}
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
