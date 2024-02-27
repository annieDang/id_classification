import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { purple } from '@mui/material/colors';
import Canvas from '../Canvas/Canvas';
import defaultImage from '../../image/select-image-vector.jpeg';

const ImageViewer = (props) => {
	const { image, redraw, roi } = props;
	const [ previewImage, setPreviewImage ] = useState(null);

	useEffect(
		() => {
			if (!image) {
				setPreviewImage(undefined);
				return;
			}
			// create the preview
			const objectUrl = URL.createObjectURL(image);
			setPreviewImage(objectUrl);

			// free memory when ever this component is unmounted
			return () => URL.revokeObjectURL(objectUrl);
		},
		[ props ]
	);

	return (
		<div>
			<Box
				sx={{
					width           : '100%',
					backgroundColor : purple[20],
				}}
				display="flex"
				justifyContent="center"
			>
				<Stack direction="row" alignItems="center" spacing={2}>
					{previewImage && (
						<Canvas
							imageSrc={previewImage}
							redraw={redraw}
							roi={roi}
						/>
					)}
					{!previewImage && <img src={defaultImage} width={500} height={500} alt="Canvas Logo" />}
				</Stack>
			</Box>
		</div>
	);
};

export default ImageViewer;
