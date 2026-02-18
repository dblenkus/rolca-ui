import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles as makeTssStyles } from 'tss-react/mui';

type StyleRules = Record<string, unknown>;
type StyleInput = StyleRules | ((theme: Theme) => StyleRules);
type ExtractRules<S extends StyleInput> = S extends (...args: any[]) => infer R ? R : S;

export type WithStyles<S extends StyleInput> = {
    classes: {
        [K in keyof ExtractRules<S> & string]: string;
    };
};

export const makeStyles = <S extends StyleInput>(styles: S) => {
    const useTssStyles = makeTssStyles<void, keyof ExtractRules<S> & string>()(((theme: Theme) =>
        typeof styles === 'function'
            ? (styles as (currentTheme: Theme) => StyleRules)(theme)
            : styles) as any);

    return () => useTssStyles().classes as WithStyles<S>['classes'];
};

export const withStyles =
    <S extends StyleInput>(styles: S) =>
    <P extends WithStyles<S>>(Component: React.ComponentType<P>): React.FC<Omit<P, 'classes'>> => {
        const useStyles = makeStyles(styles);

        const Wrapped: React.FC<Omit<P, 'classes'>> = (props) => {
            const classes = useStyles();
            return <Component {...(props as P)} classes={classes} />;
        };

        const displayName = Component.displayName || Component.name || 'Component';
        Wrapped.displayName = `withStyles(${displayName})`;

        return Wrapped;
    };
