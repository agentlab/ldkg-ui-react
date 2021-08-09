/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
export interface ViewElement {
  '@id': string;
  '@type': string;
  title?: string;
  description?: string;
  viewKind?: string;

  type: string;
  //order?: string[];
  //queries?: any[];
  scope?: string;
  resultsScope?: string;
  options?: {
    [key: string]: any;
  };
  elements?: ViewElement[];
}
export type View = ViewElement;

export interface ViewClassElement {
  '@id'?: string;
  '@type'?: string;
  title?: string;
  description?: string;
  queries?: any[];
  type: string;
  scope?: string;
  resultsScope?: string;
  options?: {
    [key: string]: any;
  };
}
export interface Layout extends ViewClassElement {
  elements: (Layout | ViewClassElement)[];
}

export declare type ViewClass = Layout | ViewClassElement;
