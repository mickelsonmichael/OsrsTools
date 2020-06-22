export const UPDATE_FARMING_LEVEL = "UPDATE_FARMING_LEVEL";

export const updateFarmingLevel = (level) => ({
  type: UPDATE_FARMING_LEVEL,
  farmingLevel: level,
});
