import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormFields';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../ui/Button';
import { firebasePromotionsService } from '../../Service/firebaseService'
import { setStateErrorAndLoading, checkEmailValidation } from '../../Service/formFieldsService';

const Enroll = (props) => {
	const [ state, setState ] = useState({
		formError: false,
		loading: false,
		formSuccess: '',
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

	const submitForm = (event) => {
		setStateErrorAndLoading(false, true, setState);
		let valid = {value: false};
		if (event.email) {
			checkEmailValidation(setState, valid, event);
		}
		if (valid) {
			firebasePromotionsService(state, setState, event);
		} else {
			setStateErrorAndLoading(true, false, setState);
		}
	};

	return (
		<Fade>
			<div className="enroll_wrapper">
				<form onSubmit={handleSubmit(submitForm)}>
					<div className="enroll_title">Enter your email</div>
					<div className="enroll_input">
						<FormField
							formData={state.formData.email}
							change={(element) => updateForm(element)}
							nameProps="email"
							refProps={register({ required: false })}
						/>
						<div className="success_label">{state.formSuccess}</div>
						<CustomButton loading={state.loading} btnType="submit">
							Enroll
						</CustomButton>
						<div className="enroll_discl">This enrolling the disclaimer test on this amazing website</div>
					</div>
				</form>
			</div>
		</Fade>
	);
};

export default Enroll;
