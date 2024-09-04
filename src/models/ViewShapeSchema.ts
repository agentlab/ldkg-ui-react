/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { JSONSchema7LD } from '@agentlab/sparql-jsld-client';

export const ViewShapeSchema: JSONSchema7LD = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'aldkg:ViewShape',
  '@type': 'sh:NodeShape',
  title: 'View Shape',
  description: 'Artifact Shape',
  targetClass: 'aldkg:ViewDescr',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Class',
      type: 'string',
      format: 'iri',
    },
  },
  required: ['@id', '@type'],
};

export const ViewKindShapeSchema: JSONSchema7LD = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'aldkg:ViewShape',
  '@type': 'sh:NodeShape',
  title: 'View Shape',
  description: 'Artifact Shape',
  targetClass: 'aldkg:ViewDescr',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Class',
      type: 'string',
      format: 'iri',
    },
  },
  required: ['@id', '@type'],
};
