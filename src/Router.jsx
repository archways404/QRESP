import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import {
	isRegistered,
	register,
	unregisterAll,
} from '@tauri-apps/plugin-global-shortcut';

function Router() {
	const [greetMsg, setGreetMsg] = useState('');
	const [name, setName] = useState('');
	const [isVisible, setIsVisible] = useState(true); // Track visibility state locally

	async function greet() {
		setGreetMsg(await invoke('greet', { name }));
	}

	// Define the toggle function outside of useEffect
	const toggleVisibility = async () => {
		setIsVisible((prev) => !prev);
		await invoke('toggle_window_visibility');
	};

	useEffect(() => {
		const setupShortcut = async () => {
			const shortcut = 'CmdOrCtrl+Shift+L';

			// Register the shortcut only if it isn’t already registered
			const registered = await isRegistered(shortcut);
			if (!registered) {
				await register(shortcut, toggleVisibility); // Register with toggleVisibility function
			}
		};

		setupShortcut();

		// Cleanup on component unmount
		return () => {
			unregisterAll();
		};
	}, []); // Empty dependency array to run only once on mount

	return (
		<main>
			<h1 className="text-blue-500">Welcome to Tauri + React</h1>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}

export default Router;
