module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('songQueue', JSON.stringify([
      {
        id: 's_1',
        user: 'Mut',
        name: 'A rainbow in curved air',
        rating: 10,
        position: 1
      },
      {
        id: 's_2',
        user: 'Mut',
        name: 'Red Right Ankle',
        rating: 10,
        position: 2
      },
      {
        id: 's_2',
        user: 'Peh',
        name: 'Musica do peh',
        rating: 5,
        position: 3
      },
    ]));
  }

};
