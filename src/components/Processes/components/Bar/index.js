import React, { Component } from 'react';

import {
  faAlignCenter,
  faCaretDown,
  faCaretUp,
  faSpinner,
  faStop,
  faSync,
  faSkull,
  faWindowMaximize,
  faWindowMinimize
} from '@fortawesome/fontawesome-free-solid/index';

//styles
import * as S from './styles';
import { Horizontal } from 'styles/flex-components';

//types
import { variants } from 'storybook-helpers/variants';
import { boolean, text } from '@storybook/addon-knobs';
import PropTypes from 'prop-types';

class Bar extends Component {
  static propTypes = {
    running: PropTypes.bool,
    minimized: PropTypes.bool,
    title: PropTypes.string,
    //functions
    onClearOutput: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
    onMinimize: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func
  };

  static getKnobs = () => ({
    running: boolean('running'),
    minimized: boolean('minimized'),
    title: text('title')
  });

  static Variants = {
    running: variants.boolean(['running', 'not running']),
    title: variants.boolean(['normal title', 'crazy/long/something/weird/title']),
    minimized: variants.boolean()
  };

  render() {
    const {
      running,
      onMouseDown,
      title,
      minimized,
      fullScreen,
      onClearOutput,
      onRestart,
      onStop,
      onMinimize,
      onKill,
      onFullScreen,
      allowResize
    } = this.props;

    return (
      <S.Bar allowResize={allowResize} onMouseDown={onMouseDown} minimized={minimized}>
        <Horizontal spaceAll={15} centerV>
          <S.TerminalIcon
            tip={minimized ? 'Maximize' : 'Minimize'}
            onClick={onMinimize}
            icon={minimized ? faCaretUp : faCaretDown}
          />
          <S.TerminalIcon
            tip={fullScreen ? 'Bottom' : 'Full Screen'}
            onClick={onFullScreen}
            icon={fullScreen ? faWindowMinimize : faWindowMaximize}
          />
          {running && <S.TerminalIcon spin={true} icon={faSpinner} />}
        </Horizontal>

        <S.Icons spaceAll={15}>
          <S.TerminalIcon tip="Clear output" onClick={onClearOutput} icon={faAlignCenter} />
          {running && <S.TerminalIcon tip="Stop current" icon={faStop} onClick={onStop} />}
          <S.TerminalIcon tip="Restart current" icon={faSync} onClick={onRestart} />
          <S.TerminalIcon tip="Kill all" icon={faSkull} onClick={onKill} />
        </S.Icons>
      </S.Bar>
    );
  }
}

export default Bar;
