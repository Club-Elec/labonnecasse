import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  createFileRoute,
  Link,
  redirect,
  useParams,
} from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

const Index = () => {
  // Un hook permettant de récupérer les paramètres de l'URL
  // Ça correspond à l'$id.tsx dans nos fichiers.
  const { id } = useParams({ from: "/sales/$id" });

  const data = useMemo(
    () => ({
      images: [
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
        "/images/911_gt3_rs.webp",
      ],
    }),
    []
  );

  return (
    <div className="w-full h-auto flex flex-col">
      <Link to="/sales" className="flex">
        <Button variant={"link"} className="text-black text-2xl">
          <ChevronRight />
          Annonces
        </Button>

        <Button variant={"link"} className="text-black text-2xl pl-0">
          <ChevronRight />
          Annonce {id}
        </Button>
      </Link>

      <div className="h-auto w-full grid grid-cols-2 p-4 gap-2 overflow-x-hidden">
        <Carousel
          className="w-full col-span-2 md:col-span-1"
          opts={{ skipSnaps: true }}
        >
          <CarouselContent>
            {data.images.map((url, k) => (
              <CarouselItem key={`${url}-${k}`}>
                <img src={url} className="rounded-xl" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="absolute top-2 right-2" />
          <CarouselPrevious className="absolute top-2 left-2" />
        </Carousel>

        <div className={`hidden md:grid grid-cols-4 grid-rows-3 gap-2`}>
          {data.images.map((url, k) => (
            <img
              src={url}
              className="w-full h-full object-cover rounded-lg"
              key={`${url}-${k}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-auto grid md:grid-cols-2 p-4 gap-2">
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold">Véhicule {id}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            impedit nisi reprehenderit enim? Similique sit et sunt! Explicabo
            corrupti ullam autem perspiciatis, nam, asperiores itaque ipsum
            labore, dolores hic repellat.
          </p>

          <div className="flex justify-end gap-4">
            <Link href="tel:...">
              <Button className="text-black px-0" variant={"link"}>
                Appelez-moi
              </Button>
            </Link>

            <Link href="tel:...">
              <Button className="text-black px-0" variant={"link"}>
                Envoyez un email
              </Button>
            </Link>
          </div>
        </div>

        <Card className="flex-1 p-4">
          <div className="w-full flex flex-col gap-2">
            <p className="text-sm font-semibold">Caractéristiques</p>

            <div className="w-fit grid grid-rows-3 grid-flow-col gap-2">
              <p>
                <span className="font-semibold">Marque:</span> Porsche
              </p>
              <p>
                <span className="font-semibold">Modèle:</span> 911
              </p>
              <p>
                <span className="font-semibold">Année:</span> 2020
              </p>
              <p>
                <span className="font-semibold">Kilométrage:</span> 12000 km
              </p>
              <p>
                <span className="font-semibold">Carburant:</span> Essence
              </p>
              <p>
                <span className="font-semibold">Boîte de vitesse:</span>
                &nbsp; Automatique
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/sales/$id")({
  component: Index,

  // Vérifier que l'item existe, si ce n'est pas le cas, on doit rediriger...
  beforeLoad: () => {
    const exits = true;

    if (!exits) {
      // Si l'item n'existe pas, on redirige vers / ou une page 404 ?
      throw redirect({ to: "/" });
    }
  },
});
