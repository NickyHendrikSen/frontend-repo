import Image from "next/image";
import styles from "./page.module.css";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";
import Link from "next/link";

export default async function UserPage() {
  const myDataQ = await fetch(process.env.NEXT_PUBLIC_API_URL + "fetch-user-data", { next: { revalidate: 0 } })
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
              <TableCell align="left" sx={{color: "white"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((d: any, i: number) => (
              <TableRow key={i}>
                <TableCell align="left">{d.name}</TableCell>
                <TableCell align="left">{d.email}</TableCell>
                <TableCell align="left">{d.age}</TableCell>
                <TableCell align="left">
                  <Link href={`/users/${d.id}`}>Update</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}