import {
  Outlet,
  RouterProvider,
  Link,
  ReactRouter,
  Route,
  RootRoute,
} from '@tanstack/react-router'

import { CreateVehicleForm, CreateStopsForm, Home } from '@/pages'

function Root() {
  return (
    <>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/create-vehicle">create vehicle</Link>
        <Link to="/create-stops">create trips</Link>
      </div>
      <hr />
      <Outlet />
    </>
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  createVehicleRoute,
  createTripsRoute,
])

export const Router = () => (
  <RouterProvider router={new ReactRouter({ routeTree })} />
)
