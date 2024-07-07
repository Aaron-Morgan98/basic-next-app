"use client";
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent,  Grid, List, ListItem, ListItemText, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function MoreInfo() {
  const t = useTranslations("MoreInfo");

  const [data, setData] = useState<any | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [name, setName] =useState<string | null>(null);

  //handle grabbing the info from the main page and then setting them in the respective states
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const name = queryParams.get("name");
    const data = queryParams.get("data");

    //set and decode info sent over from main page
    if (id) {
      setId(id);
    }

    if(name){
        setName(decodeURIComponent(name));
    }

    if (data) {
      try {
        // data needs extra step of being parsed
        const decodedData = decodeURIComponent(data);
        const parsedData = JSON.parse(decodedData);
        setData(parsedData);
      } catch (err) {
        console.error('Failed to parse JSON data:', err);
        setData({});
      }
    }
  }, []);
  // turn the JSON data into a more readable format by splitting into key value pairs
  const renderDataList = (data: Record<string, any>) => {
    return (
      <List>
        {Object.entries(data).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText primary={key} secondary={String(value)} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
        <Typography variant="h4">
          {t("MORE_INFORMATION")}
        </Typography>
      </Box>
      
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ID
                </Typography>
                <Typography variant="body1">
                  {id || 'No ID available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t("NAME")}
                </Typography>
                <Typography variant="body1">
                  {name || 'No name available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom align="center">
                  {t("DETAILS")}
                </Typography>
                {data ? (
                  <Box sx={{ textAlign: 'center' }}>
                    {renderDataList(data)}
                  </Box>
                ) : (
                  <Typography>No data available</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      
    </Container>
  );
}
