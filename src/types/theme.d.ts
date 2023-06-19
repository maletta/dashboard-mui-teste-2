// import { PaletteColor } from '@mui/mat;erial';

import '@mui/material';
import '@mui/styled-engine/';

declare module '@mui/material/styles' {
  interface Theme {
    header: {
      height: string;
    };
    sidebar: {
      width: Property.Width<TLength>;
      widthCollapsed: Property.Width<TLength>;
      backgroundColor: string;
      footer: {
        height: string;
      };
    };
  }

  interface ThemeOptions {
    header?: {
      height?: string;
    };
    sidebar?: {
      width?: Property.Width<TLength>;
      widthCollapsed?: Property.Width<TLength>;
      backgroundColor?: string;
      footer?: {
        height?: string;
      };
    };
  }
  interface PaletteColor {
    lightest: string;
    darkest: string;
    alpha4?: string;
    alpha8?: string;
    alpha12?: string;
    alpha30?: string;
    alpha50?: string;
  }

  interface SimplePaletteColorOptions {
    lightest?: string;
    darkest?: string;
    alpha4?: string;
    alpha8?: string;
    alpha12?: string;
    alpha30?: string;
    alpha50?: string;
  }

  interface Palette {
    neutral: PaletteColor;
  }

  interface PaletteOptions {
    neutral?: Partial<PaletteColor>;
  }

  interface FabPropsVariantOverrides {
    square: true;
  }
}
