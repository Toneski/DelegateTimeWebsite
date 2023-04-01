// Load JSON data
fetch('items.json')
	.then(response => response.json())
	.then(data => {
		// Populate Add to List table
		const addToListTable = document.querySelector('#add-to-list-table tbody');
		data.forEach(item => {
			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${item.name}</td>
				<td><button class="add-to-list-button" data-item="${item.id}">Want It</button></td>
			`;
			addToListTable.appendChild(row);
		});

		// Add to List button event listener
		const addToListButtons = document.querySelectorAll('.add-to-list-button');
		addToListButtons.forEach(button => {
			button.addEventListener('click', e => {
				const itemId = e.target.dataset.item;
				addToMyList(itemId);
			});
		});

		// Add item to My List
		const myListTable = document.querySelector('#my-list-table tbody');
		function addToMyList(itemId) {
			const item = data.find(item => item.id === itemId);
			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${item.name}</td>
				<td><button class="got-it-button" data-item="${item.id}">Got It</button></td>
			`;
			myListTable.appendChild(row);

			// Got It button event listener
			const gotItButton = row.querySelector('.got-it-button');
			gotItButton.addEventListener('click', e => {
				const itemId = e.target.dataset.item;
				addToCurrentInventory(itemId);
				row.remove();
			});
		}

		// Add item to Current Inventory
		const currentInventory
