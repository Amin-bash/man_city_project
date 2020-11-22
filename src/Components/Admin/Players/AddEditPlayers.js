import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/FormFields';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../ui/Button';
import { firebase, firebaseDB, firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import Fileuploader from '../../ui/Fileuploader';
import { addPlayerOrMatchService, updatePlayerOrMatchService } from '../../Service/firebaseService';
import {
	updateFormSelectService,
	setStateErrorAndLoading,
	updateFormInputService,
	updateImageInputService,
	updatePlayerAndMatchFieldService,
	isPageLoading,
	onSubmitPlayerOrMatch
} from '../../Service/formFieldsService';
import { CircularProgress } from '@material-ui/core';

const AddEditPlayers = (props) => {
	const [ state, setState ] = useState({
		playerId: '',
		loading: false,
		pageLoading: false,
		isFormUpdated: false,
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

	// React form hook
	const { handleSubmit, errors, register } = useForm({
		defaultValues: {}
	});

	useEffect(() => {
		isPageLoading(true, setState);
		const playerId = props.match.params.id;
		if (!playerId) {
			setState((prevState) => {
				prevState.formType = 'Add Player';
				prevState.pageLoading = false;
				return { ...prevState };
			});
		} else {
			firebaseDB.ref(`players/${playerId}`).once('value').then((snapshot) => {
				const playerData = snapshot.val();
				firebase.storage().ref('players').child(playerData.image).getDownloadURL().then((imageUrl) => {
					// updateField(playerData, playerId, 'Edit player', imageUrl)
					updatePlayerAndMatchFieldService(
						state,
						setState,
						playerData,
						playerId,
						'Edit player',
						imageUrl,
						null,
						null
					);
				});
			});
		}
	}, []);


	// Select updates
	const updateFormSelect = (event, item) => {
		updateFormSelectService(event, item, setState);
	};

	// update Form inputs
	const updateForm = (element) => {
		updateFormInputService(element, setState);
	};

	// Update image
	const updateImage = (element, content) => {
		updateImageInputService(element.id, setState, content);
	};

	// testinggg
		// const isFormUpdated = (setState) => {
		// 	setState((prevState) => {
		// 		prevState.isFormUpdated = false;
		// 		return { ...prevState };
		// 	});
		// };
		// const successForm = (setState) => {
		// 	setState((prevState) => {
		// 		prevState.formSuccess = 'Updated correctly';
		// 		prevState.loading = false;
		// 		return { ...prevState };
		// 	});
		// 	setTimeout(() => {
		// 		setState((prevState) => {
		// 			prevState.formSuccess = '';
		// 			return { ...prevState };
		// 		});
		// 	}, 2000);
		// };

		// // /sumbmiting on edit player
		// const updatePlayerOrMatchServ = (dataToSubmit, refURL, setState) => {
		// 	console.log('this function was called', dataToSubmit, ' this url ', refURL);
		// 	firebaseDB
		// 		.ref(refURL)
		// 		.update(dataToSubmit)
		// 		.then(() => {
		// 			successForm(setState);
		// 		})
		// 		.catch((err) => {
		// 			setStateErrorAndLoading(true, false, setState);
		// 		});
		// 		isFormUpdated(setState)
		// };

		// const addPlayerOrMatchService = (dataToSubmit, refURL, setState, props) => {
		// 	firebaseMatches
		// 		.push(dataToSubmit)
		// 		.then(() => {
		// 			props.history.push(refURL);
		// 			setStateErrorAndLoading(false, false, setState);
		// 		})
		// 		.catch((err) => {
		// 			setStateErrorAndLoading(true, false, setState);
		// 		});
		// 		isFormUpdated(setState)
		// };
		// if (state.isFormUpdated) {
		// 	setStateErrorAndLoading(false, true, setState);
		// 	let dataToSubmit = {};
		// 	let formIsValid = true;
		// 	for (let key in state.formData) {
		// 		dataToSubmit[key] = state.formData[key].value;
		// 		formIsValid = state.formData[key].valid && formIsValid;
		// 	}

		// 	if (formIsValid) {
		// 			if (state.formType === 'Edit player') {
		// 				// updatePlayerOrMatchServ(dataToSubmit, `players/${state.playerId}`, setState);
		// 				updatePlayerOrMatchService(setState, dataToSubmit, `players/${state.playerId}`);
		// 			} else {
		// 				// Add Match
		// 				addPlayerOrMatchService(setState, props, dataToSubmit, '/admin_players', firebasePlayers);
		// 			}
		// 	} else {
		// 		setStateErrorAndLoading(true, false, setState);
		// 	}
		// }
		// console.log(`players/${state.playerId}`, ' that is the player id', firebasePlayers);

	//Submit form
	
	// const updateField = (player, playerId, type, defaultImg) => {
	// const newFormData = { ...state.formData };
	// 	for (let key in newFormData) {
	// 			newFormData[key].value = player[key];
	// 			newFormData[key].valid = true;
	// 	}
	// 	setState((prevState) => {
	// 		prevState.playerId = playerId;
	// 		prevState.formType = type;
	// 		prevState.formData = newFormData;
	// 		prevState.defaultImg = defaultImg;
	// 		prevState.pageLoading = false;
	// 		return { ...prevState };
	// 	});
	// 	// updatePlayerAndMatchFieldService(player, playerId, type, state, setState, defaultImg);
	// };
	
	const onSubmit = (event) => {
		onSubmitPlayerOrMatch(state, setState, props, '/admin_players', `players/${state.playerId}`, firebasePlayers);
	};

	const resetImage = () => {
		setState((prevState) => {
			prevState.defaultImg = '';
			prevState.formData['image'].value = '';
			prevState.formData['image'].valid = false;
			return { ...prevState };
		});
	};

	const storeFilename = (filename) => {
		updateImage({ id: 'image' }, filename);
	};

	return (
		<AdminLayout>
			{state.pageLoading ? (
				<div className="admin_progress">
					<CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
				</div>
			) : (
				<div className="editplayers_dialog_wrapper">
					<h2>{state.formType}</h2>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Fileuploader
								dir="players"
								tag={'Player image'}
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
			)}
		</AdminLayout>
	);
};

export default AddEditPlayers;
