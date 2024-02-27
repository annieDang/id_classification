import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgressWithLabel from '../Progress/CircularStatic';
import Box from '@mui/material/Box';

export default function ProgressPopup({ open, onClose }) {
	const handleClose = () => {
		onClose(false);
	};
	return (
		<React.Fragment>
			<Dialog open={open} onClose={handleClose} maxWidth="xs">
				<DialogTitle justifyContent={true}>Progress</DialogTitle>
				<DialogContent>
					<DialogContentText>Getting result from server...</DialogContentText>
					<Box sx={{ flexGrow: 1 }} justify-content="center">
						<CircularProgressWithLabel />
					</Box>
				</DialogContent>
				{/* <DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions> */}
			</Dialog>
		</React.Fragment>
	);
}
