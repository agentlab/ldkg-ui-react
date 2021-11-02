/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useMemo } from 'react';
import { SplitPane } from 'react-collapse-pane';
import { FormsDispatch } from '../Form';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { withLayoutProps } from '../util/ContextToProps';
import { LayoutComponent } from './LayoutComponent';
import { IViewKindElement } from '../models/uischema';

export const SplitPaneLayoutRenderer: React.FC<LayoutComponent> = ({
  viewKindElement,
  viewKind,
  viewDescr,
  viewDescrElement,
  enabled,
  visible,
}) => {
  const elements = viewKindElement.elements;
  const options = viewKindElement.options || {};

  const panes = useMemo(
    () =>
      elements
        ? elements.map((el: IViewKindElement, idx: number) => (
            <div key={idx} style={{ width: '100%', height: '100%', position: 'relative' }}>
              <FormsDispatch viewKind={viewKind} viewKindElement={el} viewDescr={viewDescr} enabled={enabled} />
            </div>
          ))
        : [],
    [viewKind, elements, viewDescr, enabled],
  );

  return (
    <div style={{ position: 'relative', height: '100%', ...options.style }}>
      <SplitPane
        split={options.split || 'vertical'}
        initialSizes={options.initialSizes}
        minSizes={options.minSizes}
        collapsedSizes={options.collapsedSizes}
        collapse={
          options.collapseDirection && {
            collapseDirection: options.collapseDirection,
          }
        }>
        {panes}
      </SplitPane>
    </div>
  );
};

export const splitPaneLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:SplitPaneLayout'));
export const SplitPaneLayoutWithStore = withLayoutProps(SplitPaneLayoutRenderer);
