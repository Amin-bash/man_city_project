import { updatePlayerOrMatchService, addPlayerOrMatchService } from './firebaseService';


// Update forms was success
export const successForm = (setState) => {
	setState((prevState) => {
		prevState.formSuccess = 'Updated correctly';
		prevState.loading = false;
		return { ...prevState };
	});
	clearSuccessMessage(setState);
};

// Clear success message
export const clearSuccessMessage = (setState) => {
	setTimeout(() => {
		setState((prevState) => {
			prevState.formSuccess = '';
			return { ...prevState };
		});
	}, 2000);
}

// page loading
export const isPageLoading = (type, setState) => {
	setState((prevState) => {
		prevState.pageLoading = type;
		return { ...prevState };
	});
};

// Rest success form
export const resetFormSuccess = (state, setState, type) => {
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
	clearSuccessMessage(setState);
};

// update the error and loading
export const setStateErrorAndLoading = (errorVal, loadingVal, setState) => {
	setState((prevState) => {
		prevState.formError = errorVal;
		prevState.loading = loadingVal;
		return { ...prevState };
	});
};

// check if email is valid 
export const checkEmailValidation = (setState, valid, event) => {
	valid = {value: /\S+@\S+\.\S+/.test(event.email)};
	const message = `${!valid.value ? 'This must be a valid email' : ''}`;
	setState((prevState) => {
		prevState.formData.email.validationMessage = message;
		return { ...prevState };
	});
}

// set updated input to false
export const isFormUpdated = (setState) => {
	setState((prevState) => {
		prevState.isFormUpdated = false;
		return { ...prevState };
	});
};

// Update player and match fields
export const updatePlayerAndMatchFieldService = (state, setState, name, id, type, defaultImg, teams, teamOptions) => {
	const newFormData = { ...state.formData };
	for (let key in newFormData) {
		if (name) {
			newFormData[key].value = name[key];
			newFormData[key].valid = true;
		}
		if (key === 'local' || key === 'away') {
			newFormData[key].config.options = teamOptions;
		}
	}
	setState((prevState) => {
		if (defaultImg !== null) {
			prevState.playerId = id;
			prevState.defaultImg = defaultImg;
		} else {
			prevState.matchId = id;
			prevState.teams = teams;
		}
		prevState.formType = type;
		prevState.formData = newFormData;
		prevState.pageLoading = false;
		return { ...prevState };
	});
};

// Submit plyer and match
export const onSubmitPlayerOrMatch = (state, setState, props, refUrl, refUrlId, firebaseCall) => {
	if (state.isFormUpdated) {
		setStateErrorAndLoading(false, true, setState);
		let dataToSubmit = {};
		let formIsValid = true;
		for (let key in state.formData) {
			dataToSubmit[key] = state.formData[key].value;
			formIsValid = state.formData[key].valid && formIsValid;
		}

		if (state.matchId) {
			getLocalAwayThumb(state, dataToSubmit);
		}

		if (formIsValid) {
			if (state.formType === 'Edit player') {
				updatePlayerOrMatchService(setState, dataToSubmit, refUrlId);
			} else {
				// Add Match
				addPlayerOrMatchService(setState, props, dataToSubmit, refUrl, firebaseCall);
			}
		} else {
			setStateErrorAndLoading(true, false, setState);
		}
	}
};

// Get local and away thumb
export const getLocalAwayThumb = (state, dataToSubmit) => {
	state.teams.forEach((team) => {
		if (team.shortName === dataToSubmit.local) {
			dataToSubmit['localThmb'] = team.thmb;
		}
		if (team.shortName === dataToSubmit.away) {
			dataToSubmit['awayThmb'] = team.thmb;
		}
	});
};

// Update the forms select
export const updateFormSelectService = (event, item, setState) => {
	setState((prevState) => {
		prevState.isFormUpdated = true;
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

// Updating the form input
export const updateFormInputService = (element, setState) => {
	let eventValue = element.event.target.value;

	setState((prevState) => {
		prevState.isFormUpdated = true;
		prevState.formData[element.nameProps].value = eventValue;
		if (prevState.formData[element.nameProps].value !== '') {
			prevState.formData[element.nameProps].valid = true;
		} else {
			prevState.formData[element.nameProps].valid = false;
		}
		prevState.formError = false;
		return { ...prevState };
	});
};

// Update image input
export const updateImageInputService = (element, setState, content) => {
	setState((prevState) => {
		prevState.isFormUpdated = true;
		prevState.formData[element].value = content;
		if (prevState.formData[element].value !== '') {
			prevState.formData[element].valid = true;
		} else {
			prevState.formData[element].valid = false;
		}
		prevState.formError = false;
		return { ...prevState };
	});
};
