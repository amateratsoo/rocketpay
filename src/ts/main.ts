import '../css/index.css';

const form = document.querySelector('form') as HTMLFormElement;
const cardNumber = document.querySelector('#card-number') as HTMLInputElement;

const darkerFillColor = document.querySelector('path[data-ccFillColor="darker"]') as HTMLElement;
const lighterFillColor = document.querySelector('path[data-ccFillColor="lighter"]') as HTMLElement;

form.addEventListener('submit', event => {
  event.preventDefault();
})

interface Colors {
  visa: string[];
  mastercard: string[];
  default: string[];
}

function setCardFillColor(card: string) {
  const colors: Colors = {
    visa: ['#8b5cf6', '#4f46e5'],
    mastercard: ['#df6f29', '#c69347'],
    default: ['black', 'gray']
  }

  darkerFillColor.setAttribute('fill', colors[card as keyof typeof colors][0]);
  lighterFillColor.setAttribute('fill', colors[card as keyof typeof colors][1]);
}
