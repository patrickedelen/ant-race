import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk'

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
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}


export interface Ant {
  name: string
  length: number
  color: string
  weight: number
  id: string
  loading: boolean
  winLikelihood: number
}

export interface AntsState {
  ants: Ant[]
  hasInitialDataLoaded: boolean
  raceLoading: boolean
  firstRaceEnded: boolean
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
  raceLoading: false,
  firstRaceEnded: false
}

export const LOAD_INITIAL_DATA = 'load_initial_data'
export const START_RACE = 'race_start'
export const END_RACE = 'race_end'
export const UPDATE_ANT = 'ant_update'
export const RESET_ANTS = 'reset_ants'

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
        firstRaceEnded: false,
        ants: newAntsData,
      }
    case START_RACE:
      return {
        ...state,
        ants: state.ants.map((ant) => ({
          ...ant,
          winLikelihood: 0,
          loading: true
        })),
        raceLoading: true
      }
    case END_RACE:
      return {
        ...state,
        raceLoading: false,
        firstRaceEnded: true
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

// simulate the ant api call and set the state to finished when all return
export const startRaceCreator = (): ThunkAction<any, AntsState, unknown, AnyAction>  => {
  return async (dispatch, getState) => {
    const state = getState()

    dispatch({ type: START_RACE })

    const antPromises = []
    for (let ant of state.ants) {
      antPromises.push(new Promise((resolve) => {
        const cb = (winLikelihood: number) => {
          dispatch({ type: UPDATE_ANT, antId: ant.id, antLoading: false, antWinLikelihood: winLikelihood })

          // we don't have to do anything with this data but nice to have
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

