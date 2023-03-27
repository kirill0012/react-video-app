import { Button, Paper, Typography } from '@mui/material'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'

import { ConceptIdea } from '@/services/concepts'

type Props = {
  idea: ConceptIdea
  onConfirm: (idea: ConceptIdea) => void
  onRegenerate: () => void
}

const IdeaConfirmation = (props: Props) => {
  const { idea } = props

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
      <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '16px' }}>
        Got it! Here’s what I plan to generate:
      </Typography>
      <Typography
        sx={{
          fontSize: '18px',
          lineHeight: '31px',
          fontWeight: '600',
          color: '#272930',
          pb: '16px',
        }}
      >
        ”{idea?.title}”
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '400',
          color: '#272930',
          pb: '24px',
        }}
      >
        {idea?.description}
      </Typography>
      <Button
        size="large"
        type="submit"
        variant="contained"
        onClick={() => props.onConfirm(idea)}
        sx={{
          borderRadius: '8px',
          height: '48px',
          textTransform: 'none',
          fontSize: '18px',
          fontWeight: '400',
          mr: '24px',
        }}
      >
        Confirm
      </Button>
      <Button
        size="large"
        type="submit"
        variant="contained"
        startIcon={<CachedOutlinedIcon />}
        onClick={props.onRegenerate}
        sx={{
          borderRadius: '8px',
          height: '48px',
          textTransform: 'none',
          fontSize: '18px',
          fontWeight: '400',
          background: 'rgba(76, 76, 252, 0.12)',
          color: '#4C4CFC',
          '&:hover': { background: 'rgba(76, 76, 252, 0.22)' },
        }}
      >
        Re-generate
      </Button>
    </Paper>
  )
}

export default IdeaConfirmation
