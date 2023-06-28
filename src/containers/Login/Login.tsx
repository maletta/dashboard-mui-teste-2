import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  styled,
} from '@mui/material';
import logo from 'assets/logo-vipe-principal-menor.png';
import { useAuth } from 'context/auth-context';
import { postAuth } from 'services/api/portalVipe';
import { z } from 'zod';

import SplashScreen from 'components/SplashScreen/SplashScreen';
import { useLocalStorage } from 'utils/localstorage';

import * as L from './styles';

const FormContainer = styled('form')`
  width: 100%;
`;

const loginFormSchema = z.object({
  email: z.string().nonempty('E-mail não informado').email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  rememberMe: z.boolean(),
});

type ILoginFormData = z.infer<typeof loginFormSchema>;

// Referência de validação com formik e yup
// https://fullstacksoup.blog/2021/09/27/react-material-form-validation-with-formik/

// Referência de validação react-hook-form, zod, mui
// https://levelup.gitconnected.com/reareact-hook-form-with-mui-examples-a3080b71ec45

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { authState, signIn } = useAuth();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const localStorage = useLocalStorage();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<ILoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: localStorage.getItem('USER-LOGIN') || '',
      password: '',
      rememberMe: localStorage.getItem('USER-LOGIN') ? true : false,
    },
    resolver: zodResolver(loginFormSchema),
  });

  function handleLoginClick(data: ILoginFormData) {
    console.log(JSON.stringify(data));

    if (data.rememberMe) {
      localStorage.setItem('USER-LOGIN', data.email);
    } else {
      localStorage.removeItem('USER-LOGIN');
    }

    setIsFetching(true);

    return postAuth({
      email: data.email,
      senha: data.password,
    })
      .then(({ data: { data } }) => {
        console.log('enviando login ', data);
        console.log(data.token);
        return signIn(data.token);
      })
      .catch(err => {
        console.log(err);
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
          <FormContainer onSubmit={handleSubmit(handleLoginClick)}>
            <L.LogoContainer>
              <img src={logo} alt="logo da empresa escrito vipe" />
            </L.LogoContainer>
            <FormControl variant="standard" fullWidth error={!!errors.email}>
              <InputLabel htmlFor="standard-adornment-user">E-mail</InputLabel>
              <Input
                autoComplete="off"
                id="email"
                type="email"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="user text" tabIndex={-1}>
                      <AccountCircleRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                {...register('email')}
              />
              <FormHelperText id="helper-email" sx={{ minHeight: '1.25rem', fontSize: '0.75rem' }}>
                {errors.email?.message || ' '}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" fullWidth error={!!errors.password}>
              <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
              <Input
                id="password"
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
                {...register('password')}
              />
              <FormHelperText id="helper-password" sx={{ minHeight: '1.25rem', fontSize: '0.75rem' }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>

            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <FormControlLabel
                control={<Checkbox {...register('rememberMe')} defaultChecked={defaultValues?.rememberMe} />}
                label="Lembrar de mim"
              />
              <LoadingButton
                variant="contained"
                color="primary"
                loading={isFetching}
                loadingPosition="start"
                type="submit"
                startIcon={<LoginIcon />}
              >
                Entrar
              </LoadingButton>
            </Grid>
          </FormContainer>
        </Grid>
      </Grid>
    </L.LoginContainer>
  );
};

export default Login;
