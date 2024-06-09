import { FC } from "react";
import Header from "./components/Header";
import { Container } from "@mui/material";

const Home: FC = () => {
  
  return (
    <>
      <Header />
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "5em"}}>
        THIS IS HOME
      </Container>
    </>
  );
}

export default Home;