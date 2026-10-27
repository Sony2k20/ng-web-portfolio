declare const NG_APP_ENV: Partial<
  Record<'URL' | 'COOKIES' | 'EMAIL_SERVER_URL' | 'EMAIL_ADRESS', string>
>

export const environment = {
  url: NG_APP_ENV.URL || 'https://katy.csnguyen.de',
  cookies: NG_APP_ENV.COOKIES || 'false',
  emailServerUrl: NG_APP_ENV.EMAIL_SERVER_URL || 'https://katy.csnguyen.de/api',
  emailAdress: NG_APP_ENV.EMAIL_ADRESS || 'king_cong_son_nguyen@web.de',
}
