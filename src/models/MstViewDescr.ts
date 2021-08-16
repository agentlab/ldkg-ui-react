/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { reaction } from 'mobx';
import {
  getParent,
  getRoot,
  IAnyComplexType,
  IAnyModelType,
  IAnyStateTreeNode,
  IAnyType,
  SnapshotIn,
  types,
} from 'mobx-state-tree';

import {
  arrDiff,
  CollState,
  createModelFromState,
  MstCollConstr,
  MstJsObject,
  MstModels,
  registerMstCollSchema,
  SparqlClient,
} from '@agentlab/sparql-jsld-client';

/***********************
 * View Kind
 ***********************/

export const MstViewKindElement = types.model('MstViewKindElement', {
  '@id': types.identifier, // JSON-LD object id
  '@type': types.string, //types.union(types.literal('aldkg:ViewElement'), types.literal('aldkg:DiagramEditor')), // JSON-LD class id of a View

  title: types.maybe(types.union(types.string, MstJsObject)),
  description: types.maybe(types.union(types.string, MstJsObject)),

  scope: types.maybe(types.string),
  resultsScope: types.maybe(types.string),
  options: types.maybe(MstJsObject),

  style: types.maybe(MstJsObject),

  // Container-specific (e.g. Layout, type: 'xxxLayout')
  elements: types.maybe(types.array(types.late((): IAnyType => MstViewKindDataType))),
});

const mstViewKindSchemas: MstModels = {};

export function registerMstViewKindSchema(id: string, t: IAnyComplexType): void {
  console.log('register mstViewKindSchema', { id, t });
  mstViewKindSchemas[id] = t;
}

export function unregisterMstViewKindSchema(id: string): IAnyComplexType {
  const t = mstViewKindSchemas[id];
  delete mstViewKindSchemas[id];
  return t;
}

export const MstViewKindDataType = types.union(
  {
    dispatcher: (snapshot: any) => {
      if (snapshot) {
        const mstModel = mstViewKindSchemas[snapshot['@type']];
        if (mstModel) {
          //console.log('ViewKindDataType, create mstModel for', snapshot['@id'], mstModel.name);
          return mstModel;
        }
      }
      //console.log('ViewKindDataType, create ViewKindElement for', snapshot['@id']);
      return MstViewKindElement;
    },
  },
  MstViewKindElement,
);

/**
 * View Kind, which could be persisted in DB
 */
export const MstViewKind = types
  .model('MstViewKind', {
    '@id': types.identifier, // JSON-LD object id of a viewKind
    '@type': types.string, // JSON-LD class id of a View

    title: types.maybe(types.string), // mandatory title
    description: types.maybe(types.string),

    options: types.maybe(MstJsObject),

    // Container-specific (e.g. Layout, type: 'xxxLayout')
    elements: types.array(MstViewKindDataType),

    collsConstrs: types.array(MstCollConstr), // former 'queries'
  })
  .actions((self) => {
    const rep: IAnyStateTreeNode = getRoot(self);
    const coll: IAnyStateTreeNode = getParent(self, 2);
    let dispose: any;
    return {
      afterAttach() {
        console.log('ViewKind afterAttach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          dispose = reaction(
            () => self.collsConstrs,
            (newArr: any[], oldArr: any[]) => {
              console.log('ViewKind reaction, add coll ref, @id=', self['@id']);
              const { deleted, added } = arrDiff(newArr, oldArr);
              console.log('ViewKind reaction, add coll ref, {deleted,added}=', { deleted, added });
              deleted.forEach((e: any) => rep.colls.delete(e['@id']));
              added.forEach((e: any) => rep.addCollByConstrRef(e));
            },
            { fireImmediately: true, name: 'ViewKind-Attach' },
          );
        }
      },
      beforeDetach() {
        console.log('ViewKind beforeDetach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          if (dispose) dispose();
          self.collsConstrs.forEach((e) => rep.colls.delete(e['@id']));
        }
      },
      setCollConstrs(collsConstrs: any[]) {
        const collsConstrsObservables = collsConstrs.map((cc) => MstCollConstr.create(cc));
        self.collsConstrs.push(...collsConstrsObservables);
      },
    };
  });

export type IViewKindSnapshotIn = SnapshotIn<typeof MstViewKind>;

