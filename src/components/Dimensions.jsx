import { Section, Input } from '@/components'

export const Dimensions = ({ register }) => {
  return (
    <Section name="dimensions">
      <Input name="weight" register={register} />
      <Input name="length" register={register} />
      <Input name="width" register={register} />
      <Input name="height" register={register} />
      <Input name="volume" register={register} />
      <Input name="area" register={register} />
    </Section>
  )
}
