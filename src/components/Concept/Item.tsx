import { Alert, Button, Paper, Snackbar, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import { ConceptItem, VideoItem } from '@/services/concepts'
import ConceptGenerationComponent from './Generation'
import React, { useEffect } from 'react'
import VideoViewComponent from '@/components/Dialogs/VideoView'
import RateQualityComponent from '@/components/Dialogs/RateQuality'
import IterateConceptComponent, { IterateFormData } from '@/components/Dialogs/IterateConcept'

type Props = {
  index: number
  concept: ConceptItem
  onCancel: (id: number) => void
  iterationDisabled: boolean
  onIterateVideo: (videoId: number, data: IterateFormData) => void
}

const ConceptItemComponent = (props: Props) => {
  const { concept, onCancel, onIterateVideo } = props

  const [value, setValue] = React.useState((concept.generations.length - 1).toString())
  const [isPlayerOpen, setPlayerOpen] = React.useState<boolean>(false)
  const [isRateOpen, setRateOpen] = React.useState<boolean>(false)
  const [isIterateOpen, setIterateOpen] = React.useState<boolean>(false)
  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(null)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  useEffect(() => {
    setValue((concept.generations.length - 1).toString())
  }, [concept.generations])

  const handlePlayerClose = () => setPlayerOpen(false)
  const handleRateClose = (isRatingSent: boolean) => {
    setRateOpen(false)
    if (isRatingSent) {
      setSnackbarOpen(true)
    }
  }
  const handleIterateClose = () => setIterateOpen(false)

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const openVideoPlayer = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayerOpen(true)
  }

  const openVideoRate = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayerOpen(false)
    setRateOpen(true)
  }

  const openVideoIterate = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayerOpen(false)
    setIterateOpen(true)
  }

  let cardHeader = null

  if (concept.generations.length > 1 || !concept.generations[0].inProgress) {
    cardHeader = (
      <>
        <div style={{ paddingBottom: '16px', display: 'flex' }}>
          <Typography
            sx={{ fontSize: '18px', fontWeight: '600', color: '#272930', lineHeight: '31px' }}
          >
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
          <div style={{ marginBottom: '18px', marginTop: '4px' }}>
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
                  p: '3px 8px',
                  minWidth: 'unset',
                  mr: '2px',
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
              onVideoClick={openVideoPlayer}
            />
          </TabPanel>
        ))}
      </TabContext>
      <VideoViewComponent
        open={isPlayerOpen}
        video={selectedVideo}
        onClose={handlePlayerClose}
        iterationDisabled={props.iterationDisabled}
        onIterate={openVideoIterate}
        onRateQuality={openVideoRate}
      />
      <RateQualityComponent open={isRateOpen} video={selectedVideo} onClose={handleRateClose} />
      <IterateConceptComponent
        open={isIterateOpen}
        video={selectedVideo}
        onClose={handleIterateClose}
        onIterateVideo={onIterateVideo}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: 'rgb(46, 125, 50)',
            color: 'rgb(255, 255, 255)',
            '& .MuiAlert-icon': { color: 'rgb(255, 255, 255)' },
          }}
          onClose={handleSnackbarClose}
        >
          Your rating have been sent!
        </Alert>
      </Snackbar>
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
