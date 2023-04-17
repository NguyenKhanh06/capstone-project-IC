import { createContext, useState } from 'react';

type ColorMenuContextType = {
  colorMenu: string;
  setColorMenu: React.Dispatch<React.SetStateAction<string>>;
};

export const ColorMenuContext = createContext<ColorMenuContextType>({
  colorMenu: 'primary',
  setColorMenu: () => {},
});
