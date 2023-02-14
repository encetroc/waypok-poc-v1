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
