import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../ui/FormFields';
import { CustomButton } from '../ui/Button';
import { setStateErrorAndLoading } from '../Service/formFieldsService';
import { firebaseSignInService } from '../Service/firebaseService';

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

	const updateForm = (element) => {
		const eventValue = element.event.target.value;
		setState((prevState) => {
			prevState.formData[element.nameProps].value = eventValue;
			return { ...prevState };
		});
	};

	const firebaseCall = (email, password) => {
		firebaseSignInService(setState, props, email, password);
	};

	const submitForm = (event) => {
		setStateErrorAndLoading(false, true, setState)
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
			setStateErrorAndLoading(true, false, setState)
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