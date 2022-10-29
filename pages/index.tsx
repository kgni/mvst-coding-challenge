import { use } from 'react';
import { motion } from 'framer-motion';
import Search from '../components/Search/Search';

export default function Home() {
	return (
		<main className="h-screen text-center bg-primary px-4">
			<Search />
		</main>
	);
}
