import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Typography } from 'antd';
import { ValueOfFilter } from '../type';

const localeRus = {
  regExExample: 'Пример регулярного выражения: "^Привет"',
  regExStartString: '^ - Начало строки',
  regExEndString: '$ - Конец строки',
  regExDocTitle: 'Докуументация',
  regExDoc: 'Подробная инструкция по использованию на',
  regExDocLink: 'сайте документации',
};

interface BodyOfStringFilterProps {
  handleChange: (value: any) => void;
  defaultValues: ValueOfFilter;
  type?: string;
}

export const BodyOfStringFilter: React.FC<BodyOfStringFilterProps> = ({ handleChange, defaultValues, type }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValues.value[0]);

  useEffect(() => {
    setInputValue(defaultValues.value[0]);
  }, [defaultValues]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    handleChange({ value: value ? [value] : [], valueName: [] });
  };

  if (type === 'singleString') {
    return <Input style={{ marginTop: '1em' }} value={inputValue} onChange={onChange} />;
  }
  if (type === 'regEx') {
    return (
      <React.Fragment>
        <Input style={{ marginTop: '1em', marginBottom: '1em' }} value={inputValue} onChange={onChange} />
        <Typography.Text type='secondary'>{localeRus.regExExample}</Typography.Text>
        <br />
        <Typography.Text type='secondary'>{localeRus.regExStartString}</Typography.Text>
        <br />
        <Typography.Text type='secondary'>{localeRus.regExEndString}</Typography.Text>
        <br />
        <Typography.Text type='secondary'>
          <span>{`${localeRus.regExDoc} `}</span>
          <a href='https://www.w3.org/TR/xpath-functions/#regex-syntax' title={localeRus.regExDocTitle} target='blank'>
            {localeRus.regExDocLink}
          </a>
        </Typography.Text>
      </React.Fragment>
    );
  }
  return <></>;
};
