/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { ReactElement } from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';

import { FormsDispatchProps, FormsDispatch } from '../Form';
import { rankWith, uiTypeIs, RankedTester } from '../testers';
import { withLayoutProps } from '../util/ContextToProps';

import { LayoutComponent } from './LayoutComponent';
import { Idx, RenderLayoutProps } from '../util/layout';
import { ViewElement } from '../models/uischema';

const divStyle: React.CSSProperties = {
  position: 'relative',
  width: '300px',
  flex: '1 1 auto',
  margin: '1px',
};

const renderSplitElements = ({ viewElement, view, enabled, Render, form }: RenderLayoutProps) => {
  const elements = viewElement.elements;
  const defaultSize = viewElement.options && viewElement.options.defaultSize;
  return elements ? (
    elements.map((el: ViewElement, idx: number) => {
      const id = el['@id'] || el.resultsScope || '';
      const style = el.options && el.options.style;
      return (
        <Pane key={idx} style={style} initialSize={defaultSize[id]}>
          <div style={{ height: '100%', ...style }}>
            <FormsDispatch viewElement={el} view={view} enabled={enabled} />
          </div>
        </Pane>
      );
    })
  ) : (
    <></>
  );
};

export const SplitPaneLayoutRenderer: React.FC<LayoutComponent> = ({ viewElement, view, enabled, visible }) => {
  //const layout = viewElement as Layout;
  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, viewElement, view, enabled }) => {
    return (
      <div>
        <FormsDispatch viewElement={viewElement} view={view} enabled={enabled} />
      </div>
    );
  };
  return (
    <React.Fragment>
      <SplitPane split='vertical' style={divStyle} minSize={300}>
        {renderSplitElements({ viewElement, view, enabled, Render })}
      </SplitPane>
    </React.Fragment>
  );
};

export const splitPaneLayoutTester: RankedTester = rankWith(2, uiTypeIs('SplitPaneLayout'));
export const SplitPaneLayoutWithStore = withLayoutProps(SplitPaneLayoutRenderer);
