import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Col, Select, Typography } from 'antd';
import { FilterType, Relation, ValueOfFilter } from './type';
import { JSONSchema6DefinitionForRdfProperty, JsObject } from '@agentlab/sparql-jsld-client';
import moment from 'moment';
import { JSONSchema6, JSONSchema6Definition } from 'json-schema';
import { BodyOfListFilter } from './filtersBody/BodyOfListFilter';
import { BodyOfIntegerFilter } from './filtersBody/BodyOfIntegerFilter';
import { BodyOfDateTimeFilter } from './filtersBody/BodyOfDateTimeFilter';
import { BodyOfStringFilter } from './filtersBody/BodyOfStringFilter';

export const genFormattedTypeName = (propName: string, type?: string, format?: string): string => {
  let resultType = 'iri';

  if (propName === 'assetFolder') {
    return 'assetFolder';
  }

  if (type === 'integer') {
    resultType = 'integer';
  } else if (type === 'string') {
    if (format === 'date-time') {
      resultType = 'date-time';
    } else if (format === 'iri') {
      resultType = 'object';
    } else {
      resultType = 'string';
    }
  } else if (type === 'object') {
    resultType = 'object';
  } else {
    resultType = 'iri';
  }

  // if (resultType === 'iri' && propName === 'assetFolder') {
  //   resultType = 'assetFolder';
  // }

  return resultType;
};

interface TypeOfFilter {
  type: string;
  isArray: boolean;
}

export const genFormattedTypeOfFilter = (
  propName: string,
  property: JSONSchema6DefinitionForRdfProperty,
): TypeOfFilter => {
  const formattedType: TypeOfFilter = {
    type: 'none',
    isArray: false,
  };

  if (property.type === 'array' && property.items) {
    formattedType.isArray = true;

    const items = property.items as JSONSchema6Definition as JSONSchema6;
    formattedType.type = genFormattedTypeName(propName, items.type as string, items.format);
  } else {
    formattedType.type = genFormattedTypeName(propName, property.type as string, property.format);
  }

  return formattedType;
};

export const equalTypesOfRelations = (typeA?: string, typeB?: string): boolean => {
  const keyWord = 'hidden';

  let indexOfKeyword = typeA && typeA.indexOf(keyWord) !== -1 ? typeA.indexOf(keyWord) + keyWord.length : 0;
  const firstType = typeA && typeA.substring(indexOfKeyword);

  indexOfKeyword = typeB && typeB.indexOf(keyWord) !== -1 ? typeB.indexOf(keyWord) + keyWord.length : 0;
  const secondType = typeB && typeB.substring(indexOfKeyword);

  return firstType === secondType;
};

export const getTypeOfRelation = (currentRelations: Relation[], nameOfSelectRelation: string): string | undefined => {
  const foundRelation = currentRelations.find((relation: Relation) => relation.predicate === nameOfSelectRelation);

  return foundRelation && foundRelation.type;
};

const localeRus = {
  contains: 'содержит',
  notContains: 'не содержит',
  equal: 'равняется',
  startWith: 'начинается с',
  endWith: 'заканчивается на',
  regEx: 'регулярное выражение',
  exists: 'сущестует',
  notExists: 'не сущестует',
  unassigned: 'не назначен',
  any: 'любой из',
  notAny: 'ни один из',
  each: 'каждый из',
  notEach: 'все кроме',
  dateEqual: 'в',
  dateNotEqual: 'не в',
  after: 'после (включая)',
  before: 'до (включая)',
  between: 'между',
  today: 'Сегодня',
  fromYesterdayToToday: 'Со вчера на сегодня',
};

interface FilterProp {
  filterData: FilterType;
  setFilter: (filter: FilterType) => void;
  prevFilterData?: FilterType;
  propName: string;
  property: JSONSchema6DefinitionForRdfProperty;
  context: JsObject;
  isRequired: boolean;
  modalIsMount?: boolean;
}

