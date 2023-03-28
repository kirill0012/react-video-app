import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined'

import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from '@mui/material'

const schema = yup.object().shape({})

const defaultValues = {
  videosize: 'Portrait (1080x1350)',
  videofor: 'Facebook',
  videoconcept: 'Live action, Attack, Fail',
  videotheme: '',
}

export interface ConceptFormData {
  videosize: string
  videofor: string
  videoconcept: string
  videotheme: string
}

type Props = {
  disabled: boolean
  onGenerate: (data: ConceptFormData) => void
}

const ConceptRequest = (props: Props) => {
  const { disabled, onGenerate } = props

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: ConceptFormData) => {
    onGenerate(data)
  }

  return (
    <Paper
      sx={{
        p: '24px',
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
        borderRadius: '16px',
      }}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size="small" sx={{ pb: '16px' }}>
          <label
            htmlFor="auth-login-email"
            style={{ fontSize: '14px', fontWeight: '500', color: '#272930' }}
          >
            I need
          </label>

          <Controller
            name="videosize"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                labelId="concept-video-size"
                id="concept-video-size"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                IconComponent={UnfoldMoreOutlinedIcon}
                disabled={disabled}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                    },
                  },
                }}
                sx={{
                  color: '#81848F',
                  borderColor: '#DDDEE0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="Portrait (1080x1350)">Portrait (1080x1350)</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small" sx={{ pb: '24px' }}>
          <label
            htmlFor="auth-login-email"
            style={{ fontSize: '14px', fontWeight: '500', color: '#272930' }}
          >
            Videos for
          </label>

          <Controller
            name="videofor"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                labelId="concept-video-for"
                id="concept-video-for"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                IconComponent={UnfoldMoreOutlinedIcon}
                disabled={disabled}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                    },
                  },
                }}
                sx={{
                  color: '#81848F',
                  borderColor: '#DDDEE0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="AdMob">AdMob</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Unity">Unity</MenuItem>
                <MenuItem value="IronSource">IronSource</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small" sx={{ pb: '16px' }}>
          <label
            htmlFor="auth-login-email"
            style={{ fontSize: '14px', fontWeight: '500', color: '#272930' }}
          >
            Choose concept
          </label>

          <Controller
            name="videoconcept"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                labelId="concept-video-concept"
                id="concept-video-concept"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                IconComponent={UnfoldMoreOutlinedIcon}
                disabled={disabled}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                    },
                  },
                }}
                sx={{
                  color: '#81848F',
                  borderColor: '#DDDEE0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="Live action, Attack, Fail">Live action, Attack, Fail</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small" sx={{ pb: '24px', flexDirection: 'row' }}>
          <Controller
            name="videotheme"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                id="concept-video-theme"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                size="small"
                placeholder="Describe theme"
                disabled={disabled}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& input': {
                      color: '#81848F',
                    },
                    '& fieldset': {
                      borderColor: '#DDDEE0',
                      borderRadius: '8px',
                    },
                  },
                  flexGrow: 1,
                }}
              />
            )}
          />
          <div style={{ display: 'inline-flex' }}>
            <Tooltip title="Visual theme means what kind of visuals do you want to include, it will effect ads to some extent, depends on the concept">
              <IconButton sx={{ mr: '-8px' }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </FormControl>

        {!disabled && (
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '8px',
              height: '48px',
              textTransform: 'none',
              fontSize: '18px',
              fontWeight: '400',
            }}
          >
            Generate
          </Button>
        )}
      </form>
    </Paper>
  )
}

export default ConceptRequest
