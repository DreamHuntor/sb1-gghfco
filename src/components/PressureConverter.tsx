import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

const units = [
  { name: 'Pa', label: '帕斯卡 (Pa)' },
  { name: 'kPa', label: '千帕 (kPa)' },
  { name: 'MPa', label: '兆帕 (MPa)' },
  { name: 'bar', label: '巴 (bar)' },
  { name: 'atm', label: '标准大气压 (atm)' },
  { name: 'mmHg', label: '毫米汞柱 (mmHg)' },
  { name: 'inHg', label: '英寸汞柱 (inHg)' },
  { name: 'psi', label: '磅/平方英寸 (psi)' },
];

const conversionFactors: { [key: string]: number } = {
  Pa: 1,
  kPa: 1000,
  MPa: 1000000,
  bar: 100000,
  atm: 101325,
  mmHg: 133.322,
  inHg: 3386.39,
  psi: 6894.76,
};

const PressureConverter: React.FC = () => {
  const [values, setValues] = useState<{ [key: string]: string }>(
    Object.fromEntries(units.map(unit => [unit.name, '']))
  );

  const handleInputChange = (unit: string, value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      const newValues = { ...values, [unit]: value };

      if (!isNaN(numValue)) {
        const basePa = numValue * conversionFactors[unit];
        units.forEach(({ name }) => {
          if (name !== unit) {
            newValues[name] = (basePa / conversionFactors[name]).toFixed(6);
          }
        });
      }

      setValues(newValues);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      handleInputChange(input.name, input.value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {units.map(({ name, label }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            type="text"
            id={name}
            name={name}
            value={values[name]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(name, e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入数值"
          />
        </div>
      ))}
    </div>
  );
};

export default PressureConverter;