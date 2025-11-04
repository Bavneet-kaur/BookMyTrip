import { ReactNode, ChangeEvent, ForwardedRef } from 'react';

interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string; // now optional
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  children?: ReactNode;
  [key: string]: any; // For register (ref, onBlur, etc.)
}

export default function Input({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  children,
  ...props
}: InputProps) {
  return (
    <div style={{ marginBottom: 6 }}>
      {label && (
        <label htmlFor={name} style={{ float: 'left' }}>{label}</label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: type === 'password' ? '8px 20px 8px 8px' : '8px',
            marginTop: '4px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px'
          }}
          {...props}
        />
        {children && (
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}>
            {children}
          </span>
        )}
      </div>
    </div>
  );
}
