import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Grid, List } from 'semantic-ui-react'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'
import ActivityStore from '../../../app/stores/activityStore'

const ActivityDashboard = (): JSX.Element => {

    const activityStore = useContext(ActivityStore);
    const { activity, editMode } = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityDashboard);
