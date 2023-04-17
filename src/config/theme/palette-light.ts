import { PaletteOptions } from '@mui/material'
import { grey, common } from '@mui/material/colors'

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: '#F9F3E6',
    paper: common.white,

  },
  text: {
    primary: grey[900],
    secondary: '#717171',
    disabled: grey[500],
  },
}

export default palette
