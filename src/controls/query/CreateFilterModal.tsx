/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Row, Col, Button, Typography } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

import { SearchableList } from './SearchableList';

import { FilterType } from './type';
import { JSONSchema7LDPropertyDefinition, JsObject } from '@agentlab/sparql-jsld-client';
import { Filter } from './Filter';
import { MstContext } from '../../MstContext';
import { QueryLocale, QueryIRI } from './Query';

interface CreateFilterModalProps {
  loading: boolean;
  handleCancel: () => void;
  handleOk: (filter: FilterType | undefined) => void;
  handleAdd: (filter: FilterType | undefined) => void;
  tags: FilterType[];
}

export const CreateFilterModal: React.FC<CreateFilterModalProps> = ({
  loading,
  handleCancel,
  handleOk,
  handleAdd,
  tags,
}) => {
  const { store } = useContext(MstContext);
  const locale: QueryLocale = store.getLocaleJs(QueryIRI);
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
      title={locale.title}
      visible
      height='80%'
      width='80%'
      onOk={() => handleOk(filter)}
      onCancel={handleCancel}
      footer={[
        <Button key='add' type='primary' loading={loading} onClick={() => handleAdd(filter)} disabled={!isValidFilter}>
          {locale.add}
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={() => handleOk(filter)}
          disabled={!isValidFilter}>
          {locale.addAndClose}
        </Button>,
        <Button key='back' onClick={handleCancel}>
          {locale.close}
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

const CreateFilter: React.FC<CreateFilterProps> = ({ setFilter, filter, isValidFilter, setIsValidFilter, tags }) => {
  const { store } = useContext(MstContext);
  const locale: QueryLocale = store.getLocaleJs(QueryIRI);
  const [selectedSchema] = useState<JsObject>();

  // useEffect(() => {
  //   setSelectedSchema(artifactTypes[0]);
  // }, [artifactTypes]);

  const artifactTypeFilterItem = { key: '@type', title: locale.artifactType };
  const [selectedFilterType, setSelectedFilterType] = useState<string>(artifactTypeFilterItem.key);
  const [modalIsMount, setModalIsMount] = useState(false);

  const [allProperties, setAllProperties] = useState<{
    properties: { [key: string]: JSONSchema7LDPropertyDefinition };
    contexts: JsObject;
  }>({ properties: {}, contexts: {} });

  useEffect(() => {
    const loadProperties = async () => {
      const artifactTypes: JsObject[] = store.rep.getColl('ArtifactClasses_Coll')?.dataJs || []; //getData('rm:ArtifactClasses');
      const properties = { ...(store.rep.schemas.getOrLoadSchemaByClassIri('rm:Artifact')?.propertiesJs || {}) };
      const contexts = store.rep.schemas.getOrLoadSchemaByClassIri('rm:Artifact')?.['@context'] || {};
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
        title: locale.artifactType,
      };
      setAllProperties({ properties, contexts });
    };
    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filterTypes, setFilterTypes] = useState<{ [key: string]: string }[]>([
    { key: '@type', title: locale.artifactType },
  ]);

  useEffect(() => {
    const newFilterTypes: { [key: string]: string }[] = [];
    Object.keys(allProperties.properties).forEach((val: string) => {
      if (val !== '@type') {
        newFilterTypes.push({ key: val, title: (allProperties.properties[val] as any)?.title || val });
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
    let result = <Typography.Text>{locale.emptyFilter}</Typography.Text>;

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
    <div style={{ height: '100%' }}>
      <Row>
        <Col span={10}>
          <h3>{locale.choiceAttribute}</h3>
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
          <h3>{locale.choiceValue}</h3>
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
        <Typography.Text strong> {locale.resultFilter}: </Typography.Text>
      </Row>
      <Row>
        <Typography.Text>{parseFilter()}</Typography.Text>
      </Row>
    </div>
  );
};
