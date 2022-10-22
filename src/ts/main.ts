import '../css/index.css';
import Imask from 'imask';

type I = HTMLInputElement;
type D = HTMLDivElement;

const form = document.querySelector('form') as HTMLFormElement;

const ccNameInput = document.querySelector('#card-holder') as I;
const ccName = document.querySelector('div[data-ccName]') as D;

const ccNumberInput = document.querySelector('#card-number') as I;
const ccNumber = document.querySelector('div[data-ccNumber]') as D;

const ccNumberInputMasked: any = Imask(ccNumberInput, {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardType: 'visa'
    },

    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: 'mastercard'
    },

    {
      mask: '0000 0000 0000 0000',
      cardType: 'default'
    },
  ],

  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find((item: any) => number.match(item.regex));

    return foundMask;
  }
});

const ccExpirationDateInput = document.querySelector('#expiration-date') as I;
const ccExpirationDate = document.querySelector('div[data-ccDate]') as D;

Imask(ccExpirationDateInput, {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12
    },

    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  },
});

const ccCVCInput = document.querySelector('#security-code') as I;
const ccCVC = document.querySelector('div[data-ccCVC]') as D;

Imask(ccCVCInput, { mask: '0000' });


form.addEventListener('submit', event => {
  event.preventDefault();

  alert(`
  😭/ tudo pelo kuduairo
  /))
  //
  `);
});

ccNameInput.addEventListener('input', () => {
  ccName.textContent = ccNameInput.value.trim() || 'FULANO DA SILVA';
});

ccNumberInputMasked.on('accept', () => {
  ccNumber.textContent = ccNumberInputMasked.value.trim() || '1234 5678 9012 3456';

  const cardType = ccNumberInputMasked.masked.currentMask.cardType;
  setCardType(cardType);
});

ccExpirationDateInput.addEventListener('input', () => {
  ccExpirationDate.textContent = ccExpirationDateInput.value.trim() || '02/32';
});

ccCVCInput.addEventListener('input', () => {
  ccCVC.textContent = ccCVCInput.value.trim() || '123';
});


interface Colors {
  visa: string[];
  mastercard: string[];
  default: string[];
}

const darkerFillColor = document.querySelector('.fill-color-darker') as HTMLElement;
const lighterFillColor = document.querySelector('.fill-color-lighter') as HTMLElement;
const ccLogoType = document.querySelector('img[data-ccLogoType]') as HTMLImageElement;

function setCardType(type: string) {
  const colors: Colors = {
    visa: ['#8b5cf6', '#4f46e5'],
    mastercard: ['#df6f29', '#c69347'],
    default: ['black', 'gray']
  }

  ccLogoType.src = `./src/assets/cc-${type}.svg`;
  darkerFillColor.setAttribute('fill', colors[type as keyof typeof colors][0]);
  lighterFillColor.setAttribute('fill', colors[type as keyof typeof colors][1]);
}

