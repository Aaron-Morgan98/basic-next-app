"use client";
import { Container, Typography, Card, CardContent, Grid, Box, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import DefaultButton from "../components/defaultButton";
import { useRouter } from "next/navigation";

interface Props {
  id: string | null;
  name: string;
  data: Record<string, any>;
}

export default function MoreInfoCards({ id, name, data }: Props) {
  const t = useTranslations("MoreInfo");
  const router = useRouter();

  const handleBackButtonClick = () =>{
    router.push("/");
  }

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
              {/* Split json data provided from data into key value pairs to be displayed */}
              {data ? (
                <Box sx={{ textAlign: 'center' }}>
                  {Object.entries(data).map(([key, value]) => (
                    <Typography variant="body1" key={key}>
                      {key}: {value}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography>No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction="row" mt={3} justifyContent="center">
            <DefaultButton
                click={() => handleBackButtonClick()}
                translation={t("BACK_BUTTON")}
            />
        </Stack>

    </Container>
  );
}
