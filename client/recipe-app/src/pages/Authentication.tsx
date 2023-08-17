import React from 'react'

interface AuthenticationProps{
  children:React.ReactNode;
  src:string
}
const Authentcation:React.FC<AuthenticationProps> = ({children, src}) => {
  return (
    <div className="flex w-screen h-screen relative mt-16 justify-center">
    <div className="w-[70%] h-[80%] rounded-lg relative mt-[60px] flex shadow-2xl">
      <div className="relative flex-[0.50]">
        <img
         src={src}
          className="object-cover h-full w-full rounded-3xl"
          alt="Login Background"
        />
      </div>

      <div className="relative flex-[0.50] h-full w-full">
       {children}
      </div>
    </div>
  </div>
  )
}

export default Authentcation