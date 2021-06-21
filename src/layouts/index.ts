/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { RendererRegistryEntry } from '../renderers';
import { antdFormLayoutTester, AntdFormLayoutWithStore } from './AntdFormLayout';
import { antdHorizontalLayoutTester, AntdHorizontalLayoutWithStore } from './AntdHorizontalLayout';
import { antdVerticalLayoutTester, AntdVerticalLayoutWithStore } from './AntdVerticalLayout';

export const antdLayoutRenderers: RendererRegistryEntry[] = [
  {
    tester: antdHorizontalLayoutTester,
    renderer: AntdHorizontalLayoutWithStore,
  },
  { tester: antdVerticalLayoutTester, renderer: AntdVerticalLayoutWithStore },
  {
    tester: antdFormLayoutTester,
    renderer: AntdFormLayoutWithStore,
  },
];

export * from './AntdHorizontalLayout';
export * from './AntdVerticalLayout';
export * from './AntdFormLayout';
export * from './LayoutComponent';
