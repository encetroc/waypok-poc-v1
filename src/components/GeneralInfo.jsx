import { Section, Input } from '@/components'

export const GeneralInfo = ({ register }) => {
  return (
    <Section name="general info">
      <Input type="text" name="title" register={register} />
      <Input type="textarea" name="description" register={register} />
      <div className="flex gap-2">
        <Input
          className="flex-1"
          type="text"
          name="internalRef"
          register={register}
        />
        <Input
          className="flex-1"
          type="text"
          name="externalRef"
          register={register}
        />
      </div>
    </Section>
  )
}
