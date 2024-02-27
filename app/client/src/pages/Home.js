import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import ImageViewer from '../components/Stack/ImageViewer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import { upload } from '../apis/fetch';


import FormControl from '@mui/material/FormControl';
import ProgressPopup from '../components/Popup/ProgressPopup';

const styles = (theme) => ({
	button : {
		margin : theme.spacing.unit,
	},
	input  : {
		display : 'none',
	},
});
const Input = styled('input')({
	display : 'none',
});

const Home = (props) => {
	const [ classified, setClassified ] = useState([]);

	const [ image, setImage ] = useState(null);
	const [ redraw, setRedraw ] = useState(false);
	const [imageName, setImageName] = useState('');
	const [ roi, setRoi ] = useState('');

	const [ hasToUpdate, setHasToUpdate ] = useState(false);

	const [ openProgressPopup, setOpenProgressPopup ] = React.useState(false);


	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setImage(null);
			return;
		}
		const file = e.target.files[0];
		setImage(file);
		setHasToUpdate(false);
		setRedraw(false);
		setRoi();
		setImageName(file.mozFullPath);
		uploadHandler(file)
	};

	const uploadHandler = (file) => {
		const data = {
			file        : file,
		};
		setOpenProgressPopup(true);
		upload(data)
			.then((response) => {
				const { data: {predict, roi} } = response;
				setClassified(predict)
				setRoi(roi);
				// setHasToUpdate(!hasToUpdate);
				setRedraw(!redraw);
				setOpenProgressPopup(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (event) => {
		setHasToUpdate(!hasToUpdate);
	};

	const onCloseProgressPopup = () => {
		setOpenProgressPopup(false);
	};


	return (
		<div>
			<div>
				<Grid container spacing={2}>
					<Grid item xs={4} md={6}>
						<Grid container justify="center">
							<Grid item xs={12} height={70}>
								<Box sx={{ width: '100%', m: 2 }}>
									<Box>
										<Stack direction="row" justifyContent="center" alignItems="center">
											<p>Please upload your <strong> document!</strong></p>
											<p>{imageName}</p>
										</Stack>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<ImageViewer
									image={image}
									hasToUpdate={hasToUpdate}
									redraw={redraw}
									roi={roi}
								/>

								<Box
									sx={{
										width  : '100%',
										height : 100,
									}}
									display="flex"
									justifyContent="center"
								>
									<Stack direction="row" alignItems="center" spacing={2}>
										<label htmlFor="contained-button-file">
											<Input
												accept="image/*"
												id="contained-button-file"
												multiple
												type="file"
												onChange={onSelectFile}
												onClick={(e) => setImage(null)}
											/>
											<Button
												sx={{ height: 40, width: 200 }}
												variant="outlined"
												component="span"
												startIcon={<PhotoCamera />}
											>
												Select
											</Button>
											
										</label>
									</Stack>
								</Box>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={8} md={6}>
						{image && (
							<Grid container>
								<Grid item xs={10} direction="column" alignItems="left" justifyContent="left">
									{classified }
								</Grid>
								<Grid item xs={2} direction="column" alignItems="right" justifyContent="right">
									<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
										{/* empty */}
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									
								</Grid>
							</Grid>
						)}
					</Grid>
				</Grid>
				<ProgressPopup open={openProgressPopup} onClose={onCloseProgressPopup} />
			</div>
		</div>
	);
};

Home.propTypes = {
	classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
