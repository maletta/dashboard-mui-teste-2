import { styled } from '@mui/material';

const SplashScreenStyles = styled('div')`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 48px;
    height: 48px;
    display: block;
    margin: 15px auto;
    position: relative;
    color: ${({ theme }) => theme.palette.primary.main};
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after,
  .loader::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 50%;
    transform: scale(0.5) translate(0, 0);
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    animation: animloader 1s infinite ease-in-out;
  }
  .loader::before {
    background-color: #000;
    transform: scale(0.5) translate(-48px, -48px);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes animloader {
    50% {
      transform: scale(1) translate(-50%, -50%);
    }
  }
`;

export { SplashScreenStyles };
