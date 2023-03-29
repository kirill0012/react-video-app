import { Button, LinearProgress, Typography } from '@mui/material'
import Image from 'next/image'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Generation, VideoItem } from '@/services/concepts'

type Props = {
  genIndex: number
  generation: Generation
  onCancel: (id: number) => void
}

const ConceptGenerationProgressComponent = (props: Props) => {
  const { genIndex, generation, onCancel } = props

  let eta_string = ''
  let eta_value = 0

  if (generation.created && generation.current && generation.eta) {
    const created = new Date(generation.created)
    const current = new Date(generation.current)
    const eta = new Date(generation.eta)

    const total_time = eta.getTime() - created.getTime()
    const passed_time = current.getTime() - created.getTime()
    const left_minutes = (eta.getTime() - current.getTime()) / (60 * 1000)

    eta_value = Math.round((passed_time / total_time) * 100)
    eta_string =
      left_minutes > 99 ? `${Math.round(left_minutes / 60)} Hours` : `${left_minutes} mins`
  }

  if (genIndex == 0) {
    // show splash
    return (
      <>
        <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#272930', pb: '16px' }}>
          Working on your new concepts!
          <br />
          We’ll notify you by email when they’re ready
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '12px' }}>
          We are now
        </Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
          📹 Generating new videos
        </Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
          🚀 Filtering the best results
        </Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
          ✅ Making sure they fit your brand
        </Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '24px' }}>
          🚚 Delivering them to you
        </Typography>
        {eta_value > 0 && (
          <>
            <div style={{ paddingBottom: '12px', display: 'flex' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F' }}>
                ⏳ ETA
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#272930', pl: '4px' }}>
                ≈ {eta_string}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#81848F',
                  flexGrow: 1,
                  textAlign: 'right',
                }}
              >
                You can’t generate again until this request is done.
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={eta_value}
              sx={{
                mb: '30px',
                height: '8px',
                borderRadius: '4px',
                background: '#EEEFF0',
                '& .MuiLinearProgress-bar': {
                  background: '#272930',
                  borderRadius: '4px',
                },
              }}
            />
          </>
        )}
        <Button
          size="large"
          type="submit"
          variant="contained"
          onClick={() => onCancel(generation.id)}
          sx={{
            borderRadius: '8px',
            height: '48px',
            textTransform: 'none',
            fontSize: '18px',
            fontWeight: '400',
            background: '#FFE9E8',
            color: '#A10E25',
            '&:hover': { background: '#faf0f0' },
          }}
        >
          Cancel
        </Button>
      </>
    )
  } else {
    return (
      <>
        {generation.videos.length > 0 && (
          <div style={{ marginBottom: '12px', display: 'flex' }}>
            <div style={{ width: '304px', height: '208px', position: 'relative' }}>
              <Image
                src={generation.videos[0].image}
                alt="thumb"
                fill={true}
                style={{ objectFit: 'cover', borderRadius: '16px' }}
              />
            </div>
            <div style={{ flexGrow: 1 }}></div>
            {generation.videos.slice(1).map((video) => {
              return (
                <div
                  key={video.id}
                  style={{
                    width: '64px',
                    height: '64px',
                    position: 'relative',
                    marginLeft: '16px',
                  }}
                >
                  <Image
                    src={video.image}
                    alt="thumb"
                    fill={true}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              )
            })}
          </div>
        )}
        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '16px' }}>
          {generation.videos[0].name}
        </Typography>
        {eta_value > 0 && (
          <>
            <div style={{ paddingBottom: '12px', display: 'flex' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F' }}>
                ⏳ ETA:
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#272930', pl: '8px' }}>
                ≈ {eta_string}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#81848F',
                  flexGrow: 1,
                  textAlign: 'right',
                }}
              >
                We’ll notify you by email when they’re ready
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={eta_value}
              sx={{
                mb: '16px',
                height: '8px',
                borderRadius: '4px',
                background: '#EEEFF0',
                '& .MuiLinearProgress-bar': {
                  background: '#272930',
                  borderRadius: '4px',
                },
              }}
            />
          </>
        )}

        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F' }}>
          Iterating {generation.ref}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '30px' }}>
          {generation.brief}
        </Typography>
        <Button
          size="large"
          type="submit"
          variant="contained"
          onClick={() => onCancel(generation.id)}
          sx={{
            borderRadius: '8px',
            height: '48px',
            textTransform: 'none',
            fontSize: '18px',
            fontWeight: '400',
            background: '#FFE9E8',
            color: '#A10E25',
            '&:hover': { background: '#faf0f0' },
          }}
        >
          Cancel
        </Button>
      </>
    )
  }
}

export default ConceptGenerationProgressComponent
