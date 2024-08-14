"use client";
import { Container, Typography, Card, CardContent,  Grid, List, ListItem, ListItemText, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';


interface Props{
    id: string | null;
    name: string;
    data: any;

}

export default function MoreInfoCards({id, name, data}: Props){
    const t = useTranslations("MoreInfo");


   const dataId = useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramId = urlParams.get("id");

        return() => {
            paramId;
        } 
    },[]);

    // const [data, setData] = useState<any | null>(null);
    // const [id, setId] = useState<string | null>(null);
    // const [name, setName] =useState<string | null>(null);

    return(
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
                            {data}
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
};