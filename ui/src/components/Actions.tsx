import { styled } from "@mui/material";

export const Actions = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${({ theme }) => theme.spacing(1)};

  padding: ${({ theme }) => theme.spacing(1)};
  margin: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => `
    ${theme.breakpoints.down("md")} {
      column-gap: ${theme.spacing(1)};
      padding: 0px;
      margin: 0px;
    }
  `}
`;
