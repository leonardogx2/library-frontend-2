'use client';
import Breadcrumb from '@/components/Breadcrumb';
import Li from '@/components/CustomList/Li';
import Ul from '@/components/CustomList/Ul';
import MainContainer from '@/components/MainContainer';
import { IRent } from '@/interfaces';
import SkeletonHistoric from '@/components/Skeletons/Historic';
import React, { useEffect, useState } from 'react';
import { myFetch } from '@/app/actions';
import { useMessageContext } from '@/contexts/messageContext';
import { isAxiosError } from 'axios';
import { getAllRents } from '@/services/rent/getAllRents';

const Historic = () => {
  const [rents, setRents] = useState<IRent[] | undefined>(undefined);
  const { setMessage } = useMessageContext();

  const onLoad = async () => {
    try {
      const filters = { page: 1, size: 10 };
      const rents = await getAllRents(filters);
      setRents(rents);
    } catch (err) {
      if (isAxiosError(err)) {
        setMessage({
          content: err.response?.data.error ? err.response?.data.error : err.response?.data.message,
          severity: 'fail',
        });
      }
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const HistoricContainer = () => {
    return (
      <div className="px-10 mt-20 pb-6 w-[1200px] top-28 overflow-x-auto">
        {rents ? (
          <div className="grid grid-cols-5 w-full overflow-x-auto">
            <Ul title="Aluno" left>
              {rents.map(rent => (
                <Li key={rent.student_name + rent.deliveryDate + rent.deliveryDate} left>
                  {rent.student_name && rent.student_name?.length > 25
                    ? rent.student_name?.slice(0, 25) + '...'
                    : rent.student_name}
                </Li>
              ))}
            </Ul>
            <Ul title="Turma">
              {rents.map(rent => (
                <Li key={rent.class + rent.deliveryDate + rent.deliveryDate}>{rent.class}</Li>
              ))}
            </Ul>
            <Ul title="Livro">
              {rents.map(rent =>
                rent.book ? (
                  <Li key={rent.book.title + rent.deliveryDate + rent.deliveryDate}>
                    {rent.book.title && rent.book.title.length > 25
                      ? rent.book.title.slice(0, 25) + '...'
                      : rent.book.title}
                  </Li>
                ) : (
                  <></>
                )
              )}
            </Ul>
            <Ul title="Data da Retirada">
              {rents.map(rent => {
                const withdrawalDate = new Date(rent.withdrawalDate);
                const withdrawalDateString = `${withdrawalDate.getDate()}/${withdrawalDate.getMonth()}/${withdrawalDate.getFullYear()}`;

                return (
                  <Li key={rent.withdrawalDate + rent.deliveryDate + rent.deliveryDate}>{withdrawalDateString}</Li>
                );
              })}
            </Ul>
            <Ul title="Data da Entrega" right>
              {rents.map(rent => {
                const deliveryDate = new Date(rent.deliveryDate);
                const deliveryDateString = `${deliveryDate.getDate()}/${deliveryDate.getMonth()}/${deliveryDate.getFullYear()}`;

                return <Li key={rent.deliveryDate + rent.deliveryDate + rent.deliveryDate}>{deliveryDateString}</Li>;
              })}
            </Ul>
          </div>
        ) : (
          <SkeletonHistoric />
        )}
      </div>
    );
  };

  return (
    <MainContainer>
      <Breadcrumb backward="Home" now="Histórico de Empréstimos" to="/" />
      <HistoricContainer />
    </MainContainer>
  );
};

export default Historic;
