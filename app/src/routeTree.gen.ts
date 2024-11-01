/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchIndexImport } from './routes/search/index'
import { Route as SalesIndexImport } from './routes/sales/index'
import { Route as RentalIndexImport } from './routes/rental/index'
import { Route as NewsIndexImport } from './routes/news/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as SalesIdImport } from './routes/sales/$id'
import { Route as RentalIdImport } from './routes/rental/$id'
import { Route as NewsIdImport } from './routes/news/$id'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SearchIndexRoute = SearchIndexImport.update({
  id: '/search/',
  path: '/search/',
  getParentRoute: () => rootRoute,
} as any)

const SalesIndexRoute = SalesIndexImport.update({
  id: '/sales/',
  path: '/sales/',
  getParentRoute: () => rootRoute,
} as any)

const RentalIndexRoute = RentalIndexImport.update({
  id: '/rental/',
  path: '/rental/',
  getParentRoute: () => rootRoute,
} as any)

const NewsIndexRoute = NewsIndexImport.update({
  id: '/news/',
  path: '/news/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const SalesIdRoute = SalesIdImport.update({
  id: '/sales/$id',
  path: '/sales/$id',
  getParentRoute: () => rootRoute,
} as any)

const RentalIdRoute = RentalIdImport.update({
  id: '/rental/$id',
  path: '/rental/$id',
  getParentRoute: () => rootRoute,
} as any)

const NewsIdRoute = NewsIdImport.update({
  id: '/news/$id',
  path: '/news/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/news/$id': {
      id: '/news/$id'
      path: '/news/$id'
      fullPath: '/news/$id'
      preLoaderRoute: typeof NewsIdImport
      parentRoute: typeof rootRoute
    }
    '/rental/$id': {
      id: '/rental/$id'
      path: '/rental/$id'
      fullPath: '/rental/$id'
      preLoaderRoute: typeof RentalIdImport
      parentRoute: typeof rootRoute
    }
    '/sales/$id': {
      id: '/sales/$id'
      path: '/sales/$id'
      fullPath: '/sales/$id'
      preLoaderRoute: typeof SalesIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/news/': {
      id: '/news/'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof NewsIndexImport
      parentRoute: typeof rootRoute
    }
    '/rental/': {
      id: '/rental/'
      path: '/rental'
      fullPath: '/rental'
      preLoaderRoute: typeof RentalIndexImport
      parentRoute: typeof rootRoute
    }
    '/sales/': {
      id: '/sales/'
      path: '/sales'
      fullPath: '/sales'
      preLoaderRoute: typeof SalesIndexImport
      parentRoute: typeof rootRoute
    }
    '/search/': {
      id: '/search/'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/news/$id': typeof NewsIdRoute
  '/rental/$id': typeof RentalIdRoute
  '/sales/$id': typeof SalesIdRoute
  '/dashboard': typeof DashboardIndexRoute
  '/news': typeof NewsIndexRoute
  '/rental': typeof RentalIndexRoute
  '/sales': typeof SalesIndexRoute
  '/search': typeof SearchIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/news/$id': typeof NewsIdRoute
  '/rental/$id': typeof RentalIdRoute
  '/sales/$id': typeof SalesIdRoute
  '/dashboard': typeof DashboardIndexRoute
  '/news': typeof NewsIndexRoute
  '/rental': typeof RentalIndexRoute
  '/sales': typeof SalesIndexRoute
  '/search': typeof SearchIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/news/$id': typeof NewsIdRoute
  '/rental/$id': typeof RentalIdRoute
  '/sales/$id': typeof SalesIdRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/news/': typeof NewsIndexRoute
  '/rental/': typeof RentalIndexRoute
  '/sales/': typeof SalesIndexRoute
  '/search/': typeof SearchIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/news/$id'
    | '/rental/$id'
    | '/sales/$id'
    | '/dashboard'
    | '/news'
    | '/rental'
    | '/sales'
    | '/search'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/news/$id'
    | '/rental/$id'
    | '/sales/$id'
    | '/dashboard'
    | '/news'
    | '/rental'
    | '/sales'
    | '/search'
  id:
    | '__root__'
    | '/'
    | '/news/$id'
    | '/rental/$id'
    | '/sales/$id'
    | '/dashboard/'
    | '/news/'
    | '/rental/'
    | '/sales/'
    | '/search/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  NewsIdRoute: typeof NewsIdRoute
  RentalIdRoute: typeof RentalIdRoute
  SalesIdRoute: typeof SalesIdRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  NewsIndexRoute: typeof NewsIndexRoute
  RentalIndexRoute: typeof RentalIndexRoute
  SalesIndexRoute: typeof SalesIndexRoute
  SearchIndexRoute: typeof SearchIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  NewsIdRoute: NewsIdRoute,
  RentalIdRoute: RentalIdRoute,
  SalesIdRoute: SalesIdRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  NewsIndexRoute: NewsIndexRoute,
  RentalIndexRoute: RentalIndexRoute,
  SalesIndexRoute: SalesIndexRoute,
  SearchIndexRoute: SearchIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/news/$id",
        "/rental/$id",
        "/sales/$id",
        "/dashboard/",
        "/news/",
        "/rental/",
        "/sales/",
        "/search/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/news/$id": {
      "filePath": "news/$id.tsx"
    },
    "/rental/$id": {
      "filePath": "rental/$id.tsx"
    },
    "/sales/$id": {
      "filePath": "sales/$id.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/news/": {
      "filePath": "news/index.tsx"
    },
    "/rental/": {
      "filePath": "rental/index.tsx"
    },
    "/sales/": {
      "filePath": "sales/index.tsx"
    },
    "/search/": {
      "filePath": "search/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
