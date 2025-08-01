export const formatRelativeDate = (date: Date): string => {
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	if (date.toDateString() === today.toDateString()) {
		return 'Today';
	} else if (date.toDateString() === yesterday.toDateString()) {
		return 'Yesterday';
	}

	return date.toDateString();
};
