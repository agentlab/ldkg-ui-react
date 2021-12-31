import React from 'react';
import { TypedObject } from '../types';
import { JsObject } from '@agentlab/sparql-jsld-client';
import { EditableCell } from '../components/cells/EditableTableCell';
import { createViewKindElement } from './createViewKindElement';
import { getColumnFilterProps } from './getFilterColumnProps';
import { isEmpty } from 'lodash-es';

type Props = {
  property: string;
  propertySchema: any;
  columnsHeight: TypedObject<number>;
  viewKind: any;
  viewKindElement: any;
  viewDescr: any;
  viewDescrElement: any;
};
export const createColumn = ({
  property,
  propertySchema,
  columnsHeight,
  viewKind,
  viewKindElement,
  viewDescr,
  viewDescrElement,
}: Props) => {
  const order = viewKindElement?.options?.order || [];
  const options = viewKindElement?.options?.[property] || {};
  const disabled = (isEmpty(options) && !order.includes(property)) || !!options?.disabled;
  const newColumn: JsObject = {
    editable: false,
    hidden: false,
    disabled,
    width: 200,
    resizable: true,
    title: propertySchema.title || property,
    key: property,
    dataKey: property,
    renderer: propertySchema?.formatters?.default,
    ...options,
    ...(options.searchFilter && getColumnFilterProps(property)),
    cellRenderer: ({ cellData, ...rest }: any) => (
      <EditableCell
        viewKind={viewKind}
        viewKindElement={createViewKindElement({ viewKind: viewKindElement, key: property })}
        viewDescr={viewDescr}
        viewDescrElement={viewDescrElement}
        schema={propertySchema}
        editable={options.editable}
        heightCache={columnsHeight}
        dataIndex={property}
        title={propertySchema.title || property}
        cellData={cellData}
        {...rest}
      />
    ),
  };
  return newColumn;
};
