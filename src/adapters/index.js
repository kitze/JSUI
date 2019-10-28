import React from 'react';
import {
  Switch,
  Select,
  MenuItem,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Checkbox
} from '@material-ui/core';

import { TextField, SelectClasses, InputLabelClasses, LabelClasses } from 'styles/material-ui-overrides';
import * as A from 'styles/shared-components';
import { css } from 'emotion';

const classes = {
  root: css({
    color: 'white',
    userSelect: 'none'
  }),
  label: css({
    color: 'white',
    userSelect: 'none'
  })
};

export const InputAdapter = ({ input: { onChange, value }, ...rest }) => (
  <TextField
    value={value}
    onChange={e => onChange(e.target.value)}
    label={rest.label || rest.placeholder}
    type="text"
    {...rest}
  />
);

export const SelectAdapter = ({ input: { onChange, value }, option }) => (
  <A.Vertical>
    <InputLabel classes={InputLabelClasses}>{option.name}</InputLabel>
    <Select classes={SelectClasses} value={value} onChange={onChange}>
      {option.options.map(option => (
        <MenuItem value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  </A.Vertical>
);

export const SwitchAdapter = ({ input: { onChange, value }, option }) => (
  <FormControlLabel
    label={option.name}
    classes={LabelClasses}
    control={<Switch checked={value} onChange={(e, c) => onChange(c)} />}
  />
);

export const RadioAdapter = ({ input: { onChange, value }, label, options = [] }) => (
  <RadioGroup value={value} onChange={e => onChange(e.target.value)}>
    <FormLabel classes={classes} component="legend">
      {label}
    </FormLabel>
    {options.map(option => (
      <FormControlLabel
        classes={{
          label: classes.label
        }}
        value={option.value}
        control={<Radio />}
        label={option.label}
      />
    ))}
  </RadioGroup>
);

export const CheckboxAdapter = ({ input: { onChange, value }, label }) => (
  <FormControlLabel
    classes={classes}
    control={<Checkbox onChange={e => onChange(e.target.checked)} checked={value} />}
    label={label}
  />
);
