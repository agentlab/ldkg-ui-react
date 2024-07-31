/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { find, includes, isEmpty } from 'lodash-es';

import { JsonSchema7 } from './models/jsonSchema7';
import { IViewKindElement } from './models/uischema';

/**
 * Constant that indicates that a tester is not capable of handling
 * a combination of schema/data.
 * @type {number}
 */
export const NOT_APPLICABLE = -1;
/**
 * A tester is a function that receives an UI schema and a JSON schema and returns a boolean.
 */
export type Tester = (viewKindElement: IViewKindElement, schema: JsonSchema7) => boolean;

/**
 * A tester that allow composing other testers by && them.
 *
 * @param {Array<Tester>} testers the testers to be composed
 */
export const and =
  (...testers: Tester[]): Tester =>
  (viewKindElement: IViewKindElement, schema: JsonSchema7) =>
    testers.reduce<boolean>((acc, tester) => acc && tester(viewKindElement, schema), true);

/**
 * A tester that allow composing other testers by || them.
 *
 * @param {Array<Tester>} testers the testers to be composed
 */
export const or =
  (...testers: Tester[]): Tester =>
  (viewKindElement: IViewKindElement, schema: JsonSchema7) =>
    testers.reduce<boolean>((acc, tester) => acc || tester(viewKindElement, schema), false);

/**
 * Create a ranked tester that will associate a number with a given tester, if the
 * latter returns true.
 *
 * @param {number} rank the rank to be returned in case the tester returns true
 * @param {Tester} tester a tester
 */
export const rankWith =
  (rank: number, tester: Tester) =>
  (viewKindElement: IViewKindElement, schema: JsonSchema7): number => {
    if (tester(viewKindElement, schema)) {
      return rank;
    }

    return NOT_APPLICABLE;
  };

/**
 * Checks whether the given UI schema has the expected type.
 *
 * @param {string} expected the expected UI schema type
 */
export const uiTypeIs =
  (expected: string): Tester =>
  (viewKindElement: IViewKindElement): boolean =>
    !isEmpty(viewKindElement) && viewKindElement['@type'] === expected;

/**
 * Checks whether the given UI schema has an option with the given
 * name and whether it has the expected value. If no options property
 * is set, returns false.
 *
 * @param {string} optionName the name of the option to check
 * @param {any} optionValue the expected value of the option
 */
export const optionIs =
  (optionName: string, optionValue: any): Tester =>
  (viewKindElement: IViewKindElement): boolean => {
    if (isEmpty(viewKindElement)) {
      return false;
    }

    const options = (viewKindElement as any).options;
    return !isEmpty(options) && options[optionName] === optionValue;
  };

/**
 * A ranked tester associates a tester with a number.
 */
export declare type RankedTester = (viewKindElement: IViewKindElement, schema: JsonSchema7) => number;

export const hasType = (jsonSchema: JsonSchema7, expected: string): boolean => {
  return includes(deriveTypes(jsonSchema), expected);
};

/**
 * Derives the type of the jsonSchema element
 */
const deriveTypes = (jsonSchema: JsonSchema7): string[] => {
  if (isEmpty(jsonSchema)) {
    return [];
  }
  if (!isEmpty(jsonSchema.type) && typeof jsonSchema.type === 'string') {
    return [jsonSchema.type];
  }
  if (Array.isArray(jsonSchema.type)) {
    return jsonSchema.type;
  }
  if (!isEmpty(jsonSchema.properties) || !isEmpty(jsonSchema.additionalProperties)) {
    return ['object'];
  }
  if (!isEmpty(jsonSchema.items)) {
    return ['array'];
  }

  if (!isEmpty(jsonSchema.allOf)) {
    const allOfType = find(jsonSchema.allOf, (schema: JsonSchema7) => deriveTypes(schema).length !== 0);

    if (allOfType) {
      return deriveTypes(allOfType);
    }
  }
  // ignore all remaining cases
  return [];
};

/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and applies
 * the given predicate
 *
 * @param {(JsonSchema) => boolean} predicate the predicate that should be
 *        applied to the resolved sub-schema
 */
export const schemaMatches =
  (predicate: (schema: JsonSchema7) => boolean): Tester =>
  (viewKindElement: IViewKindElement, schema: JsonSchema7): boolean => {
    if (isEmpty(viewKindElement) /*|| !isControl(uischema)*/) {
      return false;
    }
    if (isEmpty(schema)) {
      return false;
    }
    //const schemaPath = uischema.scope;
    //if (isEmpty(schemaPath)) {
    //  return false;
    //}
    const currentDataSchema = schema;
    //if (hasType(schema, 'object')) {
    //  currentDataSchema = resolveSchema(schema, schemaPath);
    //}
    //if (currentDataSchema === undefined) {
    //  return false;
    //}

    return predicate(currentDataSchema);
  };

/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and checks
 * whether the type of the sub-schema matches the expected one.
 *
 * @param {string} expectedType the expected type of the resolved sub-schema
 */
export const schemaTypeIs = (expectedType: string): Tester =>
  schemaMatches((schema) => !isEmpty(schema) && hasType(schema, expectedType));

/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and checks
 * whether the format of the sub-schema matches the expected one.
 *
 * @param {string} expectedFormat the expected format of the resolved sub-schema
 */
export const formatIs = (expectedFormat: string): Tester =>
  schemaMatches((schema) => !isEmpty(schema) && schema.format === expectedFormat && schema.type === 'string');

/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has a 'date' format.
 * @type {Tester}
 */
export const isDateControl = /*and(uiTypeIs('aldkg:Control'),*/ formatIs('date' /*)*/);

/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has a 'date-time' format.
 * @type {Tester}
 */
export const isDateTimeControl = /*and(uiTypeIs('aldkg:Control'),*/ formatIs('date-time' /*)*/);

/**
 * Default tester for boolean.
 * @type {RankedTester}
 */
export const isBooleanControl = /*and(uiTypeIs('aldkg:Control'),*/ schemaTypeIs('boolean' /*)*/);

export const isEnumControl =
  /*and(
  uiTypeIs('aldkg:Control'),*/
  or(
    schemaMatches((schema) => schema.enum !== undefined),
    schemaMatches((schema) => schema.const !== undefined),
    /*),*/
  );

/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type integer
 * @type {Tester}
 */
export const isIntegerControl = /*and(uiTypeIs('aldkg:Control'),*/ schemaTypeIs('integer' /*)*/);

/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type number
 * @type {Tester}
 */
export const isNumberControl = /*and(uiTypeIs('aldkg:Control'),*/ schemaTypeIs('number' /*)*/);

/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type string
 * @type {Tester}
 */
export const isStringControl = /*and(uiTypeIs('aldkg:Control'),*/ schemaTypeIs('string' /*)*/);

/**
 * Tests whether a given UI schema is of type Control,
 * if the schema is of type number or integer and
 * whether the schema defines a numerical range with a default value.
 * @type {Tester}
 */
export const isRangeControl = and(
  /*uiTypeIs('aldkg:Control'),*/
  or(schemaTypeIs('number'), schemaTypeIs('integer')),
  schemaMatches(
    (schema) => schema.maximum !== undefined && schema.minimum !== undefined && schema.default !== undefined,
  ),
  optionIs('slider', true),
);
