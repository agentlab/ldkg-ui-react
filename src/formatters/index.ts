/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { JsObject } from '@agentlab/sparql-jsld-client';

import {
  base,
  identifier,
  dateTime,
  artifactTitle,
  integer,
  link,
  extLink,
  image,
  labeledValue,
  comparison,
} from './baseFormatters';
import { StoreDataFormatter } from './StoreDataFormatter';
import { TinyMCE } from './tinyMCE';

export const formatters: JsObject = {
  base,
  identifier,
  dateTime,
  artifactTitle,
  image,
  integer,
  link,
  extLink,
  tinyMCE: TinyMCE,
  dataFormatter: StoreDataFormatter,
  labeledValue,
  comparison,
};
