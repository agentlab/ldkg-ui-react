/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { maxBy } from 'lodash-es';
import React, { useContext } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';

import { JsonSchema7 } from './models/jsonSchema7';
//import ModalAntd from './antd/util/AntdModal';
import { MstContext } from './MstContext';
import { UnknownRenderer } from './UnknownRenderer';
import { RankedTester } from './testers';
import { View, ViewElement } from './models/uischema';

export interface ControlComponent {
  data: any;
  schema: JsonSchema7;
  editing: boolean;
  handleChange: Function;
  id: string;
  enabled: boolean;
  visible: boolean;
  description: string;
  required: boolean;
  uiOptions?: { [key: string]: any };
  label: any;
  key: string;
  errors: string[];
  isScrolling?: boolean;
  width?: number;
  form?: string;
  validateObj: any;
  onValidation: any;
  formData?: any;
}

export interface FormsRenderer {
  tester: RankedTester;
  renderer: React.FC<any>;
}
export interface FormsCell {
  tester: RankedTester;
  cell: React.FC<any>;
}
export interface InitStateProps {
  viewElement: ViewElement;
  view: View;
}
export interface FormsInitStateProps {
  viewDescrCollId: string;
  viewDescrId: string;
  viewKindCollId: string;
}
export interface FormsDispatchProps extends InitStateProps {
  enabled?: boolean;
  parent?: string;
  form?: string;
}
export interface FormDispatchProps extends FormsDispatchProps {
  schema?: any;
  uri?: string;
}
export interface RenderProps extends FormsDispatchProps {
  schema: JsonSchema7;
  id: string;
}
export interface RenderCellProps extends RenderProps {
  data: any;
  onMeasureChange: any;
  uri: string;
  rowData: any;
  CKey: string;
}

export interface DispatchCellProps extends RenderProps {
  data: any;
  [key: string]: any;
}

export const FormsDispatch: React.FC<FormDispatchProps> = observer<FormDispatchProps>(
  ({ view, viewElement, parent, form, uri, enabled }: any) => {
    const { store, renderers } = useContext(MstContext);

    const shapes = viewElement.resultsScope ? viewElement.resultsScope.split('/') : [];
    const iri = shapes.length === 2 ? shapes[0] : viewElement.resultsScope;
    let schema: any;
    if (iri) {
      const coll = store.getColl(iri);
      schema = coll?.collConstr.entConstrs[0]?.schemaJs;
      //if (store.schemas[iri]) {
      //  schema = store.schemas[iri];
      //} else {
      //  if (iri !== 'client:views' && iri !== 'rm:viewPick' && iri !== 'data:Tabs') {
      //store.getSchemaByUri(iri);
      //    return <Spin />;
      //  }
      //}
      if (!schema) return <Spin />;
    }
    schema = shapes.length === 2 ? schema.properties[shapes[1]] : schema;

    const id = uri ? /*createId(uri)*/ uri : '';
    const renderer = maxBy(renderers, (r) => r.tester(viewElement, schema));
    //const isModal = viewElement.options && viewElement.options.modal;
    if (renderer === undefined || renderer.tester(viewElement, schema) === -1) {
      return <UnknownRenderer type={'renderer'} />;
    } else {
      const Render: React.FC<RenderProps> = renderer.renderer;
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Render
            schema={schema}
            viewElement={viewElement}
            enabled={enabled}
            view={view}
            id={id}
            parent={parent}
            form={form}
          />
        </ErrorBoundary>
      );
    }
  },
);

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export const Form: React.FC<FormsInitStateProps> = observer<FormsInitStateProps>((props) => {
  const { store } = useContext(MstContext);
  if (!store) {
    console.log('!store', store);
    return <Spin />;
  }
  if (Object.keys(store.ns.currentJs).length < 6) {
    console.log('!ns');
    return <Spin />;
  }

  const { viewDescrId, viewDescrCollId, viewKindCollId } = props;

  const collWithViewDescrsObs = store.getColl(viewDescrCollId);
  if (!collWithViewDescrsObs) {
    console.log('!collWithViewDescrsObs', viewDescrCollId);
    return <Spin />;
  }

  const viewDescrObs = collWithViewDescrsObs?.dataByIri(viewDescrId);
  if (!viewDescrObs) {
    console.log('!viewDescrObs', viewDescrId);
    return <Spin />;
  }

  const collWithViewKindsObs = store.getColl(viewKindCollId);
  if (!collWithViewKindsObs) {
    console.log('!collWithViewKindsObs', viewKindCollId);
    return <Spin />;
  }
  const viewKindId = viewDescrObs.viewKind;
  const viewKindObs = collWithViewKindsObs.dataByIri(viewKindId);
  if (!viewKindObs) {
    console.log('!viewKindObs', viewKindId);
    return <Spin />;
  }
  const viewKind: any = getSnapshot(viewKindObs);
  const view: any = getSnapshot(viewDescrObs);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <FormsDispatch {...props} view={viewKind} viewElement={viewKind} />
    </ErrorBoundary>
  );
});
