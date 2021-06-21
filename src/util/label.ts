/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { startCase } from 'lodash-es';

//import { ControlElement, LabelDescription } from '../models/uischema';
import { JsonSchema7 as JsonSchema } from '../models/jsonSchema7';

const deriveLabel = (controlElement: any /*ControlElement*/, schemaElement?: JsonSchema): string => {
  if (schemaElement && typeof schemaElement.title === 'string') {
    return schemaElement.title;
  }
  if (typeof controlElement.scope === 'string') {
    const ref = controlElement.scope;
    const label = ref.substr(ref.lastIndexOf('/') + 1);

    return startCase(label);
  }

  return '';
};

export const createCleanLabel = (label: string): string => {
  return startCase(label.replace('_', ' '));
};

/**
 * Return a label object based on the given control and schema element.
 * @param {ControlElement} withLabel the UI schema to obtain a label object for
 * @param {JsonSchema} schema optional: the corresponding schema element
 * @returns {LabelDescription}
 */
export const createLabelDescriptionFrom = (
  withLabel: any /*ControlElement*/,
  schema?: JsonSchema,
): any /*LabelDescription*/ => {
  const labelProperty = withLabel.label;
  if (typeof labelProperty === 'boolean') {
    return labelDescription(deriveLabel(withLabel, schema), labelProperty);
  }
  if (typeof labelProperty === 'string') {
    return labelDescription(labelProperty, true);
  }
  if (typeof labelProperty === 'object') {
    const label = typeof labelProperty.text === 'string' ? labelProperty.text : deriveLabel(withLabel, schema);
    const show = typeof labelProperty.show === 'boolean' ? labelProperty.show : true;
    return labelDescription(label, show);
  }
  return labelDescription(deriveLabel(withLabel, schema), true);
};

const labelDescription = (text: string, show: boolean): any /*LabelDescription*/ => ({
  text: text,
  show: show,
});
