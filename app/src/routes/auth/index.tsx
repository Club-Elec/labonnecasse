import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { LogIn } from "lucide-react";

const Auth = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <div className="relative flex-1 flex items-center justify-center">
        <img
          src="/images/911_gt3_rs.webp"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 min-w-96 w-full h-full sm:w-auto sm:h-auto flex flex-col gap-8 p-8 bg-white/30 backdrop-blur-md md:rounded-xl shadow-lg">
          <h1 className="text-4xl text-gray-800 font-bold">Se connecter</h1>

          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="votreemail@isen-ouest.yncrea.fr"
                name="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="Votre mot de passe"
                name="password"
              />
            </div>

            <Button
              className={
                "h-12 aspect-square self-end bg-primary/90 backdrop-blur-md"
              }
            >
              <span>Se connecter</span>
              <LogIn className="ml-2" />
            </Button>
          </form>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="relative z-10 min-w-96 w-full h-full sm:w-auto sm:h-auto flex flex-col gap-8 p-8 md:rounded-xl shadow-none md:shadow-lg">
          <h1 className="text-4xl text-gray-800 font-bold">S'inscrire</h1>

          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Votre nom</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="Lustu CRU"
                name="name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="votreemail@isen-ouest.yncrea.fr"
                name="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="Votre mot de passe"
                name="password"
              />
            </div>

            <Button
              className={
                "h-12 aspect-square self-end bg-primary/90 backdrop-blur-md"
              }
            >
              <span>Se connecter</span>
              <LogIn className="ml-2" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/auth/")({
  component: Auth,
});
