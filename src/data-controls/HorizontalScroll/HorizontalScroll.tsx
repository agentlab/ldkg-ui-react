/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState, useEffect } from 'react';
import { TMstViewKindElement } from '../../models/MstViewDescr';
import { Card } from './Card';
import { DispatchCell } from '../../DispatchCell';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './arrows';
import useDrag from './useDrag';

import './styles.css';
import './hideScrollbar.css';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

export const HorizontalScrollRenderer: React.FC<any> = (props) => {
  const { viewKind, viewKindElement, viewDescr, viewDescrElement, child, schema, getData, onSelect } = props;
  const [dataSource, setDataSource] = useState(child);
  const [selected, setSelected] = useState<string>('');
  const template = viewKindElement?.options?.elementTemplate || null;

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (newPos) => {
        if (scrollContainer.current) {
          const currentScroll = scrollContainer.current.scrollLeft;
          scrollContainer.current.scrollLeft = currentScroll + newPos;
        }
      });

  const handleItemClick = (itemId: string) => () => {
    if (dragging) {
      return;
    }
    if (selected !== itemId) {
      setSelected(itemId);
      onSelect(itemId);
    }
  };

  const createCell = (data: any, id: string | number) =>
    template ? (
      template.map((e: TMstViewKindElement, idx: number) => (
        <DispatchCell
          id={String(id) + String(idx)}
          key={String(id) + String(idx)}
          viewKind={viewKind}
          viewKindElement={e}
          viewDescr={viewDescr}
          viewDescrElement={viewDescrElement}
          schema={schema}
          data={data}
          rowData={data}
        />
      ))
    ) : (
      <span key={id}>{data['@id']}</span>
    );

  const onUpdate = ({ isLastItemVisible }: scrollVisibilityApiType) => {
    if (isLastItemVisible) {
      //const newDataSource = dataSource.concat(getData());
      console.log('push new items');
      //setDataSource(newDataSource);
    }
  };

  useEffect(() => {
    setDataSource(child);
  }, [child]);

  return (
    <div onMouseLeave={dragStop}>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        onUpdate={onUpdate}>
        {dataSource.map((data: any, idx: number) => (
          <Card
            key={data['@id']}
            itemId={data['@id']}
            onClick={handleItemClick(data['@id'])}
            style={viewKindElement.options.templateStyle}>
            {createCell(data, idx)}
          </Card>
        ))}
      </ScrollMenu>
    </div>
  );
};

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
