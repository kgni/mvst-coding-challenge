import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// setting the default auth token for every axios calls. This is not a good idea in an actual application, however it makes it easier to work with in development. I don't have to set the header in a specific config or in each fetch.
// axios.defaults.headers.common = {
// 	Accept: 'application/vnd.github+json',
// 	'Content-Type': 'application/json',
// 	Authorization: `bearer ${process.env.API_ACCESS_TOKEN}`,
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { searchTerm } = req.query;
	const data = await axios.get(
		`https://api.github.com/search/users?q=${searchTerm}`,
		{
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
			},
		}
	);
	console.log(data.data);
	res.status(200).json(data.data);
};