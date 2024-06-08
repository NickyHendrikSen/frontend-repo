'use client'

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required."),
  password: Yup.string().required("Password required.").min(8, "Password length minimum is 8."),
})

export default function Login() {
  const [login, {data, error, isSuccess}] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if(isSuccess){
      const message = data?.message || "Logged in successfully!"
      toast.success(message);
      router.push(`/`)
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data, router])

  const formik = useFormik({
    initialValues: {email: "", password: ""},
    validationSchema: schema,
    onSubmit: ({email, password}) => {
      login({email, password})
    }
  })

  const { errors, touched, values, handleChange, handleSubmit } = formik

  return (
    <Container sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ padding: "30px", maxWidth: "80%", width: "500px", boxShadow: 2, textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            error={errors.email && touched.email ? true : false}
            helperText={errors.email && touched.email ? errors.email : ''}
          />
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password && touched.password ? true : false}
            helperText={errors.password && touched.password ? errors.password : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            // onClick = {handelLogin}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
