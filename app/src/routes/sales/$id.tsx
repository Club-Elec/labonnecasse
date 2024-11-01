import { createFileRoute, redirect, useParams } from '@tanstack/react-router'

const Index = () => {
  // Un hook permettant de récupérer les paramètres de l'URL
  // Ça correspond à l'$id.tsx dans nos fichiers.
  const { id } = useParams({ from: '/items/$id' })

  return <div>J'ai l'identifiant : {id}</div>
}

export const Route = createFileRoute('/sales/$id')({
  component: Index,

  // Vérifier que l'item existe, si ce n'est pas le cas, on doit rediriger...
  beforeLoad: () => {
    const exits = true

    if (!exits) {
      // Si l'item n'existe pas, on redirige vers / ou une page 404 ?
      throw redirect({ to: '/' })
    }
  },
})
