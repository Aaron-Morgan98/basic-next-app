
import { Container, Typography, Card, CardContent,  Grid, List, ListItem, ListItemText, Box } from '@mui/material';

import MoreInfoCards from "../../../components/moreInfoCards";
import {getDataById} from "../../../../api/getProductById";


export default async function MoreInfo({
  params: {id},
} : {
  params:{
    id:number;
  };
}) {


  const data = await getDataById(id);

  console.log(data);

  if (!data) {
    return (
      <Container>
        <Typography variant="h6">No data found for ID: {id}</Typography>
      </Container>
    );
  }

  return (
    <MoreInfoCards id={data.id} title={data.name} body={data.data} />
  );
}

