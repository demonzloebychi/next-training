type CityInfo = {
  nominative: string;
  genitive: string;
  dative: string;
  phoneNumber: string; // Номер телефона
};


// const defaultCity = 'moscow';

const cities: Record<string, CityInfo> = {
  moscow: {
    nominative: 'Москва',
    genitive: 'Москвы',
    dative: 'Москве',
    phoneNumber: '+7 (495) 123-45-67',
  },
  spb: {
    nominative: 'Санкт-Петербург',
    genitive: 'Санкт-Петербурга',
    dative: 'Санкт-Петербургу',
    phoneNumber: '+7 (812) 123-45-67',
  },
};

export default cities;
