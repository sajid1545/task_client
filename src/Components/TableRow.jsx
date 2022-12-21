import React from 'react';

const TableRow = ({ info, index,handleEmail }) => {
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
				{/* {info.Hobbies} */}

				<button
                    type="button"
                    onClick={()=> handleEmail(info)}
					className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
					Send Email
				</button>
			</th>
		</tr>
	);
};

export default TableRow;
