import React from 'react';
import { Icon } from 'antd';

import { ReactComponent as ArrowLeft2Svg } from '../../assets/icons/arrow-left-2.svg';
import { ReactComponent as ArrowRight2Svg } from '../../assets/icons/arrow-right-2.svg';
import { ReactComponent as ArrowLeftSvg } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightSvg } from '../../assets/icons/arrow-right.svg';
import { ReactComponent as CloseSvg } from '../../assets/icons/close.svg';
import { ReactComponent as EyeSvg } from '../../assets/icons/eye.svg';
import { ReactComponent as LayersSvg } from '../../assets/icons/layers.svg';
import { ReactComponent as LessSvg } from '../../assets/icons/less.svg';
import { ReactComponent as MenuSvg } from '../../assets/icons/menu.svg';
import { ReactComponent as PlusSvg } from '../../assets/icons/plus.svg';
import { ReactComponent as UserSvg } from '../../assets/icons/user.svg';

const Icons = {
  'arrow-left': ArrowLeftSvg,
  'arrow-right': ArrowRightSvg,
  'arrow-left-2': ArrowLeft2Svg,
  'arrow-right-2': ArrowRight2Svg,
  'close': CloseSvg,
  'eye': EyeSvg,
  'layers': LayersSvg,
  'less': LessSvg,
  'menu': MenuSvg,
  'plus': PlusSvg,
  'user': UserSvg,
}

export default (props) => {
  const icon = Icons[props.type];
  return (
    <Icon component={icon} className={props.className} style={props.style}/>
  )
}
