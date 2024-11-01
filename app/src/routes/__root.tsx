import { Button } from "@/components/ui/button";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { User } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <div className="w-dvw h-dvh overflow-x-hidden overflow-y-auto flex flex-row flex-wrap">
      <div className="w-full h-16 flex justify-between items-center gap-8 px-4 py-2">
        <Link to="/">
          <h1 className="text-xl font-semibold text-primary">La Bonne Casse</h1>
        </Link>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-end gap-4">
            <Link to="/news">
              <Button variant={"link"} className="text-black">
                Actualités
              </Button>
            </Link>
            <Link to="/sales">
              <Button variant={"link"} className="text-black">
                Annonces
              </Button>
            </Link>
            <Link to="/rental">
              <Button variant={"link"} className="text-black">
                Locations / Emprunts
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 p-2 rounded-lg">
            <Link to="/">
              <Button variant={"link"} className="text-black">
                <User />
                Mon compte
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Outlet />

      <div className="w-full h-auto sm:h-48 flex flex-col sm:grid sm:grid-cols-5 gap-4 p-4 mt-4 bg-gray-200">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">À propos de nous</p>

          <Link>
            <Button variant={"link"} className="pl-0 text-black">
              Nos actualités
            </Button>
          </Link>

          <Link href="https://www.instagram.com/lacasseisen/">
            <Button variant={"link"} className="pl-0 text-black">
              Instagram
            </Button>
          </Link>

          <Link>
            <Button variant={"link"} className="pl-0 text-black">
              Facebook
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Nous contacter</p>

          <a href="mailto:...">
            <Button variant={"link"} className="pl-0 text-black">
              Envoyer un e-mail
            </Button>
          </a>

          <a href="tel:...">
            <Button variant={"link"} className="pl-0 text-black">
              Nous appeler
            </Button>
          </a>

          <a href="https://maps.app.goo.gl/wQ72yxUp8jEzojxR9">
            <Button variant={"link"} className="pl-0 text-black">
              Venir nous voir
            </Button>
          </a>
        </div>

        <div className="flex flex-col gap-4">pas fan du footer</div>

        <div className="flex flex-col gap-4"></div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Mentions légales</p>

          <Link>
            <Button variant={"link"} className="pl-0 text-black">
              Politique de confidentialité
            </Button>
          </Link>

          <Link>
            <Button variant={"link"} className="pl-0 text-black">
              Mentions légales
            </Button>
          </Link>

          <p className="font-semibold text-sm">
            © {new Date().getFullYear()} La Bonne Casse.
          </p>
        </div>
      </div>
    </div>
  ),
});
