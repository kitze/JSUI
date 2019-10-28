import React, { Component } from 'react';
import ConditionalWrap from 'conditional-wrap';

//emotion
import * as S from './styles';

//components
import { Tooltip } from 'react-tippy';

class IconWithTip extends Component {
  static defaultProps = {
    position: 'bottom'
  };

  render() {
    const { icon, styles, className, delay = 300, tip, position, ...rest } = this.props;

    return (
      <ConditionalWrap
        condition={tip}
        wrap={children => (
          <Tooltip styles={styles} className={className} delay={delay} title={tip} position={position}>
            {children}
          </Tooltip>
        )}
      >
        <S.Icon styles={styles} className={className} {...rest} icon={icon} />
      </ConditionalWrap>
    );
  }
}

export default IconWithTip;
