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
  IAnyComplexType,
  IAnyStateTreeNode,
  IAnyType,
  IArrayType,
  IMSTArray,
  Instance,
  IStateTreeNode,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';

import {
  arrDiff,
  getMstLiteralPropValue,
  getParentOfName,
  MstCollConstr,
  MstJsObject,
  MstModels,
  TMstCollConstrSnapshotIn,
  TMstCollConstrSnapshotOut,
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

export type TMstViewKindElement = Instance<typeof MstViewKindElement>;
export type TMstViewKindElementSnapshotIn = SnapshotIn<typeof MstViewKindElement>;
export type TMstViewKindElementSnapshotOut = SnapshotOut<typeof MstViewKindElement>;

const mstViewKindSchemas: MstModels = {};

export function registerMstViewKindSchema(mstModel: IAnyComplexType, noOverride = false): void {
  const id = getMstLiteralPropValue(mstModel as any, '@type');
  if (id) {
    if (!noOverride || mstViewKindSchemas[id] === undefined) {
      console.log('register mstViewKindSchema', { id, mstModel });
      mstViewKindSchemas[id] = mstModel;
    } else {
      console.log('cannot register mstViewKindSchema: noOverride and existed schema', { mstModel });
    }
  } else {
    console.log('cannot register mstViewKindSchema', { mstModel });
  }
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
          //console.log('ViewKindDataType, create mstModel for', {
          //  snapshotId: snapshot['@id'],
          //  mstModelName: mstModel.name,
          //});
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
  .model('aldkg:ViewKind', {
    '@id': types.identifier, // JSON-LD object id of a viewKind
    '@type': types.literal('aldkg:ViewKind'), // JSON-LD class id of a View

    title: types.maybe(types.string), // mandatory title
    description: types.maybe(types.string),

    options: types.maybe(MstJsObject),

    // Container-specific (e.g. Layout, type: 'xxxLayout')
    elements: types.array(MstViewKindDataType),

    collsConstrs: types.array(MstCollConstr), // former 'queries'
  })
  .actions((self) => {
    const rep: IAnyStateTreeNode = getParentOfName(self, 'MstRepository');
    //console.log('MstViewRind-rep', rep);
    const coll: IAnyStateTreeNode = getParentOfName(self, 'MstColl');
    //console.log('MstViewRind-coll', coll);
    let dispose: any;
    return {
      afterAttach() {
        //console.log('ViewKind afterAttach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          dispose = reaction(
            () => self.collsConstrs,
            (
              newArr: (IMSTArray<any> & IStateTreeNode<IArrayType<any>>) | undefined,
              oldArr: (IMSTArray<any> & IStateTreeNode<IArrayType<any>>) | undefined,
            ) => {
              //console.log('ViewKind reaction, add coll ref, @id=', self['@id']);
              const { deleted, added } = arrDiff(newArr, oldArr);
              //console.log('ViewKind reaction, add coll ref, {deleted,added}=', { deleted, added });
              deleted.forEach((e: any) => rep.colls.delete(e['@id']));
              added.forEach((e: any) => rep.addCollByConstrRef(e));
            },
            { fireImmediately: true, name: 'ViewKind-Attach' },
          );
        }
      },
      beforeDetach() {
        //console.log('ViewKind beforeDetach, @id=', self['@id']);
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

export type TMstViewKind = Instance<typeof MstViewKind>;
export type TMstViewKindSnapshotIn = Omit<SnapshotIn<typeof MstViewKind>, 'collsConstrs'> & {
  collsConstrs: TMstCollConstrSnapshotIn[];
};
export type TMstViewKindSnapshotOut = Omit<SnapshotOut<typeof MstViewKind>, 'collsConstrs'> & {
  collsConstrs: TMstCollConstrSnapshotOut[];
};

/***********************
 * View Description
 ***********************/

export const MstViewDescrElement = types.model('MstViewDescrElement', {
  '@id': types.identifier, // JSON-LD object id
  '@type': types.string, //types.union(types.literal('aldkg:ViewElement'), types.literal('aldkg:DiagramEditor')), // JSON-LD class id of a View
  '@parent': types.maybe(types.string),
  //'@parent': types.union(types.reference(types.late((): IAnyType => MstViewKindDataType)), types.undefined),

  title: types.maybe(types.union(types.string, MstJsObject)),
  description: types.maybe(types.union(types.string, MstJsObject)),

  scope: types.maybe(types.string),
  resultsScope: types.maybe(types.string),
  options: types.maybe(MstJsObject),

  style: types.maybe(MstJsObject),

  // Container-specific (e.g. Layout, type: 'xxxLayout')
  elements: types.maybe(types.array(types.late((): IAnyType => MstViewDescrDataType))),
});

export type TMstViewDescrElement = Instance<typeof MstViewDescrElement>;
export type TMstViewDescrElementSnapshotIn = SnapshotIn<typeof MstViewDescrElement>;
export type TMstViewDescrElementSnapshotOut = SnapshotOut<typeof MstViewDescrElement>;

const mstViewDescrSchemas: MstModels = {};

export function registerMstViewDescrSchema(mstModel: IAnyComplexType, noOverride = false): void {
  const id = getMstLiteralPropValue(mstModel as any, '@type');
  if (id) {
    if (!noOverride || mstViewDescrSchemas[id] === undefined) {
      console.log('register mstViewDescrSchema', { id, mstModel });
      mstViewDescrSchemas[id] = mstModel;
    } else {
      console.log('cannot register mstViewDescrSchema: noOverride and existed schema', { mstModel });
    }
  } else {
    console.log('cannot register mstViewDescrSchema', { mstModel });
  }
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
          //console.log('ViewDescrDataType, create mstModel for', {
          //  snapshotId: snapshot['@id'],
          //  mstModelName: mstModel.name,
          //});
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
  .model('aldkg:ViewDescr', {
    '@id': types.identifier, // JSON-LD object id of a viewKind
    '@type': types.literal('aldkg:ViewDescr'), // JSON-LD class id of a View
    viewKind: types.safeReference(MstViewKind),

    title: types.maybe(types.string), // mandatory title
    description: types.maybe(types.string),

    options: types.maybe(MstJsObject),

    // Container-specific (e.g. Layout, type: 'xxxLayout')
    elements: types.array(MstViewDescrDataType),

    collsConstrs: types.array(MstCollConstr), // former 'queries'
  })
  .actions((self) => {
    const rep: IAnyStateTreeNode = getParentOfName(self, 'MstRepository');
    //console.log('MstViewDescr-re', rep);
    const coll: IAnyStateTreeNode = getParentOfName(self, 'MstColl');
    //console.log('MstViewDescr-coll', coll);
    let dispose: any;
    return {
      afterAttach() {
        //console.log('MstViewDescr afterAttach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          dispose = reaction(
            () => self.collsConstrs,
            (
              newArr: (IMSTArray<any> & IStateTreeNode<IArrayType<any>>) | undefined,
              oldArr: (IMSTArray<any> & IStateTreeNode<IArrayType<any>>) | undefined,
            ) => {
              //console.log('MstViewDescr reaction, add coll ref, @id=', self['@id']);
              const { deleted, added } = arrDiff(newArr, oldArr);
              //console.log('MstViewDescr reaction, add coll ref, {deleted,added}=', { deleted, added });
              deleted.forEach((e: any) => rep.colls.delete(e['@id']));
              added.forEach((e: any) => rep.addCollByConstrRef(e));
            },
            { fireImmediately: true, name: 'MstViewDescr-Attach' },
          );
        }
      },
      beforeDetach() {
        //console.log('MstViewDescr beforeDetach, @id=', self['@id']);
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

export type TMstViewDescr = Instance<typeof MstViewDescr>;
export type TMstViewDescrSnapshotIn = Omit<SnapshotIn<typeof MstViewDescr>, 'collsConstrs' | 'viewKind'> & {
  collsConstrs: TMstCollConstrSnapshotIn[];
  viewKind: string | undefined;
};
export type TMstViewDescrSnapshotOut = Omit<SnapshotOut<typeof MstViewDescr>, 'collsConstrs' | 'viewKind'> & {
  collsConstrs: TMstCollConstrSnapshotOut[];
  viewKind: string | undefined;
};
