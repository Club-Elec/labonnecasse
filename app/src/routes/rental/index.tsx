import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rental/')({
  component: () => <div>Hello /rental/!</div>,
})
