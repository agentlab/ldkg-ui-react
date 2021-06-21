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
  const inputRef = useRef<any>(null);
  const formaterId = uiOptions.formater || 'base';
  const query = uiOptions.query;
  let width = 'auto';
  let editable = true;
  if (uiOptions.editable !== undefined) {
    editable = uiOptions.editable;
  }
  if (uiOptions && formaterId === 'tinyMCE') {
    width = uiOptions.tinyWidth === 'emptySpace' ? '100%' : uiOptions.tinyWidth === 'content' ? 'auto' : 'auto';
  }
  const Formater = formatters[formaterId] || formatters['base'];
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
  if (uiOptions.dataToFormater) {
    const formaterProps = uiOptions.dataToFormater;
    for (const key in formaterProps) {
      specialProps[key] = rowData[formaterProps[key]];
    }
  }
  //console.log('RENDER', props.data);
  return (
    <div style={{ margin: '5px', display: 'block', alignSelf: 'start', width: width }}>
      {editable ? (
        editing ? (
          <Cell inputRef={inputRef} value={currentData} handleChange={save} {...props} />
        ) : (
          <div onClick={toggleEdit}>
            <Formater
              myRef={myRef}
              query={query}
              propKey={uiOptions.key}
              value={currentData}
              {...specialProps}
              {...props}
            />
          </div>
        )
      ) : (
        <Formater value={props.data} query={query} propKey={uiOptions.key} {...specialProps} {...props} />
      )}
    </div>
  );
};