export const Filter: FunctionComponent<FilterProp> = ({
  filterData,
  setFilter,
  prevFilterData,
  propName,
  property,
  context,
  isRequired,
  modalIsMount = false,
}) => {
  const relations: { [key: string]: Relation[] } = {
    object: [
      { title: localeRus.any, predicate: 'any', type: 'enumerate' },
      { title: localeRus.notAny, predicate: 'notAny', type: 'enumerate' },
    ],
    array: [
      { title: localeRus.any, predicate: 'any', type: 'enumerate' },
      { title: localeRus.notAny, predicate: 'notAny', type: 'enumerate' },
      { title: localeRus.each, predicate: 'each', type: 'enumerate' },
      { title: localeRus.notEach, predicate: 'notEach', type: 'enumerate' },
    ],
    string: [
      { title: localeRus.contains, predicate: 'contains', type: 'singleString' },
      { title: localeRus.notContains, predicate: 'notContains', type: 'singleString' },
      { title: localeRus.equal, predicate: 'equal', type: 'singleString' },
      { title: localeRus.startWith, predicate: 'startWith', type: 'singleString' },
      { title: localeRus.endWith, predicate: 'endWith', type: 'singleString' },
      { title: localeRus.regEx, predicate: 'regEx', type: 'regEx' },
    ],
    'date-time': [
      { title: localeRus.dateEqual, predicate: 'equal', type: 'singleDate' },
      { title: localeRus.dateNotEqual, predicate: 'notEqual', type: 'singleDate' },
      { title: localeRus.after, predicate: 'after', type: 'chooseVariant' },
      { title: localeRus.before, predicate: 'before', type: 'chooseVariant' },
      { title: localeRus.between, predicate: 'between', type: 'twoDate' },
    ],
    integer: [
      { title: localeRus.equal, predicate: 'equal', type: 'singleNumber' },
      { title: localeRus.any, predicate: 'any', type: 'hiddenSingleNumber' },
    ],
    isNotRequired: [
      { title: localeRus.exists, predicate: 'exists', type: 'noValue' },
      { title: localeRus.notExists, predicate: 'notExists', type: 'noValue' },
      // { title: t('CreateFilter.unassigned'), predicate: 'unassigned', type: 'noValue' },
    ],
    assetFolder: [{ title: '', predicate: 'equal', type: 'singleString' }],
    noRelations: [{ title: localeRus.equal, predicate: 'equal', type: 'singleString' }],
  };

  const getDefaultValue = (
    typeOfFilter: TypeOfFilter,
    prevFilter?: FilterType,
    typeOfCurrentRelation?: string,
    typeOfPrevRelation?: string,
  ): ValueOfFilter => {
    let defaultValue: ValueOfFilter = { value: [], valueName: [] };

    if (typeOfFilter.type === 'date-time') {
      if (equalTypesOfRelations(typeOfCurrentRelation, 'twoDate')) {
        defaultValue = {
          value: [moment().subtract(1, 'days'), moment()],
          valueName: [localeRus.fromYesterdayToToday],
        };
      } else {
        defaultValue = {
          value: [moment()],
          valueName: [localeRus.today],
        };
      }
    } else if (typeOfFilter.type === 'integer') {
      defaultValue = { value: [0] };
    }

    if (prevFilter) {
      if (typeOfPrevRelation && equalTypesOfRelations(typeOfPrevRelation, typeOfCurrentRelation)) {
        defaultValue.value = prevFilter.value;
        defaultValue.valueName = prevFilter.valueName || [];

        if (typeOfFilter.type === 'date-time') {
          defaultValue.value = prevFilter.value.map((value) => moment(value, 'YYYY-MM-DDThh:mm:ss'));
        }
      }
    }

    if (typeOfCurrentRelation && equalTypesOfRelations(typeOfCurrentRelation, 'noValue')) {
      defaultValue = { value: [], valueName: [] };
    }

    return defaultValue;
  };

  const getDefaultRelation = (currentRelations: Relation[], prevRelation?: Relation): Relation => {
    let defaultRelation = currentRelations[0];

    if (prevRelation) {
      const foundRelation = currentRelations.find(
        (relation: Relation) => relation.predicate === prevRelation.predicate,
      );
      if (foundRelation) {
        defaultRelation = {
          title: foundRelation.title,
          predicate: prevRelation.predicate,
          type: foundRelation.type,
        };
      }
    }

    return defaultRelation;
  };

  const getCurrentRelations = (typeOfFilter: TypeOfFilter, isRequired: boolean): Relation[] => {
    let currentRelations: Relation[];
    if (typeOfFilter.isArray) {
      currentRelations = relations['array'];
    } else {
      currentRelations = relations[typeOfFilter.type] || relations['noRelations'];
    }

    if (!isRequired) {
      currentRelations = currentRelations.concat(relations['isNotRequired']);
    }

    return currentRelations;
  };

  const typeOfFilter = genFormattedTypeOfFilter(propName, property);
  const currentRelations = getCurrentRelations(typeOfFilter, isRequired);
  const prevRelation = prevFilterData && prevFilterData.relation;
  const prevRelationType = prevRelation && getTypeOfRelation(currentRelations, prevRelation.predicate);

  const [defaultRelation, setDefaultRelation] = useState<Relation>(getDefaultRelation(currentRelations, prevRelation));
  const [defaultValues, setDefaultValues] = useState<ValueOfFilter>(
    getDefaultValue(typeOfFilter, prevFilterData, defaultRelation.type, prevRelationType),
  );

  useEffect(() => {
    const newRelation = getDefaultRelation(currentRelations, prevRelation);
    const newValue = getDefaultValue(typeOfFilter, prevFilterData, newRelation.type, prevRelationType);
    setDefaultRelation(newRelation);
    setDefaultValues(newValue);
    setFilter({
      ...filterData,
      relation: newRelation,
      value: newValue.value,
      valueName: newValue.valueName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propName]);

  useEffect(() => {
    setFilter({
      ...filterData,
      relation: defaultRelation,
      value: defaultValues.value,
      valueName: defaultValues.valueName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsMount]);

  const handleChangeRelation = (changedRelation: Relation): void => {
    if (changedRelation && changedRelation.predicate !== filterData.relation.predicate) {
      let newValue = getDefaultValue(typeOfFilter, prevFilterData, changedRelation.type, prevRelationType);

      if (
        filterData.relation &&
        changedRelation &&
        equalTypesOfRelations(filterData.relation.type, changedRelation.type)
      ) {
        newValue = { value: filterData.value, valueName: filterData.valueName };
      } else {
        setDefaultValues(newValue);
      }

      setFilter({
        ...filterData,
        relation: changedRelation,
        value: newValue.value,
        valueName: newValue.valueName,
      });

      setDefaultRelation(changedRelation);
    }
  };

  return (
    <>
      <Row style={{ marginTop: '20px' }}>
        <Col span={12}>
          <div>
            <b> {property.title} </b>{' '}
          </div>
        </Col>
        {currentRelations.filter((rel) => rel.type && !rel.type.startsWith('hidden')).length > 1 ? (
          <Col span={12}>
            <Select
              style={{ minWidth: '120px' }}
              value={defaultRelation.predicate}
              onChange={(selectRelName: string) => {
                const newRelation = currentRelations.find((rel) => rel.predicate === selectRelName);

                if (newRelation) {
                  handleChangeRelation(newRelation);
                }
              }}>
              {currentRelations
                .filter((option) => {
                  return option.type && !option.type.startsWith('hidden');
                })
                .map((option) => {
                  return (
                    <Select.Option key={option.predicate} value={option.predicate}>
                      {option.title}
                    </Select.Option>
                  );
                })}
            </Select>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      {propName === '@type' ? (
        <BodyOfListFilter
          handleChange={(value: JsObject) => {
            setFilter({ ...filterData, value: value.value, valueName: value.valueName });
          }}
          defaultValues={defaultValues}
          property={property}
          context={context}
          type={defaultRelation.type}
        />
      ) : // ) : typeOfFilter.type === 'assetFolder' ? (
      // <BodyOfFolderFilter
      //   handleChange={(value: JsObject) => {
      //     setFilter({ ...filterData, value: value.value, valueName: value.valueName });
      //   }}
      //   defaultValues={defaultValues}
      // />
      typeOfFilter.type === 'object' ? (
        <BodyOfListFilter
          handleChange={(value: JsObject) => {
            setFilter({ ...filterData, value: value.value, valueName: value.valueName });
          }}
          defaultValues={defaultValues}
          property={property}
          context={context}
          type={defaultRelation.type}
        />
      ) : typeOfFilter.isArray ? (
        <>
          <Typography.Title>
            <b>{defaultValues.valueName}</b>
          </Typography.Title>
          <Typography.Title>{defaultValues.value.toString()}</Typography.Title>
        </>
      ) : typeOfFilter.type === 'integer' ? (
        <BodyOfIntegerFilter
          handleChange={(value: JsObject) => {
            setFilter({ ...filterData, ...value });
          }}
          defaultValues={defaultValues}
          type={defaultRelation.type}
        />
      ) : typeOfFilter.type === 'date-time' ? (
        <BodyOfDateTimeFilter
          handleChange={(value: JsObject) => {
            setFilter({ ...filterData, ...value });
          }}
          defaultValues={defaultValues}
          type={defaultRelation.type}
        />
      ) : (
        <BodyOfStringFilter
          handleChange={(value: JsObject) => {
            setFilter({ ...filterData, value: value.value, valueName: value.valueName });
          }}
          defaultValues={defaultValues}
          type={defaultRelation.type}
        />
      )}
    </>
  );
};
