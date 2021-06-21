/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { RankedTester } from './testers';

export interface RendererRegistryEntry {
  tester: RankedTester;
  renderer: any;
}

export interface CellRendererRegistryEntry {
  tester: RankedTester;
  cell: any;
}

/**
 * Adds an asterisk to the given label string based
 * on the required parameter.
 *
 * @param {string} label the label string
 * @param {boolean} required whether the label belongs to a control which is required
 * @returns {string} the label string
 */
export const computeLabel = (label: string, required: boolean, hideRequiredAsterisk: boolean): string => {
  return required && !hideRequiredAsterisk ? label + '*' : label;
};

export interface Labels {
  default: string;
  [additionalLabels: string]: string;
}

export const isPlainLabel = (label: string | Labels): label is string => {
  return typeof label === 'string';
};
