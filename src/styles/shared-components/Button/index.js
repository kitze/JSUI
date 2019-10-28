import emotion from '@emotion/styled';
import PropTypes from 'prop-types';

import { flex } from 'styles/flex';
import { BUTTONS, SHADOWS, DARKEN } from 'config/enums';
import { colors } from 'styles/colors';
import { hoverAndFocus } from 'styles/mixins';
import { darken as darkenFn } from 'polished';

const defaultShadowColor = '#08080854';

export const acceptStyles = ({ styles }) => styles;

const Button = emotion.button(
  {
    ...flex.horizontal,
    ...flex.centerHorizontal,
    transition: 'all 150ms linear',
    padding: '10px 30px',
    borderRadius: 3,
    fontSize: 14,
    outline: 'none'
  },
  ({ disabled, type = BUTTONS.PRIMARY, shadow = SHADOWS.ALWAYS, darken = DARKEN.SMALL }) => {
    const buttonType = (buttonTypes[type] || buttonTypes[BUTTONS.DEFAULT])({
      shadow
    });

    return {
      border: 'none',
      ...buttonType.styles,
      ...(!disabled && {
        ...hoverAndFocus({
          ...buttonType.hover,
          backgroundColor: darkenFn(darken, buttonType.styles.backgroundColor),
          transform: 'scale(1.02)'
        }),
        '&:active': {
          transform: 'translateY(2px)'
        }
      })
    };
  },
  props => {
    const foundType = buttonTypes[props.type];
    return foundType && foundType();
  },
  ({ disabled, caps }) => {
    return {
      ...(caps && {
        textTransform: 'uppercase'
      }),
      ...(disabled && {
        opacity: 0.5
      }),
      ...(!disabled && {
        cursor: 'pointer'
      })
    };
  },
  acceptStyles
);

const buttonTypes = {
  [BUTTONS.PRIMARY]: () => ({
    styles: {
      backgroundColor: '#8e2d4f',
      color: 'white'
    }
  }),
  [BUTTONS.DEFAULT]: () => ({
    styles: {
      backgroundColor: '#ebebeb',
      color: colors.purple2
    }
  }),
  [BUTTONS.DANGER]: () => ({
    styles: {
      backgroundColor: colors.red,
      color: 'white'
    }
  })
};

Button.propTypes = {
  type: PropTypes.oneOf(Object.values(BUTTONS)),
  disabled: PropTypes.bool,
  caps: PropTypes.bool,
  shadow: PropTypes.oneOf(Object.values(SHADOWS)),
  darken: PropTypes.oneOf(Object.values(DARKEN))
};

export default Button;
