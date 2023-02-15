import { Mesurment } from '@/components'

export const ShipmentDetails = ({ shipment }) => {
  return (
    <div>
      <div>
        <strong>shipment ID: </strong>
        {shipment.id}
      </div>
      <div className="flex gap-2">
        <Mesurment prefix="We" value={shipment.weight} unit="kg" />
        <Mesurment prefix="W" value={shipment.width} unit="m" />
        <Mesurment prefix="H" value={shipment.height} unit="m" />
        <Mesurment prefix="L" value={shipment.length} unit="m" />
        <Mesurment prefix="V" value={shipment.volume} unit="m3" />
        <Mesurment prefix="A" value={shipment.area} unit="m2" />
      </div>
    </div>
  )
}
