const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			message: null,
		},
		actions: {
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
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
					.then(response => response.json())
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
					.then(response => response.json())
					.then(result => {
						alert(result.response);
						setStore({ isLoggedIn: result.isLoggedIn })
					})
					.catch(error => alert('error', error));
			},
			logout: () => {
				setStore({ isLoggedIn: false })
				alert("Loged out succesfully")
			}
		}
	};
};

export default getState;
