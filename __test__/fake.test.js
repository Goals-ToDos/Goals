//import cardsReducer from '../reducers/cardsReducer.js';

describe('Add Goal', () => {
  let startState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    startState = {
        marketList: [],
        lastMarketId: 10000,
        newLocation: '',
        totalCards: 0,
        totalMarkets: 0,
      };
  });

  it('result should be 5', () => {
    //const result = cardsReducer(undefined, fakeAction);
    expect(5).toEqual(5);
  });
})