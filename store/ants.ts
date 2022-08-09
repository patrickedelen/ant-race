
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

// TODO: change delay back to 7000 + Math.random() * 7000;
function generateAntWinLikelihoodCalculator() {
  const delay = 1000 + Math.random() * 3000;
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
  winLikelihood: number
}

interface AntsState {
  ants: Ant[]
  hasInitialDataLoaded: boolean
  raceLoading: boolean
}

type AntsAction = {
  type: string,
  antId?: string,
  antLoading?: boolean,
  antWinLikelihood?: number
}

const initialState: AntsState = {
  ants: [],
  hasInitialDataLoaded: false,
  raceLoading: false
}

const LOAD_INITIAL_DATA = 'load_initial_data'
const START_RACE = 'race_start'
const END_RACE = 'race_end'
const UPDATE_ANT = 'ant_update'
const RESET_ANTS = 'reset_ants'

export const reducer = (state: AntsState = initialState, action: AntsAction): AntsState => {
  switch (action.type) {
    case LOAD_INITIAL_DATA:
      const newAntsData = antsData.ants.map((ant) => ({
        id: `${Math.floor(Math.random() * 1000)}`,
        loading: false,
        winLikelihood: 0,
        ...ant
      }))
      return {
        ...state,
        hasInitialDataLoaded: true,
        raceLoading: false,
        ants: newAntsData,
      }
    case START_RACE:
      return {
        ...state,
        ants: state.ants.map((ant) => ({
          ...ant,
          loading: true
        })),
        raceLoading: true
      }
    case END_RACE:
      return {
        ...state,
        raceLoading: false
      }
    case UPDATE_ANT:
      const newAnts = state.ants.map((ant) => {
        if (ant.id === action.antId) {
          return {
            ...ant,
            loading: action.antLoading || false,
            winLikelihood: action.antWinLikelihood || 0
          }
        }
        return ant
      })

      return {
        ...state,
        ants: newAnts
      }

    case RESET_ANTS:
      return initialState
    
  }

  return state
}

// ------ actions ------

// load initial ants
// start race
// reset ants

export const startRaceCreator = () => {
  return async (dispatch, getState) => {
    const state = getState()

    dispatch({ type: START_RACE })

    const antPromises = []

    console.log('in the thunk')

    for (let ant of state.ants) {
      console.log('setting loading for', ant.id)
      // dispatch({ type: UPDATE_ANT, id: ant.id, antLoading: true })
      antPromises.push(new Promise((resolve) => {
        const cb = (winLikelihood) => {
          console.log('resolving', ant.id)
          dispatch({ type: UPDATE_ANT, antId: ant.id, antLoading: false, antWinLikelihood: winLikelihood })

          // we don't have to do anything with this data
          resolve({ antId: ant.id, winLikelihood})
        }
        const generator = generateAntWinLikelihoodCalculator()
        generator(cb)
      }))
    }



    await Promise.all(antPromises)
    dispatch({ type: END_RACE })
  }
}

