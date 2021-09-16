import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';
import { PlusOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
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

export const Query: React.FC<FilterByTagProps> = ({
  expanded = false,
  onExpand = () => {},
  addFilter = () => {},
  removeFilter = () => {},
  tags,
  loading = false,
  fullTextSearchString = '',
  setFullTextSearchString = () => {},
}) => {
  const [inputValue, setInputValue] = useState<string>(fullTextSearchString);
  const [tagsArray, setTags] = useState<FilterType[]>([...tags]);
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const inputRef = useRef<Input>(null);

  useEffect(() => {
    let newTags = [...tags];
    const fullTextFilter = tagsArray.find((tag) => tag.title === localeRus.fullTextSearchValue);
    if (fullTextFilter) {
      newTags = newTags.concat(fullTextFilter);
    }
    setTags(newTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

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
          const isLongTag = tag.value.length > 20;

          let tagStyle = {};
          if (isExpanded) {
            tagStyle = {
              width: '100%',
              margin: '5px',
            };
          }
          const tagElem = (
            <Tag style={tagStyle} key={tag.property} closable onClose={() => handleCloseTag(tag)}>
              <b> {tag.title} </b> {tag.relation && <i> {tag.relation.title} </i>}{' '}
              {isLongTag
                ? `${tag.value.slice(0, 20)}...`
                : tag.valueName && tag.valueName.length > 0
                ? tag.valueName.join(', ')
                : tag.value.join(', ')}
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
};

export const defaultTags = [
  {
    property: 'assetFolder',
    title: 'По директории',
    relation: {
      title: '',
      predicate: 'equal',
    },
    value: ['ЧТЗ Управление требованиями.'],
  },
  {
    property: 'type',
    title: 'Тип артефакта',
    relation: {
      title: 'любой из',
      predicate: 'any',
    },
    value: ['Фича'],
  },
  {
    property: 'artifactFormat',
    title: 'Формат',
    relation: {
      title: '',
      predicate: 'equal',
    },
    value: ['Модуль'],
  },
];
