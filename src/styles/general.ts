import { Theme } from '@material-ui/core/styles';

export const uploadFormStyles = ({ spacing }: Theme) => ({
    image: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        maxHeight: '100%',
        padding: '5px',
        width: '100%',
    },
    button: {
        padding: spacing(1),
    },
});
