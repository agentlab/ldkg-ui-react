/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { JsStrObj, JsObject } from '@agentlab/sparql-jsld-client';

export const tt = (dict: JsStrObj, id: string, o?: JsObject): string => {
  let txt = dict[id];
  if (!o && typeof o === 'object') {
    Object.keys(o).forEach((k) => (txt = txt.replaceAll(`{{ ${k} }}`, o[k])));
  }
  return txt;
};
