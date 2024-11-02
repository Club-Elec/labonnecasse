import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, TicketCheck, TicketX } from "lucide-react";

const Rental = () => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Link to="/rental">
        <Button variant={"link"} className="text-black text-2xl">
          <ChevronRight className="w-8 h-8" />
          Locations / Emprunts
        </Button>
      </Link>

      <div className="w-full h-auto flex flex-wrap gap-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => {
          const isAvailable = Math.random() > 0.5;

          return (
            <Card
              className="w-auto h-auto flex flex-col sm:flex-row"
              key={`rental_${i}`}
            >
              <Link to="/rental/$id" params={{ id: i.toString() }}>
                <img
                  src="/images/911_gt3_rs.webp"
                  className="w-full sm:w-64 aspect-[4/3] bg-gray-300 rounded-lg object-cover"
                />
              </Link>

              <div className="flex flex-col gap-2 px-4 py-2 w-full sm:max-w-96">
                <h2 className="text-xl font-semibold">Objet {i}</h2>
                <p className="text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempora impedit nisi reprehenderit enim? Similique sit et
                  sunt! Explicabo corrupti ullam autem perspiciatis, nam,
                  asperiores itaque ipsum labore, dolores hic repellat.
                </p>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex gap-2 font-semibold">
                    {isAvailable ? <TicketCheck /> : <TicketX />}
                    {isAvailable ? "Disponible" : "Indisponible"}
                  </p>

                  <Link to="/rental/$id" params={{ id: i.toString() }}>
                    <Button className="p-0" variant={"link"}>
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/rental/")({
  component: Rental,
});
