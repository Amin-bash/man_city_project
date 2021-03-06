import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
	const template = (
		<div
			style={{
				background: props.bck,
				fontSize: props.size,
				color: props.color,
				padding: '5px 10px',
				display: 'inline-block',
				fontFamily: 'Righteous',
				borderRadius: '3px',
				...props.add
			}}
			className="sm-screen-titles"
		>
			{props.children}
		</div>
	);
	if (props.link) {
		return <Link className="sm-link-screen" to={props.linkTo}>{template}</Link>;
	} else {
		return template;
	}
};

export const firebaseLooper = (snapshot) => {
	const data = [];
	snapshot.forEach((childSnapshot) => {
		data.push({
			...childSnapshot.val(),
			id: childSnapshot.key
		});
	});
	return data;
};

export const reverseArray = (actualArray) => {
	let reversedArray = [];
	for (let i = actualArray.length - 1; i >= 0; i--) {
		// check if the data that I receive it has name not random data
		if (actualArray[i].name || actualArray[i].away) {
			reversedArray.push(actualArray[i]);
		}
	}
	return reversedArray;
};
