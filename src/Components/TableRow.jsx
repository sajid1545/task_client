import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import UpdateModal from './UpdateModal';

const TableRow = ({ info, index, handleEmail, handleDelete, setUpdateInfo }) => {

	return (
		<tr>
			<th>
				<label>
					<input type="checkbox" className="checkbox" />
				</label>
			</th>
			<td>{index + 1}</td>
			<td>{info.Name}</td>
			<td>{info.Phone}</td>
			<th>{info.Email}</th>
			<th>{info.Hobbies}</th>
			<th>
				<button
					type="button"
					onClick={() => handleEmail(info)}
					className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
					Send Email
				</button>
			</th>

			<th className="flex gap-4">
				<label
					onClick={() => setUpdateInfo(info)}
					htmlFor="update-modal"
					className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg">
					<FiEdit />
				</label>

				<button
					onClick={() => handleDelete(info)}
					type="button"
					className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg ">
					<FiTrash2 />
				</button>
			</th>
		</tr>
	);
};

export default TableRow;
