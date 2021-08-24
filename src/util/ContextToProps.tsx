/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep, get, isEqual, omit } from 'lodash-es';

import React, { useContext, useState } from 'react';
import { Spin } from 'antd';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

import { createLabelDescriptionFrom } from './label';
import { LayoutComponent } from '../layouts/LayoutComponent';
import { IViewKindElement, IViewKind } from '../models/uischema';
import { ControlComponent, RenderProps } from '../Form';
//import { FilterType } from '../complex/Query';
import { validators } from '../validation';
import { MstContext } from '../MstContext';

declare type Property = 'editable' | 'visible';
declare type JsObject = { [key: string]: any };

export type ToControlProps = RenderProps;

export interface SaveDialogProps {
  visible: boolean;
  schemaUri: string;
  onCancel: () => void;
  onOk: () => void;
}
export interface SaveDialog {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export interface ButtonComponent {
  editing: boolean;
  setEditing: (state: boolean) => void;
  saveData: (data: any) => void;
  enabled?: boolean;
  visible?: boolean;
}

export const withStoreToControlProps = (Component: React.FC<ControlComponent>): React.FC<ToControlProps> =>
  observer<ToControlProps>((props) => {
    const successValidation = {
      validateStatus: 'success',
    };
    const { form, viewKindElement } = props;
    const id = viewKindElement.resultsScope;
    const [validateObj, setValidateObj] = useState<{
      validateStatus: string;
      help?: string;
    }>(successValidation);
    const [req] = id?.split('/') || [];
    const [testReq, testUri] = viewKindElement.resultsScope?.split('/') || [];
    const { store } = useContext(MstContext);
    const controlProps = mapStateToControlProps(props);
    //const custom = viewKind.properties && viewKind.properties[req] ? viewKind.properties[req].customReq : undefined;
    //custom ? store.loadData(req, custom.req) : store.loadData(testReq);
    const coll = store.getColl(testReq);
    let data = coll?.data;
    if (!data || data.length === 0) {
      return <Spin />;
    }
    data = getSnapshot(data);
    data = data[0];
    const onValidate = (data: any) => {
      if (viewKindElement.options && Array.isArray(viewKindElement.options.validation)) {
        const validation = viewKindElement.options.validation;
        const idx = validation.findIndex((el: any) => !validators[el.validator](data, el.propsToValidator));
        if (idx !== -1) {
          const { validateStatus, help } = validation[idx];
          store.setOnValidate(form, viewKindElement.resultsScope, false);
          setValidateObj({
            validateStatus,
            help,
          });
        } else {
          setValidateObj(successValidation);
          store.setOnValidate(form, viewKindElement.resultsScope, true);
        }
      }
    };
    return (
      <Component
        id={id || ''}
        data={data[testUri]}
        formData={data}
        editing={form ? store.editingData.get(form) : store.editingData.get(req)}
        form={form}
        validateObj={validateObj}
        onValidation={form ? onValidate : () => {}}
        {...controlProps}
        handleChange={(data: any) => {
          form
            ? store.onChangeFormData(form, viewKindElement.resultsScope, data)
            : store.onChangeData(viewKindElement.resultsScope, data);
        }}
      />
    );
  });

export const withStoreToFormProps = (Component: React.FC<any>): React.FC<RenderProps> =>
  observer<RenderProps>(({ viewKindElement, viewKind, enabled, form }) => {
    if (!viewKind['@id']) {
      return null;
    }
    const title = viewKindElement.options ? viewKindElement.options.title : '';
    const id = viewKindElement['@id'];
    const enabledLayout = enabled && checkProperty('editable', id, viewKindElement, viewKind);
    const visible = checkProperty('visible', id, viewKindElement, viewKind);
    const { store } = useContext(MstContext);
    return (
      <Component
        formId={id}
        title={title}
        viewKindElement={viewKindElement}
        viewKind={viewKind}
        enabled={enabledLayout}
        visible={visible}
        onSave={() => store.onSaveFormData(id)}
        editing={store.editingData.get(id)}
        onEdit={() => store.setEditing(id, true)}
        onCancel={() => {
          store.onCancelForm(id);
        }}
      />
    );
  });

export const withStoreToViewClassProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { viewKindElement, viewKind } = props;
    const { store } = useContext(MstContext);
    const scope = viewKindElement.resultsScope;
    if (!store.getSelectedDataJs(scope)) {
      return <Spin />;
    }
    //const id = store.getSelectedDataJs(scope).type;
    return <Component viewKindElement={viewKindElement} viewKind={viewKind} />;
  });

