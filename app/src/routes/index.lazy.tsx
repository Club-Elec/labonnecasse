import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";

// Ce composant correspond à la page d'accueil comme serait l'index.html
// C'est cette page qui sera chargée par défaut
const Index = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-4">
      <div className="relative w-full flex items-center justify-center h-96 p-4">
        <img
          src="/images/911_gt3_rs.webp"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 w-full h-full sm:w-auto sm:h-auto flex flex-col gap-8 p-8 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
          <h1 className="text-4xl text-gray-800 font-bold">
            Rechercher votre prochain véhicule
          </h1>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-[2] flex flex-col gap-2">
              <Label htmlFor="search" className="text-black">
                Rechercher
              </Label>
              <Input
                className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg"
                placeholder="Recherche..."
                name="search"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="search" className="text-black">
                Catégorie
              </Label>
              <Select>
                <SelectTrigger className="min-w-48 h-12 bg-white/30 backdrop-blur-md rounded-lg">
                  <SelectValue
                    placeholder="Choisir une catégorie"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="voiture">Voiture</SelectItem>
                  <SelectItem value="camion">Camion</SelectItem>
                  <SelectItem value="tracteur">Tracteur</SelectItem>
                  <SelectItem value="bateau">Bateau</SelectItem>
                  <SelectItem value="avion">Avion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className={
                "h-12 aspect-square self-end bg-primary/90 backdrop-blur-md"
              }
            >
              <Search className="mr-2 sm:mr-0" />
              <span className="block sm:hidden">Rechercher</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link to="/sales">
          <Button variant={"link"} className="text-foreground text-2xl">
            <ChevronRight className="w-8 h-8" />
            Annonces
          </Button>
        </Link>

        <div className="w-full h-auto flex gap-2 px-4 overflow-x-hidden">
          <Carousel className="w-full" opts={{ skipSnaps: true }}>
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, i) => (
                <CarouselItem className="basis-[1/5]" key={`sales_${i}`}>
                  <Link to="/sales/$id" params={{ id: i.toString() }}>
                    <div className="flex flex-col gap-2">
                      <div className="w-48 aspect-[3/4] bg-gray-300 rounded-lg"></div>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">
                          Voiture {i} (Option sport)
                        </p>
                        <p className="text-sm">17450 €</p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext className="absolute top-2 right-2" />
            <CarouselPrevious className="absolute top-2 left-2" />
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link to="/news">
          <Button variant={"link"} className="text-foreground text-2xl">
            <ChevronRight className="w-8 h-8" />
            Actualités
          </Button>
        </Link>

        <div className="w-full h-auto flex gap-2 px-4 overflow-x-hidden">
          <Carousel className="w-full" opts={{ skipSnaps: true }}>
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, i) => (
                <CarouselItem className="basis-[1/3]" key={`sales_${i}`}>
                  <Link
                    to="/news/$id"
                    params={{ id: i.toString() }}
                    key={`actualite-${i}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="w-96 aspect-[4/3] bg-gray-300 rounded-lg"></div>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">Actualité {i}</p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext className="absolute top-2 right-2" />
            <CarouselPrevious className="absolute top-2 left-2" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
