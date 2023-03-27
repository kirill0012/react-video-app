import { Button, Paper, Typography } from '@mui/material'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'

import { ConceptItem } from '@/services/concepts'
import ConceptItemComponent from './ConceptItem'

type Props = {
  concepts: ConceptItem[]
  onCancel: (id: number) => void
}

const ConceptsList = (props: Props) => {
  const { concepts, onCancel } = props

  if (concepts.length == 0) return null

  return (
    <>
      {concepts.map((concept, index) => (
        <ConceptItemComponent
          key={concept.id}
          index={index}
          concept={concept}
          onCancel={onCancel}
        />
      ))}
    </>
  )
}

export default ConceptsList
