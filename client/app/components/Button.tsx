import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  [key: string]: any; // Allows extra props, like aria- or data- attributes
}

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  style = {},
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        background: '#3b82f6',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '18px',
        border: 'none',
        marginBottom: '14px',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
