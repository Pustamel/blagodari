import React from 'react';

interface CheckboxProps {
  onChange(): void;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ children, onChange, id }) => {

  return (
    <label >
      <input id={id} onChange={onChange} type="checkbox" />
      {children}
    </label>
  )
}