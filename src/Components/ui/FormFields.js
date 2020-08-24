import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const FormField = ({ formData, options, selectedValue, id, change, refProps, nameProps }) => {
	const showError = () => {
		let errorMessage = (
			<div className="error_label">
				{formData.validation && !formData.valid ? formData.validationMessage : null}
			</div>
		);
		return errorMessage;
	};

	const { handleSubmit, errors, register } = useForm({
		defaultValues: {}
	});

	const renderTemplate = () => {
		let formTemplate = null;

		switch (formData.element) {
			case 'input':
				formTemplate = (
					<div>
						{formData.showLabel ? <div className="label_inputs">{formData.config.label}</div> : null}
						<input
							{...formData.config}
							value={formData.value}
							onChange={(event) => change({ event, nameProps })}
							name={nameProps}
							ref={refProps}
						/>
						{/* <input
							{...formData.config}
							value={formData.value}
							onChange={(event) => change({ event, id })}
						/> */}
						{showError()}
					</div>
				);
				break;

			case 'select':
				formTemplate = (
					<div>
						{formData.showLabel ? <div className="label_inputs">{formData.config.label}</div> : null}
						<Select
							value={selectedValue}
							onChange={change}
							options={options}
							getOptionLabel={options => options.value}
							getOptionValue={options => options.value}
						/>
						{/* <select 
							value={formData.value} 
							onChange={(event) => change({ event, id })}>
							<option value="">Select one</option>
							{formData.config.option.map((item) => (
								<option key={item.key} value={item.key}>
									{item.value}
								</option>
							))}
						</select> */}
						{showError()}
					</div>
				);
				break;
			default:
				formTemplate = null;
		}
		return formTemplate;
	};
	return <div>{renderTemplate()}</div>;
};

export default FormField;
