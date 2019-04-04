import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import generators from 'generators';
import cleanups from 'cleanups';
import routes from 'config/routes';
import { getActionsForPopup } from 'models/actions';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';
import { Horizontal } from 'styles/flex-components';

//components
import PopupSelector from 'components/PopupSelector';
import Dialog from 'components/Dialog';
import CssToJsConverter from 'components/CssToJsConverter';
import BabelRepl from 'components/BabelRepl';
import Settings from 'views/Settings';
import ListOfBlocks from 'components/ListOfBlocks';
import CliGenerator from 'components/CliGenerator';
import ImportWorkspace from 'components/ImportWorkspace';
import ImportWebUrl from 'components/ImportWebUrl';
import ImportGithubUrl from 'components/ImportGithubUrl';
import CloneProjectDialog from 'components/CloneProjectDialog';

@inject('store')
@observer
class Dialogs extends Component {
  render() {
    const { store } = this.props;
    const { projects, settingsOpened } = store;
    const { searchOpened, actions, cssConverterDialogOpen, babelReplDialogOpen } = store;

    const mappedItems = projects.map(({ name, id, path, isWebBased }) => ({ name, id, path, isWebBased }));

    return (
      <S.Dialogs>
        {actions.opened.value === true && (
          <PopupSelector
            key="actions"
            renderItem={({ name }) => (
              <Horizontal centerV spaceBetween flex={1}>
                <div>{name}</div>
              </Horizontal>
            )}
            showSearch={true}
            closeOnChoose={true}
            items={getActionsForPopup(store)}
            onChoose={action => actions.runAction(action.command)}
            onEsc={actions.opened.setFalse}
          />
        )}

        {searchOpened.value === true && (
          <PopupSelector
            key="search-projects"
            renderItem={({ name, path }) => (
              <Horizontal centerV spaceBetween flex={1}>
                <div>{name}</div>
                <div>{path}</div>
              </Horizontal>
            )}
            showSearch={true}
            closeOnChoose={true}
            items={mappedItems}
            onChoose={project =>
              store.router.openPage(project.isWebBased ? routes.webProject : routes.project, {
                id: project.id
              })
            }
            onEsc={searchOpened.setFalse}
          />
        )}

        {settingsOpened.value === true && (
          <Dialog key="settings" onClose={settingsOpened.setFalse}>
            <Settings onSave={settingsOpened.setFalse} />
          </Dialog>
        )}

        {store.openedFile && (
          <Dialog key="opened-file" onClose={store.closeFile} onEsc={store.closeFile}>
            <S.Editor
              value={store.openedFile.content}
              options={{ mode: 'javascript', theme: 'material', lineNumbers: true }}
            />
          </Dialog>
        )}

        {cssConverterDialogOpen.value === true && (
          <Dialog key="css-to-js" onClose={cssConverterDialogOpen.setFalse}>
            <CssToJsConverter onDone={cssConverterDialogOpen.setFalse} />
          </Dialog>
        )}

        {babelReplDialogOpen.value === true && (
          <Dialog
            key="babel-repl"
            styles={{ content: { maxWidth: 900, width: '80%' } }}
            onClose={babelReplDialogOpen.setFalse}
          >
            <BabelRepl />
          </Dialog>
        )}

        {store.activeGenerator !== null && store.activeGenerator !== undefined && (
          <Dialog key="active-generator" onClose={store.clearActiveGenerator}>
            <CliGenerator
              onCancel={store.clearActiveGenerator}
              initialValues={store.activeGenerator.initialValues}
              onSubmit={store.runCliGenerator}
              generator={store.activeGenerator}
            />
          </Dialog>
        )}

        {store.generateDialogOpen.value === true && (
          <Dialog key="generate-dialog" onClose={store.generateDialogOpen.setFalse}>
            <A.DialogContent>
              <h3> Generate a project </h3>
              <ListOfBlocks onPick={store.setActiveGenerator} list={generators} />
            </A.DialogContent>
          </Dialog>
        )}

        {store.cleanupDialogOpen.value === true && (
          <Dialog key="cleanup-dialog" onClose={store.cleanupDialogOpen.setFalse}>
            <A.DialogContent>
              <h3> Choose a wizard </h3>
              <ListOfBlocks onPick={store.setActiveCleanup} list={cleanups} />
            </A.DialogContent>
          </Dialog>
        )}

        {store.cloningProject && (
          <Dialog key="cloning-project-dialog" onClose={store.closeCloningDialog}>
            <CloneProjectDialog
              onCancel={store.closeCloningDialog}
              onSubmit={store.cloneProject}
              project={store.cloningProject}
            />
          </Dialog>
        )}

        {!!store.importingWorkspace && (
          <Dialog key="import-workspace" onClose={store.cancelImportingWorkspace}>
            <ImportWorkspace
              onCancel={store.cancelImportingWorkspace}
              onSubmit={store.importWorkspace}
              workspace={store.importingWorkspace}
            />
          </Dialog>
        )}

        {store.importingWebUrl.value === true && (
          <Dialog key="import-web-url" onClose={store.importingWebUrl.setFalse}>
            <ImportWebUrl onCancel={store.importingWebUrl.setFalse} onSubmit={store.importWebProject} />
          </Dialog>
        )}

        {store.importingGithubUrl.value === true && (
          <Dialog key="import-github-url" onClose={store.importingGithubUrl.setFalse}>
            <ImportGithubUrl onCancel={store.importingGithubUrl.setFalse} onSubmit={store.importGithubUrl} />
          </Dialog>
        )}
      </S.Dialogs>
    );
  }
}

export default Dialogs;
