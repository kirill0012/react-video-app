import { ConceptItem } from '@/services/concepts'
import ConceptItemComponent from './ConceptItem'
import { IterateFormData } from './IterateConcept'

type Props = {
  concepts: ConceptItem[]
  onCancel: (id: number) => void
  iterationDisabled: boolean
  onIterateVideo: (videoId: number, data: IterateFormData) => void
}

const ConceptsList = (props: Props) => {
  const { concepts, onCancel, onIterateVideo } = props

  if (concepts.length == 0) return null

  return (
    <>
      {concepts.map((concept, index) => (
        <ConceptItemComponent
          key={concept.id}
          index={index}
          concept={concept}
          onCancel={onCancel}
          onIterateVideo={onIterateVideo}
          iterationDisabled={props.iterationDisabled}
        />
      ))}
    </>
  )
}

export default ConceptsList
