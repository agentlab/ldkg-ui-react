/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import * as allIcons from '@ant-design/icons/lib/icons';
import AntdIcon, { createFromIconfontCN, getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

import { withThemeSuffix, removeTypeTheme, getThemeFromTypeName, alias } from './utils';
import warning from './warning';

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  ['aria-hidden']?: React.AriaAttributes['aria-hidden'];
}

export type ThemeType = 'filled' | 'outlined' | 'twoTone';

interface CoreIconProps {
  tabIndex?: number;
  className?: string;
  theme?: ThemeType;
  title?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  twoToneColor?: string;
  viewBox?: string;
  spin?: boolean;
  rotate?: number;
  style?: React.CSSProperties;
  role?: string;
}

interface LegacyTypeIconProps extends CoreIconProps {
  type: string;
}

export interface IconProps extends CoreIconProps {
  type?: string;
  component?: React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>;
}

export interface IconComponent<P> extends React.SFC<P> {
  createFromIconfontCN: typeof createFromIconfontCN;
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}

const iconsMap: {
  [key: string]: any;
} = allIcons;

export const LegacyTypeIcon: React.FC<LegacyTypeIconProps> = (props) => {
  const { type, theme } = props;

  if (theme) {
    const themeInName = getThemeFromTypeName(type);
    warning(
      !themeInName || theme === themeInName,
      'Icon',
      `The icon name '${type}' already specify a theme '${themeInName}',` +
        ` the 'theme' prop '${theme}' will be ignored.`,
    );
  }
  const computedType = withThemeSuffix(removeTypeTheme(alias(type)), theme || 'outlined');
  const targetIconComponent = iconsMap[computedType];
  warning(
    targetIconComponent,
    'Icon',
    `The icon name '${type}'${
      theme ? `with ${theme}` : ''
    } doesn't exist, please check it at https://ant.design/components/icon`,
  );

  return targetIconComponent ? React.createElement(targetIconComponent, props) : null;
};

/*const Icon: IconComponent<IconProps> = props => {
  const { type, component, children } = props;

  upgradeMessage('Icon');

  warning(
    Boolean(type || component || children),
    'Icon',
    'Should have `type` prop or `component` prop or `children`.',
  );

  if (component || children) {
    return <AntdIcon {...props} />;
  }

  if (typeof type === 'string') {
    return <LegacyTypeIcon {...props} type={type} />;
  }

  return <AntdIcon />;
};

Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;*/
