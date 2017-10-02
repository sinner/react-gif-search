const config = {
  dev: {
    giphy: {
      APIKey: '5a59853514ae4dfbbe6904500d997350',
      APIUrl: 'http://api.giphy.com/v1/gifs/search',
      resultsLimit: 50
    },
    firebase: {
      apiKey: 'AIzaSyCLtjl1fFHhQ_XxnkAW__PNsdDcdxm8Sec',
      authDomain: 'giphy-search-5d5c5.firebaseapp.com',
      databaseURL: 'https://giphy-search-5d5c5.firebaseio.com',
      projectId: 'giphy-search-5d5c5',
      storageBucket: 'giphy-search-5d5c5.appspot.com',
      messagingSenderId: '1085267129640'
    }
  },
  prod: {
    giphy: {
      APIKey: '5a59853514ae4dfbbe6904500d997350',
      APIUrl: 'http://api.giphy.com/v1/gifs/search',
      resultsLimit: 50
    },
    firebase: {
      apiKey: 'AIzaSyCLtjl1fFHhQ_XxnkAW__PNsdDcdxm8Sec',
      authDomain: 'giphy-search-5d5c5.firebaseapp.com',
      databaseURL: 'https://giphy-search-5d5c5.firebaseio.com',
      projectId: 'giphy-search-5d5c5',
      storageBucket: 'giphy-search-5d5c5.appspot.com',
      messagingSenderId: '1085267129640'
    }
  }
};

export default config;