import { IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Paper, Stack } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function AdminPage() {
  const { t } = useTranslation();

  return (
    <Grid item>
      <Paper className="mainPaperPage">
        <Stack className="headerTitlePage">
          <Box className="headerLeft">
            <IconButton>
              <AdminPanelSettingsIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("Admin.title")}
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Box className="containerPage" sx={{ paddingTop: "0" }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <IconButton disabled>
                {/*   <LockIcon sx={{ color: "text.secondary" }} /> */}
              </IconButton>
              <Typography
                variant="h8"
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  padding: "0",
                  height: "20%",
                }}
              >
                {t("Admin.serialNumber")}
              </Typography>
              <TextField
                sx={{
                  width: "30%",
                }}
                fullWidth
                id="standard-basic"
                autoComplete="off"
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default AdminPage;
