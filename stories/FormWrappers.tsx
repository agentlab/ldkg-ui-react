/********************************************************************************
 * Copyright (c) 2024 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/it';
import 'dayjs/locale/pt';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/ru';

import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import antdLocaleDeDE from 'antd/es/locale/de_DE';
import antdLocaleEnUS from 'antd/es/locale/en_US';
import antdLocaleItIT from 'antd/es/locale/it_IT';
import antdLocalePtPT from 'antd/es/locale/pt_PT';
import antdLocalePtBR from 'antd/es/locale/pt_BR';
import antdLocaleRuRU from 'antd/es/locale/ru_RU';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import remotedev from 'remotedev';
import { JsObject, JSONSchema7LD, registerMstCollSchema, SparqlClientImpl } from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  createAdditionalColls,
  createUiModelFromState,
  Form,
  FormMstRepository,
  MstContextProvider,
  MstViewDescr,
  MstViewKind,
  RendererRegistryEntry,
  TFormMstRepositorySnapshotIn,
  TMstViewDescr,
  TMstViewKind,
  viewDescrCollConstr,
} from '../src';

import { SparqlClientImplDummy } from '../src/SparqlClientImplDummy';
import { emptyCollsModelState, noCollsFormModelState } from './TestData';
import { applySnapshot } from 'mobx-state-tree';
import { deDE } from '../src/locale/de_DE';
import { enUS } from '../src/locale/en_US';
import { itIT } from '../src/locale/it_IT';
import { ptBR } from '../src/locale/pt_BR';
import { ptPT } from '../src/locale/pt_PT';
import { ruRU } from '../src/locale/ru_RU';

export interface FormWithLocalStateProps {
  viewKind: TMstViewKind | undefined;
  viewDescr: TMstViewDescr | undefined;
  schemas: JSONSchema7LD[] | undefined;
  data: JsObject[] | undefined;
}

export const FormWithLocalState: React.FC<FormWithLocalStateProps> = (args) => {
  console.log('render FormWithLocalState', args);
  registerMstCollSchema(MstViewKind);
  registerMstCollSchema(MstViewDescr);
  const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers];
  const client = new SparqlClientImplDummy();
  const modelInitialState: TFormMstRepositorySnapshotIn = cloneDeep(emptyCollsModelState);
  if (args.schemas && args.schemas.length > 0) {
    if (!modelInitialState.rep.schemas.json) modelInitialState.rep.schemas.json = {};
    if (!modelInitialState.rep.schemas.class2schema) modelInitialState.rep.schemas.class2schema = {};
    args.schemas.forEach((s) => {
      (modelInitialState.rep.schemas.json as { [x: string]: JSONSchema7LD })[s['@id']] = s;
      (modelInitialState.rep.schemas.class2schema as { [x: string]: string })[s.targetClass] = s['@id'];
    });
  }
  if (!modelInitialState.rep.colls) modelInitialState.rep.colls = {};
  modelInitialState.rep.colls['aldkg:ViewKinds_Coll'].dataIntrnl = args.viewKind ? [args.viewKind] : [];
  modelInitialState.rep.colls['aldkg:Views_Coll'].dataIntrnl = args.viewDescr ? [args.viewDescr] : [];
  modelInitialState.rep.colls['rm:Artifacts_Coll'].dataIntrnl = args.data || [];
  console.log(modelInitialState);
  const rootStore = FormMstRepository.create(modelInitialState, { client });
  const store: any = asReduxStore(rootStore);
  connectReduxDevtools(remotedev, rootStore);
  const viewDescrId = args.viewDescr ? args.viewDescr['@id'] : '';
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div style={{ /*width: '300px', height: '200px',*/ border: '1px solid #000' }}>
          <Form viewDescrId={viewDescrId} viewDescrCollId={viewDescrCollConstr['@id']} />
        </div>
      </MstContextProvider>
    </Provider>
  );
};

export const FormWrapper: React.FC<FormWithLocalStateProps> = (args) => {
  console.log('render FormWrapper', args);
  const viewDescrId = args.viewDescr ? args.viewDescr['@id'] : '';
  return <Form viewDescrId={viewDescrId} viewDescrCollId={viewDescrCollConstr['@id']} />;
};

