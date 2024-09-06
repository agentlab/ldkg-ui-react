import type { Locale } from '.';
import { ArrayIRI, SaveReqDialogIRI } from '..';
import { QueryFormIRI, QueryIRI } from '../controls';
import { FormLayoutIRI } from '../layouts';
import { enUS } from './en_US';

export const ruRU: Locale = {
  ...enUS,
  locale: 'ru_RU',
  [ArrayIRI]: {
    btnCancel: 'Отмена',
    btnSave: 'Сохранить',
    columnSettings: 'Настройка колонок',
    extSettings: 'Дополнительно',
  },
  [FormLayoutIRI]: {
    btnCancel: 'Отмена',
    btnSave: 'Сохранить',
  },
  [QueryFormIRI]: {
    searchBtnTitle: 'Искать',
  },
  [QueryIRI]: {
    add: 'Добавить',
    addAndClose: 'Добавить и закрыть',
    artifactType: 'Тип требования',
    close: 'Отмена',
    emptyFilter: 'Пусто',
    choiceAttribute: 'Выберите атрибут',
    choiceValue: 'Выберите значение',
    resultFilter: 'Итоговый фильтр',
    title: 'Создание фильтра',
    fullTextSearchValue: 'Содержит текст',
    daysAgo: 'Дней назад',
    monthsAgo: 'Месяцев назад',
    yearsAgo: 'Лет назад',
    today: 'Сегодня',
    yesterday: 'Вчера',
    date: 'Дата',
  },
  [SaveReqDialogIRI]: {
    btnCancel: 'Отмена',
    btnOK: 'ОК',
    unsavedDescr: 'Имеются несохраненные изменения! Нажав на кнопку Ок вы сбросите все изменения!',
    unsavedTitle: 'Несохраненные изменения',
  },
};
