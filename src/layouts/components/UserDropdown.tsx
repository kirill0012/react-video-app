// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { deepPurple } from '@mui/material/colors'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

// ** Context
import { useAuth } from '@/hooks/useAuth'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()

  if (!user) {
    return null
  }

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Typography sx={{ fontWeight: '500' }}>{user?.name}</Typography>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: '8px', cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Avatar
          src={user?.avatar || undefined}
          alt={user?.name}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40, bgcolor: deepPurple[500], color: 'white' }}
        >
          {user?.name
            .split(/\s/)
            .reduce((response, word) => (response += word.slice(0, 1)), '')
            .substring(0, 2)}
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          '& .MuiMenu-paper': {
            width: 230,
            mt: 4,
            boxShadow:
              'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoFocus={false}
      >
        {/* <Divider sx={{ mt: '0 !important' }} /> */}
        {/* <Divider /> */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            px: 4,
            color: 'text.secondary',
            '& svg': { mr: 2, fontSize: '1.25rem', color: 'text.secondary' },
          }}
        >
          <PowerSettingsNewIcon />
          Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
