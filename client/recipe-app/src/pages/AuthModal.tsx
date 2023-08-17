import React from 'react'
import Modal from '../components/Modal'
import {useNavigate} from 'react-router-dom'
import useAuthModal from '../hooks/useAuthModal';
const AuthModal = () => {
  const { isOpen, onClose } = useAuthModal();
  const navigate = useNavigate()
  const onChange = () =>{
    if(isOpen){
      return onClose()
    }
  }
  const handleClick = () =>{
    navigate('/login')
    return onClose()
  }
  return (
    <div className='overflow-hidden truncate z-[800]'>
      <Modal title='You must Login First' description = 'Login your Account' isOpen={isOpen} onChange={onChange}>
        <div className='flex gap-y-2 flex-col'>
          <button className='bg-blue-500 text-lg rounded-md font-semibold' onClick={handleClick}>Login</button>
          <a href="/register" className='text-sm text-gray-500 text-center underline'>Dont Have Account? Register Here</a>
        </div>
      </Modal>
    </div>
  )
}

export default AuthModal