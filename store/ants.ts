
const antsData = {
  "ants": [
      {
          "name": "Marie 'Ant'oinette",
          "length": 12,
          "color": "BLACK",
          "weight": 2
      },
      {
          "name": "Flamin' Pincers",
          "length": 11,
          "color": "RED",
          "weight": 2
      },
      {
          "name": "AuNT Sarathi",
          "length": 20,
          "color": "BLACK",
          "weight": 5
      },
      {
          "name": "The Unbeareable Lightness of Being",
          "length": 5,
          "color": "SILVER",
          "weight": 1
      },
      {
          "name": "'The Duke'",
          "length": 17,
          "color": "RED",
          "weight": 3
      }
  ]
}


function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}


interface Ant {
  name: string
  length: number
  color: string
  weight: number
  id: string
  loading: boolean
}

interface AntsState {
  ants: Ant[]
  hasInitialDataLoaded: boolean
  raceLoading: boolean
}

const initialState = {

}

// ------ actions ------

// load initial ants
// start race
// reset ants

