import React, { useRef } from 'react';
import { Button } from '@material-ui/core'
import { useAuth } from '../../context/auth';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from '@unform/web'
import InputText from '../../shared/components/form/InputText';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const classes = useStyles();

  const handleSignIn = async (data: any) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido!').required('O email é obrigatório!'),
        password: Yup.string().min(3, 'A senha deve ter ao mínimo 3 caracteres!').required('A senha é obrigatória!'),
      });
      await schema.validate(data, {
        abortEarly: false
      });
      await signIn();
    }
    catch (error) {
      if (error instanceof Yup.ValidationError) {

        const errorsMessage: any = {} as any;

        console.log(error);
        error.inner.forEach((err) => {
          errorsMessage[err.path] = err.message;
        });

        formRef.current?.setErrors(errorsMessage);

      }
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form className={classes.form} noValidate onSubmit={handleSignIn} ref={formRef}>
            <InputText
              name="email"
              textFieldProps={{
                variant: "outlined",
                margin: "normal",
                fullWidth: true,
                id: "email",
                label: "Email Address",
                autoComplete: "email",
                autoFocus: true,
              }}

            />
            <InputText
              name="password"
              textFieldProps={{
                variant: "outlined",
                margin: "normal",
                fullWidth: true,
                label: "Password",
                type: "password",
                id: "password",
                autoComplete: "current-password",
              }}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
}


export default SignIn;