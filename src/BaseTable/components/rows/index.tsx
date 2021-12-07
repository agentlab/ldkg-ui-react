import isEqual from 'lodash-es/isEqual';
import React from 'react';
import { Spin } from 'antd';
import './table.css';
import { SortableElement } from 'react-sortable-hoc';

const DraggableElement = SortableElement(({ children }: any) => children);

export const rowRenderer = ({ rowData, cells, ...rest }: any) => {
  if (rowData === 'test')
    return (
      <div style={{ margin: '0 auto', height: '50px' }}>
        <Spin style={{ marginTop: '15px' }} />
      </div>
    );
  return cells;
};

export const Row = React.memo(
  React.forwardRef(({ key, index, children, ...rest }: any, ref: any) => {
    if (children.length === 2) {
      return (
        <DraggableElement key={key} index={index}>
          <div {...rest} ref={ref}>
            {children}
          </div>
        </DraggableElement>
      );
    }
    return (
      <div {...rest} ref={ref}>
        {children}
      </div>
    );
  }),
  (p, n) => isEqual(p.children, n.children),
);

export const rowProps = ({ rowData, ...rest }: any) => ({
  tagName: Row,
  index: rest.rowIndex,
  key: rowData['@id'],
});
