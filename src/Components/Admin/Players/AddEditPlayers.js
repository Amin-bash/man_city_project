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
	// const updateForm = (element, content = '') => {
	const updateForm = (element) => {
		updateFormInputService(element, setState);
	};

	// Update image
	const updateImage = (element, content) => {
		updateImageInputService(element.id, setState, content);
	};

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
