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

const renderSplitElements = ({ viewElement, uischema, view, enabled, Render, parent, form }: RenderLayoutProps) => {
  const elements = viewElement.elements;
  const defaultSize = viewElement.options && viewElement.options.defaultSize;
  const id = viewElement['@id'];
  const sort = id
    ? viewElement.properties && viewElement.properties[id] && viewElement.properties[id].order
    : undefined;
  return sort ? (
    sort.reduce((res: ReactElement[], e: string, idx: number) => {
      const key = elements ? elements.findIndex((el: ViewElement) => el['@id'] === e || el.scope === e) : -1;
      if (key !== -1 && elements) {
        const childView = elements[key];
        const id = childView['@id'] || childView.scope || '';
        const style = childView.options && childView.options.style;
        res.push(
          <Pane key={idx} style={style} initialSize={defaultSize[id]}>
            <FormsDispatch
              viewElement={childView}
              view={view}
              uischema={uischema}
              enabled={enabled}
              parent={parent}
              form={form}
            />
          </Pane>,
        );
      }
      return res;
    }, [])
  ) : elements ? (
    elements.map((el: ViewElement, idx: number) => {
      const id = el['@id'] || el.resultsScope || '';
      const style = el.options && el.options.style;
      return (
        <Pane key={idx} style={style} initialSize={defaultSize[id]}>
          <div style={{ height: '100%', ...style }}>
            <FormsDispatch viewElement={el} view={view} uischema={uischema} enabled={enabled} parent={parent} />
          </div>
        </Pane>
      );
    })
  ) : (
    <></>
  );
};

export const SplitPaneLayoutRenderer: React.FC<LayoutComponent> = ({
  uischema,
  viewElement,
  view,
  enabled,
  visible,
  parent,
}) => {
  //const layout = viewElement as Layout;
  const Render: React.FC<FormsDispatchProps & Idx> = ({ idx, uischema, viewElement, view, enabled, parent }) => {
    return (
      <div>
        <FormsDispatch viewElement={viewElement} view={view} uischema={uischema} enabled={enabled} parent={parent} />
      </div>
    );
  };
  return (
    <React.Fragment>
      <SplitPane split='vertical' style={divStyle} minSize={300}>
        {renderSplitElements({ uischema, viewElement, view, enabled, Render, parent })}
      </SplitPane>
    </React.Fragment>
  );
};

export const splitPaneLayoutTester: RankedTester = rankWith(2, uiTypeIs('SplitPaneLayout'));
export const SplitPaneLayoutWithStore = withLayoutProps(SplitPaneLayoutRenderer);
