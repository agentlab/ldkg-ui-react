/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { cloneDeep } from 'lodash-es';
import moment from 'moment';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import {
  CollState,
  JsStrObj,
  Results,
  rootModelInitialState,
  sendGet,
  SparqlClientImpl,
} from '@agentlab/sparql-jsld-client';

import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  antdDataControlRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  tableRenderers,
} from '../src';
import { viewKindCollConstr, viewDescrCollConstr } from '../src/models/ViewCollConstrs';
import { createUiModelFromState } from '../src/models/MstViewDescr';

export default {
  title: 'Several Controls/Tree-Table-Form',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = (args: any) => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
  ];

  //const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  //const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, additionalColls);
  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
  );
  //TODO: Workaround for imageUrl
  const ProductCardShapeSchema = {
    '@id': 'hs:ProductCardShape',
    '@type': 'sh:NodeShape',
    '@context': {
      '@type': 'rdf:type',
      brand: {
        '@id': 'hs:brand',
        '@type': 'hs:Brand',
      },
      seller: {
        '@id': 'hs:seller',
        '@type': 'hs:Seller',
      },
      firstParsedAt: {
        '@id': 'hs:firstParsedAt',
        '@type': 'xsd:dateTime',
      },
      lastMonthParsedAt: {
        '@id': 'hs:lastMonthParsedAt',
        '@type': 'xsd:dateTime',
      },
      parsedAt: {
        '@id': 'hs:parsedAt',
        '@type': 'xsd:dateTime',
      },
      prevParsedAt: {
        '@id': 'hs:prevParsedAt',
        '@type': 'xsd:dateTime',
      },
      categoryPopularity: {
        '@id': 'hs:categoryPopularity',
        '@type': 'xsd:double',
      },
      commentsCount: {
        '@id': 'hs:commentsCount',
        '@type': 'xsd:int',
      },
      lastMonthSalesAmount: {
        '@id': 'hs:lastMonthSalesAmount',
        '@type': 'xsd:int',
      },
      lastMonthSalesValue: {
        '@id': 'hs:lastMonthSalesValue',
        '@type': 'xsd:int',
      },
      perMonthSalesValue: {
        '@id': 'hs:perMonthSalesValue',
        '@type': 'xsd:int',
      },
      photosCount: {
        '@id': 'hs:photosCount',
        '@type': 'xsd:int',
      },
      prevMonthSalesAmount: {
        '@id': 'hs:prevMonthSalesAmount',
        '@type': 'xsd:int',
      },
      prevMonthSalesValue: {
        '@id': 'hs:prevMonthSalesValue',
        '@type': 'xsd:int',
      },
      price: {
        '@id': 'hs:price',
        '@type': 'xsd:int',
      },
      questionsCount: {
        '@id': 'hs:questionsCount',
        '@type': 'xsd:int',
      },
      saleValue: {
        '@id': 'hs:saleValue',
        '@type': 'xsd:int',
      },
      salesAmountDiff: {
        '@id': 'hs:salesAmountDiff',
        '@type': 'xsd:int',
      },
      starsValue: {
        '@id': 'hs:starsValue',
        '@type': 'xsd:int',
      },
      stocksDiffOrders: {
        '@id': 'hs:stocksDiffOrders',
        '@type': 'xsd:int',
      },
      stocksDiffReturns: {
        '@id': 'hs:stocksDiffReturns',
        '@type': 'xsd:int',
      },
      stocks: {
        '@id': 'hs:stocks',
        '@type': 'xsd:int',
      },
      totalSalesDiff: {
        '@id': 'hs:totalSalesDiff',
        '@type': 'xsd:int',
      },
      totalSales: {
        '@id': 'hs:totalSales',
        '@type': 'xsd:int',
      },
      rootId: {
        '@id': 'hs:rootId',
        '@type': 'xsd:long',
      },
      country: {
        '@id': 'hs:country',
        '@type': 'xsd:string',
      },
      name: {
        '@id': 'hs:name',
        '@type': 'xsd:string',
      },
      CardInCatLink: {
        '@id': 'hs:CardInCatLink',
        '@type': 'hs:CategoryShape',
      },
      CardInProdLink: {
        '@id': 'mktp:CardInProdLink',
        '@type': 'mktp:Product',
      },
      //imageUrl: {
      //  '@id': 'hs:imageUrl',
      //  '@type': '@id',
      //},
      identifier: {
        '@id': 'hs:identifier',
        '@type': '@id',
      },
    },
    targetClass: 'hs:ProductCard',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    title: 'Карточка товара',
    properties: {
      '@id': {
        title: 'URI',
        type: 'string',
        format: 'iri',
      },
      '@type': {
        title: 'Тип',
        type: 'string',
        format: 'iri',
      },
      brand: {
        title: 'Бренд',
        type: 'string',
        format: 'iri',
      },
      seller: {
        title: 'Продавец',
        type: 'string',
        format: 'iri',
      },
      firstParsedAt: {
        title: 'Первый раз распарсено',
        type: 'string',
        format: 'date-time',
      },
      lastMonthParsedAt: {
        title: 'Распарсено в последнем месяце',
        type: 'string',
        format: 'date-time',
      },
      parsedAt: {
        title: 'Распарсено',
        type: 'string',
        format: 'date-time',
      },
      prevParsedAt: {
        title: 'Предыдущий парсинг',
        type: 'string',
        format: 'date-time',
      },
      categoryPopularity: {
        title: 'Популярность категории',
        type: 'number',
      },
      commentsCount: {
        title: 'Кол-во комментариев',
        type: 'integer',
      },
      lastMonthSalesAmount: {
        title: 'Продажи за последний месяц',
        type: 'integer',
      },
      lastMonthSalesValue: {
        title: 'Выручка за последний месяц',
        type: 'integer',
      },
      perMonthSalesValue: {
        title: 'Средняя выручка за месяц',
        type: 'integer',
      },
      photosCount: {
        title: 'Кол-во фото',
        type: 'integer',
      },
      prevMonthSalesAmount: {
        title: 'Средние продажи за прошлый месяц',
        type: 'integer',
      },
      prevMonthSalesValue: {
        title: 'Средняя выручка за прошлый месяц',
        type: 'integer',
      },
      price: {
        title: 'Цена',
        type: 'integer',
      },
      questionsCount: {
        title: 'Кол-во вопросов',
        type: 'integer',
      },
      saleValue: {
        title: 'Размер скидки',
        type: 'integer',
      },
      salesAmountDiff: {
        title: 'Выручка, руб/день',
        type: 'integer',
      },
      starsValue: {
        title: 'Кол-во звезд',
        type: 'integer',
      },
      stocksDiffOrders: {
        title: 'Заказы в шт (изменение)',
        type: 'integer',
      },
      stocksDiffReturns: {
        title: 'Поступления-Возвраты в шт (изменение)',
        type: 'integer',
      },
      stocks: {
        title: 'Остатки в шт',
        type: 'integer',
      },
      totalSalesDiff: {
        title: 'Объем продаж, шт/день',
        type: 'integer',
      },
      totalSales: {
        title: 'Общий объем продаж, шт',
        type: 'integer',
      },
      rootId: {
        title: 'Корневой ИД',
        type: 'integer',
      },
      country: {
        title: 'Страна',
        type: 'string',
      },
      name: {
        title: 'Название',
        type: 'string',
      },
      CardInCatLink: {
        title: 'Родительские категории карточки',
        type: 'string',
        format: 'iri',
      },
      CardInProdLink: {
        title: 'Продуктовая разметка карточки',
        type: 'string',
        format: 'iri',
      },
      //imageUrl: {
      //  title: 'Изображение товара',
      //  type: 'string',
      //  format: 'iri',
      //},
      identifier: {
        title: 'ИД HunterSales',
        type: 'string',
        format: 'iri',
      },
    },
    required: [
      '@id',
      '@type',
      'brand',
      'seller',
      'firstParsedAt',
      'lastMonthParsedAt',
      'parsedAt',
      'prevParsedAt',
      'commentsCount',
      'lastMonthSalesAmount',
      'lastMonthSalesValue',
      'perMonthSalesValue',
      'photosCount',
      'prevMonthSalesAmount',
      'prevMonthSalesValue',
      'starsValue',
      'totalSales',
      'rootId',
      'country',
      'name',
    ],
  };
  rootModelInitialState.schemas.json[ProductCardShapeSchema['@id']] = ProductCardShapeSchema;
  rootModelInitialState.schemas.class2schema[ProductCardShapeSchema.targetClass] = ProductCardShapeSchema['@id'];
  //End Workaround for imageUrl
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, args.additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
          <Form viewDescrId={args.viewDescrId} viewDescrCollId={args.viewDescrCollId} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

