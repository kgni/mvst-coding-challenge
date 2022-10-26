import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className="h-screen w-screen bg-primary flex justify-center items-center">
			<h1 className="text-white font-bold text-6xl select-none cursor-pointer hover:scale-110 duration-500">
				Hello World
			</h1>
		</div>
	);
}
