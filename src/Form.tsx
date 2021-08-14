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
import { IViewDescr, IViewKind, IViewKindElement } from './models/uischema';

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
export interface FormsInitStateProps {
  viewDescrCollId: string;
  viewDescrId: string;
}
export interface FormsDispatchProps {
  viewKind: IViewKind;
  viewKindElement: IViewKindElement;
  viewDescr?: IViewDescr;
  viewDescrElement?: IViewKindElement;
  enabled?: boolean;
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
  ({ viewKind, viewKindElement, viewDescr, viewDescrElement, form, uri, enabled }) => {
    const { store, renderers } = useContext(MstContext);

    // if ViewElement extend-override exists
    if (!viewDescrElement && viewDescr) {
      viewDescrElement = viewDescr.elements?.find((el) => el['@parent'] === viewKindElement['@id']);
    }

    const shapes = viewKindElement.resultsScope ? viewKindElement.resultsScope.split('/') : [];
    let collIri = shapes.length === 2 ? shapes[0] : viewKindElement.resultsScope;
    let schema: any;
    if (collIri) {
      // if CollConstr extend-override exists switch to extCollConstr
      if (viewDescr && viewDescr.collsConstrs) {
        const extCollConstr = viewDescr.collsConstrs?.find((el) => el['@parent'] === viewKindElement['@id']);
        if (extCollConstr) collIri = extCollConstr['@id'];
      }
      const coll = store.getColl(collIri);
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
    const renderer = maxBy(renderers, (r) => r.tester(viewKindElement, schema));
    //const isModal = viewKindElement.options && viewKindElement.options.modal;
    if (renderer === undefined || renderer.tester(viewKindElement, schema) === -1) {
      return (
        <UnknownRenderer type={'renderer'} elementId={viewKindElement['@id']} elementType={viewKindElement['@type']} />
      );
    } else {
      const Render: React.FC<RenderProps> = renderer.renderer;
      return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Render
            id={id}
            viewKind={viewKind}
            viewKindElement={viewKindElement}
            viewDescr={viewDescr}
            viewDescrElement={viewDescrElement}
            schema={schema}
            enabled={enabled}
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

  const { viewDescrId, viewDescrCollId } = props;

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

  //const collWithViewKindsObs = store.getColl(viewKindCollId);
  //if (!collWithViewKindsObs) {
  //  console.log('!collWithViewKindsObs', viewKindCollId);
  //  return <Spin />;
  //}
  const viewKindObs = viewDescrObs.viewKind;
  if (!viewKindObs) {
    console.log('!viewKindObs', viewKindObs);
    return <Spin />;
  }
  const viewKind: any = getSnapshot(viewKindObs);
  const viewDescr: any = getSnapshot(viewDescrObs);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      {viewKind.elements.map((el: IViewKindElement) => (
        <FormsDispatch {...props} viewKind={viewKind} viewKindElement={el} viewDescr={viewDescr} />
      ))}
    </ErrorBoundary>
  );
});
