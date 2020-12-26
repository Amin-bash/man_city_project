import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/FormFields';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../ui/Button';
import './styles.css';
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import { addPlayerOrMatchService, updatePlayerOrMatchService } from '../../Service/firebaseService';
import {
	updateFormSelectService,
	updateFormInputService,
	setStateErrorAndLoading,
	updatePlayerAndMatchFieldService,
	isPageLoading,
	onSubmitPlayerOrMatch
} from '../../Service/formFieldsService';
import { CircularProgress } from '@material-ui/core';

const AddEditMatch = (props) => {
	const [ state, setState ] = useState({
		matchId: '',
		loading: false,
		isFormUpdated: false,
		formType: '',
		formError: false,
		formSuccess: '',
		teams: [],
		formData: {
			date: {
				element: 'input',
				value: '',
				config: {
					label: 'Event Date',
					name: 'date_input',
					type: 'date'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			local: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
				isResult: false
			},
			resultLocal: {
				element: 'input',
				value: '',
				config: {
					label: 'Result local',
					name: 'result_local_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
				isResult: true
			},
			away: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
				isResult: false
			},
			resultAway: {
				element: 'input',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
				isResult: true
			},
			referee: {
				element: 'input',
				value: '',
				config: {
					label: 'Referee',
					name: 'referee_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			stadium: {
				element: 'input',
				value: '',
				config: {
					label: 'Stadium',
					name: 'stadium_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			result: {
				element: 'select',
				value: '',
				config: {
					label: 'Team result',
					name: 'select_result',
					type: 'select',
					options: [
						{ key: 'W', value: 'W' },
						{ key: 'L', value: 'L' },
						{ key: 'D', value: 'D' },
						{ key: 'n/a', value: 'n/a' }
					]
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			final: {
				element: 'select',
				value: '',
				config: {
					label: 'Game played ?',
					name: 'select_played',
					type: 'select',
					options: [ { key: 'yes', value: 'yes' }, { key: 'no', value: 'no' } ]
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			}
		}
	});

	const { handleSubmit, errors, register } = useForm({
		defaultValues: {}
	});

	useEffect(() => {
		isPageLoading(true, setState);
		const matchId = props.match.params.id;
		console.log(matchId, ' here i got the match id from useSate');
		const getTeams = (match, type) => {
			firebaseTeams.once('value').then((snapshot) => {
				const teams = firebaseLooper(snapshot);
				const teamOptions = [];
				snapshot.forEach((childSnapshot) => {
					teamOptions.push({
						key: childSnapshot.val().shortName,
						value: childSnapshot.val().shortName
					});
				});
				updatePlayerAndMatchFieldService(state, setState, match, matchId, type, null, teams, teamOptions);
			});
		};

		if (!matchId) {
			// ADD MATCH
			getTeams(false, 'Add Match');
		} else {
			firebaseDB.ref(`matches/${matchId}`).once('value').then((snapshot) => {
				const match = snapshot.val();
				getTeams(match, 'Edit Match');
			});
		}
	}, []);
	
	// update Form inputs
	const updateForm = (element) => {
		updateFormInputService(element, setState);
	};

	// update Form selects
	const updateFormSelect = (event, item) => {
		updateFormSelectService(event, item, setState);
	};

	//Submit forms
	const onSubmit = (event) => {
		onSubmitPlayerOrMatch(state, setState, props, '/admin_matches', `matches/${state.matchId}`, firebaseMatches);
	};

	return (
		<AdminLayout>
			{state.isPageLoading ? (
				<div className="admin_progress">
					<CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
				</div>
			) : (
				<div className="editmatch_dialog_wrapper">
					<h2>{state.formType}</h2>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							{Object.keys(state.formData).map((item, i) => {
								return !state.formData[item].showLabel ? (
									<div
										key={i}
										className={
											!state.formData[item].isResult ? (
												'left select_team_layout'
											) : (
												'right select_team_layout'
											)
										}
									>
										{!state.formData[item].isResult && <div className="label_inputs">{item}</div>}
										{state.formData[item].element === 'select' ? (
											<FormField
												formData={state.formData[item]}
												selectedValue={[ { value: state.formData[item].value } ]}
												change={(event) => updateFormSelect(event, item)}
												options={state.formData[item].config.options}
											/>
										) : (
											<FormField
												nameProps={item}
												formData={state.formData[item]}
												change={(element) => updateForm(element)}
											/>
										)}
									</div>
								) : (
									<div key={i}>
										{state.formData[item].element === 'select' ? (
											<FormField
												formData={state.formData[item]}
												selectedValue={[ { value: state.formData[item].value } ]}
												change={(event) => updateFormSelect(event, item)}
												options={state.formData[item].config.options}
											/>
										) : (
											<FormField
												nameProps={item}
												formData={state.formData[item]}
												change={(element) => updateForm(element)}
											/>
										)}
									</div>
								);
							})}

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
export default AddEditMatch;
