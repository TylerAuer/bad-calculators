import './CalcBtn.scss';

interface Props {
  text: string;
  usesLeft?: number;
  onClick: () => void;
  className?: string;
}

export default function CalcBtn({
  className = '',
  onClick,
  text,
  usesLeft = Infinity,
}: Props) {
  const infinityCss =
    usesLeft === Infinity ? 'calc-btn__uses-left--infinity' : '';

  return (
    <div
      className={`calc-btn ${className} ${
        !usesLeft ? 'calc-btn--disabled' : ''
      }`}
    >
      <button
        onClick={usesLeft !== 0 ? onClick : () => null}
        className={`calc-btn__btn ${
          !usesLeft ? 'calc-btn__btn--disabled' : ''
        }`}
      >
        {text}
      </button>
      <div className={`calc-btn__uses-left ${infinityCss}`}>{usesLeft}</div>
    </div>
  );
}
