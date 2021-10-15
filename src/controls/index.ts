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
import { antdBooleanControlTester, AntdBooleanControlWithStore } from './AntdBooleanControl';
import { antdButtonControlTester, AntdButtonControlWithStore } from './AntdButtonControl';
import { antdDateControlTester, AntdDateControlWithStore } from './AntdDateControl';
import { antdEnumControlTester, AntdEnumControlWithStore } from './AntdEnumControl';
import { antdNumberControlTester, AntdNumberControlWithStore } from './AntdNumberControl';
import { antdRadioGroupControlTester, AntdRadioGroupControlWithStore } from './AntdRadioGroupControl';
import { antdSliderControlTester, AntdSliderControlWithStore } from './AntdSliderControl';
import { antdTextControlTester, AntdTextControlWithStore } from './AntdTextControl';
import { tinyMCEControlTester, TinyMCEControlWithStore } from './TinyMCEControl';
import { antdImageControlTester, AntdImageControlWithStore } from './AntdImageControl';
import QueryRenderer, { antdQueryTester } from './query/QueryRenderer';

export const antdControlRenderers: RendererRegistryEntry[] = [
  { tester: antdBooleanControlTester, renderer: AntdBooleanControlWithStore },
  { tester: antdButtonControlTester, renderer: AntdButtonControlWithStore },
  { tester: antdDateControlTester, renderer: AntdDateControlWithStore },
  { tester: antdEnumControlTester, renderer: AntdEnumControlWithStore },
  { tester: antdNumberControlTester, renderer: AntdNumberControlWithStore },
  {
    tester: antdRadioGroupControlTester,
    renderer: AntdRadioGroupControlWithStore,
  },
  {
    tester: antdImageControlTester,
    renderer: AntdImageControlWithStore,
  },
  { tester: antdSliderControlTester, renderer: AntdSliderControlWithStore },
  { tester: antdTextControlTester, renderer: AntdTextControlWithStore },

  { tester: tinyMCEControlTester, renderer: TinyMCEControlWithStore },
  { tester: antdQueryTester, renderer: QueryRenderer },
];

export * from './AntdBooleanControl';
export * from './AntdButtonControl';
export * from './AntdDateControl';
export * from './AntdEnumControl';
export * from './AntdInputControl';
export * from './AntdNumberControl';
export * from './AntdRadioGroupControl';
export * from './AntdSliderControl';
export * from './AntdTextControl';
export * from './TinyMCEControl';
export * from './AntdImageControl';
