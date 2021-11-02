/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState, useEffect, useRef } from 'react';

import { ControlComponent } from '../Form';
import { formatters } from '../formatters';
import './cell.css';

interface WithCell {
  Cell: any;
  editable: boolean;
  myRef: any;
  rowData: any;
  height: any;
}
export const CellRenderer: React.FC<ControlComponent & WithCell> = ({
  Cell,
  uiOptions = {},
  handleChange,
  myRef,
  rowData,
  ...props
}) => {
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState(props.data);
  const [fontSize, setFontSize] = useState<number>();
  const inputRef = useRef<any>(null);
  const cellRef = useRef<any>(null);
  const formatterId = uiOptions.formatter || 'base';
  const query = uiOptions.query;
  let width = 'auto';
  let editable = true;
  if (uiOptions.editable !== undefined) {
    editable = uiOptions.editable;
  }
  if (uiOptions && formatterId === 'tinyMCE') {
    width = uiOptions.tinyWidth === 'emptySpace' ? '100%' : uiOptions.tinyWidth === 'content' ? 'auto' : 'auto';
  }
  const Formatter = formatters[formatterId] || formatters['base'];
  useEffect(() => {
    if (editing && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
  };
  //console.log('RENDER');
  const save = async (data: any) => {
    setCurrentData(data);
    handleChange(data);
    toggleEdit();
  };
  const specialProps: any = {};
  if (uiOptions.dataToFormatter) {
    const formatterProps = uiOptions.dataToFormatter;
    for (const key in formatterProps) {
      specialProps[key] = rowData[formatterProps[key]];
    }
  }
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setFontSize(entries[0].contentRect.width * uiOptions.relativeFont);
    });

    if (uiOptions.relativeFont) {
      const antRow = cellRef.current.parentNode.parentNode;
      resizeObserver.observe(antRow);
    }

    return () => resizeObserver.disconnect();
  }, []);
  //console.log('RENDER', props.data);
  return (
    <div
      ref={cellRef}
      style={{
        margin: '5px',
        display: 'block',
        alignSelf: 'start',
        width: width,
        fontSize,
        ...uiOptions.style,
      }}>
      {editable ? (
        editing ? (
          <Cell inputRef={inputRef} value={currentData} handleChange={save} {...props} />
        ) : (
          <div onClick={toggleEdit}>
            <Formatter
              myRef={myRef}
              query={query}
              propKey={uiOptions.key}
              options={uiOptions}
              value={currentData}
              {...specialProps}
              {...props}
            />
          </div>
        )
      ) : (
        <Formatter
          value={props.data}
          query={query}
          propKey={uiOptions.key}
          options={uiOptions}
          {...specialProps}
          {...props}
        />
      )}
    </div>
  );
};
