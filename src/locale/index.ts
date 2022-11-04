import ZH_CN from './zhCN';
import EN_US from './enUS';

export const language = localStorage.getItem('Language') || navigator.language.slice(0, 2);
export const Locale = language !== 'zh' ? ZH_CN : EN_US;
