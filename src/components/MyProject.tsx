import { Box, Typography } from '@mui/material'
import Image from 'next/image'

type Props = {
  project: {
    title: string
    avatar: string | null
  }
}

const MyProject = (props: Props) => {
  const { project } = props

  return (
    <Box
      sx={{
        border: '1px solid #DDDEE0',
        borderRadius: '16px',
        p: '16px',
        height: '96px',
        mb: '24px',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        {project.avatar && (
          <div style={{ display: 'inline-block', paddingRight: '24px' }}>
            <Image src={project.avatar} width={64} height={64} alt={'logo'} />
          </div>
        )}
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', lineHeight: '31px' }}>
            Generate new gameplay ad concepts
          </Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', lineHeight: '31px' }}>
            for {project.title}
          </Typography>
        </div>
      </div>
    </Box>
  )
}

export default MyProject
