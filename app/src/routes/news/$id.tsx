import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/news/$id')({
  component: () => <div>Hello /news/$id!</div>,
})
