import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { fetchSettings } from "../requests/settings";
import { Typography, styled, Container } from "@mui/material";
import { getErrorMessage } from "../requests/utils";
import { useSnackbar } from "notistack";

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Settings: FunctionComponent = (): ReactElement => {
  const [settings, setSettings] = useState<Record<string, string>>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchSettings()
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => {
        err.json().then((resp: any) => {
          enqueueSnackbar(getErrorMessage(resp), {
            variant: "error",
          });
        });
      });
  }, []);

  return (
    <>
      {settings && (
        <StyledContainer>
          <Typography variant="body1" gutterBottom={true}>
            REPO_ROOT: {settings.repo_root}
          </Typography>

          <Typography variant="body1" gutterBottom={true}>
            SSH_ROOT: {settings.ssh_root}
          </Typography>

          <Typography variant="body1" gutterBottom={true}>
            PRIVATE_KEY: {settings.private_key}
          </Typography>
        </StyledContainer>
      )}
    </>
  );
};

export default Settings;
