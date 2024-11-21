import { log } from '../log';

const currencySignList = {
  default: '$',
  USD: '$',
  UAH: '₴',
  EUR: '€',
  GBP: '£',
  RUB: '₽',
  JPY: '¥',
  CNY: '元',
};
const currencyPositionList = {
  default: 'left',
  USD: 'left',
  UAH: 'right',
  EUR: 'right',
  GBP: 'left',
  RUB: 'right',
  JPY: 'right',
  CNY: 'right',
};
const monthNameList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const SI = ['', 'k', 'm', 'B', 'BB', 'P', 'E'];
const formatter = new Intl.NumberFormat(undefined, {minimumFractionDigits: 2});

const getCurrencySign = currency => currencySignList[currency] || currencySignList.default;
const getCurrencySignList = () => Object.keys(currencySignList).map(currencyKey => ({_id: currencyKey, title: currencySignList[currencyKey]})).filter(currency => currency._id !== 'default');
const getCurrencyPosition = currency => currencyPositionList[currency] || currencyPositionList.default;
const getMonthName = month => monthNameList[month] || monthNameList[0];
const getNumber = num => formatter.format(num);
const getAmountShort = num => {
  log('getAmountShort', num);
  const part = Math.log10(num) / 3 | 0;

  if(part === 0) {
    return num;
  }

  const suffix = SI[part];
  const scale = Math.pow(10, part * 3);
  const scaled = num / scale;

  return scaled.toFixed(1) + suffix;
};

export const format = {
  currency: (currency, n, c, d, t) => {
    // c = isNaN(c = Math.abs(c)) ? 2 : c;
    // d = d === undefined ? '.' : d;
    // t = t === undefined ? ',' : t;
    //
    // const s = n < 0 ? '-' : '';
    // const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    // const k = i.length;
    // const j = k > 3 ? k % 3 : 0;
    const currencyPosition = getCurrencyPosition(currency);
    const currencySign = getCurrencySign(currency);
    // const f = s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
    const f = formatter.format(n);

    return (currencyPosition === 'left' ? currencySign : '') + f + (currencyPosition === 'right' ? currencySign : '');
  },
  getCurrencySign,
  getCurrencySignList,
  getCurrencyPosition,
  getMonthName,
  getAmountShort,
  getNumber,
};
