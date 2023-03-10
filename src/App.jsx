import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './App.css';
import TableRow from './Components/TableRow';
import UpdateModal from './Components/UpdateModal';

function App() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const [updateInfo, setUpdateInfo] = useState(null);

	const {
		data: informations = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ['informations'],
		queryFn: () => fetch('https://server-lake-pi.vercel.app/info').then((res) => res.json()),
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-16 h-16 mx-auto flex border-4 border-dashed rounded-full animate-spin border-violet-800"></div>
			</div>
		);
	}

	const handleAddData = (data) => {
		const information = {
			Name: data.name,
			Phone: data.phone,
			Email: data.email,
			Hobbies: data.hobbies,
		};

		fetch('https://server-lake-pi.vercel.app/info', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(information),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					toast.success('🦄 Info added successfully!', {
						position: 'top-center',
						autoClose: 4000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					});
					refetch();

					reset();
				}
			});
	};

	// Send Email

	const handleEmail = (info) => {
		fetch('https://server-lake-pi.vercel.app/send-email', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(info),
		});

		toast('Email sent successfully');
	};

	// delete info
	const handleDelete = (info) => {
		fetch(`https://server-lake-pi.vercel.app/info/${info._id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount > 0) {
					toast.success('Deleted successfully');
					refetch();
				}
			});
	};

	return (
		<div className="App">
			<h1 className="text-5xl my-4 font-extrabold">Lets get to know Each other</h1>

			{/* The button to open modal */}
			<label htmlFor="my-modal-3" className="btn btn-primary">
				Add Your Info
			</label>

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my-modal-3" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
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
			</div>

			{/* table */}

			<div className="overflow-x-auto w-full my-20">
				<table className="table w-full">
					<thead>
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th>
							<th>ID</th>
							<th>Name</th>
							<th>Phone Number</th>
							<th>Email</th>
							<th>Hobbies</th>
							<th>Sent Email</th>
							<th>Actions</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{informations.map((info, index) => (
							<TableRow
								key={info._id}
								index={index}
								info={info}
								handleEmail={handleEmail}
								handleDelete={handleDelete}
								setUpdateInfo={setUpdateInfo}
							/>
						))}
					</tbody>
				</table>
			</div>

			{updateInfo && <UpdateModal updateInfo={updateInfo} setUpdateInfo = {setUpdateInfo} refetch = {refetch} />}
		</div>
	);
}

export default App;
