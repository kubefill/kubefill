import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";
import { useScreenSize } from "../hooks";
import { LoadingActionIcon } from "./LoadingActionIcon";

const Root = styled(LoadingButton)`
  text-transform: none;
  border-radius: ${({ theme }) => theme.spacing(0.5)};
`;

export interface ILoadingActionProps extends LoadingButtonProps {
  icon: string;
  lgOnly?: boolean;
}

export const LoadingAction: FunctionComponent<ILoadingActionProps> = (
  props: ILoadingActionProps
): ReactElement => {
  const { children, icon, lgOnly, ...otherProps } = props;
  const size = useScreenSize();

  return (
    <>
      {size === "sm" && !lgOnly && (
        <LoadingActionIcon
          icon={icon}
          onClick={otherProps.onClick as () => void}
          loading={Boolean(otherProps.loading)}
        />
      )}
      {(size !== "sm" || lgOnly) && (
        <Root
          size="small"
          variant="outlined"
          disabled={"disabled" in otherProps ? otherProps.disabled : otherProps.loading}
          {...otherProps}
        >
          {children}
        </Root>
      )}
    </>
  );
};
