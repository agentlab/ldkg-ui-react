import { observer } from 'mobx-react-lite';
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import BaseTable, { AutoResizer } from 'react-base-table';
import { InitTinyMCE, ContextMenu, Overlay } from './components';
import { useColumns, useDraggableContainer, useRows, useTableData, usePopupState, useSelection } from './hooks';
import { rowRenderer, rowProps } from './components/rows';
import { ROW_KEY } from './constants';
import './BaseTable.scss';

const DraggableContainer = SortableContainer(({ children }: any) => children);

interface EditableTableProps<T> {
  resizeableHeader: boolean;
  tableMenu?: any;
  isMenu: boolean;
  onChangeMenu: Function;
  parsedSchema: any;
  handleResize?: Function;
  filteredValue?: string[];
  schema: any;
  dataSource: T;
  [key: string]: any;
}

export const EditableTable: React.FC<EditableTableProps<any>> = observer<any>(
  ({ viewKind, viewKindElement, viewDescr, viewDescrElement, schema, actions }) => {
    const { sourceData, viewOptions, actionsMap, isLoading, handleEndReached, onSelect, setData } = useTableData({
      viewKindElement,
      viewDescr,
      actions,
    });

    const { isPopupVisible, close, open, popupCoords, setPopupCoords } = usePopupState(false);
    const { tableRef, getContainer, getHelperContainer, handleSortEnd } = useDraggableContainer(setData);
    const { selection } = useSelection({ sourceData });

    const { rowEventHandlers, rowClassName } = useRows({
      selection,
      onSelect,
      closePopup: close,
      openPopup: open,
      isPopupVisible,
      setPopupCoords,
      multiselect: viewOptions.multiselect,
    });
    const { visibleColumns } = useColumns({
      schemaProperties: schema.properties,
      viewKind,
      viewKindElement,
      viewDescr,
      viewDescrElement,
      selection,
      onSelect,
      order: viewOptions.order,
    });

    return (
      <React.Fragment>
        <InitTinyMCE />
        <AutoResizer>
          {({ width, height }: { width: number; height: number }) => (
            <DraggableContainer
              useDragHandle
              getContainer={getContainer}
              helperContainer={getHelperContainer}
              onSortEnd={handleSortEnd}>
              <BaseTable
                fixed
                useIsScrolling
                rowRenderer={rowRenderer}
                rowClassName={rowClassName}
                width={width}
                height={height}
                ref={tableRef}
                expandColumnKey={viewOptions.expandColumnKey || ROW_KEY}
                estimatedRowHeight={50}
                rowKey={ROW_KEY}
                onEndReachedThreshold={20}
                overlayRenderer={<Overlay isLoading={isLoading} />}
                columns={visibleColumns}
                data={sourceData}
                onEndReached={handleEndReached}
                rowEventHandlers={rowEventHandlers}
                rowProps={rowProps}
              />
            </DraggableContainer>
          )}
        </AutoResizer>
        <ContextMenu
          x={popupCoords.x}
          y={popupCoords.y}
          selection={selection}
          visible={isPopupVisible}
          actionsMap={actionsMap}
        />
      </React.Fragment>
    );
  },
);
