import { useAuth } from '@/hooks/useAuth'
import { Grid, Typography } from '@mui/material'
import ConceptRequest from '@/components/ConceptRequest'
import MyProject from '@/components/MyProject'

function Home() {
  const auth = useAuth()

  if (!auth.user) {
    return null
  }

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      <Grid item xs sx={{ pr: '30px' }}>
        <MyProject />
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#81848F',
            textAlign: 'center',
            pt: '24px',
          }}
        >
          You still didn’t generate any videos!
        </Typography>
      </Grid>
      <Grid item sx={{ width: '406px', pl: '0px !important' }}>
        <ConceptRequest />
      </Grid>
    </Grid>
  )
}

Home.requiresAuth = true

export default Home
