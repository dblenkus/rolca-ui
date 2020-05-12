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
    error: {
        border: '1px solid #f00',
    },
});

export const authStyles = ({ spacing }: Theme) => ({
    alert: {
        margin: spacing(2, 0, 0),
    },
    paragraph: {
        marginTop: spacing(2),
    },
    submit: {
        margin: spacing(2, 0, 2),
        padding: spacing(1),
    },
});
