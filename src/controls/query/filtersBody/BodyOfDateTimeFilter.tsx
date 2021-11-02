import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Radio, InputNumber } from 'antd';
import moment, { Moment } from 'moment';
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
      let timeOption: moment.unitOfTime.DurationConstructor = 'days';
      if (secondValueInThreeVariant.localeCompare(timeValue[0]) === 0) {
        timeOption = 'days';
      } else if (secondValueInThreeVariant.localeCompare(timeValue[1]) === 0) {
        timeOption = 'months';
      } else if (secondValueInThreeVariant.localeCompare(timeValue[2]) === 0) {
        timeOption = 'years';
      }
      const date = moment().subtract(firstValueInThreeVariant, timeOption);
      const foundDate = date.format('YYYY-MM-DD');
      newValue = {
        value: [`${foundDate}T00:00:00`],
        valueName: [moment(foundDate, 'YYYY-MM-DD').fromNow()],
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
      const date = moment();
      const today = `${date.format('YYYY-MM-DD')}T00:00:00`;
      handleChange({ value: [today], valueName: [localeRus.today] });
    } else if (value === 2) {
      const date = moment().subtract(1, 'days');
      const yesterday = `${date.format('YYYY-MM-DD')}T00:00:00`;
      handleChange({ value: [yesterday], valueName: [localeRus.yesterday] });
    } else if (value === 3) {
      if (firstValueInThreeVariant && secondValueInThreeVariant) {
        let timeOption: moment.unitOfTime.DurationConstructor = 'days';
        if (secondValueInThreeVariant.localeCompare(timeValue[0]) === 0) {
          timeOption = 'days';
        } else if (secondValueInThreeVariant.localeCompare(timeValue[1]) === 0) {
          timeOption = 'months';
        } else if (secondValueInThreeVariant.localeCompare(timeValue[2]) === 0) {
          timeOption = 'years';
        }
        const date = moment().subtract(firstValueInThreeVariant, timeOption);
        const foundDate = date.format('YYYY-MM-DD');

        handleChange({
          value: [`${foundDate}T00:00:00`],
          valueName: [moment(foundDate, 'YYYY-MM-DD').fromNow()],
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
        defaultValue={defaultValues.value[0] as Moment}
        format={moment.defaultFormat}
        style={{ marginTop: 25 }}
        onChange={(date, dateString) => {
          handleChange({
            value: dateString === '' ? [] : [moment(dateString, moment.defaultFormat).format('YYYY-MM-DDThh:mm:ss')],
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
                defaultValue={defaultValues.value[0] as Moment}
                format={moment.defaultFormat}
                onChange={(date, dateString) => {
                  handleChange({
                    value:
                      dateString === '' ? [] : [moment(dateString, moment.defaultFormat).format('YYYY-MM-DDThh:mm:ss')],
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
        defaultValue={defaultValues.value as [Moment, Moment]}
        format={moment.defaultFormat}
        onChange={(date, dateString) => {
          handleChange({
            value:
              dateString[0] === '' || dateString[1] === ''
                ? []
                : dateString.map((rangeDate) => moment(rangeDate, moment.defaultFormat).format('YYYY-MM-DDThh:mm:ss')),
            valueName: [],
          });
        }}
      />
    );
  }
  return <></>;
};
