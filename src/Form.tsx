/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import uuid62 from 'uuid62';
import { maxBy } from 'lodash-es';
import React, { useContext } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { JsObject } from '@agentlab/sparql-jsld-client';

import { JSONSchema7 } from 'json-schema';
//import ModalAntd from './antd/util/AntdModal';
import { MstContext } from './MstContext';
import { UnknownRenderer } from './UnknownRenderer';
import { Actions } from './actions';
import { RankedTester } from './testers';
import { TMstViewDescr, TMstViewDescrElement, TMstViewKind, TMstViewKindElement } from './models/MstViewDescr';
import { RendererRegistryEntry } from './renderers';

export interface ControlComponent {
  data: any;
  schema: JSONSchema7;
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

export interface FormsInitStateProps {
  viewDescrCollId: string;
  viewDescrId: string;
}
export interface FormsDispatchProps {
  viewKind: TMstViewKind;
  viewKindElement: TMstViewKindElement;
  viewDescr: TMstViewDescr;

  enabled?: boolean;
  form?: string;
}
export interface RenderProps extends FormsDispatchProps {
  viewDescrElement?: TMstViewDescrElement;
  actions?: Actions;
  id: string;
  schema: JSONSchema7;
  readOnly?: boolean;
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

export function mstJsonLdIds(o: JsObject): JsObject | undefined {
  if (o) return { '@id': o['@id'], '@type': o['@type'] };
  else return undefined;
}

export function createViewDescrElementIri(viewKindElementIri: string): string {
  return viewKindElementIri + '_' + uuid62.v4();
}

export function compareByIri(iri1: string | any, iri2: string | any): boolean {
  //console.log('compareByIri - raw', { iri1, iri2 });
  if (typeof iri1 === 'object') iri1 = iri1['@id'];
  if (typeof iri2 === 'object') iri2 = iri2['@id'];
  //console.log('compareByIri - norm', { iri1, iri2 });
  return iri1 === iri2;
}

export const processViewKindOverride = (
  props: { viewKindElement: TMstViewKindElement; viewDescr: TMstViewDescr },
  store: any,
): [string, string, string, string, TMstViewKindElement, TMstViewDescrElement | undefined] => {
  const { viewKindElement, viewDescr } = props;
  // if ViewElement extend-override exists
  const viewDescrElement = viewDescr.elements?.find((el) => {
    //console.log('processViewKindOverride', {
    //  el: mstJsonLdIds(el),
    //  el_parent: mstJsonLdIds(el['@parent']),
    //  viewKindElement: mstJsonLdIds(viewKindElement),
    //});
    return compareByIri(el['@parent'], viewKindElement['@id']);
  });
  const id = viewDescrElement ? viewDescrElement['@id'] : createViewDescrElementIri(viewKindElement['@id']);

  const [collIri, inCollPath] = viewKindElement.resultsScope?.split('/') || [];
  let collIriOverride: string = collIri;

  if (collIriOverride) {
    // if CollConstr extend-override exists switch to extCollConstr
    if (viewDescr.collsConstrs) {
      const extCollConstr = viewDescr.collsConstrs?.find((el) => compareByIri(el['@parent'], collIri));
      if (extCollConstr) {
        collIriOverride = extCollConstr['@id'] || '';
      }
    }
  }

  return [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement];
};

export const FormsDispatch = observer<FormsDispatchProps>((props) => {
  const { store, renderers, actions } = useContext(MstContext);
  const { viewKind, viewDescr, form, enabled } = props;

  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );

  let schema: any;
  if (collIri !== collIriOverride) {
    const parentColl = collIri ? store.rep.getColl(collIri) : undefined;
    const parentSchema = parentColl?.collConstr?.entConstrs[0]?.schemaJs;
    const childColl = collIriOverride ? store.rep.getColl(collIriOverride) : undefined;
    const childSchema = childColl?.collConstr?.entConstrs[0]?.schemaJs;
    schema = childSchema ? childSchema : parentSchema;
  } else {
    const coll = collIri ? store.rep.getColl(collIri) : undefined;
    const collConstr = coll?.collConstr;
    //console.log('FormsDispatch1', { collConstr, collConstrSnap: collConstr ? getSnapshot(collConstr) : undefined });
    const entConstr = collConstr?.entConstrs[0];
    schema = entConstr?.schemaJs;
  }
  if ((collIri || collIriOverride) && !schema) return <Spin />;
  if (inCollPath && inCollPath.length > 0) schema = schema.properties[inCollPath];

  const renderer = maxBy(renderers, (r: RendererRegistryEntry) => r.tester(viewKindElement, schema));
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
          actions={actions}
          enabled={enabled}
          form={form}
        />
      </ErrorBoundary>
    );
  }
});

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export const Form = observer<FormsInitStateProps>((props) => {
  const { store } = useContext(MstContext);
  if (!store) {
    console.log('!store', store);
    return <Spin />;
  }
  if (Object.keys(store.rep.ns.currentJs).length < 6) {
    console.log('!ns');
    return <Spin />;
  }

  const { viewDescrId, viewDescrCollId } = props;
  console.log('Form', { viewDescrId, viewDescrCollId });

  const collWithViewDescrsObs = store.rep.getColl(viewDescrCollId);
  if (!collWithViewDescrsObs) {
    console.log('!collWithViewDescrsObs', viewDescrCollId);
    return <Spin />;
  }

  const viewDescrObs = collWithViewDescrsObs?.dataByIri(viewDescrId) as TMstViewDescr | undefined;
  if (!viewDescrObs) {
    console.log('!viewDescrObs', viewDescrId);
    return <Spin />;
  }

  //const collWithViewKindsObs = store.rep.getColl(viewKindCollId);
  //if (!collWithViewKindsObs) {
  //  console.log('!collWithViewKindsObs', viewKindCollId);
  //  return <Spin />;
  //}
  const viewKindObs = viewDescrObs.viewKind as TMstViewKind | undefined;
  if (!viewKindObs) {
    console.log('!viewKindObs for viewDescr', getSnapshot(viewDescrObs));
    return <Spin />;
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      {viewKindObs.elements.map((el: TMstViewKindElement, idx: number) => (
        <FormsDispatch key={idx} {...props} viewKind={viewKindObs} viewKindElement={el} viewDescr={viewDescrObs} />
      ))}
    </ErrorBoundary>
  );
});
