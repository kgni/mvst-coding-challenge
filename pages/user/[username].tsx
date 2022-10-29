import React from 'react';
import { useRouter } from 'next/router';
const UserPage = () => {
	const router = useRouter();

	const { username } = router.query;

	console.log(username);
	return <div>{username}</div>;
};

export default UserPage;
