import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateModal = ({ updateInfo, handleUpdate }) => {
	
	

	return (
		<div>
			<input type="checkbox" id="update-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<div className="flex items-center justify-center text-center bg-gray-900 text-gray-100">
						<div
							// onSubmit={handleSubmit(handleUpdate)}
							className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100 ng-untouched ng-pristine ng-valid">
							<label className="self-start text-xs font-semibold">Name</label>
							<input
								type="text"
								defaultValue={updateInfo.Name}
								// {...register('name', { required: true })}
								className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
							/>
							<label className="self-start mt-3 text-xs font-semibold">Phone Number</label>
							<input
								type="number"
								defaultValue={updateInfo.Phone}
								// {...register('phone', { required: true })}
								className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
							/>
							<label className="self-start mt-3 text-xs font-semibold">Email</label>
							<input
								type="email"
								defaultValue={updateInfo.Email}
								// {...register('email', { required: true })}
								className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
							/>
							<label className="self-start mt-3 text-xs font-semibold">Hobbies</label>
							<input
								type="text"
								defaultValue={updateInfo.Hobbies}
								// {...register('hobbies', { required: true })}
								className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
							/>
							<button
								onClick={() => handleUpdate(updateInfo)}
								// type="submit"
								className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-400 text-gray-900">
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateModal;
