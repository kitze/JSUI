import { css } from 'emotion';
import withProps from 'recompose/withProps';
import emotion from '@emotion/styled';
import { Input as $Input, TextField as $TextField } from '@material-ui/core';
import { whiteish } from 'styles/mixins';

export const InputClasses = {
  root: css({
    color: 'white'
  }),
  input: css({
    color: 'white',
    borderBottom: '2px solid white',
    '&:after': {
      borderBottom: '2px solid white'
    }
  }),
  inputType: css({
    color: 'white'
  })
};

export const InputLabelClasses = {
  root: css({
    color: whiteish(0.8),
    fontSize: 13
  })
};

export const SelectClasses = {
  root: css({
    color: 'white'
  })
};

export const LabelClasses = {
  root: css({}),
  label: css({
    color: 'white'
  })
};

export const TextField = withProps({
  InputProps: {
    classes: InputClasses
  },
  InputLabelProps: {
    classes: {
      root: css({
        color: whiteish(0.8),
        '&$focused': {
          color: whiteish(1)
        }
      })
    }
  },
  FormHelperTextProps: {
    classes: {
      root: css({
        color: 'green',
        '&focused': {
          color: 'pink'
        }
      })
    }
  }
})(emotion($TextField)({}));

export const Input = withProps({ classes: InputClasses })(emotion($Input)({}));
