/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';
import { PlusOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { JsObject } from '@agentlab/sparql-jsld-client';

import { MstContext } from '../../MstContext';
import { processViewKindOverride } from '../../Form';
import { rankWith, RankedTester, uiTypeIs } from '../../testers';

import { CreateFilterModal } from './CreateFilterModal';
import { FilterType } from './type';

const localeRus = {
  add: 'Добавить',
  fullTextSearchValue: 'Содержит текст',
};

interface FilterByTagProps {
  expanded?: boolean;
  onExpand?: (isExpand?: boolean) => void;
  addFilter?: (filter: any, location?: string) => void;
  removeFilter?: (filter: any) => void;
  tags: FilterType[];
  loading?: boolean;
  fullTextSearchString?: string;
  setFullTextSearchString?: (newVal: string) => void;
}

export const AntQueryWithStore = observer<any>((props) => {
  const { viewKind, viewDescr, schema } = props;

  const { store } = useContext(MstContext);
  const fullTextSearchString = store.fullTextSearchString;
  const setFullTextSearchString = (newValue: string) => {
    store.fullTextSearchString = newValue;
  };

  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );

  const coll = store.rep.getColl(collIriOverride);
  const conditionsJs = coll?.collConstr.entConstrs[0].conditionsJs;

  const loading = false;
  const onExpand = (isExpand?: boolean) => {};
  const addFilter = (filter: JsObject, location?: string) => {};
  const removeFilter = (filter: JsObject) => {
    if (filter?.property && filter?.relation) {
      store.editConn(
        { toObj: collIriOverride, toProp: filter.property },
        { value: filter.value, relation: filter.relation.predicate },
      );
    } else if (filter?.property) {
      store.editConn({ toObj: collIriOverride, toProp: filter.property }, filter.value);
    }
  };

  const [inputValue, setInputValue] = useState<string>(fullTextSearchString);
  const [tagsArray, setTags] = useState<FilterType[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const inputRef = useRef<Input>(null);

  useEffect(() => {
    let tags: FilterType[] = [];
    const filters: any = {};
    if (conditionsJs) {
      Object.keys(conditionsJs).forEach((k) => {
        if (k !== '@id' && k !== '@type') {
          let value = conditionsJs[k];
          let valueName: any[] = [];
          if (typeof value === 'object' && value['@id'] !== undefined && value['@type'] !== undefined) {
            valueName = [value.title];
            value = value['@id'];
          }
          const newFilter = {
            title: schema.properties[k].title,
            property: k,
            relation: { title: '', predicate: 'equal', type: 'singleString' },
            value,
            valueName,
          };
          filters[k] = newFilter;
        }
      });
      tags = Object.values(filters);
    }

    const fullTextFilter = tagsArray.find((tag) => tag.title === localeRus.fullTextSearchValue);
    if (fullTextFilter) {
      tags = tags.concat(fullTextFilter);
    }
    setTags(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionsJs]);

  const handleCloseTag = (removedTag: any) => {
    if (removedTag.property && removedTag.title !== localeRus.fullTextSearchValue) {
      removeFilter(removedTag);
    } else {
      const newTags = tagsArray.filter((tag) => tag.title !== localeRus.fullTextSearchValue);
      setTags(newTags);
      setFullTextSearchString('');
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleAddFilter = (filter: any) => {
    if (filter.property === 'assetFolder') {
      addFilter(filter, 'front');
    } else {
      addFilter(filter);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputConfirm = () => {
    let newTags = tagsArray;
    if (inputValue) {
      newTags = [
        ...newTags.filter((tag) => tag.title !== localeRus.fullTextSearchValue),
        {
          title: localeRus.fullTextSearchValue,
          value: [inputValue],
          property: 'search',
          relation: {
            predicate: 'contains',
            title: '',
          },
        },
      ];
      setFullTextSearchString(inputValue);
    }
    setTags(newTags);
    // setInputVisible(false);
    setInputValue('');
  };
  return (
    <div>
      {tagsArray &&
        tagsArray.map((tag) => {
          let tagStyle = {};
          if (isExpanded) {
            tagStyle = {
              width: '100%',
              margin: '5px',
            };
          }
          const value =
            tag.valueName && tag.valueName.length > 0
              ? tag.valueName.join(', ')
              : Array.isArray(tag.value)
                ? tag.value.join(', ')
                : tag.value;
          const isLongTag = value.length > 200;
          const tagElem = (
            <Tag style={tagStyle} key={tag.property} closable onClose={() => handleCloseTag(tag)}>
              <b> {tag.title} </b> {tag.relation && <i> {tag.relation.title} </i>}{' '}
              {isLongTag ? `${value.slice(0, 20)}...` : value}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag.toString()} key={tag.toString()}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      <Input
        ref={inputRef}
        type='text'
        size='small'
        style={{ width: 78, margin: '8px' }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
      <Tag onClick={showModal} style={{ background: '#fff', borderStyle: 'dashed' }}>
        <PlusOutlined /> {localeRus.add}
      </Tag>

      {modalVisible && (
        <CreateFilterModal
          loading={loading}
          handleCancel={() => hideModal()}
          handleOk={(filter) => {
            if (filter) {
              handleAddFilter(filter);
            }
            hideModal();
          }}
          handleAdd={(filter) => {
            if (filter) {
              handleAddFilter(filter);
            }
          }}
          tags={tagsArray}
        />
      )}

      {tagsArray &&
        (!isExpanded ? (
          <Button
            icon={<DownOutlined />}
            size='small'
            onClick={() => {
              onExpand(true);
              setIsExpanded(true);
            }}
          />
        ) : (
          <Button
            icon={<UpOutlined />}
            size='small'
            onClick={() => {
              onExpand(false);
              setIsExpanded(false);
            }}
          />
        ))}
    </div>
  );
});

export const antdQueryTester: RankedTester = rankWith(2, uiTypeIs('aldkg:Query'));
