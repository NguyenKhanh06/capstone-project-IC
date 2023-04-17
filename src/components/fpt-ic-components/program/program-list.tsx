import React, { FC } from "react";
import Box from "@mui/material/Box";
import Slider, { Settings } from "react-slick";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import IconArrowForward from "@mui/icons-material/ArrowForward";
import { data } from "./program.data";
import ProgramCardItem from "./program-card-item";
import { Grid } from "@mui/material";
import BaseBreadCrumbs from "../breadscrumbs/breadcrumbs";

interface SliderArrowArrow {
  onClick?: () => void;
  type: "next" | "prev";
  className?: "string";
}

const ProgramList: FC = () => {
  return (
    <Box
      id="programs"
      sx={{
        pt: {
          xs: 6,
          md: 15,
        },
        pb: {
          xs: 8,
          md: 12,
        },
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <BaseBreadCrumbs
          previousLink={[{ href: "/", name: "Homepage" }]}
          currentLink={"Programs"}
        />
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 1, sm: 6, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <ProgramCardItem
                key={String(item.id)}
                item={item}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProgramList;
