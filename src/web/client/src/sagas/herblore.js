//   getPotionsAndHerbs() {
//     Promise.all([this.getPotions(), this.getHerbs()]).then(
//       ([potions, herbs]) => {
//         let sortedPotions = potions.sort((a, b) => a.level - b.level);
//         let xps = {};
//         potions.map(
//           (potion) => (xps[potion.id] = { clean: 0, grimy: 0, seeds: 0 })
//         );

//         this.setState({
//           potions: sortedPotions,
//           herbs: herbs,
//           xps: xps,
//           yieldCalculation: true,
//         });
//       }
//     );
//   }
