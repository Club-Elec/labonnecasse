import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/')({
  beforeLoad: () => {
    // On ne souhaite rien faire quand l'utilisateur va sur /items, alors on redirige vers /
    throw redirect({ to: '/' })
  },
})
