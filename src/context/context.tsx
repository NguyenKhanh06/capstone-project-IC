import { create } from 'lodash';
import { createContext, useState } from 'react';
import { Post } from 'src/interfaces/post';

type ColorMenuContextType = {
  colorMenu: string;
  setColorMenu: React.Dispatch<React.SetStateAction<string>>;
};

type PostContextType = {
  posts: Post[];
  refreshPost: () => void;
};

export const ColorMenuContext = createContext<ColorMenuContextType>({
  colorMenu: 'primary',
  setColorMenu: () => {},
});

export const PostContext = createContext<PostContextType>({
  posts: [],
  refreshPost: () => {},
});
