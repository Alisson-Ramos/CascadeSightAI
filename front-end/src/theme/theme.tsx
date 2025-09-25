import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },

  colorSchemes: {
    light: true, // Habilita o modo claro
    dark: false, // Desabilita o modo escuro
  },
  defaultColorScheme: 'light', // Define o modo claro como padrão

  palette: {
    primary: {
      main: '#4D22E9',

    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;

export const modalTheme = { position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', borderRadius: 2, p: 3, boxShadow: 24 }

export const modalGenericTheme =
{
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export const NavBarColors = {
  background: '#f4f6f8',
  text: '#2c3e50',
  textHover: '#1a252f',
  icon: '#546e7a',
  active: 'linear-gradient(160deg, #4D22E9, #E65AAE)',
  hover: 'rgba(77, 34, 233, 0.1)',
};

export const SearchPagesSx = {
  '& .MuiOutlinedInput-root': {
    color: 'black',
    '& fieldset': {
      borderColor: '#2c3e50', // on hover
      color: 'black',
    },
    '&:hover fieldset': {
      borderColor: '#2c3e50', // on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2c3e50', // on hover
    },
  },
}

