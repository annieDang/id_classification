import React, { useRef, useEffect } from 'react';

const WIDTH = 500;
const HEIGHT = 500;

const Canvas = ({ imageSrc, redraw, roi }) => {
	const canvasRef = useRef(null);

	useEffect(
		() => {
			if (!canvasRef.current) {
				return;
			}
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			draw(context);
		},
		[ imageSrc, redraw ]
	);

	const draw = (context) => {
		const base_image = new Image();
		base_image.src = imageSrc;

		base_image.onload = function() {

			context.canvas.width = WIDTH;
			context.canvas.height = HEIGHT;
			context.drawImage(base_image, 0, 0, WIDTH, HEIGHT);

			if(roi) drawRect(base_image);
		};
	};
	
	const drawRect = ({ width, height }) => {
		if (!canvasRef.current || !roi) {
			return;
		}
		
		const left = Math.floor(roi[0] * 500/width);
		const top = Math.floor(roi[2] * 500/height);
		const w = Math.floor(roi[1]* 500/width) - left;
		const h = Math.floor(roi[3]* 500/height) - top;
		
		
		
		console.log(width, height)
		console.log(roi)
		console.log(left, top, w, h)
		
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (context) {
			context.strokeStyle = 'red';
			context.beginPath();
			context.rect(left, top, w, h);
			context.stroke();
		}
	};

	return <canvas ref={canvasRef} />;
};

export default Canvas;
