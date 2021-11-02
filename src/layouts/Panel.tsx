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
import { FormsDispatchProps, FormsDispatch } from '../Form';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { Idx } from '../util/layout';
import { withLayoutProps } from '../util/ContextToProps';
import { renderLayoutElements } from '../util/layout';

import { LayoutComponent } from './LayoutComponent';

export const PanelLayout: React.FC<LayoutComponent> = ({
  viewKind,
  viewKindElement,
  viewDescr,
  viewDescrElement,
  enabled,
  visible,
  form,
}) => {
  const options = viewKindElement.options || {};
  const style = options.style;
  const layoutStyle: React.CSSProperties = {};
  const childLayoutStyle: React.CSSProperties = {};
  if (options.flow === 'horizontal') {
    layoutStyle.whiteSpace = 'nowrap';
  }

  if (options.flow === 'horizontal' || options.flow === 'wrap') {
    childLayoutStyle.display = 'inline-block';
  }

  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, viewKind, viewKindElement, viewDescr, enabled }) => {
    const style = viewKindElement.options?.style;
    const newViewKindElement = { ...viewKindElement };
    if (newViewKindElement.options) {
      newViewKindElement.options.style = { ...style, ...childLayoutStyle };
    }
    return (
      <FormsDispatch
        viewKind={viewKind}
        viewKindElement={newViewKindElement}
        viewDescr={viewDescr}
        enabled={enabled}
        form={form}
      />
    );
  };
  return (
    <div style={{ ...style, ...layoutStyle }}>
      {renderLayoutElements({ viewKind, viewKindElement, viewDescr, enabled, Render })}
    </div>
  );
};

export const panelLayoutTester: RankedTester = rankWith(2, uiTypeIs('aldkg:PanelLayout'));
export const PanelLayoutWithStore = withLayoutProps(PanelLayout);