export const withStoreToViewProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { viewKind, viewKindElement } = props;
    const { store } = useContext(MstContext);
    const scope = viewKindElement.resultsScope;
    const coll = store.getColl(scope);
    let data = coll?.data;
    if (!data) {
      //if (scope === 'rm:dataModelView') {
      //  store.loadData(scope);
      //}
      return <Spin />;
    }
    data = getSnapshot(data);
    //if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
    //  store.setSaveLogic(viewKindElement.resultsScope);
    //}
    //const id = store.getSelectedDataJs(scope)['@type'];
    //const selection = getSnapshot(store.selectedData);
    const newView = store.getSelectedDataJs(scope);
    if (!newView) {
      return <Spin />;
    }
    const newViewElement = newView;
    console.log('withStoreToViewProps', { viewKind, viewKindElement, newView, newViewElement });
    return (
      <Component
        id={scope}
        viewKindElement={newViewElement}
        viewKind={newView}
        onChange={(state: boolean) => store.setEditing(viewKindElement.resultsScope, state)}
      />
    );
  });

export const withStoreToModalProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    return <Component {...props} />;
  });

export const withStoreToButtonProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { schema, viewKindElement } = props;
    const { store } = useContext(MstContext);
    if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
      store.setSaveLogic(viewKindElement.resultsScope);
    }
    const options = viewKindElement.options || {};

    return <Component schema={schema} handleChange={() => {}} options={options} />;
  });

export const withStoreToCellProps = (Component: React.FC<any>): React.FC<any> =>
  observer<any>((props: any) => {
    const { data, onMeasureChange, height, uri, CKey, rowData, viewKindElement } = props;
    const path = viewKindElement.scope ? viewKindElement.scope.split('/').join('.') : null;
    const controlProps = mapStateToControlProps(props);
    /*const { store } = useRootCtx();
    const onSave = (data: any) => {
      let newData: any = {};
      newData[CKey] = data;
      store.saveCellData(newData, uri, rowData['@id']);
    };*/
    return (
      <Component
        data={path ? get(data, path) : data}
        height={height}
        rowData={rowData}
        onMeasureChange={onMeasureChange}
        editing={false}
        {...controlProps}
        width={props.width}
        isScrolling={props.isScrolling}
        handleChange={() => {}}
      />
    );
  });

export const withStoreToDataControlProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { viewKindElement, viewKind } = props;
    const { store } = useContext(MstContext);
    //if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
    //  store.setSaveLogic(viewKindElement.resultsScope);
    //}
    const custom = viewKind[viewKindElement.resultsScope.split('/')[0]]
      ? viewKind[viewKind.resultsScope.split('/')[0]].customReq
      : undefined;
    const scope = custom ? custom : viewKindElement.resultsScope;
    const coll = store.getColl(scope);
    let data = coll?.data;
    if (!data || data.length === 0) {
      //if (store.data[scope] === undefined) {
      //store.loadData(scope);
      return <Spin />;
    }
    data = cloneDeep(getSnapshot(data));
    const options = viewKindElement.options || {};
    const withConnections = options.connections;
    const onChange = (data: any) => {
      /*if (data) {
        store.setSelectedData(scope, data);
        withConnections &&
          options.connections.forEach((e: any) => {
            const condition: any = {};
            condition[e.by] = data['@id'];
            //store.editCondition(e.to, condition, scope, e.by, data);
          });
      }*/
    };
    const getData = (parentId: string) => {
      const conditions = { ...store.queries[scope].shapes[0].conditions, parent: parentId };
      const newQuery = cloneDeep(store.queries[scope]);
      newQuery.shapes[0].conditions = conditions;
      return store.getDataByQuery(newQuery);
    };
    const onDnD = ({ childId, parentId }: any) => {
      store.updateObjectData({ parent: parentId }, scope, childId);
    };
    const onCreateFolder = (data: any) => {
      return store.onCreateObject(data, scope);
    };
    const onDeleteFolder = (id: any) => {
      if (id) {
        return store.onDeleteObject(id, scope);
      }
    };
    const onRename = (newTitle: string, id: any) => {
      store.updateObjectData({ title: newTitle }, scope, id);
    };
    return (
      <Component
        uri={scope}
        dataSource={data}
        editing={store.editingData.get(scope)}
        viewKindElement={viewKindElement}
        handleChange={onChange}
        onCreateFolder={onCreateFolder}
        getData={getData}
        onDnD={onDnD}
        onRename={onRename}
        onDeleteFolder={onDeleteFolder}
        {...props}
      />
    );
  });

