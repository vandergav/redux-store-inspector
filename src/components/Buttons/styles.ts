import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export interface StyleProps {
  background?: string;
  borderRadius?: string | number;
  border?: string | number;
  color?: string;
  height?: string | number;
  textTransform?: textTransformTypes | any;
  padding?: string | number;
  boxShadow?: string;
  hoverBackground?: string;
}

type textTransformTypes =
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'full-width'
  | 'full-size-kana';

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: ({
    background,
    borderRadius,
    border,
    color,
    height,
    textTransform,
    padding,
    boxShadow,
    hoverBackground,
  }) => {
    return {
      background: `${background || '#909090'} !important`,
      borderRadius: `${borderRadius || '3px'} !important`,
      border: `${border || '0px'} !important`,
      color: `${color || 'white'} !important`,
      height: `${height || '36px'} !important`,
      textTransform: textTransform || 'none !important',
      padding: `${padding || theme.spacing(0, 2)} !important`,
      boxShadow: `${
        boxShadow ||
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
      } !important`,
      '&:hover': {
        background: `${hoverBackground || '#FF9933'} !important`,
      },
    };
  },
}));

// type StylePropsKey = keyof StyleProps;

// const stylePropDefaults = [
//   { key: 'background', value: '#909090' },
//   { key: 'borderRadius', value: '3px' },
//   { key: 'border', value: '0px' },
//   { key: 'color', value: 'white' },
//   { key: 'height', value: '36px' },
//   { key: 'textTransform', value: 'none' },
//   { key: 'padding', value: '0px 16px' },
//   {
//     key: 'boxShadow',
//     value:
//       '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
//   },
//   { key: '&:hover', value: 'rgba(0, 0, 0, 0.3)' },
// ];

// export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
//   root: (props) => rootStyles(props, theme),
// }));

// const rootStyles = (props: StyleProps, theme: Theme) => {
//   return stylePropDefaults.reduce((acc, cur) => {
//     const key = cur.key as StylePropsKey;
//     const value = cur.value;
//     return { ...acc, [key]: `${props[key] || value} !important` };
//   }, {});
// };
