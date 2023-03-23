import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'

const MyProject = () => {
  return (
    <Box sx={{ border: '1px solid #DDDEE0', borderRadius: '16px', p: '16px' }}>
      <Grid container spacing={3} sx={{ height: '88px' }}>
        <Grid item xs>
          <Image src="/demo/image 14.png" width={64} height={64} alt={'logo'} />
        </Grid>
        <Grid item xs={10} sx={{ pl: '10px !important' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', lineHeight: '31px' }}>
            Generate new gameplay ad concepts
          </Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: '600', lineHeight: '31px' }}>
            for Animal Kingdom
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MyProject
