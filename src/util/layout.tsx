/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';

import { ViewElement } from '../models/uischema';
import { FormsDispatchProps } from '../Form';

export declare type Idx = {
  idx: number;
};

export interface RenderLayoutProps extends FormsDispatchProps {
  viewElement: ViewElement;
  Render: React.FC<FormsDispatchProps & Idx>;
}

export const renderLayoutElements = ({ viewElement, view, enabled, Render }: RenderLayoutProps) => {
  const elements = viewElement.elements;
  //const id = view['@id'];
  //const sort = id ? view.properties && view.properties[id] && view.properties[id].order : undefined;
  if (!elements || elements.length === 0) return <></>;
  return elements.map((el: ViewElement, idx: number) => (
    <Render key={idx} idx={idx} viewElement={el} view={view} enabled={enabled} />
  ));
};
