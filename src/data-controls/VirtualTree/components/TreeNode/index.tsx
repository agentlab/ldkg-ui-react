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
import { Input } from 'antd';
import { FolderOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

import './styles.css';

export const NodeRenderer = React.memo(
  ({ title, onContextMenu, onSort, edited, onRename, children, ...otherProps }: any) => {
    const [edit, setEdit] = useState(edited);
    const [sort, setSort] = useState('noSort');
    const [currentTitle, setCurrentTitle] = useState(title);
    const ref = React.createRef<any>();
    useEffect(() => {
      if (ref.current !== null) {
        ref.current.focus();
      }
    }, [edit, ref]);

    const onClick = (ev: any) => {
      const newSort = sortSwap[sort];
      ev.stopPropagation();
      setSort(newSort);
      onSort(otherProps['@id'], newSort);
    };
    return (
      <div
        onContextMenu={(ev) => {
          onContextMenu({ event: ev, node: { onRename: () => setEdit(true), title, otherProps: { ...otherProps } } });
        }}
      >
        {otherProps['@type'] === 'nav:folder' ? <FolderOutlined style={{ padding: '0 5px 0 0' }} /> : null}
        {edit ? (
          <span>
            <Input
              style={{ display: 'inline-block', width: '80%' }}
              ref={ref}
              size='small'
              defaultValue={currentTitle}
              onBlur={(ev: any) => {
                if (ev.target.value !== title) {
                  setCurrentTitle(ev.target.value);
                  onRename(ev.target.value, otherProps['@id']);
                }
                setEdit(false);
              }}
            ></Input>
          </span>
        ) : (
          <span onDoubleClick={() => setEdit(true)}>
            {otherProps.editedTitle && otherProps.editedTitle !== title ? otherProps.editedTitle : currentTitle}
          </span>
        )}
        <div className={sort === 'noSort' ? 'antd-sort-icon' : ''} style={{ display: 'inline', paddingLeft: '5px' }}>
          {sort === 'DESC' ? <SortDescendingOutlined onClick={onClick} /> : <SortAscendingOutlined onClick={onClick} />}
        </div>
      </div>
    );
  },
  (prevProps: any, nextProps: any) => {
    return prevProps['@id'] === nextProps['@id'] && prevProps.editedTitle === nextProps.editedTitle;
  },
);

const sortSwap: any = {
  ASC: 'DESC',
  DESC: 'noSort',
  noSort: 'ASC',
};
