import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ImagesIcon, XIcon } from "lucide-react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

const New = () => {
  // Category of the sale
  const [category, setCategory] = useState<string>("");

  // Files to upload
  const [files, setFiles] = useState<File[]>([]);

  // Retrieve the categories
  const { data: categories } = useQuery({
    queryKey: ["dashboard", "categories"],
    queryFn: async () => {
      const response = await api.settings.categories.$get();

      return await response.json();
    },
    initialData: [],
  });

  // Retrieve the specifications associated with the category
  const { data: specifications } = useQuery({
    queryKey: ["dashboard", "specifications", category],
    queryFn: async () => {
      const response = await api.settings.categories[":name"].$get({
        param: { name: category },
      });

      return await response.json();
    },
    initialData: {
      name: "",
      specifications: [],
    },
    enabled: category !== "",
  });

  // Create previews of the images
  const previews = useMemo(
    () =>
      files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    [files]
  );

  // Handle the file input change
  const onAddFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setFiles((prev) => [...prev, ...files]);
  }, []);

  // Handle the image deletion
  const onDeleteImage = useCallback(
    (name: string) => {
      setFiles((prev) => prev.filter((file) => file.name !== name));
    },
    [setFiles]
  );

  return (
    <div className="w-full h-auto flex flex-col">
      <Link to="/sales" className="flex">
        <Button variant={"link"} className="text-foreground text-2xl">
          <ChevronRight />
          Création d'une annonce
        </Button>
      </Link>

      <div className="w-full h-auto flex flex-col items-center justify-center">
        <div className="h-auto w-[90%] grid grid-cols-2 p-4 gap-2 overflow-x-hidden">
          <label
            htmlFor="file-picker"
            className="w-full h-72 col-span-2 md:col-span-1 flex items-center justify-center border border-foreground/30 rounded-lg hover:bg-foreground/10 cursor-pointer transition-colors"
          >
            <ImagesIcon className="w-4 h-4 mr-2" />
            Ajouter des images
            <Input
              id="file-picker"
              type="file"
              className="hidden"
              multiple
              onChange={onAddFiles}
            />
          </label>

          <div
            className={`hidden w-3/4 h-3/4 md:grid grid-cols-4 justify-center self-center grid-rows-3 gap-2`}
          >
            {previews.map(({ name, url }, k) => (
              <div className="relative" key={`${name}-${k}`}>
                <img
                  src={url}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div
                  className="absolute top-1 right-1 p-1 backdrop-blur-md bg-background/50 rounded-lg hover:bg-background/70 transition ease-in-out duration-200 cursor-pointer"
                  onClick={() => onDeleteImage(name)}
                >
                  <XIcon className="w-4 h-4 text-foreground" />
                </div>
              </div>
            ))}

            {Array.from({ length: 12 - previews.length }).map((_, k) => (
              <div
                className="w-full h-full rounded-lg border border-foreground/20"
                key={`image-placeholder-${k}`}
              />
            ))}
          </div>
        </div>

        <div className="w-[90%] h-auto flex-col p-4 gap-2">
          <div className="flex-1 flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Titre de l'annonce"
              className="text-xl min-w-48 max-w-96"
            />
            <Textarea
              className="md:max-w-[60%]"
              placeholder="Description de l'annonce"
            />
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Label className="w-auto">Catégorie de l'annonce</Label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Choisir une catégorie"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ name }) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="w-fit flex-1 p-4 mt-2">
            <div className="w-auto flex flex-col gap-2">
              <p className="text-sm font-semibold">Caractéristiques</p>

              <div className="w-fit grid grid-rows-3 grid-flow-col gap-4">
                {specifications.specifications.map((spec) => (
                  <div key={spec} className="flex flex-col gap-2">
                    <Label className="w-auto">{spec}</Label>
                    <Input type="text" placeholder="Valeur" />
                  </div>
                ))}

                {specifications.specifications.length === 0 ? (
                  <p className="col-span-3 row-span-3 flex items-center justify-center text-sm text-foreground">
                    Aucune caractéristique pour cette catégorie
                  </p>
                ) : null}
              </div>
            </div>
          </Card>

          <div className="flex gap-2 mt-4">
            <Link to="/">
              <Button variant={"outline"}>Annuler</Button>
            </Link>
            <Button className="bg-foreground hover:bg-foreground/90">
              Créer l'annonce
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/sales/new")({
  component: New,
});
