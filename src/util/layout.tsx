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

import { IViewKindElement } from '../models/uischema';
import { FormsDispatchProps } from '../Form';

export declare type Idx = {
  idx: number;
};

export interface RenderLayoutProps extends FormsDispatchProps {
  viewKindElement: IViewKindElement;
  Render: React.FC<FormsDispatchProps & Idx>;
  readOnly?: boolean;
}

export const renderLayoutElements = ({
  viewKind,
  viewKindElement,
  viewDescr,
  enabled,
  Render,
  readOnly,
}: RenderLayoutProps): JSX.Element | JSX.Element[] => {
  const elements = viewKindElement.elements;
  //const id = viewKind['@id'];
  //const sort = id ? viewKind.properties && viewKind.properties[id] && viewKind.properties[id].order : undefined;
  if (!elements || elements.length === 0) return <></>;
  return elements.map((el: IViewKindElement, idx: number) => {
    el = { ...el, options: { ...el.options, readOnly } };
    return (
      <Render key={idx} idx={idx} viewKind={viewKind} viewKindElement={el} viewDescr={viewDescr} enabled={enabled} />
    );
  });
};
