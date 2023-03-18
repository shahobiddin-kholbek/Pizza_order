import * as React from 'react';
import propTypes from "prop-types";
import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';
import InfoIcon from "@mui/icons-material/Info";
import { Typography, Box } from '@mui/material';

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: propTypes.element,
  in: propTypes.bool,
  onEnter: propTypes.func,
  onExited: propTypes.func,
};

export default function InfoPopper() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  return (
    <div className='popper'>
      <button className="infoModalBtn" aria-describedby={id} type="button" onClick={handleClick}>
      <InfoIcon sx={{ width: "35px", height: "35px" }} />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition style={{ position: 'absolute', zIndex: 99,bottom: 0, right: 0, top: 'unset', left: 'unset' }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} >
            <Box sx={{ border: 1,borderRadius: 2, zIndex: 99, p: 1, bgcolor: 'black', color: 'white', width: '180px', height: '190px', ml: '-160px' }}>
            <Typography variant='body1'>Энерг. ценность {} ккал</Typography>
            <Typography variant='body1'>Белки</Typography>
            <Typography variant='body1'>Жиры</Typography>
            <Typography variant='body1'>Углеводы</Typography>
            <Typography variant='body1'>Диаметр</Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}