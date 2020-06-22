import {
  UPDATE_FARMING_LEVEL,
  UPDATE_POTIONS,
  UPDATE_HERBS,
} from "../actions/herblore";

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
    case UPDATE_FARMING_LEVEL:
      return {
        ...state,
        farmingLevel: action.farmingLevel,
      };
    case UPDATE_POTIONS:
      return {
        ...state,
        potions: action.potions,
      };
    case UPDATE_HERBS:
      return {
        ...state,
        herbs: action.herbs,
      };
    default:
      return state;
  }
};

export default herblore;
