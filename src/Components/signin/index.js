// import React, { Component } from 'react';
// import FormField from '../ui/FormFields';
// import { CustomButton } from '../ui/Button';
// import { firebase } from '../../firebase'
// import { validate } from '../ui/misc';
// import { validateFormService } from '../Service/formFieldsService';

// export default class SignIn extends Component {
// 	state = {
// 		formError: false,
// 		formSuccess: '',
// 		formData: {
// 			email: {
// 				element: 'input',
// 				value: '',
// 				config: {
// 					name: 'email_input',
// 					type: 'email',
// 					placeholder: 'Enter your email'
// 				},
// 				validation: {
// 					required: true,
// 					email: true
// 				},
// 				valid: false,
// 				validationMessage: ''
//       },
//       password: {
//         element: 'input',
//         value: '',
//         config: {
//           name: 'password_input',
//           type: 'password',
//           placeholder: 'Enter your password'
//         },
//         validation: {
//           required: true
//         },
//         valid: false,
//         validationMessage: ''
//       }
// 		}
//   };

//   updateForm(element) {
// 		const newFormData = { ...this.state.formData };
// 		const newElement = { ...newFormData[element.id] };
// 		validateFormService(element, newFormData, newElement)
// 		this.setState({
// 			formError: false,
// 			formData: newFormData
// 		});
//   }

//   submitForm = (event) => {
// 		event.preventDefault();
// 		let dataToSubmit = {};
// 		let formIsValid = true;
// 		for (let key in this.state.formData) {
// 			dataToSubmit[key] = this.state.formData[key].value;
// 			formIsValid = this.state.formData[key].valid && formIsValid;
// 		}

// 		if (formIsValid) {
//       firebase.auth()
//       .signInWithEmailAndPassword(
//         dataToSubmit.email,
//         dataToSubmit.password
//       ).then(() => {
//         this.props.history.push('/dashboard');
//       }).catch(err => {
//         this.setState({formError: true});
//       })
// 		} else {
// 			this.setState({ formError: true });
// 		}
// 	}

// 	render() {
// 		return (
//       <div className="container">
//         <div className="signin_wrapper" style={{margin: '100px'}}>
//           <form onSubmit={event => this.submitForm(event)}>
//             <h2>Please Login</h2>
// 						{/* <input */}
//             <FormField
// 								id={'email'}
// 								formData={this.state.formData.email}
// 								change={(element) => this.updateForm(element)}
// 							/>
//               <FormField
// 								id={'password'}
// 								formData={this.state.formData.password}
// 								change={(element) => this.updateForm(element)}
// 							/>
//               {this.state.formError ? <div className="error_label">Something is wrong</div> : null}
//               <CustomButton clickButton={event => this.submitForm(event, event.value)}>Login</CustomButton>
//           </form>
//         </div>
//       </div>
//     );
// 	}
// }

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../ui/FormFields';
import { CustomButton } from '../ui/Button';
import { firebase } from '../../firebase';

const SignIn = (props) => {
	const [ state, setState ] = useState({
		formError: false,
		formSuccess: '',
		loading: false,
		formData: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				validationMessage: ''
			},
			password: {
				element: 'input',
				value: '',
				config: {
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter your password'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: ''
			}
		}
	});

	const { handleSubmit, errors, register } = useForm({
		defaultValues: {}
	});

	const setStateCatchError = () => {
		setState((prevState) => {
			prevState.formError = true;
			prevState.loading = false;
			return { ...prevState };
		});
	};

	const updateForm = (element) => {
		const eventValue = element.event.target.value;
		setState((prevState) => {
			prevState.formData[element.nameProps].value = eventValue;
			return { ...prevState };
		});
	};

	const firebaseCall = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setState((prevState) => {
					prevState.loading = false;
					return { ...prevState };
				});
				props.history.push('/dashboard');
			})
			.catch((err) => {
				setStateCatchError();
			});
	};

	const submitForm = (event) => {
		setState((prevState) => {
			prevState.loading = true;
			return { ...prevState };
		});

		if (event.email) {
			const valid = /\S+@\S+\.\S+/.test(event.email);
			const message = `${!valid ? 'This must be a valid email' : ''}`;
			setState((prevState) => {
				prevState.formData.email.validationMessage = message;
				return { ...prevState };
			});
		}

		if (event.email && event.password) {
			firebaseCall(event.email, event.password);
		} else {
			setStateCatchError();
		}
	};

	return (
		<div className="container">
			<div className="signin_wrapper" style={{ margin: '100px' }}>
				<form onSubmit={handleSubmit(submitForm)}>
					<h2>Please Login</h2>
					<FormField
						formData={state.formData.email}
						change={(element) => updateForm(element)}
						nameProps="email"
						refProps={register({ required: true })}
					/>
					{errors.email && <div>This is required field</div>}
					<FormField
						formData={state.formData.password}
						change={(element) => updateForm(element)}
						nameProps="password"
						refProps={register({ required: true })}
					/>
					{errors.password && <div>This is required field</div>}
					{state.formError ? <div className="error_label">Something is wrong</div> : null}
					<CustomButton loading={state.loading} btnType="submit">
						Login
					</CustomButton>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