/***********************
 * View Description
 ***********************/

export const MstViewDescrElement = types.model('MstViewDescrElement', {
  '@id': types.identifier, // JSON-LD object id
  '@type': types.string, //types.union(types.literal('aldkg:ViewElement'), types.literal('aldkg:DiagramEditor')), // JSON-LD class id of a View
  '@parent': types.safeReference(types.late((): IAnyModelType => MstViewKindElement)),

  title: types.maybe(types.union(types.string, MstJsObject)),
  description: types.maybe(types.union(types.string, MstJsObject)),

  scope: types.maybe(types.string),
  resultsScope: types.maybe(types.string),
  options: types.maybe(MstJsObject),

  style: types.maybe(MstJsObject),

  // Container-specific (e.g. Layout, type: 'xxxLayout')
  elements: types.maybe(types.array(types.late((): IAnyType => MstViewDescrDataType))),
});

const mstViewDescrSchemas: MstModels = {};

export function registerMstViewDescrSchema(id: string, t: IAnyComplexType): void {
  console.log('register mstViewDescrSchema', { id, t });
  mstViewDescrSchemas[id] = t;
}

export function unregisterMstViewDescrSchema(id: string): IAnyComplexType {
  const t = mstViewDescrSchemas[id];
  delete mstViewDescrSchemas[id];
  return t;
}

export const MstViewDescrDataType = types.union(
  {
    dispatcher: (snapshot: any) => {
      if (snapshot) {
        const mstModel = mstViewDescrSchemas[snapshot['@type']];
        if (mstModel) {
          //console.log('ViewDescrDataType, create mstModel for', snapshot['@id'], mstModel.name);
          return mstModel;
        }
      }
      //console.log('ViewDescrDataType, create ViewDescrElement for', snapshot['@id']);
      return MstViewDescrElement;
    },
  },
  MstViewDescrElement,
);

/**
 * View Description, which could be persisted in DB
 */
export const MstViewDescr = types
  .model('MstViewDescr', {
    '@id': types.identifier, // JSON-LD object id of a viewKind
    '@type': types.string, // JSON-LD class id of a View
    viewKind: types.safeReference(MstViewKind),

    title: types.maybe(types.string), // mandatory title
    description: types.maybe(types.string),

    options: types.maybe(MstJsObject),

    // Container-specific (e.g. Layout, type: 'xxxLayout')
    elements: types.array(MstViewDescrDataType),

    collsConstrs: types.array(MstCollConstr), // former 'queries'
  })
  .actions((self) => {
    const rep: IAnyStateTreeNode = getRoot(self);
    const coll: IAnyStateTreeNode = getParent(self, 2);
    let dispose: any;
    return {
      afterAttach() {
        console.log('MstViewDescr afterAttach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          dispose = reaction(
            () => self.collsConstrs,
            (newArr: any[], oldArr: any[]) => {
              console.log('MstViewDescr reaction, add coll ref, @id=', self['@id']);
              const { deleted, added } = arrDiff(newArr, oldArr);
              console.log('MstViewDescr reaction, add coll ref, {deleted,added}=', { deleted, added });
              deleted.forEach((e: any) => rep.colls.delete(e['@id']));
              added.forEach((e: any) => rep.addCollByConstrRef(e));
            },
            { fireImmediately: true, name: 'MstViewDescr-Attach' },
          );
        }
      },
      beforeDetach() {
        console.log('MstViewDescr beforeDetach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          if (dispose) dispose();
          self.collsConstrs.forEach((e) => rep.colls.delete(e['@id']));
        }
      },
      setCollConstrs(collsConstrs: any[]) {
        const collsConstrsObservables = collsConstrs.map((cc) => MstCollConstr.create(cc));
        self.collsConstrs.push(...collsConstrsObservables);
      },
    };
  });

export type IViewDescrSnapshotIn = SnapshotIn<typeof MstViewDescr>;

export const createUiModelFromState = (
  repId: string,
  client: SparqlClient,
  initialState: any,
  additionalColls: CollState[] | undefined = undefined,
): any => {
  registerMstCollSchema('aldkg:ViewKind', MstViewKind);
  registerMstCollSchema('aldkg:ViewDescr', MstViewDescr);
  return createModelFromState(repId, client, initialState, additionalColls);
};
