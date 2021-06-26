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
import { antdDataControlTester, AntdDataControlWithStore } from './DataControl';
import { saveControlTester, AntdSaveControlWithStore } from './SaveControl';
import { antdSelectControlTester, AntdSelectControlWithStore } from './SelectControl';

export const antdRataControlRenderers: RendererRegistryEntry[] = [
  { tester: antdDataControlTester, renderer: AntdDataControlWithStore },
  { tester: saveControlTester, renderer: AntdSaveControlWithStore },
  { tester: antdSelectControlTester, renderer: AntdSelectControlWithStore },
];

export * from './DataControl';
export * from './NodeRenderer';
export * from './SaveControl';
export * from './SelectControl';
export * from './TableRenderer';
export * from './TabsRenderer';
export * from './TreeContextMenu';
export * from './TreeRenderer';
