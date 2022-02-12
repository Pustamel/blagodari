import React from 'react';


interface CheckboxProps {
  onChange(): void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ children, onChange }) => {
  console.log(children);

  return (
    <label >
      <input onChange={onChange} type="checkbox" />
      {children}
    </label>
  )
}