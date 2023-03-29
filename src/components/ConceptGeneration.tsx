import { Typography } from '@mui/material'
import Image from 'next/image'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Generation, VideoItem } from '@/services/concepts'
import ConceptGenerationProgressComponent from './ConceptGenerationProgress'

type Props = {
  genIndex: number
  generation: Generation
  onCancel: (id: number) => void
  onVideoClick: (video: VideoItem) => void
}

const ConceptGenerationComponent = (props: Props) => {
  const { genIndex, generation, onCancel } = props

  if (generation.inProgress) {
    // show splash
    return (
      <ConceptGenerationProgressComponent
        generation={generation}
        genIndex={genIndex}
        onCancel={onCancel}
      />
    )
  }

  return (
    <>
      {generation.videos.length > 0 && (
        <div style={{ marginBottom: '12px', display: 'flex' }}>
          <div
            style={{ width: '304px', height: '208px', position: 'relative', cursor: 'pointer' }}
            onClick={() => props.onVideoClick(generation.videos[0])}
          >
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
                onClick={() => props.onVideoClick(video)}
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
        {generation.ref != null
          ? `This video was iterated on base of ${generation.ref} with the following request:`
          : 'This video was created base on the following brief, that was generated according to your data:'}
      </Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930' }}>
        {generation.brief}
      </Typography>
    </>
  )
}

export default ConceptGenerationComponent
