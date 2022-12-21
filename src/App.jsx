import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './App.css';
import TableRow from './Components/TableRow';

function App() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const {
		data: informations = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ['informations'],
		queryFn: () => fetch('http://localhost:5000/info').then((res) => res.json()),
	});

	if (isLoading) {
		return (
			<div className="w-16 h-16 mx-auto border-4 border-dashed rounded-full animate-spin border-violet-800"></div>
		);
	}

	const handleAddData = (data) => {
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
				console.log(data);
			});
	};

	// Send Email

	const handleEmail = (info) => {
		fetch('http://localhost:5000/send-email', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(info),
    });
    
    toast('Email sent successfully')
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
							<TableRow key={info._id} index={index} info={info} handleEmail={handleEmail} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
