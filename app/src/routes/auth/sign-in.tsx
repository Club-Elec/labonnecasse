import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutateAsync: signIn } = useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await api.auth["sign-in"].$post({
        json: { email, password },
      });

      return await response.json();
    },
  });

  const onSignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      // Prevent the form from submitting
      e.preventDefault();

      await signIn({ email, password });
    },
    [signIn, email, password]
  );

  return (
    <div className="w-full h-full flex">
      <div className="relative flex-1 flex items-center justify-center">
        <img
          src="/images/911_gt3_rs.webp"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 min-w-96 w-full h-full sm:w-auto sm:h-auto flex flex-col justify-center gap-8 p-8 bg-white/30 backdrop-blur-md md:rounded-xl shadow-lg">
          <h1 className="text-4xl text-gray-800 font-bold">Se connecter</h1>

          <form className="flex flex-col gap-2" onSubmit={onSignIn}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="votreemail@isen-ouest.yncrea.fr"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="Votre mot de passe"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/auth/sign-up">
              <Button size={"sm"} variant={"link"} className="px-0 text-black">
                Créer un compte
              </Button>
            </Link>

            <Button
              className={
                "h-12 aspect-square self-end bg-primary/90 backdrop-blur-md"
              }
              type="submit"
            >
              <span>Se connecter</span>
              <LogIn className="ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/auth/sign-in")({
  component: SignIn,
});
