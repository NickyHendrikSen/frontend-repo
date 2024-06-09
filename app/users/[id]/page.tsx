'use client'
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { FC } from "react";
import { useFetchSingleUserDataQuery } from "@/redux/features/user/userApi";
import UserDetailPage from "@/app/components/User/UserDetailPage";
import Header from "@/app/components/Header";

interface UserDetailProps {
  params: {
    id: string
  }
}

const UserDetail: FC<UserDetailProps> = (props: UserDetailProps) => {
  const { data: userData, isFetching } = useFetchSingleUserDataQuery(props.params.id)
  
  return (
    <>
      <Header />
      {
        isFetching ? 
        <Box sx={{width: "100%", height: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <CircularProgress size={"100px"}/>
        </Box>
        :
        userData && userData.user ? <UserDetailPage user={userData?.user}/> :
        
        <Box sx={{width: "100%", height: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Typography variant="h5">User not found</Typography>
        </Box>
      }
    </>
  );
}

export default UserDetail;