import React, { useContext } from 'react';
import { Backdrop, Box, Typography } from '@mui/material';
import { LoadingContext } from "../../contexts/Context";
import CircularProgress from '@mui/material/CircularProgress';
const LoadingScreen = () => {
  const { progress } = useContext(LoadingContext);

  return (
    <Backdrop open={true}>
       <Box sx={{ position: 'relative', display: 'inline-flex' }}>
       <CircularProgress sx={{ color: 'primary.light'}} size={60} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        > {progress && <div>{`${progress}%`}</div>}</Typography>
      </Box>
    </Box>
    
     
    </Backdrop>
  );
};

export default LoadingScreen;

