export const UPDATE_FARMING_LEVEL = "UPDATE_FARMING_LEVEL";

export const updateFarmingLevel = (level) => ({
  type: UPDATE_FARMING_LEVEL,
  farmingLevel: level,
});

export const UPDATE_POTIONS = "UPDATE_POTIONS";
export const updatePotions = () => ({
  type: UPDATE_POTIONS,
});

export const UPDATE_HERBS = "UPDATE_HERBS";
export const updateHerbs = () => ({
  type: UPDATE_HERBS,
});
