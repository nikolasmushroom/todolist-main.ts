import {SxProps} from "@mui/material";
import {TaskStatus} from "../../api/tasks-api";

export const filterButtonsContainerSx: SxProps = {
	display: 'flex',
	justifyContent: 'space-between'
};

export const getListItemSx = (status: TaskStatus): SxProps => ({
	p: 0,
	justifyContent: 'space-between',
	opacity: status === 2 ? 0.5 : 1
});
