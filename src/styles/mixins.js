import { darken } from 'polished';

export const size = (w, h = w, important) => ({
  width: `${w}px ${important ? '!important' : ''}`,
  height: `${h}px ${important ? '!important' : ''}`
});

export const iconSize = (w, h = w) => size(w, h, true);

export const noSelect = {
  userSelect: 'none',
  cursor: 'default'
};

export const fixedHeight = height => ({
  height,
  maxHeight: height,
  minHeight: height
});

export const fixedWidth = width => ({
  width,
  maxWidth: width,
  minWidth: width
});

export const fixedSize = (width, height = width) => ({
  ...fixedHeight(height),
  ...fixedWidth(width)
});

export const marginVertical = (marginTop, marginBottom = marginTop) => ({
  marginTop,
  marginBottom
});

export const marginHorizontal = (marginLeft, marginRight = marginLeft) => ({
  marginLeft,
  marginRight
});

export const margin = (
  marginTop,
  marginRight = marginTop,
  marginBottom = marginTop,
  marginLeft = marginRight
) => ({
  marginTop,
  marginLeft,
  marginRight,
  marginBottom
});

export const paddingVertical = (paddingTop, paddingBottom = paddingTop) => ({
  paddingTop,
  paddingBottom
});

export const paddingHorizontal = (paddingLeft, paddingRight = paddingLeft) => ({
  paddingLeft,
  paddingRight
});

export const padding = (
  paddingTop,
  paddingRight = paddingTop,
  paddingBottom = paddingTop,
  paddingLeft = paddingRight
) => ({
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom
});

export const diagonalGradient = (from, to) => ({
  background: `linear-gradient(to bottom right, ${from}, ${to})`
});

export const topBottomGradient = (from, to) => ({
  background: `linear-gradient(${from}, ${to})`
});

export const getActionColors = (color, activeProp = 'active') => props => {
  const { disabled } = props;
  const active = props[activeProp];

  return {
    backgroundColor: color,
    ...(!disabled &&
      !active && {
        '&:hover': {
          backgroundColor: darken(0.02, color)
        },
        '&:active': {
          backgroundColor: darken(0.05, color)
        }
      }),
    ...(active && {
      backgroundColor: darken(0.1, color)
    })
  };
};

export const whiteish = (opacity = 1) => `rgba(255,255,255, ${opacity})`;
export const blackish = (opacity = 1) => `rgba(0,0,0, ${opacity})`;

export const screenSize = {
  width: '100vw',
  height: '100vh'
};

export const absolute = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

export const hoverable = ({ color = 'white', background = false, initial = true }) => ({ disabled }) => {
  const styleKey = background ? 'backgroundColor' : 'color';

  return {
    ...(!disabled && {
      cursor: 'pointer',
      ...(initial && { [styleKey]: color }),
      transition: 'all 150ms linear',
      '&:hover': {
        [styleKey]: initial ? darken(0.2, color) : color
      }
    })
  };
};

export const hoverAndFocus = style => ({
  '&:hover': style,
  '&:focus': style
});

export const targetChild = (component, styles) => ({
  [`& .${component.className}`]: styles
});

export const hoverChild = (component, styles) => ({
  '&:hover': {
    [`& .${component.className}`]: styles
  }
});

export const fromTheme = key => p => p.theme[key](p);

export const exceptLast = styles => ({
  '&:not(:last-of-type)': styles
});

export const exceptFirst = styles => ({
  '&:not(:last-of-type)': styles
});

export const grid = (cols, { columnGap = 0, rowGap = columnGap, gap = 0 } = {}) => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    rowGap: rowGap || gap,
    columnGap: columnGap || gap
  };
};

export const absoluteCorner = (corner = 1, offset = 0) => {
  return {
    position: 'absolute',
    ...(corner === 2 && {
      top: offset,
      right: offset
    }),
    ...(corner === 1 && {
      left: offset,
      top: offset
    }),
    ...(corner === 3 && {
      right: offset,
      bottom: offset
    }),
    ...(corner === 4 && {
      left: offset,
      bottom: offset
    })
  };
};
