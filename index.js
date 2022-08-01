const QRCode = require('qrcode');
const { generatePIXCode } = require('./lib');

const pixCode = generatePIXCode({
  pixKey: 'contato@gustavonovaes.dev',
  name: 'Gustavo Novaes',
  city: 'Recife',
  message: 'A Vida, o Universo e Tudo Mais',
  // zipCode: '',
  value: 42,
});

console.table('PIXCode\n' + pixCode);

QRCode.toString('QRCode:', { type: 'utf8' }, function (err, url) {
  if (err) return console.error('ERRO:', err);
  console.log(url);
});

QRCode.toDataURL(pixCode, { type: 'image/jpeg', errorCorrectionLevel: 'low' }, (error, base64) => {
  if (error) return console.error('ERRO:', error);
  console.log("base64:\n" + base64);
});
