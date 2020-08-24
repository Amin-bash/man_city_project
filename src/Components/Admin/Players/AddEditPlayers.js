import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/FormFields';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../ui/Button';
import { firebase, firebaseDB, firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import Fileuploader from '../../ui/Fileuploader';

const AddEditPlayers = (props) => {
	const [ state, setState ] = useState({
		playerId: '',
		formType: '',
		formError: '',
		defaultImg: '',
		formData: {
			name: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Name',
					name: 'name_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			lastname: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Lastname',
					name: 'lastname_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			number: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Number',
					name: 'number_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			name: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Name',
					name: 'name_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			position: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a position',
					name: 'select_position',
					type: 'select',
					options: [
						{ key: 'Keeper', value: 'Keeper' },
						{ key: 'Defence', value: 'Defence' },
						{ key: 'Midfield', value: 'Midfield' },
						{ key: 'Striker', value: 'Striker' }
					]
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
				isResult: false
			},
			image: {
				element: 'image',
				value: '',
				validation: {
					required: true,
					valid: true
				}
			}
		}
	});

	useEffect(() => {
		const playerId = props.match.params.id;
		if (!playerId) {
			setState((prevState) => {
				prevState.formType = 'Add Player';
				return { ...prevState };
			});
		} else {
		}
	}, []);

	const { handleSubmit, errors, register } = useForm({
		defaultValues: {}
	});

	const setStateCatchError = (errorVal, loadingVal) => {
		setState((prevState) => {
			prevState.formError = errorVal;
			prevState.loading = loadingVal;
			return { ...prevState };
		});
	};

	// Select updates
	const updateFormSelect = (event, item) => {
		setState((prevState) => {
			prevState.formData[item].value = event.value;
			if (prevState.formData[item].value !== '') {
				prevState.formData[item].valid = true;
			} else {
				prevState.formData[item].valid = false;
			}
			prevState.formError = false;
			return { ...prevState };
		});
	};

	// setState for updating the image and the inputs forms
	const updateImageFormState = (element, content = '') => {
		setState((prevState) => {
			prevState.formData[element].value = content;
			if (prevState.formData[element].value !== '') {
				prevState.formData[element].valid = true;
			} else {
				prevState.formData[element].valid = false;
			}
			prevState.formError = false;
			return { ...prevState };
		});
	}

	// Form updates
	const updateForm = (element) => {
		const eventValue = element.event.target.value;
		updateImageFormState(element.nameProps,eventValue);
	};

	const updateImage = (element, content) => {
		updateImageFormState(element.id, content);
	}

	const firebaseAddPlayer = (dataToSubmit) => {
		firebasePlayers.push(dataToSubmit).then(()=> {
			props.history.push('/admin_players');
			setStateCatchError(false, false);
		}).catch(err => {
			setStateCatchError(true, false);
		})
	}

	const onSubmit = (event) => {
		setState((prevState) => {
			prevState.loading = true;
			return { ...prevState };
		});

		let dataToSubmit = {};
		let formIsValid = true;
		for (let key in state.formData) {
			dataToSubmit[key] = state.formData[key].value;
			formIsValid = state.formData[key].valid && formIsValid;
		}

		if (formIsValid) {
			if (state.formType === 'Edit player') {
		
			} else {
			  // Add Match
			  firebaseAddPlayer(dataToSubmit)
			}
		} else {
			setStateCatchError(true, false);
		}
	};

	const resetImage = () => {
		setState(prevState => {
			prevState.defaultImg = '';
			prevState.formData['image'].value = '';
			prevState.formData['image'].valid = false;
			return {...prevState};
		})
	}

	const storeFilename = (filename) => {
		updateImage({id: 'image'}, filename)
	}

	return (
		<AdminLayout>
			<div className="editplayers_dialog_wrapper">
				<h2>{state.formType}</h2>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Fileuploader 
							dir="players"
							tag={"Player image"}
							defaultImg={state.defaultImg}
						 	defaultImgName={state.formData.image.value}
							resetImage={() => resetImage()}
							filename={(filename) => storeFilename(filename)}
						/>

						{Object.keys(state.formData).map((item, i) => (
							<div key={i}>
								{state.formData[item].element === 'select' ? (
									<div>
										<div className="label_inputs">Select position</div>
										<FormField
											formData={state.formData[item]}
											selectedValue={[ { value: state.formData[item].value } ]}
											change={(event) => updateFormSelect(event, item)}
											options={state.formData[item].config.options}
										/>
									</div>
								) : (
									<FormField
										nameProps={item}
										formData={state.formData[item]}
										change={(element) => updateForm(element)}
									/>
								)}
							</div>
						))}

						<div className="success_label">{state.formSuccess}</div>
						{state.formError && <div className="error_label">Something went wrong</div>}
						<div className="admin_submit">
							<CustomButton btnType="submit" loading={state.loading}>
								{state.formType}
							</CustomButton>
						</div>
					</form>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AddEditPlayers;
