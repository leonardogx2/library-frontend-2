'use client';
import { useMessageContext } from '@/contexts/messageContext';
import { useAuthContext } from '@/contexts/userContext';
import Image from 'next/image';
import React, { useState } from 'react';

const Navbar = () => {
  const [isLogoutContainerOpen, setIsLogoutContainerOpen] = useState<boolean>(false);
  const { setMessage } = useMessageContext();
  const { signOut } = useAuthContext();

  const UserContainer = () => {
    return (
      <div className="flex relative text-lg gap-2">
        <div className="relative w-[25px] h-auto">
          <Image className="object-contain" src={'/assets/img/nav-person.png'} alt="user icon" fill />
        </div>
        <span className="text-gray">Usuário</span>
        <div className="relative w-[25px] h-auto">
          <Image
            data-testid="open-logout-container-test-id"
            onClick={() => setIsLogoutContainerOpen(!isLogoutContainerOpen)}
            className="object-contain cursor-pointer"
            src={'/assets/img/nav-arrow.png'}
            alt="user icon"
            fill
          />
        </div>
        {isLogoutContainerOpen ? <LogoutContainer /> : <></>}
      </div>
    );
  };

  const LogoutContainer = () => {
    return (
      <>
        <div
          data-testid="logout-container-test-id"
          onClick={signOut}
          className="absolute -bottom-14 shadow-lg bg-light_gray w-full rounded py-2.5 text-gray flex items-center cursor-pointer hover:bg-opacity-70 z-[11]"
        >
          <span className="ml-4">Sair</span>
        </div>
        <div
          onClick={() => setIsLogoutContainerOpen(false)}
          className="fixed top-0 left-0 w-screen h-screen z-10"
        ></div>
      </>
    );
  };

  return (
    <nav
      data-testid="navbar-test-id"
      className="top-0 bg-white w-full h-20 flex justify-between items-center px-6 absolute z-35"
    >
      <Image src={'/assets/img/logo.png'} alt="Logo image" width={100} height={40} />
      <UserContainer />
    </nav>
  );
};

export default Navbar;
