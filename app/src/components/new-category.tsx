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
import { Button } from "./ui/button";
import { toast } from "sonner";

type NewCategoryProps = {
  children: ReactNode;
};

const NewCategory: FC<NewCategoryProps> = ({ children }) => {
  // Store the user input
  const [category, setCategory] = useState<string>("");

  // Request
  const { mutateAsync: createCategory } = useMutation({
    mutationKey: ["dashboard", "categories", "create"],
    mutationFn: async () => {
      const response = await api.settings.categories.$post({
        json: { name: category },
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-category-input">Nom de la catégorie</Label>
          <Input
            id="new-category-input"
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
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
