import axios from 'axios';

export const getData = async () => {
	const res = await axios.get('https://randomapi.com/api');
	return res;
};
