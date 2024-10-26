import { Button } from "@/components/ui/button";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <div className="w-dvw h-dvh overflow-hidden flex flex-col">
      <div className="w-full h-16 flex justify-between items-center gap-8 px-4 py-2">
        <Link to="/">
          <h1 className="text-xl font-semibold text-primary">La Bonne Casse</h1>
        </Link>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-end gap-4">
            <Link to="/">
              <Button variant={"link"} className="text-black">
                Actualités
              </Button>
            </Link>
            <Link to="/">
              <Button variant={"link"} className="text-black">
                Annonces
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 p-2 bg-primary rounded-lg">
            <Link href="https://www.instagram.com/lacasseisen/">
              <Instagram className="w-6 h-6 text-primary-foreground" />
            </Link>

            <Link href="mailto:...">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  ),
});
