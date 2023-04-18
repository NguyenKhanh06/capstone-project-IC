import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Select } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { ReachFunction } from "react-photo-view/dist/types";

interface Props {
  children: ReactNode;
}
const SelectComponent: FC<Props> = ({ children }) => {
  return (
    <Select
      //   IconComponent={KeyboardArrowDownRoundedIcon}
      sx={{
        width: "40%",
        borderRadius: "25px",
        height: "60px",
        backgroundColor: "#D9D9D9",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
        "& .MuiSvgIcon-root": {
          color: "primary.main",
          width: "45px",
          height: "45px",
          right: "30px",
          top: "15%",
        },
      }}
    >
      {children}
    </Select>
  );
};

export default SelectComponent;
