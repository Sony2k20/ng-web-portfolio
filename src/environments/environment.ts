export const environment = {
  emailServerUrl:
    process.env['EMAIL_SERVER_URL'] || 'http://localhost:3000/email/send',
  emailAdress: process.env['EMAIL_ADRESS'] || 'king_cong_son_nguyen@web.de',
};
