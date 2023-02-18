const data = [];

function createRecord() {
	// get full date
	const date = new Date(); 

	// get formatted date
	const currentDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

	// retrieving name and issue to name from input field
	const bookName = document.getElementById("book-name").value.trim();
	const issuedTo = document.getElementById("issued-to").value.trim();

	// Validations start
	const errors = [];

	if(bookName === "")
		errors.push("Book Name Is Required");

	if(issuedTo === "")
		errors.push("Issued To Name Is Required");

	// check if error exists
	if(errors.length)
		alert(errors[0]);
	// Validations ends

	else{
		// prevention for duplication of records
		const exist = data.find(s => s.bookName === bookName && s.issuedTo === issuedTo);

		if(exist)
			alert("Record Already Exists");

		else{
			// adding record in array named as data
			data.push({
				id: data.length + 1,
				bookName,
				issuedTo,
				issuedDateTime: currentDate,
				status: "Not Returned"
			});

			// after adding data successfuly we are removing old name from input fields
			document.getElementById("book-name").value = "";
			document.getElementById("issued-to").value = "";

			// updating tbody rows
			resetTable();
		}
	}
}

// function for updating rows
function resetTable() {
	// assigning tbody element in tableBody constant
	const tableBody = document.getElementById("tbody");

	// clearing old data of table body before assiging the new data into it.
	tableBody.innerHTML = "";

	// iterated the data array for creating rows in table body
	data.map((row) => {
		tableBody.innerHTML += `<tr>
		<td>${row.id}</td>
		<td>${row.bookName}</td>
		<td>${row.issuedTo}</td>
		<td>${row.issuedDateTime}</td>
		<td>
			<div class="status-cell">
				<span class="${row.status === 'Not Returned' ? 'not-returned-status' : 'returned-status'}">${row.status}</span>
		 		<i onclick="toggleStatus(${row.id})" class="fa-sharp fa-regular fa-pen-to-square"></i>
		 	</div>
		 </td>
		</tr>`;
	});
}

// function for toggle the status
function toggleStatus(id){
	data.find(s => s.id === id).status = data.find(s => s.id === id).status === "Not Returned" ? "Returned" : "Not Returned";
	resetTable();
}