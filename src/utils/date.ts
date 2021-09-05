import dayjs from 'dayjs';

const DEFAULT_FORMAT = 'DD.MM.YYYY HH:mma';

export const formatDate = (date: string, formatting: string = DEFAULT_FORMAT) =>
  dayjs(date).format(formatting);
