// Textos da porta de acesso (passo U1). Regra: a porta nunca menciona a Cerealis, em nenhuma das línguas.
export const pt = {
  lines: [
    'Há mais de um século que transformamos o grão.',
    'Mais de 400 mil toneladas de cereal por ano.',
    'Da seara à mesa de milhões, em cinco continentes.',
    'Agora, cada grão vai ganhar inteligência.',
  ],
  /** Última frase com a palavra em destaque: [antes, destaque, depois]. */
  last: ['Agora, cada grão vai ganhar ', 'inteligência', '.'] as [string, string, string],
  badge: 'ACESSO RESTRITO · 2026',
  sub: 'Desde 1919 a alimentar o futuro. Agora, com dados em cada grão.',
  password: 'Palavra-passe',
  enter: 'Entrar',
  wrong: 'Palavra-passe incorreta',
  sites: 'MAIA · TROFA · PORTO · LISBOA · LITOVEL · VENTA DE BAÑOS',
};

export const en: typeof pt = {
  lines: [
    'For more than a century, we have been transforming grain.',
    'Over 400,000 tonnes of grain a year.',
    'From the field to the tables of millions, on five continents.',
    'Now, every grain gains intelligence.',
  ],
  last: ['Now, every grain gains ', 'intelligence', '.'],
  badge: 'RESTRICTED ACCESS · 2026',
  sub: 'Feeding the future since 1919. Now with data in every grain.',
  password: 'Password',
  enter: 'Enter',
  wrong: 'Incorrect password',
  sites: 'MAIA · TROFA · PORTO · LISBON · LITOVEL · VENTA DE BAÑOS',
};
