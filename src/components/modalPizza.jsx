import * as React from "react";
import Pizza from "./Pizza";
import { Container, Typography,Fade, Modal, Button, Box, Backdrop } from "@mui/material";
import { pizzaes } from "../data/data";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Button sx={{color: "black"}}  onClick={handleOpen}>
          <div key={pizzaes.id}>
            {pizzaes.img}
            <Typography variant="h6">Пицца {pizzaes.name}</Typography>
            <Typography
              sx={{ width: "270px", fontSize: "11px" }}
              variant="body1"
            >
              {pizzaes.filling}
            </Typography>
          </div>
      </Button>
      <Modal
        sx={{ zIndex: 1 }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Pizza />
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}
