import React, { PropsWithChildren, useState, ReactText } from "react";
import CloseButton from "../Buttons/CloseButton";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

interface IProps {
	onClose: () => void;
	details?: string;
}

const SnackbarContentLayout = (props: PropsWithChildren<IProps>) => {
	const [snackbarInstance, setSnackbarInstance] = useState<ReactText>();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleCloseDetails = () => {
		closeSnackbar(snackbarInstance);
		setSnackbarInstance(undefined);
	};

	const handleOpenDetails = () => {
		setSnackbarInstance(
			enqueueSnackbar(props.details, {
				variant: "error",
				persist: true,
				anchorOrigin: {
					horizontal: "right",
					vertical: "top",
				},
				action: <SnackbarContentLayout onClose={handleCloseDetails} />,
			})
		);
	};

	return (
		<>
			{React.Children.toArray(props.children)}
			{props.details && (
				<Button
					color="inherit"
					onClick={() =>
						snackbarInstance ? handleCloseDetails() : handleOpenDetails()
					}
				>
					{snackbarInstance ? "Moins" : "Plus"}
				</Button>
			)}
			<CloseButton onClick={props.onClose} />
		</>
	);
};

export default SnackbarContentLayout;