export const withStoreToSelectControlProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { viewKindElement, viewKind } = props;
    const { store } = useContext(MstContext);
    const id = viewKind['@id'];
    const scope = viewKindElement.resultsScope;
    const coll = store.getColl(scope);
    let data = coll?.data;
    if (!data) {
      return <Spin />;
    }
    data = getSnapshot(data);
    const options = viewKindElement.options || {};
    const withConnections = options.connections;
    const onChange = (data: any) => {
      console.log('withStoreToSelectControlProps onChange', data);
      store.setSelectedData(/*id || */ scope, data);
      withConnections &&
        options.connections.forEach((e: any) => {
          const condition: any = {};
          condition[e.by] = data['@id'];
          //view2.editCondition(e.to, condition, scope, e.by, data);
        });
    };
    return (
      <Component
        dataSource={data}
        viewKindElement={viewKindElement}
        options={viewKindElement.options}
        handleChange={onChange}
        {...props}
      />
    );
  });

export const withStoreToTabProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { schema, viewKindElement, viewKind } = props;
    const { store } = useContext(MstContext);
    //if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
    //  store.setSaveLogic(viewKindElement.resultsScope);
    //}
    const options = viewKindElement.options || {};
    const custom = viewKind[viewKindElement.resultsScope.split('/')[0]]
      ? viewKind[viewKindElement.resultsScope.split('/')[0]].customReq
      : undefined;
    const scope = custom ? custom : viewKindElement.resultsScope;
    const coll = store.getColl(scope);
    let data = coll?.data;
    if (!data) {
      return <Spin />;
    }
    data = getSnapshot(data);
    const withConnections = options.connections;
    const onChange = (data: any) => {
      store.setSelectedData(scope, data);
      if (withConnections) {
        store.editConn(withConnections, data['@id']);
        //        options.connections.forEach((e: any) => {
        //          const condition: any = {};
        //          condition[e.by] = data['@id'];
        //          store.editCondition(e.to, condition, scope, e.by, data);
        //        });
      }
    };
    return <Component schema={schema} uri={scope} tabs={data} handleChange={onChange} options={options} />;
  });

export const withStoreToMenuProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { schema, viewKindElement, viewKind } = props;
    const { store } = useContext(MstContext);
    //if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
    //  store.setSaveLogic(viewKindElement.resultsScope);
    //}
    const options = viewKindElement.options || {};
    const custom = viewKind[viewKindElement.resultsScope.split('/')[0]]
      ? viewKind[viewKindElement.resultsScope.split('/')[0]].customReq
      : undefined;
    const scope = custom ? custom : viewKindElement.resultsScope;
    const coll = store.getColl(scope);
    let data = coll?.data;
    if (!data) {
      return <Spin />;
    }
    data = getSnapshot(data);
    return (
      <Component
        modals={
          viewKindElement.elements ? viewKindElement.elements.filter((e: any) => e.options && e.options.modal) : []
        }
        schema={schema}
        viewKind={viewKind}
        uri={scope}
        tabs={data}
        handleChange={(data: JsObject) => store.setSelectedData(scope, data)}
        options={options}
        setModalVisible={(uri: string, state: boolean) => store.setModalVisible(uri, state)}
      />
    );
  });

export const withStoreToCollapseProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { viewKindElement, viewKind } = props;
    const options = viewKindElement.options || {};

    return <Component options={options} viewKindElement={viewKindElement} viewKind={viewKind} />;
  });

