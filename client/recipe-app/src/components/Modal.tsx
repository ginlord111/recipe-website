import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  title: string;
  children: React.ReactNode;
  description: string;
  onChange?: (open: boolean) => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  description,
  onChange,
  isOpen,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-300/20 backdrop-blur-sm fixed inset-0">
          <Dialog.Content className="fixed drop-shadow-md border-netural-700 top-[50%] left-[50%] max-h-full h-full  max-w-full w-full md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] focus:outline-none">
            <Dialog.Title className="text-xl text-center font-bold mb-4">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-sm leading-normal text-center">
              {description}
            </Dialog.Description>
            <div>{children}</div>
            <Dialog.Close>
              <button className="text-neutral-400 hover:text-black absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal