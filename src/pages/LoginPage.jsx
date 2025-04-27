import React, { useState } from "react";

import { FTextField, FormProvider } from "../components/form/index.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth.jsx";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import emailRegex from "../utils/regex.jsx";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

export const imgRandom = Math.floor(Math.random() * 4) + 1;

const LoginPage = () => {
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <>
      <p className="absolute top-[25%] left-[5%] text-[#fff] uppercase xs:hidden text-[32px] z-50 font-bold">
        “If music be <br />
        the food or love
        <br />
        play on.” <br /> – William
        <br /> Shakespeare
      </p>
      <p className="absolute top-[75%] left-[5%] xs:hidden text-[#fff] text-[16px] z-50">
        Explore and discover music, become a better artist,
        <br />
        or listen to music – you can do it all here.
      </p>
      <img
        width="50%"
        style={{ opacity: 0.7 }}
        src={`/img/login/login-img${imgRandom}.jpg`}
        alt="girl"
        className="xs:hidden lg:flex md:flex"
      />
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mx: 1,
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Typography variant="h3" color="primary">
              Log In
            </Typography>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}

            <FTextField name="email" label="Email" />

            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ my: 2 }}
          >
            <Link component={RouterLink} variant="subtitle1" to="/">
              Forgot password?
            </Link>
          </Stack>

          <Alert color="primary" severity="info" sx={{ mb: 3 }}>
            Don't have an account?{" "}
            <Link variant="body6" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ borderRadius: 2 }}
          >
            Login
          </LoadingButton>
        </FormProvider>
      </Container>
    </>
  );
};

export default LoginPage;
