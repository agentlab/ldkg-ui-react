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
import { UISchema, View, ViewElement } from './models/uischema';

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
  uischema: UISchema;
  viewElement: ViewElement;
  view: View;
}
export interface FormsInitStateProps {
  viewIri: string;
  viewsResultsScope: string;
}
export interface FormsDispatchProps extends InitStateProps {
  enabled?: boolean;
  parent?: string;
  form?: string;
}
export interface FormDispatchProps extends FormsDispatchProps {
  schema: any;
  uri: string;
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

const FormDispatch: React.FC<FormDispatchProps> = observer<FormDispatchProps>(
  ({ uischema, schema, uri, viewElement, view, enabled, parent, form }) => {
    const { renderers } = useContext(MstContext);
    const id = uri ? /*createId(uri)*/ uri : '';
    const renderer = maxBy(renderers, (r) => r.tester(viewElement, schema));
    const isModal = viewElement.options && viewElement.options.modal;
    if (renderer === undefined || renderer.tester(viewElement, schema) === -1) {
      return <UnknownRenderer type={'renderer'} />;
    } else {
      const Render: React.FC<RenderProps> = renderer.renderer;
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Render
            uischema={uischema}
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

const withStoreToFormDispatch = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { view, viewElement, parent, form, uischema } = props;
    const { store } = useContext(MstContext);

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
    const s = shapes.length === 2 ? schema.properties[shapes[1]] : schema;
    return (
      <Component schema={s} uischema={uischema} viewElement={viewElement} view={view} parent={parent} form={form} />
    );
  });
export const FormsDispatch = withStoreToFormDispatch(FormDispatch);

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
  console.log('inForm', { store });
  if (Object.keys(store.ns.currentJs).length < 5) {
    return <Spin />;
  }

  const { viewIri, viewsResultsScope } = props;
  const coll = store.getColl(viewsResultsScope);
  //const collSS = getSnapshot(coll);
  const views = coll?.data;
  const viewObs: any = coll?.dataByIri(viewIri);

  const view = getSnapshot(viewObs);
  const viewElement = view;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <FormsDispatch {...props} view={view} viewElement={viewElement} />
    </ErrorBoundary>
  );
});
