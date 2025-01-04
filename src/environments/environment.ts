export const environment = {
  prod: false,
  emailServerUrl:
    process.env['EMAIL_SERVER_URL'] ||
    'https://katy.csnguyen.de/api/email/send',
  emailAdress: process.env['EMAIL_ADRESS'] || 'king_cong_son_nguyen@web.de',
};
