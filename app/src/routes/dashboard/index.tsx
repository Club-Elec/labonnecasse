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

const Index = () => {
  // Retrieve users
  const { data: users } = useQuery({
    queryKey: ["dashboard", "users"],
    queryFn: async () => {
      const response = await api.users.$get();

      return await response.json();
    },
    initialData: [],
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
          <h2 className="font-semibold">Catégories disponibles</h2>
        </Card>
        <Card className="row-span-2 row-start-3 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Caractéristiques disponibles</h2>
        </Card>
        <Card className="col-span-2 row-span-2 col-start-3 row-start-1 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Locations et emprunts</h2>
        </Card>
        <Card className="col-span-2 row-span-2 row-start-3 flex flex-col gap-2 p-2">
          <h2 className="font-semibold">Les actualités</h2>
        </Card>
        <Card className="col-start-5 row-start-1 flex flex-col gap-2 p-2">
          Stat 1
        </Card>
        <Card className="col-start-5 row-start-2 flex flex-col gap-2 p-2">
          Stat 2
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
