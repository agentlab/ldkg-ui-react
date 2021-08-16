/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { ICollConstrJsOpt } from '@agentlab/sparql-jsld-client';

export interface IViewDescrElement {
  '@id': string;
  '@type': string;
  '@parent'?: string;

  title?: string;
  description?: string;

  scope?: string;
  resultsScope?: string;
  options?: {
    [key: string]: any;
  };
  elements?: IViewDescrElement[];
}

export interface IViewDescr {
  '@id': string;
  '@type': string;
  viewKind?: string;

  title?: string;
  description?: string;

  options?: {
    [key: string]: any;
  };
  elements: IViewDescrElement[];
  collsConstrs: ICollConstrJsOpt[];
}

export interface IViewKindElement {
  '@id': string;
  '@type': string;

  title?: string;
  description?: string;

  scope?: string;
  resultsScope?: string;
  options?: {
    [key: string]: any;
  };
  elements?: IViewKindElement[];
}
export interface IViewKind {
  '@id': string;
  '@type': string;

  title?: string;
  description?: string;

  options?: {
    [key: string]: any;
  };
  elements: IViewKindElement[];
  collsConstrs: ICollConstrJsOpt[];
}