export const withStoreToArrayProps = (Component: any): any =>
  observer<any>(({ ...props }: any) => {
    const { schema, viewKindElement, viewKind } = props;
    const { store } = useContext(MstContext);
    //if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
    //  store.setSaveLogic(viewKindElement.resultsScope);
    //}
    const options = viewKindElement.options || {};
    const custom = viewKind[viewKindElement.resultsScope.split('/')[0]]
      ? viewKind[viewKindElement.resultsScope.split('/')[0]].customReq
      : undefined;
    const scope = custom ? custom : viewKindElement.resultsScope;
    const coll = store.getColl(scope);
    let data = coll?.data;
    if (!data) {
      return <Spin />;
    }
    data = getSnapshot(data);
    const loadMoreData = (offset: number) => {
      return data; //store.loadDataByUri(scope, offset);
    };
    const withConnections = options.connections;
    const onChange = (data: any) => {
      /*store.setSelectedData(scope, data);
      withConnections &&
        options.connections.forEach((e: any) => {
          const condition: any = {};
          condition[e.by] = data['@id'];
          store.editCondition(e.to, condition, scope, e.by, data);
        });*/
    };
    const loadExpandedData = (subject: string) => {
      //const newQuery = store.queries[viewKindElement.resultsScope];
      //newQuery.shapes[0].conditions = { ...newQuery.shapes[0].conditions, parentBinding: subject };
      return data; //store.getDataByQuery(newQuery);
    };
    return (
      <Component
        schema={schema}
        limit={10 /*store.queries[viewKindElement.resultsScope].limit*/}
        loadExpandedData={loadExpandedData}
        sortDir={{} /*store.queries[scope].orderBy*/}
        uri={scope}
        loadMoreData={loadMoreData}
        onSort={(property: string, sortDir: any) => {
          /*store.onSort(scope, property, sortDir)*/
        }}
        data={data}
        options={options}
        onSelect={onChange}
      />
    );
  });

export const withLayoutProps = (Component: React.FC<LayoutComponent>): React.FC<RenderProps> =>
  observer<RenderProps>(({ viewKindElement, viewKind, viewDescr, viewDescrElement, enabled, form }) => {
    const id = viewKindElement['@id'] || '';
    const enabledLayout = enabled && checkProperty('editable', id, viewKindElement, viewKind);
    const visible = checkProperty('visible', id, viewKindElement, viewKind);
    const { store } = useContext(MstContext);
    if (viewKindElement.options && viewKindElement.options.connections) {
      viewKindElement.options.connections.forEach((e: any) => store.setSaveLogic(e.from, e.to));
    }
    return (
      <Component
        viewKindElement={viewKindElement}
        viewKind={viewKind}
        viewDescr={viewDescr}
        viewDescrElement={viewDescrElement}
        enabled={enabledLayout}
        visible={visible}
        form={form}
      />
    );
  });

export const withStoreToSaveButtonProps = (Component: React.FC<ButtonComponent>): React.FC<RenderProps> =>
  observer<RenderProps>(({ viewKindElement, enabled }) => {
    const { store } = useContext(MstContext);
    if (viewKindElement.resultsScope && !store.saveLogicTree[viewKindElement.resultsScope]) {
      store.setSaveLogic(viewKindElement.resultsScope);
    }
    const key = viewKindElement.resultsScope;
    return (
      <Component
        editing={store.editingData.get(key)}
        setEditing={(state: boolean) => store.setEditing(key, state)}
        saveData={() => store.saveData(key)}
        enabled={enabled}
        visible={true}
      />
    );
  });

export const withStoreToSaveDialogProps = (Component: React.FC<SaveDialog>): React.FC<SaveDialogProps> =>
  observer<SaveDialogProps>(({ visible, schemaUri, onCancel, onOk }) => {
    const { store } = useContext(MstContext);
    const onSave = () => {
      store.setEditing(schemaUri, false, true);
      onOk();
    };
    return <Component visible={visible} onOk={onSave} onCancel={onCancel} />;
  });

const mapStateToControlProps = ({ id, schema, viewKindElement, viewKind, enabled }: ToControlProps) => {
  const pathSegments = id.split('/');
  const path = pathSegments.join('.properties.');
  const visible = checkProperty('visible', path, viewKindElement, viewKind);
  const editable =
    viewKindElement.options && 'editable' in viewKindElement.options ? viewKindElement.options.editable : true;
  const required = true;
  const uiOptions = viewKindElement.options;
  const description = schema.description || '';
  const labelDesc = createLabelDescriptionFrom(viewKindElement as any, schema);
  const label = labelDesc.show ? (labelDesc.text as string) : '';
  const key = pathSegments[1];
  return {
    description,
    label,
    visible,
    enabled: editable === 'undefined' ? true : editable,
    required,
    uiOptions,
    key,
    schema,
    errors: [],
  };
};

