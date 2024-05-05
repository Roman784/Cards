import { FaStar } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';
import "./StarCheckbox.css";

export default function StarCheckbox({checked, onChange, ...props }: {checked: any, onChange: any}) {
  return (
    <label className="star-checkbox" {...props}>
      <input type="checkbox" checked={checked} onChange={onChange} {...props} />
      {checked && <FaStar className="star-icon" size="1.25rem" />}
      {!checked && <BsStar size="1.25rem" />}
    </label>
  );
};