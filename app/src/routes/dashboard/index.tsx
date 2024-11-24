import NewCategory from "@/components/new-category";
import NewSpecification from "@/components/new-specification";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { qc } from "@/lib/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

const Index = () => {
  // Retrieve categories
  const { data: categories } = useQuery({
    queryKey: ["dashboard", "categories"],
    queryFn: async () => {
      const response = await api.settings.categories.$get();

      return await response.json();
    },
    initialData: [],
  });

  // Retrieve specifications
  const { data: specifications } = useQuery({
    queryKey: ["dashboard", "specifications"],
    queryFn: async () => {
      const response = await api.settings.specifications.$get();

      return await response.json();
    },
    initialData: {},
  });

  // Retrieve users
  const { data: users } = useQuery({
    queryKey: ["dashboard", "users"],
    queryFn: async () => {
      const response = await api.users.$get();

      return await response.json();
    },
    initialData: [],
  });

  // Retrieve analytics
  const { data: analytics } = useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: async () => {
      const response = await api.analytics.$get();

      return await response.json();
    },
    initialData: {
      users: 0,
    },
  });

  // Remove category
  const { mutateAsync: removeCategory } = useMutation({
    mutationKey: ["dashboard", "categories", "remove"],
    mutationFn: async (name: string) => {
      const response = await api.settings.categories[":name"].$delete({
        param: { name },
      });

      if (!response.ok) {
        throw new Error("Failed to remove category");
      }

      // Invalidate the categories query
      qc.invalidateQueries({ queryKey: ["dashboard", "categories"] });
    },
  });

  // Remove specification
  const { mutateAsync: removeSpecification } = useMutation({
    mutationKey: ["dashboard", "specifications", "remove"],
    mutationFn: async (name: string) => {
      const response = await api.settings.specifications[":name"].$delete({
        param: { name },
      });

      if (!response.ok) {
        throw new Error("Failed to remove category");
      }

      // Invalidate the specifications query
      qc.invalidateQueries({ queryKey: ["dashboard", "specifications"] });
    },
  });

  // Update user account (disable / enable)
  const { mutateAsync: updateUserAccount } = useMutation({
    mutationKey: ["dashboard", "users", "update"],
    mutationFn: async (props: {
      id: number;
      disabled: "enabled" | "disabled";
    }) => {
      const response = await api.users[":id"].$patch({
        param: { id: props.id.toString() },
        query: { status: props.disabled },
      });

      if (!response.ok) {
        throw new Error("Failed to update user account");
      }

      // Invalidate the users query
      qc.invalidateQueries({ queryKey: ["dashboard", "users"] });

      return await response.json();
    },
  });

  return (
    <div className="w-full h-[calc(100%-64px)] flex">
      <div className="w-full h-full flex flex-col md:grid grid-cols-5 grid-rows-4 gap-2 p-4">
        <Card className="col-span-2 row-span-2 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Toutes les annonces</h2>
        </Card>
        <Card className="row-span-2 row-start-3 flex flex-col gap-2 p-2">
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-semibold">Catégories disponibles</h2>
            <NewCategory>
              <Button variant={"ghost"} size={"icon"}>
                <PlusIcon className="w-4 h-4" />
              </Button>
            </NewCategory>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(({ name }) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => removeCategory(name)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>Aucune catégorie</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </Card>
        <Card className="row-span-2 row-start-3 flex flex-col gap-2 p-2">
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-semibold">Caractéristiques disponibles</h2>
            <NewSpecification>
              <Button variant={"ghost"} size={"icon"}>
                <PlusIcon className="w-4 h-4" />
              </Button>
            </NewSpecification>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Valeurs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(specifications).map(([name, values]) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{values.join(", ")}</TableCell>
                  <TableCell>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => removeSpecification(name)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {Object.keys(specifications).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>Aucune caractéristique</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </Card>
        <Card className="col-span-2 row-span-2 col-start-3 row-start-1 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Locations et emprunts</h2>
        </Card>
        <Card className="col-span-2 row-span-2 row-start-3 flex flex-col gap-2 p-2">
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-semibold">Les actualités</h2>
            <Button variant={"ghost"} size={"icon"}>
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </Card>
        <Card className="col-start-5 row-start-1 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Utilisateurs actifs</h2>
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-semibold text-4xl">{analytics.users}</p>
          </div>
        </Card>
        <Card className="col-start-5 row-start-2 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Utilisateurs actifs</h2>
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-semibold text-4xl">{analytics.users}</p>
          </div>
        </Card>
        <Card className="row-span-2 col-start-5 row-start-3 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Les utilisateurs</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() =>
                        updateUserAccount({
                          id: user.id,
                          disabled: user.disabled ? "enabled" : "disabled",
                        })
                      }
                    >
                      {user.disabled ? "Réactiver" : "Désactiver"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>Aucun utilisateur</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/dashboard/")({
  component: Index,

  // Vérification de l'utilisateur / authentification
  beforeLoad: () => null,
});
