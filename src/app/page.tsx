'use client';

//import Image from 'next/image'
import MainContainer from '@/components/MainContainer';
import { useAuthContext } from '@/contexts/userContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { getUser } = useAuthContext();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const verifyLogin = async () => {
    const user = await getUser();
    if (!user.email) {
      router.push('/auth/login');
      router.refresh();
      return;
    }
    setIsLogged(true);
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  const HomeContainer = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-5 pt-6">
        <HomeItem
          image_path="/assets/img/add-circle.png"
          subtitle="Cadastrar novo livro"
          redirect_to="/books/register"
        />
        <HomeItem image_path="/assets/img/library.png" subtitle="Biblioteca" redirect_to="/books" />
        <HomeItem
          image_path="/assets/img/pending.png"
          subtitle="Histórico de empréstimos"
          redirect_to="/books/historic"
        />
      </div>
    );
  };

  const HomeItem = ({
    image_path,
    subtitle,
    redirect_to,
  }: {
    image_path: string;
    subtitle: string;
    redirect_to: string;
  }) => {
    return (
      <Link
        href={redirect_to}
        className="h-64 w-72 sm:h-72 sm:w-80 bg-secondary p-1 grid grid-rows-homeItem hover:bg-primary rounded"
      >
        <div className="flex justify-center items-center">
          <Image src={image_path} alt={`${subtitle} Image`} width={40} height={40} />
        </div>
        <div className="bg-white flex items-center justify-center">
          <p>{subtitle}</p>
        </div>
      </Link>
    );
  };

  if (!isLogged) return <p>Carregando...</p>;

  return (
    <MainContainer>
      <HomeContainer />
    </MainContainer>
  );
}
