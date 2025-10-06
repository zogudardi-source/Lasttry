import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, id, wrapperClassName = '', className = '', ...props }) => {
  const baseClasses = 'block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white';
  
  return (
    <div className={wrapperClassName}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
      <input id={id} className={`${baseClasses} ${className}`} {...props} />
    </div>
  );
};

export default Input;
