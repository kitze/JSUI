import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//styles
import { Vertical, Horizontal } from 'styles/flex-components';

//components
import * as S from './styles';
import * as A from 'styles/shared-components';

import {
  faPlay,
  faEdit,
  faCode,
  faEye,
  faGlobe,
  faTrash,
  faArrowsAlt,
  faEllipsisV,
  faFolder
} from '@fortawesome/fontawesome-free-solid';

import { PROJECT_TAGS } from 'config/enums';

@inject('store')
@observer
class Project extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { project, store, showMove, horizontal } = this.props;
    const { settings } = store;
    const { type, ready, isWebBased } = project;
    const hasProjectType = type && type !== PROJECT_TAGS.UNKNOWN;
    const markRed = settings.highlightProjectsWithoutRepo && !project.origin && !isWebBased;
    const menuIsOpened = Boolean(anchorEl);

    return (
      <S.ProjectCard horizontal={horizontal} markRed={markRed}>
        <S.Top onClick={project.navigate}>
          <S.Background />
          <S.TopContent>
            <S.Name>{project.name}</S.Name>
          </S.TopContent>
        </S.Top>

        <Menu id="simple-menu" anchorEl={anchorEl} open={menuIsOpened} onClose={this.handleClose}>
          <MenuItem
            onClick={() => {
              this.handleClose();
              project.deleteFromDisk();
            }}
          >
            Delete from disk
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              project.clone();
            }}
          >
            Clone
          </MenuItem>
        </Menu>

        <S.Bottom>
          {!isWebBased && project.startScriptName && (
            <Horizontal justifyEnd>
              <S.Fab onClick={project.navigateThenStart}>
                <S.PlayIcon icon={faPlay} />
              </S.Fab>
            </Horizontal>
          )}

          <Horizontal spaceAll={8} wrap spaceBottom>
            {project.customTags && project.customTags.map(tag => <S.Tag> {tag} </S.Tag>)}
          </Horizontal>

          <S.IconRow alwaysShow={menuIsOpened}>
            {!isWebBased && <S.ActionIcon tip="Open in code editor" icon={faCode} onClick={project.edit} />}
            {!isWebBased && <S.ActionIcon tip="Preview package.json" icon={faEye} onClick={project.previewFile} />}
            {!isWebBased && <A.ActionIcon tip={`Open ${project.path}`} icon={faFolder} onClick={project.openDir} />}

            {isWebBased && (
              <S.ActionIcon tip={`Open ${project.webUrl}`} icon={faGlobe} onClick={project.openWebUrl} />
            )}

            {ready && (
              <React.Fragment>
                {project.origin && (
                  <S.ActionIcon tip={project.origin} icon={project.gitIcon} onClick={project.goToOrigin} />
                )}
              </React.Fragment>
            )}

            <S.ActionIcon
              icon={faTrash}
              color="#ff9590"
              tip="Delete from JSUI"
              onClick={() => store.removeProject(project.id)}
            />
            <S.ActionIcon
              tip="Rename in JSUI"
              icon={faEdit}
              onClick={() => store.renameProject(project.id, project.name)}
            />
            {showMove && (
              <S.ActionIcon
                tip="Move to group"
                icon={faArrowsAlt}
                onClick={() => store.addProjectToGroup(project)}
              />
            )}
            <S.DotsWrap onClick={this.handleClick}>
              <S.ActionIcon icon={faEllipsisV} />
            </S.DotsWrap>
          </S.IconRow>
        </S.Bottom>
      </S.ProjectCard>
    );
  }
}

export default Project;
