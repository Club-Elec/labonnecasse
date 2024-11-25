import SpecificationInput from "@/components/specification-input";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ImagesIcon, XIcon } from "lucide-react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

const New = () => {
  // Title of the sale
  const [title, setTitle] = useState<string>("");
  // Description of the sale
  const [description, setDescription] = useState<string>("");
  // Price of the sale
  const [price, setPrice] = useState<number>(0);

  // Category of the sale
  const [category, setCategory] = useState<string>("");

  // Specifications of the sale
  const [specifications, setSpecifications] = useState<Record<string, string>>(
    {}
  );

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
  const { data: availableSpecifications } = useQuery({
    queryKey: ["dashboard", "specifications", category],
    queryFn: async () => {
      const response = await api.settings.categories[":name"].$get({
        param: { name: category },
      });

      return await response.json();
    },
    initialData: {
      name: "",
      specifications: {},
    },
    enabled: category !== "",
  });

  // Create the sale
  const { mutateAsync: createSale } = useMutation({
    mutationKey: ["sales"],
    mutationFn: async () => {
      // Create a form data to upload the files
      const formData = new FormData();

      // Append the files to the form data
      files.forEach((file) => formData.append("images", file));

      // Append the sale data to the form data
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("category", category);
      formData.append("specifications", JSON.stringify(specifications));

      const response = await fetch(api.sales.$url(), {
        method: "POST",
        body: formData,
        headers: {
          Connection: "keep-alive",
        },
      });

      return await response.json();
    },
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

  // Handle the specification change
  const onSpecificationChange = useCallback(
    (key: string, value: string) =>
      setSpecifications((prev) => ({
        ...prev,
        [key]: value,
      })),
    [setSpecifications]
  );

  const onSubmit = useCallback(async () => await createSale(), [createSale]);

  return (
    <div className="w-full h-auto flex flex-col">
      <Link to="/sales" className="flex">
        <Button variant={"link"} className="text-foreground text-2xl">
          <ChevronRight />
          Création d'une annonce
        </Button>
      </Link>

      <div className="w-full h-auto flex flex-col items-center justify-center">
        <div className="h-auto w-[90%] flex flex-col md:grid grid-cols-2 p-4 gap-2 overflow-x-hidden">
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
            className={`w-full h-72 md:w-full md:max-h-72 grid grid-cols-4 justify-center self-center grid-rows-3 gap-2`}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              className="md:max-w-[60%]"
              placeholder="Description de l'annonce"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Label className="mt-4">Prix de l'annonce</Label>
            <Input
              type="number"
              placeholder="Prix de l'annonce"
              className="w-48"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
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
                {
                  // Map the specifications to inputs
                  Object.entries(availableSpecifications.specifications).map(
                    ([specification, values]) => (
                      <SpecificationInput
                        key={specification}
                        specification={specification}
                        values={values}
                        value={specifications[specification] || ""}
                        onValueChange={(v) =>
                          onSpecificationChange(specification, v)
                        }
                      />
                    )
                  )
                }

                {
                  // If there are no specifications, display a message
                  Object.keys(availableSpecifications.specifications).length ===
                  0 ? (
                    <p className="col-span-3 row-span-3 flex items-center justify-center text-sm text-foreground">
                      Aucune caractéristique pour cette catégorie
                    </p>
                  ) : null
                }
              </div>
            </div>
          </Card>

          <div className="flex gap-2 mt-4">
            <Link to="/">
              <Button variant={"outline"}>Annuler</Button>
            </Link>
            <Button
              className="bg-foreground hover:bg-foreground/90"
              onClick={onSubmit}
            >
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
