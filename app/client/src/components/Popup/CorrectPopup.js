import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

export default function CorrectPopup(props) {
	const { onClose, open, selectedValue } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Correct the prediction</DialogTitle>
			<List sx={{ pt: 0 }}>
				{[ 'Bego', 'Bicon', 'Straumann' ].map((model) => (
					<ListItem button onClick={() => handleListItemClick(model)} key={model}>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
								<PlaylistAddCheckCircleIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={model} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}