const mktpSchemaRepoIri = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema';
const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

const viewKinds = [
  {
    '@id': 'mktp:TreeTableFormMktpCategoriesViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Tree-Table-Form Mktp Categories',
    description: 'Tree-Table-Form Mktp Categories',
    collsConstrs: [
      {
        '@id': 'mktp:HSCategories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:HSCategories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:KPCategories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:KPCategories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'kp:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:TBCategories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:TBCategories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'tb:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
      {
        '@id': 'mktp:ProductCards_in_Category_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ProductCards_in_Category_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:ProductCards_in_Category_Coll_Ent0_con',
              CardInCatLink: null, //'https://www.wildberries.ru/catalog/igrushki/antistress',
            },
            service: mktpSchemaRepoIri,
          },
        ],
        limit: 10,
      },
      {
        '@id': 'mktp:Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Cards_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            conditions: {
              '@id': 'mktp:Cards_Coll_Ent0_con',
              '@_id': null,
            },
            service: mktpSchemaRepoIri,
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:_934Jfg7',
        '@type': 'aldkg:SplitPaneLayout',
        options: {
          style: {
            width: '100%',
            height: '100%',
          },
          collapseDirection: 'left',
          initialSizes: [17, 43, 43],
        },
        elements: [
          {
            '@id': 'mktp:MarketplacesTabs',
            '@type': 'aldkg:TabsLayout',
            elements: [
              {
                '@id': 'mktp:_k345jh',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:HSCategories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'WildBerries',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                  connections: [{ toObj: 'mktp:ProductCards_in_Category_Coll_Ent0_con', toProp: 'CardInCatLink' }],
                },
              },
              {
                '@id': 'mktp:_876df86',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:KPCategories_Coll',
                options: {
                  renderType: 'tree',
                  title: 'Amazon',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                },
              },
              {
                '@id': 'mktp:_13hF67',
                '@type': 'aldkg:DataControl',
                resultsScope: 'mktp:HSCategories_Coll',
                options: {
                  renderType: 'tree',
                  title: '1688',
                  treeNodeTitleKey: 'name',
                  treeNodeParentKey: 'SubcatInCatLink',
                },
              },
            ],
          },
          {
            '@id': 'mktp:CategoryCardsTable',
            '@type': 'aldkg:Array',
            resultsScope: 'mktp:ProductCards_in_Category_Coll',
            options: {
              connections: [{ toObj: 'mktp:Cards_Coll_Ent0_con', toProp: '@_id' }],
              draggable: true,
              resizeableHeader: true,
              style: { height: '100%' },
              order: ['imageUrl', 'name', 'price', 'saleValue', 'country', 'brand', 'seller', 'identifier'],
              imageUrl: {
                width: 60,
                formatter: 'image',
                editable: false,
              },
              identifier: {
                formatter: 'link',
                //dataToFormatter: { link: 'identifier' },
                sortable: true,
                editable: false,
              },
              name: {
                width: 340,
                formatter: 'link',
                dataToFormatter: { link: '@id' },
                sortable: true,
                editable: false,
              },
              country: {
                width: 60,
                sortable: true,
                editable: false,
              },
              brand: {
                formatter: 'link',
                sortable: true,
                editable: false,
              },
              price: {
                width: 60,
                sortable: true,
                editable: false,
              },
              saleValue: {
                width: 60,
                sortable: true,
                editable: false,
              },
              seller: {
                formatter: 'link',
                sortable: true,
                editable: false,
              },
            },
          },
          {
            '@id': 'mktp:_933ndh8',
            '@type': 'aldkg:VerticalLayout',
            options: {
              style: {
                margin: '5px',
              },
            },
            elements: [
              {
                '@id': 'mktp:_29jGu67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/identifier',
              },
              {
                '@id': 'mktp:_18hfgG78',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/name',
              },
              {
                '@id': 'mktp:_732HJfg6',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/country',
              },
              {
                '@id': 'mktp:_93jaSy67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/brand',
              },
              {
                '@id': 'mktp:_Ogy87',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/price',
              },
              {
                '@id': 'mktp:_Jhf678',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/saleValue',
              },
              {
                '@id': 'mktp:_dfUy679',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/seller',
              },
              {
                '@id': 'mktp:_skUy67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/categoryPopularity',
              },
              {
                '@id': 'mktp:_dkYu20',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/commentsCount',
              },
              {
                '@id': 'mktp:_sHt67y',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/starsValue',
              },
              {
                '@id': 'mktp:_Lkh78f',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/questionsCount',
              },

              {
                '@id': 'mktp:_oI89g',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/lastMonthSalesAmount',
              },
              {
                '@id': 'mktp:_lsG680',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/lastMonthSalesValue',
              },
              {
                '@id': 'mktp:_Ljs6dh',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/perMonthSalesAmount',
              },
              {
                '@id': 'mktp:_f5Ghy67',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/perMonthSalesValue',
              },
              {
                '@id': 'mktp:_lj8Hf7',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/prevMonthSalesAmount',
              },
              {
                '@id': 'mktp:_ls8GJd6',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/prevMonthSalesValue',
              },

              {
                '@id': 'mktp:_9hD67hK',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/salesAmountDiff',
              },
              {
                '@id': 'mktp:_nrFy67js',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/totalSales',
              },
              {
                '@id': 'mktp:_Sdf7n4',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/totalSalesDiff',
              },
              {
                '@id': 'mktp:_kF78d46',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/stocks',
              },
              {
                '@id': 'mktp:_df7JHd7',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/stocksDiffOrders',
              },
              {
                '@id': 'mktp:_29Kjdf78',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/stocksDiffReturns',
              },
              {
                '@id': 'mktp:_10Is93',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/rootId',
              },

              {
                '@id': 'mktp:_Kd710df',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/photosCount',
              },
              {
                '@id': 'mktp:_Asf783',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/firstParsedAt',
              },
              {
                '@id': 'mktp:_9kd7Mhd',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/lastMonthParsedAt',
              },
              {
                '@id': 'mktp:_23Mf5dY',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/parsedAt',
              },
              {
                '@id': 'mktp:_9Jke7cc6',
                '@type': 'aldkg:Control',
                resultsScope: 'mktp:Cards_Coll/prevParsedAt',
              },
            ],
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'mktp:TreeAndFormViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:TreeTableFormMktpCategoriesViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [],
    options: {},
    // child ui elements configs
    elements: [],
  },
];

const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export const MktpCategories100Percent = Template.bind({});
MktpCategories100Percent.args = {
  additionalColls,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};

export const MktpCategories50Percent = Template.bind({});
const additionalColls50 = cloneDeep(additionalColls);
additionalColls50[0].data[0].elements[0].options.style.height = '50%';
MktpCategories50Percent.args = {
  additionalColls: additionalColls50,
  viewDescrId: viewDescrs[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
