import { Button, LinearProgress, Typography } from '@mui/material'
import Image from 'next/image'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Generation } from '@/services/concepts'

type Props = {
  genIndex: number
  generation: Generation
  onCancel: (id: number) => void
}

const ConceptGenerationComponent = (props: Props) => {
  const { genIndex, generation, onCancel } = props

  if (genIndex == 0 && generation.inProgress) {
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
        left_minutes > 99 ? `${Math.round(left_minutes / 60)} Hours` : `${left_minutes} minutes`
    }
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
  }

  return (
    <>
      {generation.videos.length > 0 && (
        <div style={{ marginBottom: '12px', display: 'flex' }}>
          <div style={{ width: '304px', height: '208px', position: 'relative', cursor: 'pointer' }}>
            <Image
              src={generation.videos[0].image}
              alt="thumb"
              fill={true}
              style={{ objectFit: 'cover', borderRadius: '16px' }}
            />
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
              <PlayCircleOutlineIcon
                sx={{
                  position: 'absolute',
                  marginLeft: '-27px',
                  marginTop: '-27px',
                  top: '50%',
                  left: '50%',
                  color: '#fff',
                  width: '54px',
                  height: '54px',
                }}
              />
            </div>
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
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={video.image}
                  alt="thumb"
                  fill={true}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
                <div
                  style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}
                >
                  <PlayCircleOutlineIcon
                    sx={{
                      position: 'absolute',
                      marginLeft: '-13px',
                      marginTop: '-13px',
                      top: '50%',
                      left: '50%',
                      color: '#fff',
                      width: '26px',
                      height: '26px',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
      <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '16px' }}>
        {generation.videos[0].name}
      </Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '12px' }}>
        This video was created base on the following brief, that was generated according to your
        data:
      </Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930' }}>
        {generation.brief}
      </Typography>
    </>
  )
}

export default ConceptGenerationComponent