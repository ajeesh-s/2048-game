import React from "react";

export const KEYS = { up: 38, down: 40, left: 37, right: 39 }

export const cloneDeep = (data) => JSON.parse(JSON.stringify(data));

export const useEventHandler = (event, handler, passive = false) => {
  React.useEffect(() => {
    window.addEventListener(event, handler, passive);

    return () => {
      window.removeEventListener(event, handler, passive);
    };
  });
};

export const isValueExist = (items, value = 0) => {// check value exists in the game data
  let isExists = false;

  for (let i = 0; i < items.length; i++) {
    isExists = items[i].some((i) => i === value);
    if (isExists) break;
  }
  return isExists;
};

export const getNewPosition = () => { //  for getting the random position
  const rowPosition = Math.floor(Math.random() * 4);
  const colPosition = Math.floor(Math.random() * 4);
  return [rowPosition, colPosition];
};


export const addItemsInNewPosition = (newData) => {// add new values to random position
  let [rand1, rand2] = getNewPosition(newData);

  while (newData[rand1][rand2] !== 0) {
    [rand1, rand2] = getNewPosition(newData);
  }

  newData[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
  return newData;
};

export const getColour = (value) => {// for getting color of the cubicle
  switch (value) {
    case 2: return '#c74876';
    case 4: return '#f9c56e';
    case 8: return '#f83f4e';
    case 16: return '#573a2e';
    case 32: return '#0b95db';
    case 64: return '#c20c59';
    case 128: return '#b72a94';
    case 256: return '#7f5ab3';
    case 512: return '#274d7e';
    case 1024: return '#36733';
    case 2048: return '#123429';
    default: return '#3a98a3';
  }
}
export const alertTypes = { START: 1, GAMEOVER: 2, INSTRUCTIONS: 3, WON: 4, HIGHSCORE: 5, MILESTONE:6 }
export const getMaxValue = (items) => {// getting max value in the game data
  let maxValue = 0;
  let val;
  for (let i = 0; i < items.length; i++) {
    val = Math.max.apply(Math, items[i].map(data => data));
    if (maxValue<val)  maxValue =val;
  }
  return maxValue;
}
