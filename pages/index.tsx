import Search from '../components/Search/Search';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>MVST - GITHUB</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<main className="h-screen text-center bg-primary px-4">
				<Search />
			</main>
		</>
	);
}
