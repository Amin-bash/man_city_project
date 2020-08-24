import React from 'react'
import { validate } from "../ui/misc";

export const validateFormService = (element, newFormData, newElement) =>{
		let validDate = validate(newElement);
		newElement.valid = validDate[0];
		newElement.validationMessage = validDate[1];
		newElement.value = element.event.target.value;
    newFormData[element.id] = newElement;
}