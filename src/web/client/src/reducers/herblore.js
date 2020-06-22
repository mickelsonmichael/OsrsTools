import { UPDATE_FARMING_LEVEL } from "../actions/herblore";

const initialState = {
  patches: [],
  potions: [],
  farmingCape: false,
  farmingLevel: 0,
  compostType: 3,
  secateurs: false,
  attasSeed: false,
  diaryBonus: 0,
  filter: {
    potionsToHide: [],
    showSeeds: true,
    showClean: true,
    showGrimy: true,
  },
  xps: {},
};

const herblore = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FARMING_LEVEL: {
      return {
        ...state,
        farmingLevel: action.farmingLevel,
      };
    }
    default:
      return state;
  }
};

export default herblore;
