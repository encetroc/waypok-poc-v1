import {
  Outlet,
  RouterProvider,
  Link,
  ReactRouter,
  Route,
  RootRoute,
} from '@tanstack/react-router'

import {
  ListVehicles,
  CreateVehicleForm,
  Home,
  CreateShipmentForm,
  ListShipments,
  BookTripForm,
} from '@/pages'
import { StoreContext } from '@/context'

const routes = [
  {
    path: '/',
    label: 'home',
    component: Home,
  },
  {
    path: '/create-vehicle',
    label: 'create vehicle',
    component: CreateVehicleForm,
  },
  {
    path: '/list-vehicle',
    label: 'list vehicles',
    component: ListVehicles,
  },
  {
    path: '/create-shipment',
    label: 'create shipment',
    component: CreateShipmentForm,
  },
  {
    path: '/list-shipment',
    label: 'list shipments',
    component: ListShipments,
  },
  {
    path: '/book-trip',
    label: 'book trip',
    component: BookTripForm,
  },
]

function Root() {
  return (
    <StoreContext>
      <div className="flex gap-4 px-4 py-2 bg-slate-700">
        {routes.map((route) => (
          <Link className="text-blue-100" key={route.path} to={route.path}>
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-4 bg-slate-100">
        <Outlet />
      </div>
    </StoreContext>
  )
}

const rootRoute = new RootRoute({
  component: Root,
})

const routeTree = rootRoute.addChildren(
  routes.map(
    (route) =>
      new Route({
        getParentRoute: () => rootRoute,
        path: route.path,
        component: route.component,
      })
  )
)

export const Router = () => (
  <RouterProvider router={new ReactRouter({ routeTree })} />
)
