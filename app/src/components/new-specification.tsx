import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { qc } from "@/lib/query";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode, useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type NewSpecificationProps = {
  children: ReactNode;
};

const NewSpecification: FC<NewSpecificationProps> = ({ children }) => {
  // Store the user input
  const [specification, setSpecification] = useState<string>("");
  const [values, setValues] = useState<string>("");

  // Request
  const { mutateAsync: createSpecification } = useMutation({
    mutationKey: ["dashboard", "specifications", "create"],
    mutationFn: async () => {
      const response = await api.settings.specifications.$post({
        json: {
          name: specification,
          values: values.split(",").map((v) => v.trim()),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create specification");
      }

      // Invalidate the specifications query
      qc.invalidateQueries({ queryKey: ["dashboard", "specifications"] });
    },
  });

  // Create a new Specification
  const create = useCallback(
    async () =>
      await createSpecification(undefined, {
        onSuccess: () => {
          toast.success("Caractéristique créée avec succès !");
          setSpecification("");
          setValues("");
        },
        onError: () => toast.error("Impossible de créer la caractéristique !"),
      }),
    [createSpecification, setSpecification, setValues]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle caractéristique</DialogTitle>
          <DialogDescription>
            Créez une nouvelle caractéristique pour vos annonces et services
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-specification-input">
              Nom de la caractéristique
              <span className="ml-1 text-primary">*</span>
            </Label>
            <Input
              id="new-specification-input"
              type="text"
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="new-specification-values">
              Valeur(s) associée(s)
            </Label>
            <Input
              id="new-specification-values"
              type="text"
              placeholder="Valeur(s) associée(s) séparée(s) par une virgule (,)"
              value={values}
              onChange={(e) => setValues(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Annuler
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"outline"}
            onClick={create}
            disabled={specification.length === 0 || specification.trim() === ""}
          >
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSpecification;
