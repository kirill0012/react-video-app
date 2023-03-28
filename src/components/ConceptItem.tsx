import { Box, Button, Paper, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'

import { ConceptItem } from '@/services/concepts'
import ConceptGenerationComponent from './ConceptGeneration'
import React from 'react'

type Props = {
  index: number
  concept: ConceptItem
  onCancel: (id: number) => void
}

const ConceptItemComponent = (props: Props) => {
  const { concept, onCancel } = props

  const [value, setValue] = React.useState((concept.generations.length - 1).toString())

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
      <TabContext value={value}>
        {cardHeader}
        {concept.generations.length > 1 && (
          <div style={{ marginBottom: '16px' }}>
            {concept.generations.map((gen, index) => (
              <Button
                key={gen.id}
                variant="text"
                onClick={() => setValue(index.toString())}
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#272930',
                  textTransform: 'none',
                  ...(value === index.toString()
                    ? {
                        color: '#4C4CFC',
                        background: 'rgba(76, 76, 252, 0.12)',
                        boxShadow:
                          '1.1px 2.7px 3.8px -1.2px rgba(187, 187, 187, 0.26), 0.5px 1.3px 1.8px -0.6px rgba(187, 187, 187, 0.18), 0.3px 0.8px 1.1px rgba(187, 187, 187, 0.11)',
                        borderRadius: '9px',
                      }
                    : {}),
                }}
              >{`${index + 1} gen`}</Button>
            ))}
          </div>
        )}
        {concept.generations.map((item, index) => (
          <TabPanel key={item.id} value={index.toString()} sx={{ p: 0 }}>
            <ConceptGenerationComponent
              key={`${concept.id}-gen${index}`}
              genIndex={index}
              generation={item}
              onCancel={onCancel}
            />
          </TabPanel>
        ))}
      </TabContext>
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
