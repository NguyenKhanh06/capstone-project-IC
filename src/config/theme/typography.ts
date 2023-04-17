import { TypographyOptions } from '@mui/material/styles/createTypography'

export const fontFamily = [
  '"Montserrat"',
].join(',')

const headingLineHeight = 1.4

const typography: TypographyOptions = {
  fontFamily,
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontSize: 34,
    lineHeight: headingLineHeight,
    fontWeight: 700,
  },
  h2: {
    fontSize: 28,
    lineHeight: headingLineHeight,
    fontWeight: 700,
  },
  h3: {
    fontSize: 24,
    lineHeight: headingLineHeight,
    fontWeight: 700,
  },
  h4: {
    fontSize: 22,
    lineHeight: headingLineHeight,
    fontWeight: 700,
  },
  h5: {
    fontSize: 17,
    lineHeight: headingLineHeight,
    fontWeight: 600,
  },
  h6: {
    fontSize: 15,
    lineHeight: headingLineHeight,
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.9rem',
  },
  subtitle1: {
    fontSize: '0.85rem',
  },
  subtitle2: {
    fontSize: '0.8rem',
  },
}

export default typography
