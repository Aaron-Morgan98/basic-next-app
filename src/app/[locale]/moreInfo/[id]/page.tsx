import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent,  Grid, List, ListItem, ListItemText, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import MoreInfoCards from "../../../components/moreInfoCards";
import {getDataById} from "../../../../api/getProductById";


export default async function MoreInfo({
  params: {id},
} : {
  params:{
    id:string;
  };
}) {


  const data = await getDataById(id);

  console.log(data);

  // turn the JSON data into a more readable format by splitting into key value pairs
  // const renderDataList = (data: Record<string, any>) => {
  //   return (
  //     <List>
  //       {Object.entries(data).map(([key, value]) => (
  //         <ListItem key={key}>
  //           <ListItemText primary={key} secondary={String(value)} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   );
  // };

  // const handleBackButtonClick = () =>{
  //   router.push("/");
  // };

  return (
        <MoreInfoCards id={data.id} name={data.name} data={data.data} />
  );
}
