export function pluralize(num, singleForm, pluralForm) {
	if (num <= 1) {
		return singleForm
	}
	
	return pluralForm;
}