import { theme } from '../../app.json';
import {
    Dark,
    Ligth,
    Default,
} from '../theme';

const Colors = Dark.colors; /*= () => {
    switch (theme) {
        case 'dark': return Dark.colors;
        case 'ligth': return Ligth.colors;
    }
    return Default.colors;
};*/

export default Colors;
