import { firebaseMatches, firebaseDB, firebase, firebasePromotions } from '../../firebase';
import { successForm, resetFormSuccess, setStateErrorAndLoading, isFormUpdated } from './formFieldsService';

// Add players or matches
export const addPlayerOrMatchService = (setState, props, dataToSubmit, refURL, firebaseCall) => {
	firebaseCall
		.push(dataToSubmit)
		.then(() => {
			props.history.push(refURL);
			setStateErrorAndLoading(false, false, setState);
		})
		.catch((err) => {
			setStateErrorAndLoading(true, false, setState);
		});
	isFormUpdated(setState);
};

// update Players or matches
export const updatePlayerOrMatchService = (setState, dataToSubmit, refURL) => {
	firebaseDB
		.ref(refURL)
		.update(dataToSubmit)
		.then(() => {
			successForm(setState);
		})
		.catch((err) => {
			setStateErrorAndLoading(true, false, setState);
		});
	isFormUpdated(setState);
};

// Sign in
export const firebaseSignInService = (setState, props, email, password) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			setStateErrorAndLoading(false, false, setState);
			props.history.push('/admin_matches');
		})
		.catch((err) => {
			setStateErrorAndLoading(true, false, setState);
		});
};

// Promotion
export const firebasePromotionsService = (state, setState, event) => {
	firebasePromotions.orderByChild('email')
	.equalTo(event.email).once('value')
	.then((snapshot) => {
		if (snapshot.val() === null) {
			console.log('yes it is');
			firebasePromotions.push(event);
			resetFormSuccess(state, setState, true);
		} else {
			console.log('no it is');
			resetFormSuccess(state, setState, false);
		}
	});
	// resetFormSuccess(state, setState, true)
};
