module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('songQueue', JSON.stringify([
      {
        id: 1,
        user: 'Mut',
        name: 'A rainbow in curved air',
        rating: 0,
      },
      {
        id: 2,
        user: 'Mut',
        name: 'Red Right Ankle',
        rating: 2,
      },
      {
        id: 3,
        user: 'Peh',
        name: 'Musica do peh',
        rating: -1,
      },
    ]));
  }

};
