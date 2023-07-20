const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogedIn

		},
		actions: {
			register: async (values) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": values.email,
					"password": values.password
				});

				const requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("http://localhost:3001/api/register", requestOptions)
					.then(response => response.text())
					.then(result => alert(result))
					.catch(error => alert('error', error));
			},
			login: async (values) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": values.email,
					"password": values.password
				});

				const requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("http://localhost:3001/api/login", requestOptions)
					.then(response => response.text())
					.then(result => {
						alert(result)
						setStore({ isLogedIn: result.isLoguedIn })
						console.log(getStore());
					})
					.catch(error => alert('error', error));

			}
		}
	};
};

export default getState;
