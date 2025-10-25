import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(relativeTime);
dayjs.extend(isYesterday);
dayjs.extend(isToday);
