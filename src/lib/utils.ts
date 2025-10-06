import { format } from 'date-fns';
import { de, sq } from 'date-fns/locale';

export const formatDate = (dateString: string, lang: 'de' | 'al') => {
  try {
    const locale = lang === 'al' ? sq : de;
    return format(new Date(dateString), 'PP', { locale });
  } catch (error) {
    return dateString;
  }
};
