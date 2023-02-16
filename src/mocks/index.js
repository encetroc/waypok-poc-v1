import { faker } from '@faker-js/faker'
import {
  getHours,
  getMinutes,
  getYear,
  getMonth,
  getDay,
  getDate,
} from 'date-fns'
import format from 'date-fns/format'
import add from 'date-fns/add'

export const cargoType = ['container', 'refregirated', 'dumpster']
export const vehicleType = ['Bus', 'Tanker', 'Tipper']
export const inssurance = ['tier1', 'tier2', 'tier3']
export const shipmentContent = [
  'Solid',
  'Liquid',
  'Perishable',
  'Fragile',
  'Dangerous',
]

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

export const createRandomShipment = () => {
  const weight = faker.datatype.float({ min: 10, max: 300, precision: 0.1 })
  const length = faker.datatype.float({ min: 0.1, max: 3, precision: 0.1 })
  const width = faker.datatype.float({ min: 0.1, max: 1, precision: 0.1 })
  const height = faker.datatype.float({ min: 0.1, max: 1, precision: 0.1 })

  return {
    template: faker.datatype.boolean(),
    publish: faker.datatype.boolean(),
    autoBook: faker.datatype.boolean(),
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(3),
    internalRef: faker.random.alphaNumeric(6),
    externalRef: faker.random.alphaNumeric(6),
    cargoType: faker.helpers.arrayElements(cargoType),
    shipmentContent: faker.helpers.arrayElements(shipmentContent),
    weight,
    length,
    width,
    height,
    volume: Number((length * width * height).toFixed(1)),
    area: Number((length * width).toFixed(1)),
  }
}

export const createRandomStop = () => {
  const randomDate = faker.date.between(
    new Date(),
    add(new Date(), { months: 1 })
  )
  const randomDates = faker.date.betweens(
    randomDate,
    add(randomDate, { hours: 10 }),
    2
  )
  return {
    address: faker.address.streetAddress(),
    arrivalDate: format(randomDates[0], 'yyyy-MM-dd'),
    arrivalTimeHour: getHours(randomDates[0]),
    arrivalTimeMinute: getMinutes(randomDates[0]),
    departureDate: format(randomDates[1], 'yyyy-MM-dd'),
    departureTimeHour: getHours(randomDates[1]),
    departureTimeMinute: getMinutes(randomDates[1]),
  }
}
