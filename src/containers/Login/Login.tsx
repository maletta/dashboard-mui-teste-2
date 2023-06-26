import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import logo from 'assets/logo-vipe-principal-menor.png';
import { useAuth } from 'context/auth-context';
import { postAuth } from 'services/api/portalVipe';

import SplashScreen from 'components/SplashScreen/SplashScreen';

import './login.mock';

import * as L from './styles';

// Referência de validação com formik e yup
// https://fullstacksoup.blog/2021/09/27/react-material-form-validation-with-formik/

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { authState, signIn } = useAuth();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleLoginClick() {
    setIsFetching(true);
    return postAuth({
      email: 'viniciusteste@teste.com.br',
      senha: 'senhateste',
    })
      .then(({ data: { data } }) => {
        return signIn(data.token);
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  useLayoutEffect(() => {
    console.log('use layout effect login ', authState);
    if (!authState.isLoading) {
      if (authState.user) {
        navigate('/dashboard');
      }
    }
  }, [authState]);

  if (authState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <L.LoginContainer>
      <Grid
        container
        sx={{
          maxWidth: '400px',
          height: '350px',
          boxShadow: 1,
          backgroundColor: '#fff',
          borderRadius: '6px',
          paddingTop: '70px',
          paddingBottom: '0px',
        }}
        p={4}
      >
        <Grid
          container
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <L.LogoContainer>
            <img src={logo} alt="logo da empresa escrito vipe" />
          </L.LogoContainer>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-user">E-mail</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="user text">
                    <AccountCircleRoundedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(prev => !prev);
                    }}
                    onMouseDown={() => {
                      console.log('on mouse down input');
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="helper-password">mensagem de erro</FormHelperText>
          </FormControl>

          <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={isFetching}
              loadingPosition="start"
              type="submit"
              startIcon={<LoginIcon />}
              onClick={handleLoginClick}
            >
              Entrar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </L.LoginContainer>
  );
};

export default Login;
