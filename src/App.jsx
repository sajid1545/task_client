import { useForm } from 'react-hook-form';
import './App.css';

function App() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleAddData = (data) => {
		console.log(data);

		const information = {
			Name: data.name,
			Phone: data.phone,
			Email: data.email,
			Hobbies: data.hobbies,
		};

		fetch('http://localhost:5000/info', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(information),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	return (
    <div className="App">
      {/* form */}
			<div className="flex items-center justify-center text-center bg-gray-900 text-gray-100">
				<form
					onSubmit={handleSubmit(handleAddData)}
					className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100 ng-untouched ng-pristine ng-valid">
					<label className="self-start text-xs font-semibold">Name</label>
					<input
						type="text"
						{...register('name', { required: true })}
						className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
					/>
					<label className="self-start mt-3 text-xs font-semibold">Phone Number</label>
					<input
						type="number"
						{...register('phone', { required: true })}
						className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
					/>
					<label className="self-start mt-3 text-xs font-semibold">Email</label>
					<input
						type="email"
						{...register('email', { required: true })}
						className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
					/>
					<label className="self-start mt-3 text-xs font-semibold">Hobbies</label>
					<input
						type="text"
						{...register('hobbies', { required: true })}
						className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
					/>
					<button
						type="submit"
						className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-400 text-gray-900">
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
