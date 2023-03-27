import { Button, Paper, Typography } from '@mui/material'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'

import { ConceptItem } from '@/services/concepts'
import ConceptGenerationComponent from './ConceptGeneration'

type Props = {
  index: number
  concept: ConceptItem
  onCancel: (id: number) => void
}

const ConceptItemComponent = (props: Props) => {
  const { concept, onCancel } = props

  let cardHeader = null

  if (concept.generations.length > 1 || !concept.generations[0].inProgress) {
    cardHeader = (
      <>
        <div style={{ paddingBottom: '16px', display: 'flex' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#272930' }}>
            Your {props.index == 0 ? 'latest' : 'previous'} generation results
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#81848F',
              flexGrow: 1,
              textAlign: 'right',
            }}
            suppressHydrationWarning={true}
          >
            {timeSince(new Date(concept.generations[0].created))} ago
          </Typography>
        </div>
        {concept.generations.length > 1 && <>gens list</>}
      </>
    )
  }

  return (
    <Paper
      sx={{
        p: '24px',
        margin: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
        borderRadius: '16px',
        mb: '24px',
      }}
    >
      {cardHeader}
      {concept.generations.map((item, index) => (
        <ConceptGenerationComponent
          key={`${concept.id}-gen${index}`}
          genIndex={index}
          generation={item}
          onCancel={onCancel}
        />
      ))}
    </Paper>
  )
}

const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + 'y'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + 'months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + 'd'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + 'h'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + 'mins'
  }
  return Math.floor(seconds) + 's'
}

export default ConceptItemComponent
