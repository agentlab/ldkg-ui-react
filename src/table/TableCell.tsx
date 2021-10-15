/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import isEqual from 'lodash-es/isEqual';
import React from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { DispatchCell } from '../DispatchCell';

import './JsonAntdTable.css';

/*interface NonEmptyCellProps extends OwnPropsOfNonEmptyCell {
  rootSchema: JsonSchema;
  errors: string;
  path: string;
  enabled: boolean;
}*/
/*interface OwnPropsOfNonEmptyCell {
  rowPath: string;
  propName?: string;
  schema: JsonSchema;
  enabled: boolean;
}*/

const type = 'DragableBodyRow';

export const DragableRow = ({ index, moveRow, className, style, ...restProps }: any): JSX.Element => {
  const ref = React.useRef<HTMLTableRowElement>();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor: DropTargetMonitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const renderTester = (prevProps: any, nextProps: any) => {
  return (
    isEqual(prevProps.viewKind, nextProps.viewKind) &&
    isEqual(prevProps.viewKindElement, nextProps.viewKindElement) &&
    isEqual(prevProps.viewDescr, nextProps.viewDescr) &&
    isEqual(prevProps.viewDescrElement, nextProps.viewDescrElement) &&
    isEqual(prevProps.rowData, nextProps.rowData) &&
    isEqual(prevProps.column, nextProps.column) &&
    isEqual(prevProps.cellData, nextProps.cellData) &&
    isEqual(prevProps.enabled, nextProps.enabled) &&
    isEqual(prevProps.rowData, nextProps.rowData) &&
    isEqual(prevProps.uri, nextProps.uri) &&
    isEqual(prevProps.heightCache, nextProps.heightCache) &&
    isEqual(prevProps.rowIndex, nextProps.rowIndex)
  );
};

export const EditableCell: React.FC<any> = React.memo(
  ({
    viewKind,
    viewKindElement,
    viewDescr,
    viewDescrElement,
    cellData,
    schema,
    enabled,
    rowData,
    column,
    uri,
    heightCache,
    rowIndex,
    isScroling,
    ...restProps
  }) => {
    const onChange = (measure: any) => {
      heightCache[rowData['@id']] = measure;
      restProps.container._updateRowHeights();
    };
    return cellData ? (
      <DispatchCell
        id={''}
        viewKind={viewKind}
        viewKindElement={viewKindElement}
        viewDescr={viewDescr}
        viewDescrElement={viewDescrElement}
        schema={schema}
        CKey={column.key}
        onMeasureChange={onChange}
        width={column.width}
        height={heightCache[rowData['@id']]}
        rowData={rowData}
        data={cellData}
        uri={uri}
        enabled={enabled}
      />
    ) : null;
  },
  (prevProps: any, nextProps: any) => renderTester(prevProps, nextProps),
);
