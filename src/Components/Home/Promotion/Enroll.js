import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormFields';
import { useForm } from 'react-hook-form';
import { firebasePromotions } from '../../../firebase';
import { CustomButton } from '../../ui/Button';

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

	const resetFormSuccess = (type) => {
		const newFormData = { ...state.formData };
		for (let key in newFormData) {
			newFormData[key].value = '';
			newFormData[key].valid = false;
			newFormData[key].validationMessage = '';
		}
		setState((prevState) => {
			prevState.loading = false;
			prevState.formData = newFormData;
			prevState.formSuccess = type ? 'Congratulations ' : 'Already on the database';
			prevState.formError = false;
			return { ...prevState };
		});
		clearSuccessMessage();
	};

	const clearSuccessMessage = () => {
		setTimeout(() => {
			setState((prevState) => {
				prevState.formSuccess = '';
				return { ...prevState };
			});
		}, 2000);
	};

	const setLoadingVal = (type) => {
		setState((prevState) => {
			prevState.loading = type;
			return { ...prevState };
		});
	};

	const firebasePromotionCall = (event) => {
		firebasePromotions.orderByChild('email').equalTo(event.email).once('value').then((snapshot) => {
			if (snapshot.val() === null) {
				firebasePromotions.push(event);
				resetFormSuccess(true);
			} else {
				resetFormSuccess(false);
			}
		});
		resetFormSuccess();
	};

	const submitForm = (event) => {
		setLoadingVal(true);
		let valid = false;
		if (event.email) {
			valid = /\S+@\S+\.\S+/.test(event.email);
			const message = `${!valid ? 'This must be a valid email' : ''}`;
			setState((prevState) => {
				prevState.formData.email.validationMessage = message;
				return { ...prevState };
			});
		}
		if (valid) {
			firebasePromotionCall(event);
		} else {
			setState((prevState) => {
				prevState.loading = false;
				prevState.formError = true;
				return { ...prevState };
			});
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
