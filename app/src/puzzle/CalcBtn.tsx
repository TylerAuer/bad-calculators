import './CalcBtn.scss';

interface Props {
  children: string,
  onClick: () => void,
  className?: string,
  disabled?: boolean,
}

export default function CalcBtn({
  className = '', 
  disabled = false,
  onClick,
  children
  }: Props) {

  return (
    <button 
      className={`calc-btn ${className} ${disabled ? 'calc-btn--disabled' : ''}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}