

import { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';
type Props = {
  message: string,
  type: any,
  onClose: () => void
}

const toastStyles: any = {
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-black',
  error: 'bg-red-500 text-white',
};

const icons: any = { success: <AiOutlineCheckCircle />, error: <AiOutlineCloseCircle />, warning: <AiOutlineWarning />, info: <AiOutlineInfoCircle />, };


const Toast = (props: Props) => {
  const { message, type, onClose } = props

  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onclose])
  return (
    <div className={`toast flex items-center justify-between p-4 mb-4 w-full max-w-xs text-white rounded-lg shadow-lg ${toastStyles[type]}`}>
      <div className="flex items-center">
        <span className="text-2xl mr-2">{icons[type]}</span>
        <p>{message}</p>
      </div>
      <button onClick={onClose} className="ml-2 text-lg">&times;</button>
    </div>);

}

export default Toast