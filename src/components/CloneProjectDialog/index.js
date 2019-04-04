import React, { Component } from 'react';
import { TextField } from 'styles/material-ui-overrides';

//styles
import * as A from 'styles/shared-components';
import { BUTTONS } from 'config/enums';
import { isEmptyString } from 'utils/string-utils';
import { useInput } from 'react-hanger';

const CloneProjectDialog = ({ onSubmit, onCancel, project }) => {
  const name = useInput('');

  const fields = [name];
  const valid = fields.every(field => !isEmptyString(field.value)) && name.value !== project.name;

  const values = {
    name: name.value
  };

  return (
    <A.DialogContent>
      <A.TopFlex>
        <h1>Clone project</h1>
        <A.Space />
        <A.Space size={3} />
        <TextField autoFocus placeholder={project.name} {...name.bindToInput} />
      </A.TopFlex>

      <A.Horizontal spaceAll={15} justifyEnd>
        <A.Button type={BUTTONS.DANGER} onClick={onCancel}>
          Cancel
        </A.Button>
        <A.Button disabled={!valid} type={BUTTONS.PRIMARY} onClick={() => onSubmit(values)}>
          Done
        </A.Button>
      </A.Horizontal>
    </A.DialogContent>
  );
};

export default CloneProjectDialog;
