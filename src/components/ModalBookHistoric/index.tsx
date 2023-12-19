import React from 'react';
import ModalContainer from '../ModalContainer';
import Ul from '../CustomList/Ul';
import Li from '../CustomList/Li';
import { IRent } from '@/interfaces';

interface IModalBookHistoric {
  onClose: () => void;
  rentHistory?: IRent[];
}

const ModalBookHistoric = (props: IModalBookHistoric) => {
  const { rentHistory, onClose } = props;
  if (!rentHistory) return;
  return (
    <ModalContainer id="historic" className="w-8/12" onClose={onClose}>
      <div className="flex-col gap-4 justify-center items-center mt-10 pb-10 px-10">
        <div className="flex flex-col justify-center gap-8">
          <h4 className="font-bold text-font_gray text-xl">Histórico de empréstismos do livro</h4>
          <div className="grid grid-cols-4 w-[900px] overflow-x-auto">
            {rentHistory.length === 0 ? (
              <p>Parece que um rato comeu o histórico...</p>
            ) : (
              <>
                <Ul title="Aluno" left>
                  {rentHistory.map((historyItem, index) => (
                    <Li key={index} left>
                      {historyItem.student_name}
                    </Li>
                  ))}
                </Ul>
                <Ul title="Turma">
                  {rentHistory.map((historyItem, index) => (
                    <Li key={index}>{historyItem.class}</Li>
                  ))}
                </Ul>
                <Ul title="Data da Retirada">
                  {rentHistory.map((historyItem, index) => {
                    const withdrawalDate = new Date(historyItem.withdrawalDate);
                    const withdrawalDateString = `${withdrawalDate.getDate()}-${withdrawalDate.getMonth()}-${withdrawalDate.getFullYear()}`;

                    return <Li key={index}>{withdrawalDateString}</Li>;
                  })}
                </Ul>
                <Ul title="Data da Entrega" right>
                  {rentHistory.map((historyItem, index) => {
                    const deliveryDate = new Date(historyItem.deliveryDate);
                    const deliveryDateString = `${deliveryDate.getDate()}-${deliveryDate.getMonth()}-${deliveryDate.getFullYear()}`;

                    return <Li key={index}>{deliveryDateString}</Li>;
                  })}
                </Ul>
              </>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalBookHistoric;
