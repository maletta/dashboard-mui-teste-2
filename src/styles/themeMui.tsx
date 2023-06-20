// import { createTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material';
const defaultTheme = createTheme({
  header: {
    height: '3.875rem', // 60px
  },
  sidebar: {
    width: '16.25rem', // 260px
    widthCollapsed: '60px', // 60px
    backgroundColor: '#1c2536',
    footer: {
      height: '3.875rem',
    },
  },
  palette: {
    primary: {
      main: '#222e3c',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // alterando só o botão oulined primary
        outlinedPrimary: {},
      },
    },
    MuiFab: {
      styleOverrides: {
        // alterando root só quando é passada a propriedade size="large"
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'large' && {
            width: 60,
            height: 60,
          }),
        }),
      },
      // variants: [
      //   {
      //     props: { variant: 'square' },
      //     style: {
      //       borderRadius: 10,
      //     },
      //   },
      // ],
    },
  },
});

export { defaultTheme };
