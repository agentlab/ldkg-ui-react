import type { Locale } from '.';
import { ArrayIRI, SaveReqDialogIRI } from '..';
import { QueryFormIRI, QueryIRI } from '../controls';
import { FormLayoutIRI } from '../layouts';

export const enUS: Locale = {
  locale: 'en_US',
  [ArrayIRI]: {
    btnCancel: 'Cancel',
    btnSave: 'Save',
    columnSettings: 'Column settings',
    extSettings: 'Extended settings',
  },
  [FormLayoutIRI]: {
    btnCancel: 'Cancel',
    btnSave: 'Save',
  },
  [QueryFormIRI]: {
    searchBtnTitle: 'Search',
  },
  [QueryIRI]: {
    add: 'Add',
    addAndClose: 'Add and Close',
    artifactType: 'Artifact Type',
    close: 'Close',
    emptyFilter: 'Empty Filter',
    choiceAttribute: 'Select an attribute',
    choiceValue: 'Select a value',
    resultFilter: 'Result Filter',
    title: 'Filter constructor',
    fullTextSearchValue: 'Contains text',
    daysAgo: 'Days ago',
    monthsAgo: 'Months ago',
    yearsAgo: 'Years ago',
    today: 'Today',
    yesterday: 'Yesterday',
    date: 'Date',
  },
  [SaveReqDialogIRI]: {
    btnCancel: 'Cancel',
    btnOK: 'OK',
    unsavedDescr: 'There are unsaved changes! If you press Ok, you discard all changes!',
    unsavedTitle: 'Unsaved changes',
  },
};
