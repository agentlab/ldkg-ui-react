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
import { AntdBooleanControl, antdBooleanControlTester, AntdBooleanControlWithStore } from './AntdBooleanControl';
import { AntdButtonControl, antdButtonControlTester, AntdButtonControlWithStore } from './AntdButtonControl';
import { AntdDateControl, antdDateControlTester, AntdDateControlWithStore } from './AntdDateControl';
import { AntdEnumControl, antdEnumControlTester, AntdEnumControlWithStore } from './AntdEnumControl';
import { AntdNumberControl, antdNumberControlTester, AntdNumberControlWithStore } from './AntdNumberControl';
import {
  AntdRadioGroupControl,
  antdRadioGroupControlTester,
  AntdRadioGroupControlWithStore,
} from './AntdRadioGroupControl';
import { AntdSliderControl, antdSliderControlTester, AntdSliderControlWithStore } from './AntdSliderControl';
import { AntdTextControl, antdTextControlTester, AntdTextControlWithStore } from './AntdTextControl';
import { TinyMCEControl, tinyMCEControlTester, TinyMCEControlWithStore } from './TinyMCEControl';

export const Unwrapped = {
  AntdBooleanControl: AntdBooleanControl,
  AntdButtonControl: AntdButtonControl,
  AntdDateControl: AntdDateControl,
  AntdEnumControl: AntdEnumControl,
  AntdNumberControl: AntdNumberControl,
  AntdRadioGroupControl: AntdRadioGroupControl,
  AntdSliderControl: AntdSliderControl,
  AntdTextControl: AntdTextControl,
  TinyMCEControl: TinyMCEControl,
};

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
  { tester: antdSliderControlTester, renderer: AntdSliderControlWithStore },
  { tester: antdTextControlTester, renderer: AntdTextControlWithStore },

  { tester: tinyMCEControlTester, renderer: TinyMCEControlWithStore },
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
