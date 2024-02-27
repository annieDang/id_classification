import axios from 'axios';

const server = axios.create({
	baseURL : 'http://127.0.0.1:6789/',
	headers : {
		'Content-type' : 'application/json',
	},
});

export const upload = (data, config = {}) => {
	let formData = new FormData();
	const { file } = data;
	formData.append('file', file);
	return server.post('/api/classify', formData, config);
};