export const FormWithLocalStateDecorator = (Story: React.FC<any>, context: any) => {
  console.log('render FormWithLocalStateDecorator', { context });
  const { args, globals, parameters } = context;
  const {
    backgrounds,
    colorPrimary,
    locale,
    themeDensity,
  }: { backgrounds: any; colorPrimary: string; locale: string; themeDensity: string } = globals;
  const background: string | undefined = backgrounds?.value;
  const algorithm = [];
  if (background === '#333333') algorithm.push(antdTheme.darkAlgorithm);
  if (themeDensity === 'compact') algorithm.push(antdTheme.compactAlgorithm);
  const { antdRenderers = [] }: { antdRenderers: RendererRegistryEntry[] } = parameters;
  // Create model snapshot
  const modelInitialState: TFormMstRepositorySnapshotIn = cloneDeep(emptyCollsModelState);
  if (args.schemas && args.schemas.length > 0) {
    if (!modelInitialState.rep.schemas.json) modelInitialState.rep.schemas.json = {};
    if (!modelInitialState.rep.schemas.class2schema) modelInitialState.rep.schemas.class2schema = {};
    args.schemas.forEach((s: JSONSchema7LD) => {
      (modelInitialState.rep.schemas.json as { [x: string]: JSONSchema7LD })[s['@id']] = s;
      (modelInitialState.rep.schemas.class2schema as { [x: string]: string })[s.targetClass] = s['@id'];
    });
  }
  if (!modelInitialState.rep.colls) modelInitialState.rep.colls = {};
  modelInitialState.rep.colls['aldkg:ViewKinds_Coll'].dataIntrnl = args.viewKind ? [args.viewKind] : [];
  modelInitialState.rep.colls['aldkg:Views_Coll'].dataIntrnl = args.viewDescr ? [args.viewDescr] : [];
  modelInitialState.rep.colls['rm:Artifacts_Coll'].dataIntrnl = args.data || [];
  console.log(modelInitialState);
  // Create MST Model from snapshot
  registerMstCollSchema(MstViewKind);
  registerMstCollSchema(MstViewDescr);
  const client = new SparqlClientImplDummy();
  const rootStore = FormMstRepository.create(modelInitialState, { client });
  const store: any = asReduxStore(rootStore);
  connectReduxDevtools(remotedev, rootStore);
  // Configure locale in Antd Context, DayJS and MST Store
  let antdLocale: any;
  switch (locale) {
    case 'de_DE':
      dayjs.locale('de');
      antdLocale = antdLocaleDeDE;
      applySnapshot(rootStore.locale, deDE);
      break;
    case 'it_IT':
      dayjs.locale('it');
      antdLocale = antdLocaleItIT;
      applySnapshot(rootStore.locale, itIT);
      break;
    case 'pt_PT':
      dayjs.locale('pt');
      antdLocale = antdLocalePtPT;
      applySnapshot(rootStore.locale, ptPT);
      break;
    case 'pt_BR':
      dayjs.locale('pt-br');
      antdLocale = antdLocalePtBR;
      applySnapshot(rootStore.locale, ptBR);
      break;
    case 'ru_RU':
      dayjs.locale('ru');
      antdLocale = antdLocaleRuRU;
      applySnapshot(rootStore.locale, ruRU);
      break;
    case 'en_US':
    default:
      dayjs.locale('en');
      antdLocale = antdLocaleEnUS;
      applySnapshot(rootStore.locale, enUS);
  }
  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          // Seed Token
          colorPrimary: colorPrimary || '#1DA57A', // primary color for all components
          //borderRadius: 2,
          //fontSize: 12, // 14 // major text font size
          //colorLink: '#1DA57A', //
          // Alias Token
          colorBgContainer: background || '#FFF',
        },
        algorithm,
      }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
          <div style={{ /*width: '300px', height: '200px',*/ border: '1px solid #000' }}>
            <Story />
          </div>
        </MstContextProvider>
      </Provider>
    </ConfigProvider>
  );
};

export const FormWithRemoteStateDecorator = (Story: React.FC<any>, context: any) => {
  console.log('render FormWithRemoteStateDecorator', { context });
  const { args, globals, parameters } = context;
  const {
    backgrounds,
    colorPrimary,
    locale,
    themeDensity,
  }: { backgrounds: any; colorPrimary: string; locale: string; themeDensity: string } = globals;
  const background: string | undefined = backgrounds?.value;
  const algorithm = [];
  if (background === '#333333') algorithm.push(antdTheme.darkAlgorithm);
  if (themeDensity === 'compact') algorithm.push(antdTheme.compactAlgorithm);
  const {
    antdRenderers = [],
    repId,
    serverUrl,
  }: { antdRenderers: RendererRegistryEntry[]; repId: string; serverUrl: string } = parameters;
  // Create MST Model from snapshot
  const client = new SparqlClientImpl(serverUrl);
  const rootStore = createUiModelFromState(
    repId,
    client,
    noCollsFormModelState,
    createAdditionalColls(args.viewKind ? [args.viewKind] : [], args.viewDescr ? [args.viewDescr] : []),
  );
  const store: any = asReduxStore(rootStore);
  connectReduxDevtools(remotedev, rootStore);
  // Configure locale in Antd Context, DayJS and MST Store
  let antdLocale: any;
  switch (locale) {
    case 'de_DE':
      dayjs.locale('de');
      antdLocale = antdLocaleDeDE;
      applySnapshot(rootStore.locale, deDE);
      break;
    case 'it_IT':
      dayjs.locale('it');
      antdLocale = antdLocaleItIT;
      applySnapshot(rootStore.locale, itIT);
      break;
    case 'pt_PT':
      dayjs.locale('pt');
      antdLocale = antdLocalePtPT;
      applySnapshot(rootStore.locale, ptPT);
      break;
    case 'pt_BR':
      dayjs.locale('pt-br');
      antdLocale = antdLocalePtBR;
      applySnapshot(rootStore.locale, ptBR);
      break;
    case 'ru_RU':
      dayjs.locale('ru');
      antdLocale = antdLocaleRuRU;
      applySnapshot(rootStore.locale, ruRU);
      break;
    case 'en_US':
    default:
      dayjs.locale('en');
      antdLocale = antdLocaleEnUS;
      applySnapshot(rootStore.locale, enUS);
  }
  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          // Seed Token
          colorPrimary: colorPrimary || '#1DA57A', // primary color for all components
          //borderRadius: 2,
          //fontSize: 12, // 14 // major text font size
          //colorLink: '#1DA57A', //
          // Alias Token
          colorBgContainer: background || '#FFF',
        },
        algorithm,
      }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
          <div style={{ /*width: '300px', height: '200px',*/ border: '1px solid #000' }}>
            <Story />
          </div>
        </MstContextProvider>
      </Provider>
    </ConfigProvider>
  );
};
