import React from 'react'
import './Form.css'
function Form({username, setUsername, setPassword, password, label, onSubmit}) {
  return (
    <div className=' w-full h-full'>
    <div className='form-group h-full w-full flex  justify-center flex-col'>
        <h1 className='font-bold text-3xl text-slate-800'>{label}</h1>
    <form action="" onSubmit={onSubmit} className='flex flex-col  '>
      <div className='flex flex-col'>
        <div className='flex flex-col p-20'>
        <label htmlFor="username" className='text-lg font-semibold'>Username:</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='juandelacruz@yahoo.com' className='p-5 h-[40px] border-[1px] border-gray-300 rounded-sm'/>
        </div>
        <div className='flex flex-col px-20'>
        <label htmlFor="password" className='text-lg font-semibold'>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' className='p-5 h-[40px] border-[1px] border-gray-300 rounded-sm' />
        </div>
        <div className='flex items-center justify-center  text-lg pt-20'>
        <button className='bg-blue-600 w-[500px] rounded-lg font-semibold py-2 text-white'>{label}</button>
        </div>
        </div>
       
    </form>
 
    </div>
</div>
  )
}

export default Form