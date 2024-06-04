
import {  Stack, Step, StepConnector,  StepLabel, Stepper, styled } from "@mui/material"

import {
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Handshake as HandshakeIcon
} from '@mui/icons-material';
import { stepConnectorClasses } from '@mui/material/StepConnector';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const StepperComponent = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
            <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
        ))}
        </Stepper>
    </Stack>
  )
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
        'linear-gradient( 95deg, rgb(151,199,244) 0%, rgb(46,143,234) 50%, rgb(32,100,163) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
        'linear-gradient( 95deg, rgb(151,199,244) 0%, rgb(46,143,234) 50%, rgb(32,100,163) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
  
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <InventoryIcon />,
      2: <LocalShippingIcon />,
      3: <HandshakeIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 95deg, rgb(151,199,244) 0%, rgb(46,143,234) 50%, rgb(32,100,163) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 95deg, rgb(151,199,244) 0%, rgb(46,143,234) 50%, rgb(32,100,163) 100%)',
    }),
  }));