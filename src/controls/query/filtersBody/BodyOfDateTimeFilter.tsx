/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Radio, InputNumber } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

import { ValueOfFilter } from '../type';

const localeRus = {
  daysAgo: 'Дней назад',
  monthsAgo: 'Месяцев назад',
  yearsAgo: 'Лет назад',
  today: 'Сегодня',
  yesterday: 'Вчера',
  date: 'Дата',
};

interface BodyOfDateTimeFilterProps {
  handleChange: (value: any) => void;
  defaultValues: ValueOfFilter;
  type?: string;
}

export const BodyOfDateTimeFilter: React.FC<BodyOfDateTimeFilterProps> = ({ handleChange, defaultValues, type }) => {
  const timeValue = [localeRus.daysAgo, localeRus.monthsAgo, localeRus.yearsAgo];

  const [checkedOption, setCheckedOption] = useState<number | null>(null);
  const [firstValueInThreeVariant, setFirstValueInThreeVariant] = useState<string | null>(null);
  const [secondValueInThreeVariant, setSecondValueInThreeVariant] = useState<string>(timeValue[0]);

  useEffect(() => {
    let newValue: any = {};
    if (firstValueInThreeVariant && secondValueInThreeVariant) {
      let timeOption: dayjs.ManipulateType = 'days';
      if (secondValueInThreeVariant.localeCompare(timeValue[0]) === 0) {
        timeOption = 'days';
      } else if (secondValueInThreeVariant.localeCompare(timeValue[1]) === 0) {
        timeOption = 'months';
      } else if (secondValueInThreeVariant.localeCompare(timeValue[2]) === 0) {
        timeOption = 'years';
      }
      const foundDate = dayjs().subtract(parseInt(firstValueInThreeVariant), timeOption).format('YYYY-MM-DD');
      newValue = {
        value: [`${foundDate}T00:00:00`],
        valueName: [(dayjs(foundDate, 'YYYY-MM-DD') as any).fromNow()],
      };
    } else {
      newValue = { value: [], valueName: [] };
    }
    handleChange(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstValueInThreeVariant, secondValueInThreeVariant]);

  const onChangeRatioButton = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setCheckedOption(value);
    if (value === 1) {
      const today = `${dayjs().format('YYYY-MM-DD')}T00:00:00`;
      handleChange({ value: [today], valueName: [localeRus.today] });
    } else if (value === 2) {
      const yesterday = `${dayjs().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00`;
      handleChange({ value: [yesterday], valueName: [localeRus.yesterday] });
    } else if (value === 3) {
      if (firstValueInThreeVariant && secondValueInThreeVariant) {
        let timeOption: dayjs.ManipulateType = 'days';
        if (secondValueInThreeVariant.localeCompare(timeValue[0]) === 0) {
          timeOption = 'days';
        } else if (secondValueInThreeVariant.localeCompare(timeValue[1]) === 0) {
          timeOption = 'months';
        } else if (secondValueInThreeVariant.localeCompare(timeValue[2]) === 0) {
          timeOption = 'years';
        }
        const foundDate = dayjs().subtract(parseInt(firstValueInThreeVariant), timeOption).format('YYYY-MM-DD');
        handleChange({
          value: [`${foundDate}T00:00:00`],
          valueName: [(dayjs(foundDate, 'YYYY-MM-DD') as any).fromNow()],
        });
      } else {
        handleChange({ value: [], valueName: [] });
      }
    } else {
      handleChange({ value: [], valueName: [] });
    }
  };

  if (type === 'singleDate') {
    return (
      <DatePicker
        showTime
        defaultValue={defaultValues.value[0] as Dayjs}
        format={(dayjs as any).defaultFormat}
        style={{ marginTop: 25 }}
        onChange={(date, dateString) => {
          handleChange({
            value:
              dateString === ''
                ? []
                : Array.isArray(dateString)
                  ? []
                  : [dayjs(dateString, (dayjs as any).defaultFormat).format('YYYY-MM-DDThh:mm:ss')],
            valueName: [dateString],
          });
        }}
      />
    );
  }
  if (type === 'chooseVariant') {
    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '30px',
    };
    return (
      <div style={{ height: '300px', overflow: 'auto' }}>
        <Radio.Group onChange={onChangeRatioButton} defaultValue={defaultValues.value[0] ? 4 : null}>
          <Radio style={radioStyle} value={1}>
            {localeRus.today}
          </Radio>
          <Radio style={radioStyle} value={2}>
            {localeRus.yesterday}
          </Radio>
          <Radio style={radioStyle} value={3}>
            <InputNumber
              min={0}
              onChange={(value) => {
                if (value) {
                  let newValue: string | null = (value as any).toString();
                  newValue = newValue !== '' ? newValue : null;
                  setFirstValueInThreeVariant(newValue);
                }
              }}
            />
            <Select
              style={{ marginLeft: 10 }}
              defaultValue={0}
              onChange={(key: number) => {
                setSecondValueInThreeVariant(timeValue[key]);
              }}>
              {timeValue.map((value, index) => {
                return (
                  <Select.Option key={index} value={index}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Radio>
          <Radio style={radioStyle} value={4}>
            {localeRus.date}:
            {checkedOption === 4 || defaultValues.value[0] ? (
              <DatePicker
                showTime
                style={{ marginLeft: 10 }}
                defaultValue={defaultValues.value[0] as Dayjs}
                format={(dayjs as any).defaultFormat}
                onChange={(date, dateString) => {
                  handleChange({
                    value:
                      dateString === ''
                        ? []
                        : Array.isArray(dateString)
                          ? []
                          : [dayjs(dateString, (dayjs as any).defaultFormat).format('YYYY-MM-DDThh:mm:ss')],
                    valueName: [],
                  });
                }}
              />
            ) : null}
          </Radio>
        </Radio.Group>
      </div>
    );
  }
  if (type === 'twoDate') {
    return (
      <DatePicker.RangePicker
        showTime
        style={{ marginTop: 25 }}
        defaultValue={defaultValues.value as [Dayjs, Dayjs]}
        format={(dayjs as any).defaultFormat}
        onChange={(date, dateString) => {
          handleChange({
            value:
              dateString[0] === '' || dateString[1] === ''
                ? []
                : dateString.map((rangeDate) =>
                    dayjs(rangeDate, (dayjs as any).defaultFormat).format('YYYY-MM-DDThh:mm:ss'),
                  ),
            valueName: [],
          });
        }}
      />
    );
  }
  return <></>;
};
