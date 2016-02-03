var VoteTypes = require('./constants/VoteTypes');

module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('songQueue', JSON.stringify([
      {
        id: 1,
        user: 'Mut',
        name: 'A rainbow in curved air',
        rating: 0,
        voteType: VoteTypes.UNVOTED,
        timeCreated: new Date().getTime(),
      },
      {
        id: 2,
        user: 'Mut',
        name: 'Red Right Ankle',
        rating: 2,
        voteType: VoteTypes.UNVOTED,
        timeCreated: new Date().getTime(),
      },
      {
        id: 3,
        user: 'Peh',
        name: 'Musica do peh',
        rating: -1,
        voteType: VoteTypes.UNVOTED,
        timeCreated: new Date().getTime(),
      },
    ]));
  }

};
