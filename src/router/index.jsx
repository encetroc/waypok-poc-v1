import {
  Outlet,
  RouterProvider,
  Link,
  ReactRouter,
  Route,
  RootRoute,
} from '@tanstack/react-router'

import { ListVehicles, CreateVehicleForm, CreateStopsForm, Home } from '@/pages'
import { StoreContext } from '@/context'

function Root() {
  return (
    <StoreContext>
      <div className="flex gap-2">
        <Link to="/">home</Link>
        <Link to="/create-vehicle">create vehicle</Link>
        <Link to="/create-stops">create trips</Link>
        <Link to="/list-vehicle">list vehicles</Link>
      </div>
      <hr />
      <Outlet />
    </StoreContext>
  )
}

const rootRoute = new RootRoute({
  component: Root,
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const createVehicleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/create-vehicle',
  component: CreateVehicleForm,
})

const createTripsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/create-stops',
  component: CreateStopsForm,
})

const listVehiclesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/list-vehicle',
  component: ListVehicles,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  createVehicleRoute,
  createTripsRoute,
  listVehiclesRoute,
])

export const Router = () => (
  <RouterProvider router={new ReactRouter({ routeTree })} />
)
