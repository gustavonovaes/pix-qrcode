const { crc } = require('polycrc');

const EnumCurrency = {
  BRL: '986',
};

const EnumCountryCode = {
  Brazil: 'BR',
};

const PIX_VERSION = '01';
const GLOBAL_UNIQUE_IDENTIFIER = 'BR.GOV.BCB.PIX';
const CATEGORY_CODE = '0000';
const DEFAULT_TRANSACTION_ID = '***';

function generatePIXCode({
  pixKey,
  city,
  name,
  value,
  message,
  zipCode,
  transactionId = DEFAULT_TRANSACTION_ID,
  countryCode = EnumCountryCode.Brazil,
  currency = EnumCurrency.BRL,
}) {
  const payload = generatePayload({
    pixKey,
    city,
    name,
    value,
    message,
    zipCode,
    transactionId,
    countryCode,
    currency,
  });

  const stringPayload = payload.join('');
  const pixCode = generatePIXPayload(stringPayload);

  return pixCode;
}

function generatePayload({
  pixKey,
  city,
  name,
  value,
  message,
  zipCode,
  transactionId,
  countryCode,
  currency,
}) {
  const payload = [
    generateEMV('00', PIX_VERSION),
    generateEMV('26', generateAccountInformation(pixKey, message)),
    generateEMV('52', CATEGORY_CODE),
    generateEMV('53', currency),
  ];

  if (value) {
    payload.push(generateEMV('54', value.toFixed(2)));
  }

  payload.push(generateEMV('58', countryCode));
  payload.push(generateEMV('59', parseStr(name, 25)));
  payload.push(generateEMV('60', parseStr(city, 15)));

  if (zipCode) {
    payload.push(generateEMV('61', parseZipCode(zipCode)));
  }

  payload.push(generateEMV('62', generateEMV('05', transactionId)));
  payload.push('6304');

  return payload;
}

function generateEMV(id, parameter) {
  const len = parameter.length.toString().padStart(2, '0');
  return `${id}${len}${parameter}`;
}

function generateAccountInformation(pixKey, message) {
  const payload = [
    generateEMV('00', GLOBAL_UNIQUE_IDENTIFIER),
    generateEMV('01', pixKey),
  ];

  if (message) {
    payload.push(generateEMV('02', message));
  }

  return payload.join('');
}

function parseStr(str, length) {
  return str
    .substring(0, length)
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parseZipCode(zipCode) {
  return zipCode.replace(/[^0-9]/, '').substring(0, 8);
}

function generatePIXPayload(stringPayload) {
  const buffer = Buffer.from(stringPayload, 'utf8');

  const crc16CCiTT = crc(16, 0x1021, 0xffff, 0x0000, false);
  const crcResult = crc16CCiTT(buffer).toString(16).toUpperCase().padStart(4, '0');

  return `${stringPayload}${crcResult}`;
}

module.exports = {
  generatePIXCode,
  EnumCountryCode,
  EnumCurrency,
};
