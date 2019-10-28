import React, { Component, Fragment } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { css } from 'emotion';
import { TextField } from 'styles/material-ui-overrides';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';
import { BUTTONS, IMPORT_WORKSPACE_TYPES } from 'config/enums';
import { getLastFromString, isEmptyString } from 'utils/string-utils';

const classes = {
  root: css({
    color: 'white'
  }),
  label: css({
    color: 'white'
  })
};

class ImportWorkspace extends Component {
  state = {
    type: IMPORT_WORKSPACE_TYPES.SEPARATELY,
    groupName: ''
  };

  handleTypeChange = e => this.setState({ type: e.target.value });
  handleGroupNameChange = e => this.setState({ groupName: e.target.value });

  render() {
    const { workspace, onSubmit, onCancel } = this.props;
    const { type, groupName } = this.state;

    const folderNames = workspace.folders.map(f => getLastFromString(f.path, '/'));
    const valid =
      !isEmptyString(type) && type === IMPORT_WORKSPACE_TYPES.GROUP ? !isEmptyString(groupName) : true;

    return (
      <A.DialogContent>
        <A.TopFlex>
          <h1>Import workspace</h1>
          <S.Description> You're about to import the following projects: </S.Description>
          <A.Space />

          <S.Folders>
            {folderNames.map(folder => (
              <S.Folder> {folder} </S.Folder>
            ))}
          </S.Folders>

          <FormControl component="fieldset" required>
            <RadioGroup value={this.state.type} onChange={this.handleTypeChange}>
              <FormControlLabel
                classes={{
                  label: classes.label
                }}
                disabled={true}
                value={IMPORT_WORKSPACE_TYPES.WORKSPACE}
                control={<Radio />}
                label="As a single workspace project (coming soon)"
              />
              <FormControlLabel
                classes={{
                  label: classes.label
                }}
                value={IMPORT_WORKSPACE_TYPES.SEPARATELY}
                control={<Radio />}
                label={`Separately (will create ${folderNames.length} new projects)`}
              />
              <FormControlLabel
                classes={{
                  label: classes.label
                }}
                value={IMPORT_WORKSPACE_TYPES.GROUP}
                control={<Radio />}
                label="Separately, but in a new group"
              />
            </RadioGroup>
          </FormControl>
          {this.state.type === IMPORT_WORKSPACE_TYPES.GROUP && (
            <Fragment>
              <A.Space size={3} />
              <TextField
                placeholder="Group name"
                onChange={this.handleGroupNameChange}
                value={this.state.groupName}
              />
            </Fragment>
          )}
        </A.TopFlex>

        <A.Horizontal spaceAll={15} justifyEnd>
          <A.Button type={BUTTONS.DANGER} onClick={onCancel}>
            Cancel
          </A.Button>
          <A.Button disabled={!valid} type={BUTTONS.PRIMARY} onClick={() => onSubmit(this.state)}>
            Done
          </A.Button>
        </A.Horizontal>
      </A.DialogContent>
    );
  }
}

export default ImportWorkspace;
