import React from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { Grid } from '@material-ui/core';

import ContestCard from '../components/Upload/ContestCard';

import { AppState } from '../store';
import { loadContests } from '../store/contests/actions';

interface ContestsListViewProps extends PropsFromRedux {}

class ContestsListView extends React.Component<ContestsListViewProps> {
    async componentDidMount() {
        this.props.loadContests();
    }

    render() {
        const { contests } = this.props;

        return (
            <Grid item xs={12} sm={6} md={4}>
                {contests.map((contest: any) => (
                    <ContestCard key={contest.id} contest={contest} />
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    contests: state.contests,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadContests: () => dispatch(loadContests()),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ContestsListView);
