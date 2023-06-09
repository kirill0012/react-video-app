import ReactPlayer from 'react-player'
import Image from 'next/image'
import { Box, Button, ButtonProps, Link, Modal, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DownloadIcon from '@mui/icons-material/Download'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

import { VideoItem } from '@/services/concepts'
type Props = {
  video: VideoItem | null
  open: boolean
  onClose: () => void
  onRateQuality: (video: VideoItem) => void
  onIterate: (video: VideoItem) => void
  iterationDisabled: boolean
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '842px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: '24px',
}

// ** Styled Components
const ButtonSecondaryWrapper = styled(Button)<
  ButtonProps & { component?: any; download?: boolean }
>(() => ({
  borderRadius: '8px',
  height: '48px',
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '400',
  background: 'rgba(76, 76, 252, 0.12)',
  color: '#4C4CFC',
  '&:hover': { background: 'rgba(76, 76, 252, 0.22)' },
}))

const VideoViewComponent = (props: Props) => {
  const { video } = props
  if (!video) return null

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 842, '&:focus': { outline: '0 !important' } }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, flexGrow: 1 }}>
            {video.name}
          </Typography>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={props.onClose} />
        </div>
        <ReactPlayer
          width={794}
          height={543}
          url={video.src}
          controls={true}
          playing={true}
          style={{ marginBottom: '16px' }}
          playIcon={
            <PlayCircleOutlineIcon
              sx={{
                position: 'absolute',
                marginLeft: '-32px',
                marginTop: '-32px',
                top: '50%',
                left: '50%',
                color: '#fff',
                width: '64px',
                height: '64px',
              }}
            />
          }
          light={
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image src={video.image} fill={true} style={{ objectFit: 'cover' }} alt="Thumbnail" />
            </div>
          }
        />
        <div style={{ display: 'flex', gap: '16px' }}>
          <ButtonSecondaryWrapper
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={props.iterationDisabled}
            onClick={() => props.onIterate(video)}
          >
            <EditIcon sx={{ mr: '10px' }} />
            Iterate
          </ButtonSecondaryWrapper>
          <ButtonSecondaryWrapper
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => props.onRateQuality(video)}
          >
            <FavoriteIcon sx={{ mr: '10px' }} />
            Rate Quality
          </ButtonSecondaryWrapper>
          <ButtonSecondaryWrapper
            component={Link}
            href={video.src}
            download
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            <DownloadIcon sx={{ mr: '10px' }} />
            Download
          </ButtonSecondaryWrapper>
        </div>
      </Box>
    </Modal>
  )
}

export default VideoViewComponent
