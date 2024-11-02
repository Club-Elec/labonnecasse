import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const Sales = () => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Link to="/sales">
        <Button variant={"link"} className="text-black text-2xl">
          <ChevronRight className="w-8 h-8" />
          Annonces
        </Button>
      </Link>

      <div className="w-full h-auto flex flex-col gap-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => {
          return (
            <div
              className="w-auto h-auto flex flex-col sm:flex-row gap-2"
              key={`sales_${i}`}
            >
              <Link
                to="/sales/$id"
                params={{ id: i.toString() }}
                className="place-content-evenly"
              >
                <img
                  src="/images/911_gt3_rs.webp"
                  className="w-full sm:w-64 aspect-[4/3] bg-gray-300 rounded-lg object-cover"
                />
              </Link>

              <Card className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-col gap-2 px-4 py-2 w-full sm:max-w-96">
                  <h2 className="text-xl font-semibold">Véhicule {i}</h2>
                  <p className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Tempora impedit nisi reprehenderit enim? Similique sit et
                    sunt! Explicabo corrupti ullam autem perspiciatis, nam,
                    asperiores itaque ipsum labore, dolores hic repellat.
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">Prix: 13546 €</p>

                    <Link to="/rental/$id" params={{ id: i.toString() }}>
                      <Button className="p-0" variant={"link"}>
                        En savoir plus
                      </Button>
                    </Link>
                  </div>
                </div>

                <Separator className="h-px w-4/5 sm:w-px sm:h-4/5 place-self-center" />

                <div className="w-full flex flex-col gap-2 p-4">
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
                      <span className="font-semibold">Kilométrage:</span> 12000
                      km
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
          );
        })}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/sales/")({
  component: Sales,
});
