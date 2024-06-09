'use client'
import { FC, useEffect } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useUpdateUserDataMutation } from "@/redux/features/user/userApi";

interface User {
  id: string,
  name: string,
  email: string,
  age: number
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required."),
  name: Yup.string().required("Name required."),
  age: Yup.number().required("Age required.").min(1, "Age minimum is 1.")
})

const UserDetailPage: FC<{user: User}> = ({user}: {user: User}) => {
  const [updateUser, {data, error, isSuccess}] = useUpdateUserDataMutation();
  const router = useRouter();

  useEffect(() => {
    if(isSuccess){
      const message = data?.message || "User updated successfully!"
      toast.success(message);
      router.push(`/users`)
      router.refresh()
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error("Please login to continue");
      }
    }
  }, [isSuccess, error, data, router])

  const formik = useFormik({
    initialValues: {id: user?.id, email: user?.email, name: user?.name, age: user?.age},
    validationSchema: schema,
    onSubmit: ({id, email, name, age}) => {
      updateUser({id, email, name, age})
    }
  })

  const { errors, touched, values, handleChange, handleSubmit } = formik
  return (
    <Container sx={{ paddingY: "30px" }}>
      <Typography variant="h5" component="h1">User Detail</Typography>
      ID : {values.id}
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
          InputProps={{ inputProps: { value: values.email } }}
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
          name="name"
          label="Name"
          type="text"
          id="name"
          InputProps={{ inputProps: { value: values.name } }}
          error={errors.name && touched.name ? true : false}
          helperText={errors.name && touched.name ? errors.name : ''}
        />
        <TextField
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="age"
          label="Age"
          type="number"
          id="age"
          InputProps={{ inputProps: { min: 1, value: values.age } }}
          error={errors.age && touched.age ? true : false}
          helperText={errors.age && touched.age ? errors.age : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          // onClick = {handelLogin}
        >
          Update
        </Button>
      </form>
    </Container>
  );
}

export default UserDetailPage;