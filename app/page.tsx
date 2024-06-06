import Image from "next/image";
import styles from "./page.module.css";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default async function Home() {
  const myDataQ = await fetch("http://localhost:8000/fetch-user-data", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5xZFE4VWlLOHU0RWpNcnRFSmRFIiwiaWF0IjoxNzE3NjcxNDQyLCJleHAiOjE3MTc3NTc4NDJ9.VU9demNJSxG1_j4EP3YkSJDlYjHmzgTLcXDzEGzyF3Q"
    }
  })
  const data = await myDataQ.json()
  
  return (
    <Container sx={{ paddingY: "30px" }}>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{backgroundColor: "black"}}>
              <TableCell align="left" sx={{color: "white"}}>Name</TableCell>
              <TableCell align="left" sx={{color: "white"}}>Email</TableCell>
              <TableCell align="left" sx={{color: "white"}}>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((d: any, i: number) => (
              <TableRow key={i}>
                <TableCell align="left">{d.name}</TableCell>
                <TableCell align="left">{d.email}</TableCell>
                <TableCell align="left">{d.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