const checkProperty = (property: Property, path: string, viewKindElement: IViewKindElement, viewKind: IViewKind) => {
  const viewClassProp = viewKindElement.options;
  const viewProp = get(viewKind, path);
  if (viewClassProp && viewClassProp[property]) {
    return viewClassProp[property];
  } else if (viewProp && viewProp[property]) {
    return viewProp[property];
  } else {
    return true;
  }
};

export function treeify(
  list: JsObject[],
  idAttr = 'id',
  parentAttr = 'parent',
  childrenAttr = 'children',
  cmpFunc: (a: string, b: string) => number,
): JsObject[] {
  const lookup: JsObject = {};
  list.forEach((obj) => {
    lookup[obj[idAttr]] = obj;
    obj[childrenAttr] = [];
    obj.key = obj[idAttr];
  });
  const treeList: JsObject[] = [];
  let ob: JsObject;
  list.forEach((obj) => {
    if (obj[parentAttr] != null && obj[parentAttr] !== obj[idAttr]) {
      ob = lookup[obj[parentAttr]];
      if (ob !== undefined) {
        ob[childrenAttr].push(obj);
        //ob[childrenAttr] = ob[childrenAttr].sort(cmpFunc);
      } else {
        treeList.push(obj);
      }
    } else {
      treeList.push(obj);
    }
  });
  return treeList.sort((a, b) => cmpFunc(a[childrenAttr], b[childrenAttr]));
}

export function strcmp(a: string, b: string): number {
  if (a.length < b.length) {
    return -1;
  }
  if (a.length > b.length) {
    return 1;
  }
  return a < b ? -1 : a > b ? 1 : 0;
}
/*
export const withContextToSaveControlProps =
  (Component: any): any => ({...props}: any) => {
    const ctx = props.context;
    if ( props.contextTree[ctx] === undefined ) return null;
    const { data, editing, onSave } = useContext(props.contextTree[ctx]);
    return <Component dataSource={data} editing={editing} onSave={onSave} {...props} />;
  };
export const withContextToControlProps =
  (Component: any): any => ({...props}: any) => {
    const ctx = props.context;
    if ( props.contextTree[ctx] === undefined ) return null;
    const { data, editing } = useContext(props.contextTree[ctx]);
    const { setField } = useContext(SaveControlContext);
    const controlProps = mapStateToControlProps(props);
    const pathSegments = props.uischema.scope.split('/');
    return <Component data={data[pathSegments[1]]} editing={editing} {...controlProps} handleChange={setField || voidFunction} />;
  };

export const withContextToArrayProps =
  (Component: any): any => ({...props}: any) => {
    const ctx = props.context;
    if ( props.contextTree[ctx] === undefined ) return null;
    const { arrayData, setData } = useContext(props.contextTree[ctx]);
    return  <Component data={arrayData} handleChange={setData} enabled={true} visible={true} {...props} />;
  };

export const withContextFormsArrayProps =
  (Component: any): any =>
    withContextToArrayProps(React.memo(
      Component,
      (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps)
      ));
export const withContextFormsControlProps =
    (Component: any): any =>
      withContextToControlProps(React.memo(
        Component,
        (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps)
      ));
export const withContextFormsSaveControlProps =
    (Component: any): any =>
      withContextToSaveControlProps(React.memo(
        Component,
        (prevProps: any, nextProps: any) => isEqual(prevProps, nextProps)
      ));
*/

//type FormsPropTypes = ControlProps | CombinatorProps | LayoutProps | CellProps | ArrayLayoutProps | StatePropsOfControlWithDetail | OwnPropsOfRenderer;

export const areEqual = (prevProps: any /*FormsPropTypes*/, nextProps: any /*FormsPropTypes*/) => {
  const prev = omit(prevProps, ['handleChange']);
  const next = omit(nextProps, ['handleChange']);
  return isEqual(prev, next);
};
