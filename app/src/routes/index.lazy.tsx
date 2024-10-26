import { useHealthz } from "@/api/apiComponents";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";

// Ce composant correspond à la page d'accueil comme serait l'index.html
// C'est cette page qui sera chargée par défaut
const Index = () => {
  // On utilise un hook qui requête sur l'api
  // Il est générer automatiquement lors du npm run gen:queries
  const { data, isLoading } = useHealthz({});

  return (
    <div>
      <p>Hello /!</p>
      <p>
        Etat du serveur:{" "}
        {isLoading ? "Chargement en cours..." : (data?.status ?? "Inconnu")}
      </p>

      <Button>Je suis un bouton !</Button>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
