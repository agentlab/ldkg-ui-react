import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Tooltip } from 'antd';
import { equalTypesOfRelations } from '../Filter';
import { ValueOfFilter } from '../type';

const localeRus = {
  inputOneOrMoreNumbers: 'Введите одно или более чисел (через символ [Пробел] или запятая)',
  equal: 'равняется',
  any: 'любой из',
};

interface BodyOfIntegerFilterProps {
  handleChange: (value: any) => void;
  defaultValues: ValueOfFilter;
  type?: string;
}

export const BodyOfIntegerFilter: React.FC<BodyOfIntegerFilterProps> = ({ handleChange, defaultValues, type }) => {
  const relationForOneNumber = { title: localeRus.equal, predicate: 'equal', type: 'singleNumber' };
  const relationForSomeNumbers = { title: localeRus.any, predicate: 'any', type: 'hiddenSingleNumber' };

  const [inputValue, setInputValue] = useState<string>(defaultValues.value.join(', '));

  useEffect(() => {
    setInputValue(defaultValues.value.join(', '));
  }, [defaultValues]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const reg = /^([1-9][0-9]*)([,\s][0-9]*)*$/;
    if (reg.test(value) || value === '') {
      setInputValue(value);
      handleChange({ value: value ? [value] : [], valueName: [] });
    }
  };

  const onBlur = () => {
    const arrayOfValue = inputValue.split(/[\s,]/).filter((val) => val !== '');
    setInputValue(arrayOfValue.join(', '));
    const newValue: any = { value: arrayOfValue, valueName: [] };
    if (arrayOfValue.length > 1) {
      newValue['relation'] = relationForSomeNumbers;
    } else {
      newValue['relation'] = relationForOneNumber;
    }
    handleChange(newValue);
  };

  if (equalTypesOfRelations(type, 'singleNumber')) {
    return (
      <Tooltip trigger={'focus'} title={localeRus.inputOneOrMoreNumbers} placement='bottomLeft'>
        <Input value={inputValue} style={{ marginTop: 25 }} onChange={onChange} onBlur={onBlur} />
      </Tooltip>
    );
  }
  return <></>;
};
