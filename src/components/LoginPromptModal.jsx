import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#1a1a1a',
          color: 'white',
          borderRadius: 3,
          minWidth: { xs: '90%', sm: '400px' }
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        Login Required
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>
        <Typography align="center">
          Please login to enjoy unlimited music streaming
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ 
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              opacity: 0.8
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleLogin} 
          variant="contained"
          sx={{ 
            bgcolor: '#27A3A3',
            '&:hover': {
              bgcolor: '#1f8a8a'
            }
          }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPromptModal; 