import React, { useState, useEffect, FunctionComponent } from 'react';
import { Modal, Row, Col, Button, Typography } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

import { SearchableList } from './SearchableList';

import { FilterType } from './type';
import { JSONSchema6DefinitionForRdfProperty, JsObject } from '@agentlab/sparql-jsld-client';
import { Filter } from './Filter';
import { MstContext } from '../../MstContext';

interface CreateFilterModalProps {
  loading: boolean;
  handleCancel: () => void;
  handleOk: (filter: FilterType | undefined) => void;
  handleAdd: (filter: FilterType | undefined) => void;
  tags: FilterType[];
}

const localeRus = {
  title: 'Создание фильтра',
  add: 'Добавить',
  addAndClose: 'Добавить и закрыть',
  close: 'Отмены',
  artifactType: 'Тип требования',
  emptyFilter: 'Пусто',
  choiceAtribute: 'Выберите атрибут',
  choiceValue: 'Выберите значение',
  resultFilter: 'Итоговый фильтр',
};

export const CreateFilterModal: FunctionComponent<CreateFilterModalProps> = ({
  loading,
  handleCancel,
  handleOk,
  handleAdd,
  tags,
}) => {
  const [filter, setFilter] = useState<FilterType>({
    value: [],
    valueName: [],
    relation: { title: '', predicate: '' },
    property: '',
    title: '',
  });
  const [isValidFilter, setIsValidFilter] = useState<boolean>(false);

  useEffect(() => {
    if (filter && filter.title && filter.property && filter.relation && filter.relation.predicate) {
      if ((filter.relation.title && filter.property !== 'assetFolder') || filter.property === 'assetFolder') {
        if (filter.relation.type !== 'noValue' && (!filter.value || filter.value.length === 0)) {
          setIsValidFilter(false);
        } else {
          setIsValidFilter(true);
        }
      }
    } else {
      setIsValidFilter(false);
    }
  }, [filter]);

  return (
    <Modal
      title={localeRus.title}
      visible
      width='80%'
      onOk={() => handleOk(filter)}
      onCancel={handleCancel}
      footer={[
        <Button key='add' type='primary' loading={loading} onClick={() => handleAdd(filter)} disabled={!isValidFilter}>
          {localeRus.add}
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={() => handleOk(filter)}
          disabled={!isValidFilter}>
          {localeRus.addAndClose}
        </Button>,
        <Button key='back' onClick={handleCancel}>
          {localeRus.close}
        </Button>,
      ]}>
      <CreateFilter
        setFilter={setFilter}
        filter={filter}
        isValidFilter={isValidFilter}
        setIsValidFilter={setIsValidFilter}
        tags={tags}
      />
    </Modal>
  );
};

interface CreateFilterProps {
  setFilter: (newVal: FilterType) => void;
  filter: FilterType;
  isValidFilter: boolean;
  setIsValidFilter: (newVal: boolean) => void;
  tags: FilterType[];
}

const CreateFilter: FunctionComponent<CreateFilterProps> = ({
  setFilter,
  filter,
  isValidFilter,
  setIsValidFilter,
  tags,
}) => {
  const { store } = React.useContext(MstContext);
  const [selectedSchema] = useState<JsObject>();

  // useEffect(() => {
  //   setSelectedSchema(artifactTypes[0]);
  // }, [artifactTypes]);

  const artifactTypeFilterItem = { key: '@type', title: localeRus.artifactType };
  const [selectedFilterType, setSelectedFilterType] = useState<string>(artifactTypeFilterItem.key);
  const [modalIsMount, setModalIsMount] = useState(false);

  const [allProperties, setAllProperties] = useState<{
    properties: { [key: string]: JSONSchema6DefinitionForRdfProperty };
    contexts: JsObject;
  }>({ properties: {}, contexts: {} });

  useEffect(() => {
    const loadProperties = async () => {
      const artifactTypes: JsObject[] = await store.getData('rm:ArtifactClasses');
      const [properties, contexts] = await store.getAllProperties('rm:Artifact');
      if (properties['@id']) {
        delete properties['@id'];
      }
      properties['@type'] = {
        type: 'string',
        enum: artifactTypes.map((schema) => {
          return { value: schema['@id'], alias: schema.title || schema['@id'] };
        }),
        format: 'iri',
        '@id': 'rdf:type',
        title: localeRus.artifactType,
      };
      setAllProperties({ properties, contexts });
    };
    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filterTypes, setFilterTypes] = useState<{ [key: string]: string }[]>([
    { key: '@type', title: localeRus.artifactType },
  ]);

  useEffect(() => {
    const newFilterTypes: { [key: string]: string }[] = [];
    Object.keys(allProperties.properties).forEach((val: string) => {
      if (val !== '@type') {
        newFilterTypes.push({ key: val, title: allProperties.properties[val].title || val });
      }
    });
    setFilterTypes([...filterTypes, ...newFilterTypes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProperties]);

  useEffect(() => {
    setFilter({
      ...filter,
      property: filterTypes[0].key,
      title: filterTypes[0].title,
    });
    setModalIsMount(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseFilter = () => {
    let result = <Typography.Text>{localeRus.emptyFilter}</Typography.Text>;

    if (filter) {
      const { title } = filter;
      const relation = filter.relation ? filter.relation.title : null;
      const value =
        filter.valueName && filter.valueName.length > 0 ? filter.valueName.join(', ') : filter.value.join(', ');

      if (title) {
        result = <Typography.Text>{`${title} ${relation || ''} ${value || ''}`}</Typography.Text>;
      }
    }

    let icon = null;

    if (isValidFilter) {
      icon = <CheckCircleTwoTone style={{ marginLeft: '1em' }} twoToneColor='#52c41a' />;
    } else {
      icon = <ExclamationCircleTwoTone style={{ marginLeft: '1em' }} twoToneColor='#f50' />;
    }

    return (
      <React.Fragment>
        {result}
        {icon}
      </React.Fragment>
    );
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <h3>{localeRus.choiceAtribute}</h3>
          <SearchableList
            defaultSelectedKey={filterTypes[0].key}
            dataSource={filterTypes}
            onClick={(val: any) => {
              setSelectedFilterType(val.key);
              setFilter({ ...filter, property: val.key, title: val.title });
            }}
          />
        </Col>
        <Col span={4} />
        <Col span={10}>
          <h3>{localeRus.choiceValue}</h3>
          {allProperties.properties[selectedFilterType] && (
            <Filter
              filterData={filter}
              setFilter={setFilter}
              prevFilterData={tags.find((tag) => tag.property === selectedFilterType)}
              propName={selectedFilterType}
              property={allProperties.properties[selectedFilterType]}
              context={allProperties.contexts[selectedFilterType]}
              isRequired={
                selectedSchema && selectedSchema.required ? selectedSchema.required.includes(selectedFilterType) : false
              }
              modalIsMount={modalIsMount}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: '1em' }}>
        <Typography.Text strong> {localeRus.resultFilter}: </Typography.Text>
      </Row>
      <Row>
        <Typography.Text>{parseFilter()}</Typography.Text>
      </Row>
    </>
  );
};
