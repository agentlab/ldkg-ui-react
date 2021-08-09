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
import { getParent, getRoot, IAnyModelType, IAnyStateTreeNode, SnapshotIn, types } from 'mobx-state-tree';

import {
  arrDiff,
  CollConstr,
  CollState,
  JsObject,
  SparqlClient,
  registerMstSchema,
  createModelFromState,
} from '@agentlab/sparql-jsld-client';

export const ViewElement = types.model('ViewElement', {
  '@id': types.maybe(types.string), // JSON-LD object id of a view
  '@type': types.maybe(types.string), // JSON-LD class id of a View
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  //viewKind: types.maybe(types.string),

  type: types.string,
  scope: types.maybe(types.string),
  resultsScope: types.maybe(types.string),
  options: types.maybe(types.frozen<JsObject>()),

  // Container-specific (e.g. Layout, type: 'xxxLayout')
  elements: types.maybe(types.array(types.late((): IAnyModelType => ViewElement))),
});

/**
 * View Kind, which could be persisted in DB
 */
export const ViewKind = types
  .model('ViewKind', {
    '@id': types.identifier, // JSON-LD object id of a view
    '@type': types.string, // JSON-LD class id of a View

    title: types.maybe(types.string), // mandatory title
    description: types.maybe(types.string),

    type: types.string,
    scope: types.maybe(types.string),
    resultsScope: types.maybe(types.string),
    options: types.maybe(types.frozen<JsObject>()),

    // Container-specific (e.g. Layout, type: 'xxxLayout')
    elements: types.array(ViewElement),

    collsConstrs: types.array(CollConstr), // former 'queries'
  })
  .actions((self) => {
    const rep: IAnyStateTreeNode = getRoot(self);
    const coll: IAnyStateTreeNode = getParent(self, 2);
    let disp: any;
    return {
      afterAttach() {
        console.log('ViewKind afterAttach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          disp = reaction(
            () => self.collsConstrs,
            (newArr: any[], oldArr: any[]) => {
              console.log('ViewKind reaction, add coll ref, @id=', self['@id']);
              const { deleted, added } = arrDiff(newArr, oldArr);
              console.log('ViewKind reaction, add coll ref, {deleted,added}=', { deleted, added });
              deleted.forEach((e: any) => rep.colls.delete(e['@id']));
              added.forEach((e: any) => rep.addCollByConstrRef(e));
            },
            { fireImmediately: true },
          );
        }
      },
      beforeDetach() {
        console.log('ViewKind beforeDetach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          if (disp) disp();
          self.collsConstrs.forEach((e) => rep.colls.delete(e['@id']));
        }
      },
      setCollConstrs(collsConstrs: any[]) {
        const ccso = collsConstrs.map((cc) => CollConstr.create(cc));
        self.collsConstrs.push(...ccso);
      },
    };
  });

export type IViewKindSnapshotIn = SnapshotIn<typeof ViewKind>;

/**
 * View Description, which could be persisted in DB
 */
export const ViewDescr = types
  .model('ViewDescr', {
    '@id': types.identifier, // JSON-LD object id of a view
    '@type': types.string, // JSON-LD class id of a View
    viewKind: types.maybe(types.string),

    title: types.maybe(types.string), // mandatory title
    description: types.maybe(types.string),

    type: types.string,
    scope: types.maybe(types.string),
    resultsScope: types.maybe(types.string),
    options: types.maybe(types.frozen<JsObject>()),

    // Container-specific (e.g. Layout, type: 'xxxLayout')
    elements: types.array(ViewElement),

    collsConstrs: types.array(CollConstr), // former 'queries'
  })
  .actions((self) => {
    const rep: IAnyStateTreeNode = getRoot(self);
    const coll: IAnyStateTreeNode = getParent(self, 2);
    let disp: any;
    return {
      afterAttach() {
        console.log('ViewDescr afterAttach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          disp = reaction(
            () => self.collsConstrs,
            (newArr: any[], oldArr: any[]) => {
              console.log('ViewDescr reaction, add coll ref, @id=', self['@id']);
              const { deleted, added } = arrDiff(newArr, oldArr);
              console.log('ViewDescr reaction, add coll ref, {deleted,added}=', { deleted, added });
              deleted.forEach((e: any) => rep.colls.delete(e['@id']));
              added.forEach((e: any) => rep.addCollByConstrRef(e));
            },
            { fireImmediately: true },
          );
        }
      },
      beforeDetach() {
        console.log('ViewDescr beforeDetach, @id=', self['@id']);
        if (coll.resolveCollConstrs) {
          if (disp) disp();
          self.collsConstrs.forEach((e) => rep.colls.delete(e['@id']));
        }
      },
      setCollConstrs(collsConstrs: any[]) {
        const ccso = collsConstrs.map((cc) => CollConstr.create(cc));
        self.collsConstrs.push(...ccso);
      },
    };
  });

export type IViewDescrSnapshotIn = SnapshotIn<typeof ViewDescr>;

export const createUiModelFromState = (
  repId: string,
  client: SparqlClient,
  initialState: any,
  additionalColls: CollState[] | undefined = undefined,
): any => {
  registerMstSchema('aldkg:ViewKind', ViewKind);
  registerMstSchema('aldkg:ViewDescr', ViewDescr);
  return createModelFromState(repId, client, initialState, additionalColls);
};
