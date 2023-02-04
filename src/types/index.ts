type Price = {
  pricePerUnit: number
  additionalFees: {
    solid: number
    liquid: number
    perishable: number
    fragile: number
    dangerous: number
  }
  deductions: {
    delay: number
    stackable: number
  }
  insurance: {
    tier1: number
    tier2: number
    tier3: number
  }
}
type ShippmentId = string
type Address = {}
type Shippment = ShippmentId
type Stop = {
  address: Address
  arrivalDateTime: Date
  departureDateTime: Date
  betweenStops: {
    startStop: Stop
    endStop: Stop
  }
  shippments: Shippment[]
}
type Trip = {
  startDateTime: Date
  arrivalDateTime: Date
  startAddess: Address
  arrivalAddress: Address
  stops: Stop[]
}
type Schedule = Trip[]

type TransportationType = 'grouped' | 'individual'
type Freight = 'tipper' | 'tray' | 'fridge' | 'box'
type Vehicle = 'v1' | 'v2'
type Dimention = {
  weight: number
  length: number
  width: number
  height: number
  volume: number
  area: number
}
type Constrain = {
  minWeight: number
  minDistance: number
  minVolume: number
}

type VehicleListing = {
  creator: string
  price: Price
  schedule: Schedule
  transportationType: TransportationType
  freight: Freight | null
  title: string
  description: string | null
  internalRef: string
  externalRef: string | null
  vehicle: Vehicle
  images: string[] | null
  dimentions: Dimention
  constrains: Constrain | null
  isPublished: boolean
  isAutoBook: boolean
}

type TripId = string
type State = {
  operation: 'pickup' | 'dropoff'
  isDone: boolean
  date: Date
  time: {
    from: Date
    to: Date
  }
  trip: TripId
}

type Shipment = {
  id: string
  lifeCycle: State[]
}
