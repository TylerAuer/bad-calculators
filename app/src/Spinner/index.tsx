import Loader from 'react-loader-spinner';
import './index.scss';

export default function Spinner() {
  return (
    <div className="spinner">
      <Loader type="Oval" height={75} width={75} />
    </div>
  );
}
