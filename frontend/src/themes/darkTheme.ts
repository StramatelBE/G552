
import { createTheme } from "@mui/material/styles";

/*
couleurs STRAMATEL :

GRIS : #31434f
BORDEAU : #982d23
ROUGE : #c93028
ORANGE : #fb6a22
JAUNE : #fe9b19


 */
export const darkTheme = createTheme({
    palette: {
        primary: {
          main: '#203038',
          light: '#ffffff',
        },
        secondary: {
          main: '#2b646f',
          light: '#ffffff',
        },
        background: {
          default: '#172228',
          paper: '#203038',
        },
        text: {
          primary: 'rgba(255,255,255,0.87)',
          secondary: 'rgba(173,171,171,0.5)',
        },
        error: {
          main: '#EC1C0C',
        },
      }, 
});

export function switchToDarkTheme() {
  document.documentElement.style.setProperty('--primary-main', darkTheme.palette.primary.main);
  document.documentElement.style.setProperty('--secondary-main', darkTheme.palette.secondary.main);
  document.documentElement.style.setProperty('--background-default', darkTheme.palette.background.default);
  document.documentElement.style.setProperty('--text-primary', darkTheme.palette.text.primary);
}