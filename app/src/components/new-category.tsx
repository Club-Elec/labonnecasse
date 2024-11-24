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
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, ReactNode, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type NewCategoryProps = {
  children: ReactNode;
};

const NewCategory: FC<NewCategoryProps> = ({ children }) => {
  // Store the user input
  const [category, setCategory] = useState<string>("");

  // Store the user selected specifications
  const [specifications, setSpecifications] = useState<string[]>([]);

  // Retrieve the available specifications
  const { data: availableSpecifications } = useQuery({
    queryKey: ["dashboard", "specifications"],
    queryFn: async () => {
      const response = await api.settings.specifications.$get();

      return await response.json();
    },
    initialData: {},
  });

  // Request
  const { mutateAsync: createCategory } = useMutation({
    mutationKey: ["dashboard", "categories", "create"],
    mutationFn: async () => {
      const response = await api.settings.categories.$post({
        json: { name: category, specifications },
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      // Invalidate the categories query
      qc.invalidateQueries({ queryKey: ["dashboard", "categories"] });
    },
  });

  // Create a new category
  const create = useCallback(
    async () =>
      await createCategory(undefined, {
        onSuccess: () => {
          toast.success("Catégorie créée avec succès");
          setCategory("");
          setSpecifications([]);
        },
        onError: () => toast.error("Impossible de créer la catégorie"),
      }),
    [createCategory, setCategory]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
          <DialogDescription>
            Créez une nouvelle catégorie pour vos annonces et services
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-category-input">
              Nom de la catégorie
              <span className="ml-1 text-primary">*</span>
            </Label>
            <Input
              id="new-category-input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="new-category-specifications">
              Caractéristiques
            </Label>

            <Input
              id="new-category-specifications"
              type="text"
              value={specifications.join(", ")}
              placeholder="Aucune caractéristique"
              disabled
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Valeurs</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(availableSpecifications).map(
                  ([name, values]) => (
                    <TableRow key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{values.join(", ")}</TableCell>
                      <TableCell>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => {
                            if (specifications.includes(name)) {
                              setSpecifications((prev) =>
                                prev.filter((spec) => spec !== name)
                              );

                              return;
                            }

                            setSpecifications((prev) => [...prev, name]);
                          }}
                        >
                          {specifications.includes(name)
                            ? "Retirer"
                            : "Ajouter"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}

                {Object.keys(availableSpecifications).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>Aucune caractéristique.</TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
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
            disabled={category.length === 0 || category.trim() === ""}
          >
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategory;
