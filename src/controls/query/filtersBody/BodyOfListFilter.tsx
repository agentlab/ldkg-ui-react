import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Tree } from 'antd';
import { JSONSchema7LDPropertyDefinition, JsObject } from '@agentlab/sparql-jsld-client';
import { ValueOfFilter } from '../type';
import { MstContext } from '../../../MstContext';

function renderTreeNode(listOfValues: string[], searchValue: string) {
  return listOfValues.map((value, index) => {
    let foundIndex = -1;
    let beforeStr = '';
    let middleStr = '';
    let afterStr = '';
    let title: JSX.Element | string;
    if (searchValue !== '') {
      foundIndex = value.toLowerCase().indexOf(searchValue);

      if (foundIndex !== -1) {
        beforeStr = value.substr(0, foundIndex);
        middleStr = value.substr(foundIndex, searchValue.length);
        afterStr = value.substr(foundIndex + searchValue.length);
        title = (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{middleStr}</span>
            {afterStr}
          </span>
        );
      } else {
        title = '';
      }
    } else {
      title = <span>{value}</span>;
    }

    return {
      title,
      key: index.toString(),
    };
    // return <Tree.TreeNode title={title} key={index.toString()} active={true} />;
  });
}

const localeRus = {
  searchValues: 'Поиск значения',
};

interface BodyOfListFilterProps {
  handleChange: (value: JsObject) => void;
  defaultValues: ValueOfFilter;
  property: JSONSchema7LDPropertyDefinition;
  context: JsObject | string;
  type?: string;
}

export const BodyOfListFilter: React.FC<BodyOfListFilterProps> = ({
  handleChange,
  defaultValues,
  property,
  context,
  type,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [listOfAliasOfEnum, setListOfAliasOfEnum] = useState<string[]>([]);
  const [listOfValuesOfEnum, setListOfValuesOfEnum] = useState<any[]>([]);
  const [valuesIsLoad, setValuesIsLoad] = useState<boolean>(true);

  const { store } = React.useContext(MstContext);

  useEffect(() => {
    const loadEnumValues = async (iri: string) => {
      const values = await store.getData(iri);
      setListOfValuesOfEnum(values.map((val: JsObject) => val['@id']));
      setListOfAliasOfEnum(values.map((val: JsObject) => val.title || val.name));
      setValuesIsLoad(true);
    };
    setValuesIsLoad(false);
    if (context !== undefined && typeof context === 'object' && context['@type'] !== undefined) {
      loadEnumValues(context['@type']);
    } else if (
      context === 'rdf:type' &&
      property.enum !== undefined &&
      property.enum.length > 0 &&
      typeof property.enum[0] === 'object'
    ) {
      setListOfValuesOfEnum(property.enum.map((item) => item && (item as any).value));
      setListOfAliasOfEnum(property.enum.map((item) => item && (item as any).alias));
      setValuesIsLoad(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);

  const findKeysItemByValueNames = (values: any[]): string[] => {
    const keys: string[] = [];
    listOfValuesOfEnum.forEach((val, index) => {
      if (values.includes(val)) {
        keys.push(index.toString());
      }
    });
    return keys;
  };

  const searchValueInTree = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  };

  useEffect(() => {
    setCheckedKeys(findKeysItemByValueNames(defaultValues.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, listOfValuesOfEnum]);

  if (type === 'enumerate') {
    return (
      <div style={{ height: '300px', overflow: 'auto' }}>
        <Input.Search placeholder={localeRus.searchValues} style={{ marginTop: 15 }} onChange={searchValueInTree} />
        {valuesIsLoad && (property.type === 'object' || (property.type === 'string' && property.format === 'iri')) && (
          <Tree
            style={{ marginTop: 15 }}
            checkable
            checkedKeys={checkedKeys}
            treeData={renderTreeNode(listOfAliasOfEnum || listOfValuesOfEnum, searchValue)}
            onCheck={(keys: any): void => {
              setCheckedKeys(keys as string[]);
              if ((keys as string[]).length > 0) {
                handleChange({
                  value: (keys as string[]).map((key) => listOfValuesOfEnum[parseInt(key)]),
                  valueName: listOfAliasOfEnum ? (keys as string[]).map((key) => listOfAliasOfEnum[parseInt(key)]) : [],
                });
              } else {
                handleChange({ value: [], valueName: [] });
              }
            }}
          />
        )}
      </div>
    );
  }
  return <></>;
};
