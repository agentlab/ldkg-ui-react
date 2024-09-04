/********************************************************************************
 * Copyright (c) 2024 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import dayjs from 'dayjs';
import { values, when } from 'mobx';
import { types, getSnapshot, applySnapshot, getEnv, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { CollState, JsObject, MstRepository, registerMstCollSchema, SparqlClient } from '@agentlab/sparql-jsld-client';
import { MstViewDescr, MstViewKind } from './MstViewDescr';
import { viewDescrCollConstr, viewKindCollConstr } from './ViewCollConstrs';

export const FormMstRepository = types
  .model('FormMstRepository', {
    rep: MstRepository,
    locale: types.map(types.frozen<any>()),
    editingData: types.map(types.boolean),
    selectedData: types.map(types.frozen<any>()),
  })
  /**
   * Views
   */
  .views((self) => {
    return {
      getSelectedDataJs(iri: string) {
        if (!iri) return undefined;
        const coll = self.rep.getColl(iri);
        if (!coll) return undefined;
        const id = self.selectedData.get(iri);
        if (id) {
          const data = coll.dataByIri(id);
          if (data) return getSnapshot<JsObject>(data);
        }
        return undefined;
      },
      getLocaleJs(iri: string) {
        if (!iri) return undefined;
        return self.locale.get(iri);
      },
    };
  })
  /**
   * Actions
   */
  .actions((self) => {
    return {
      //////////  Selection Service  ///////////

      setSelectedData(iri: string, data: any) {
        //console.log('setSelectedData START', { iri, data });
        if (iri) {
          //let id: string;
          //if (typeof data === 'string') {
          //  id = data;
          //} else {
          //  id = data['@id'];
          //
          //if (id && typeof id === 'string') {
          //  self.selectedData.set(iri, id);
          //  console.log('setSelectedData UPDATE', { iri, id });
          //}
          self.selectedData.set(iri, data);
        }
        //console.log('setSelectedData END', { iri, data });
      },
      //////////  FORM  ///////////
      onSaveFormData(formId: string) {},
      onCancelForm(id: string) {},
      setEditing(schemaUri: string, state: boolean, reset = false) {
        if (self.editingData.get(schemaUri) !== state) {
          self.editingData.set(schemaUri, state);
          //if (schemaUri === 'root' && this.setParentEditing) {
          //  self.setParentEditing(state);
          //}
          //if (this.saveLogicTree[schemaUri] && this.saveLogicTree[schemaUri].parent) {
          //  this.setEditingChanges(this.saveLogicTree[schemaUri].parent as string, state, schemaUri);
          //}
          //if (reset) {
          //  this.resetEditingChanges(schemaUri);
          //}
        }
      },
      setModalVisible(uri: string, state: boolean) {},
      setOnValidate(form: string, id: string, state: boolean) {},
      onChangeData(path: string, data: any) {},
      setSaveLogic(parent: string, child: string) {},
      setEditingChanges(parentUri: string, state: boolean, childUri: string) {},
      onChangeFormData(form: string, path: string, data: any) {},
      resetEditingChanges(schemaUri: string) {},
    };
  });

export type TFormMstRepository = Instance<typeof FormMstRepository>;
export type TFormMstRepositorySnapshotIn = SnapshotIn<typeof FormMstRepository>;
export type TFormMstRepositorySnapshotOut = SnapshotOut<typeof FormMstRepository>;

export const createFormModelFromState2 = (
  repId: string,
  client: SparqlClient,
  initialState: any,
  additionalColls: CollState[] | undefined = undefined,
) => {
  const model = FormMstRepository.create(initialState, { client });
  model.rep.setId(repId);
  //model.ns.reloadNs();
  if (additionalColls && additionalColls.length > 0) {
    // wait until namespaces loads then add additionalState
    when(
      () => Object.keys(model.rep.ns.currentJs).length > 5,
      () => {
        additionalColls.forEach((collState) => {
          let existedColl;
          // Add new Coll with CollConstr and dataIntrnl to the model
          if (typeof collState.constr === 'object') {
            existedColl = model.rep.getColl(collState.constr['@id']);
            if (existedColl === undefined) {
              try {
                const coll = model.rep.addColl(collState.constr, collState.opt, collState.data);
                if (!coll) {
                  console.warn(`Warn: Coll insertion failed! Coll ${collState.constr['@id']} is undefined`);
                }
              } catch (err) {
                console.error(`Err: Coll insertion failed! Coll ${collState.constr['@id']} is undefined`);
                console.error(err);
              }
            }
          } else if (typeof collState.constr === 'string') {
            existedColl = model.rep.getColl(collState.constr);
            if (existedColl === undefined) {
              try {
                const coll = model.rep.addCollByConstrRef(collState.constr, collState.opt, collState.data);
                if (!coll) {
                  console.warn(`Warn: Coll insertion failed! Coll ${collState.constr} is undefined`);
                }
              } catch (err) {
                console.error(`Err: Coll insertion failed! Coll ${collState.constr} is undefined`);
                console.error(err);
              }
            }
          }
          // If CollConstr with '@id' existed, adds data to the Coll's dataIntrnl
          if (existedColl !== undefined && collState.data && Array.isArray(collState.data)) {
            existedColl.addElems(collState.data);
          }
        });
      },
    );
  }
  return model;
};

export const createUiModelFromState = (
  repId: string,
  client: SparqlClient,
  initialState: any,
  additionalColls?: CollState[],
) => {
  registerMstCollSchema(MstViewKind);
  registerMstCollSchema(MstViewDescr);
  return createFormModelFromState2(repId, client, initialState, additionalColls);
};

export const createAdditionalColls = (
  viewKinds: JsObject[] | JsObject,
  viewDescrs: JsObject[] | JsObject,
  data: JsObject[] | JsObject | undefined = undefined,
): CollState[] => {
  const additionalColls = [
    // ViewKinds Collection
    {
      constr: viewKindCollConstr,
      data: Array.isArray(viewKinds) ? viewKinds : [viewKinds],
      opt: {
        updPeriod: undefined,
        lastSynced: dayjs().valueOf(),
        //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
      },
    },
    // ViewDescrs Collection
    {
      constr: viewDescrCollConstr,
      data: Array.isArray(viewDescrs) ? viewDescrs : [viewDescrs],
      opt: {
        updPeriod: undefined,
        lastSynced: dayjs().valueOf(),
        //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
        // for viewDescrs.collConstrs (it loads lazily -- after the first access)
      },
    },
  ];
  if (data) {
    additionalColls.push({
      constr: Array.isArray(viewKinds) ? viewKinds[0].collsConstrs[0] : viewKinds.collsConstrs[0],
      data: Array.isArray(data) ? data : [data],
      opt: {
        updPeriod: undefined,
        lastSynced: dayjs().valueOf(),
        //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
        // for viewDescrs.collConstrs (it loads lazily -- after the first access)
      },
    });
  }
  return additionalColls;
};
