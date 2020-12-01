import './CalcBtn.scss';

interface Props {
  text: string,
  usesLeft?: number,
  onClick: () => void,
  className?: string,
}

export default function CalcBtn({
  className = '', 
  onClick,
  text,
  usesLeft,
  }: Props) {

  const infinityCss = usesLeft === Infinity ? 'calc-btn__uses-left--infinity' : '' 

  return (
    <div 
      className={`calc-btn ${className} ${!usesLeft ? 'calc-btn--disabled' : ''}`} 
      onClick={usesLeft ? onClick : () => null}
    >
      <div className='calc-btn__text'>{text}</div>
      <div className={`calc-btn__uses-left ${infinityCss}`}>{usesLeft}</div>
    </div>
  )
}