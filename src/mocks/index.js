import { faker } from '@faker-js/faker'
import add from 'date-fns/add'

export const cargoType = ['container', 'refregirated', 'dumpster']
export const vehicleType = ['Bus', 'Tanker', 'Tipper']
export const inssurance = ['tier1', 'tier2', 'tier3']

export const createRandomVehicle = () => {
  const weight = faker.datatype.float({ min: 100, max: 3000, precision: 0.1 })
  const length = faker.datatype.float({ min: 1, max: 20, precision: 0.1 })
  const width = faker.datatype.float({ min: 1, max: 3, precision: 0.1 })
  const height = faker.datatype.float({ min: 1, max: 3, precision: 0.1 })

  return {
    template: faker.datatype.boolean(),
    publish: faker.datatype.boolean(),
    autoBook: faker.datatype.boolean(),
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(3),
    internalRef: faker.random.alphaNumeric(6),
    externalRef: faker.random.alphaNumeric(6),
    grouped: faker.datatype.boolean(),
    cargoType: faker.helpers.arrayElements(cargoType),
    vehicleType: faker.helpers.arrayElement(vehicleType),
    weight,
    length,
    width,
    height,
    volume: Number((length * width * height).toFixed(1)),
    area: Number((length * width).toFixed(1)),
    minWeight: faker.datatype.number({ min: 10, max: 20 }),
    mindistance: faker.datatype.number({ min: 10, max: 100 }),
    minVolume: faker.datatype.number({ min: 1, max: 2 }),
    pricePerUnit: faker.datatype.float({ min: 1, max: 3, precision: 0.1 }),
    Solid: 0,
    Liquid: faker.datatype.float({ min: 1, max: 2, precision: 0.1 }),
    Perishable: faker.datatype.float({ min: 1, max: 2, precision: 0.1 }),
    Fragile: faker.datatype.float({ min: 1, max: 2, precision: 0.1 }),
    Dangerous: faker.datatype.float({ min: 1, max: 3, precision: 0.1 }),
    Delay: faker.datatype.float({ min: 1, max: 3, precision: 0.1 }),
    Stackable: faker.datatype.float({ min: 1, max: 3, precision: 0.1 }),
    inssurance: faker.helpers.arrayElement(inssurance),
  }
}

export const createRandomSchedule = () => {
  const emptyTrips = new Array(faker.datatype.number({ min: 2, max: 3 })).fill(
    0
  )
  const dates = faker.date.betweens(
    new Date(),
    add(new Date(), { months: 1 }),
    emptyTrips.length * 2
  )
  const trips = emptyTrips.map((t) => {
    return {
      stops: [createRandomStop(dates.shift()), createRandomStop(dates.shift())],
    }
  })
  return trips
}

export const createArrayOfStops = () => {
  const emptyStops = new Array(faker.datatype.number({ min: 2, max: 2 })).fill(
    0
  )
  const dates = faker.date.betweens(
    new Date(),
    add(new Date(), { months: 1 }),
    emptyStops.length
  )

  return emptyStops.map((stop) => createRandomStop(dates.shift()))
}

export const createRandomStop = (arrivalDateTime) => {
  return {
    address: faker.address.nearbyGPSCoordinate(
      [33.5724108, -7.6570324],
      200,
      true
    ),
    arrivalDateTime: arrivalDateTime.toISOString().substr(0, 16),
    departureDateTime: add(new Date(arrivalDateTime), {
      hours: 1,
    })
      .toISOString()
      .substr(0, 16),
  }
}
