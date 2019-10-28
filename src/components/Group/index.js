import React, { Component } from 'react';

//mobx
import { observer, inject } from 'mobx-react';
import Boolean from 'models/Boolean';

import {
  faEdit,
  faPlay,
  faTrash,
  faMinusSquare,
  faPlusSquare,
  faPlus
} from '@fortawesome/fontawesome-free-solid';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

//components
import ProjectCard from 'components/ProjectCard';
import routes from 'config/routes';

@inject('store')
@observer
class Group extends Component {
  collapsed = Boolean.create();

  render() {
    const { group, hideIfEmpty, collapsed, onClick, store, horizontal } = this.props;
    const hasProjects = group.projects.length > 0;
    const showProjects = hasProjects && collapsed === false && this.collapsed.value === false;
    const hide = hideIfEmpty && !hasProjects;
    const showCollapse = hasProjects && !collapsed && !horizontal;
    const isCollapsed = collapsed === true || this.collapsed.value === true;
    const showPlayButton = !group.projects.every(project => project.isWebBased) && !isCollapsed;

    return (
      <S.Group hide={hide} horizontal={horizontal} spaceAll={10} collapsed={collapsed} onClick={onClick}>
        <A.Horizontal centerV spaceBetween>
          <A.Horizontal spaceAll={10}>
            {showCollapse && (
              <A.ActionIcon
                delay={700}
                onClick={this.collapsed.toggle}
                icon={this.collapsed.value ? faPlusSquare : faMinusSquare}
                tip="Collapse group"
              />
            )}
            <A.Link disable={isCollapsed} onClick={() => store.router.openPage(routes.group, { id: group.id })}>
              {group.name}
            </A.Link>
            {showPlayButton && (
              <A.ActionIcon
                delay={700}
                onClick={() => store.navigateToGroupAndStartAll(group.id)}
                icon={faPlay}
                tip="Start all projects in group"
              />
            )}
          </A.Horizontal>

          {!isCollapsed && (
            <A.Horizontal spaceAll={15}>
              <A.ActionIcon
                onClick={() => store.openFolder(group.id)}
                icon={faPlus}
                tip="Import project here"
              />
              <A.ActionIcon
                onClick={() => store.renameGroup(group.name, group.id)}
                icon={faEdit}
                tip="Rename"
              />
              <A.ActionIcon icon={faTrash} onClick={() => store.deleteGroup(group.id)} tip="Delete group" />
            </A.Horizontal>
          )}
        </A.Horizontal>

        {showProjects && (
          <S.ProjectList horizontal={horizontal}>
            {group.projects.map(project => (
              <ProjectCard
                horizontal={horizontal}
                showMove={store.canMoveProject}
                project={project}
                key={project.id}
              />
            ))}
          </S.ProjectList>
        )}
      </S.Group>
    );
  }
}

export default Group;
