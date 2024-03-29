/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { camelCase, upperFirst } from 'lodash-es';
import { ThemeType } from './index';
import warning from './warning';

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: 'false',
};

// moved from https://github.com/ant-design/ant-design/blob/master/components/icon/utils.ts
const fillTester = /-fill$/;
const outlineTester = /-o$/;
const twoToneTester = /-twotone$/;

export function getThemeFromTypeName(type: string): ThemeType | null {
  let result: ThemeType | null = null;
  if (fillTester.test(type)) {
    result = 'filled';
  } else if (outlineTester.test(type)) {
    result = 'outlined';
  } else if (twoToneTester.test(type)) {
    result = 'twoTone';
  }
  return result;
}

export function removeTypeTheme(type: string): string {
  return type.replace(fillTester, '').replace(outlineTester, '').replace(twoToneTester, '');
}

const themeMap: { [key in ThemeType]: string } = {
  filled: 'filled',
  outlined: 'outlined', // default theme
  twoTone: 'twoTone',
};

export function withThemeSuffix(type: string, theme: ThemeType): string {
  const result = upperFirst(camelCase(type));
  const realTheme = upperFirst(themeMap[theme]);

  if (theme !== 'outlined' && !realTheme) {
    warning(false, 'Icon', `This icon '${type}' has unknown theme '${theme}'`);
  }

  return result + realTheme;
}

// For alias or compatibility
export function alias(type: string): string {
  let newType = type;
  switch (type) {
    case 'cross':
      newType = 'close';
      break;
    // https://github.com/ant-design/ant-design/issues/13007
    case 'interation':
      newType = 'interaction';
      break;
    // https://github.com/ant-design/ant-design/issues/16810
    case 'canlendar':
      newType = 'calendar';
      break;
    // https://github.com/ant-design/ant-design/issues/17448
    case 'colum-height':
      newType = 'column-height';
      break;
    default:
  }
  warning(
    newType === type,
    'Icon',
    `Icon '${type}' was a typo and is now deprecated, please use '${newType}' instead.`,
  );
  return newType;
}
