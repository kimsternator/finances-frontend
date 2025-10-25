import dayjs from 'dayjs';
import type {Dayjs} from 'dayjs';

export const formatRelativeDate = (date: Dayjs): string => {
	const now = dayjs();

	const diffInSeconds = now.diff(date, 'second');
	if (diffInSeconds < 60) {
		return 'Just now';
	}

	const diffInMinutes = now.diff(date, 'minute');
	if (diffInMinutes < 60) {
		return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
	}

	if (date.isToday()) {
		const diffInHours = now.diff(date, 'hour');
		return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
	}

	// Yesterday
	if (date.isYesterday()) {
		return 'Yesterday';
	}

	// Days ago (within a month)
	const diffInDays = now.diff(date, 'day');
	if (diffInDays < 30) {
		return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
	}

	// Months ago (within a year)
	const diffInMonths = now.diff(date, 'month');
	if (diffInMonths < 12) {
		return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
	}

	const diffInYears = now.diff(date, 'year');
	return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};
