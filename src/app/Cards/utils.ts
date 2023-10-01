import { IconType } from '../../ui/Icon/icon-types';
import { CardObj, IconColor } from './CardsPage';

const titles: string[] = [
  'Fancy title',
  'Big title with a very long text so this will turn into a ellipsis',
  'Bigger item title but not ot big',
  'Item'
];
const icons: IconType[] = ['icon-onderhoud', 'icon-bolt', 'icon-broken'];
const iconGbs: IconColor[] = ['bg-danger', 'bg-warning', 'bg-orange'];
const progesses: number[] = [15, 25, 40, 55, 75, 100];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function generateList(total: number) {
  const cards: CardObj[] = [];
  for (let i = 0; i < total; i++) {
    cards.push({
      title: `${cards.length + 1}: ${titles[getRandomInt(titles.length)]}`,
      icon: icons[getRandomInt(icons.length)],
      iconColor: iconGbs[getRandomInt(iconGbs.length)],
      body: 'Body text',
      footer: getRandomInt(20) <= 5 ? 'Footer text' : undefined,
      buttonClick: getRandomInt(20) <= 5 ? () => console.log('Hallow') : undefined,
      progress:
        getRandomInt(20) <= 5 ? progesses[getRandomInt(progesses.length)] : undefined,
      customEdit: getRandomInt(100) < 10,
      showTime: getRandomInt(100) < 50
    });
  }

  return cards;
}

export function getFixedList() {
  return [
    {
      title: 'Item 1',
      icon: 'wrench',
      iconColor: 'bg-orange',
      body: 'Body text'
    },
    {
      title: 'Item 1',
      icon: 'lightning',
      iconColor: 'bg-danger',
      body: 'Body text'
    },
    {
      title: 'Item 1',
      icon: 'chain',
      iconColor: 'bg-warning',
      body: 'Body text'
    },
    {
      title: 'Item title',
      icon: 'lightning',
      iconColor: 'bg-danger',
      body: 'Body text',
      footer: 'footer text',
      progress: 40
    },
    {
      title: 'Item title',
      icon: 'chain',
      iconColor: 'bg-danger',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'lightning',
      iconColor: 'bg-orange',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'wrench',
      iconColor: 'bg-warning',
      body: 'Body text',
      footer: 'footer text',
      progress: 20
    },
    {
      title: 'Bigger item title but not ot big',
      icon: 'lightning',
      iconColor: 'bg-warning',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'wrench',
      iconColor: 'bg-orange',
      body: 'Body text',
      footer: 'footer text',
      progress: 75
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'chain',
      iconColor: 'bg-danger',
      body: 'Body text',
      footer: 'footer text',
      progress: 100
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'lightning',
      iconColor: 'bg-danger',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'lightning',
      iconColor: 'bg-orange',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'lightning',
      iconColor: 'bg-orange',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'wrench',
      iconColor: 'bg-danger',
      body: 'Body text',
      footer: 'footer text',
      buttonClick: () => console.log('Hallow')
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'lightning',
      iconColor: 'bg-orange',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 4 with a very long text so this will turn into a ellipsis',
      icon: 'lightning',
      iconColor: 'bg-orange',
      body: 'Body text',
      footer: 'footer text'
    },
    {
      title: 'Item 1',
      icon: 'wrench',
      iconColor: 'bg-warning',
      body: 'Body text'
    }
  ];
}
