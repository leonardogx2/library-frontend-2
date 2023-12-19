import 'crypto';

const books = [
  {
    title: 'Mais Esperto Que o Diabo',
    author: 'Napoleon Hill',
    genre: 'Autoajuda',
    status: {
      isActive: false,
      description: 'desativado porque estragou',
      isLent: false,
    },
    img_path: 'book1.jpg',
    systemEntryDate: '02/01/2020',
    synopsis:
      'Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.',
    rentHistory: [
      {
        student_name: 'Gustavo Kunde',
        class: 'T312',
        withdrawalDate: '29/05/2022',
        deliveryDate: '19/06/2022',
      },
    ],
    id: crypto.randomUUID(),
  },
  {
    title: 'Hereges de Duna',
    author: 'Frank Herbert',
    genre: 'Ficção Cientifica',
    status: {
      isActive: true,
      description: '',
      isLent: false,
    },
    img_path: 'book2.jpg',
    systemEntryDate: '02/01/2018',
    synopsis:
      'Barbaridade Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
    rentHistory: [],
    id: crypto.randomUUID(),
  },
];

export default books;
