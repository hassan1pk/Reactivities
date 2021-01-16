import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
}

const ActivityDashboard = ({ activities, selectActivity, selectedActivity }: IProps): JSX.Element => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList activities={activities} selectActivity={selectActivity} />
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity &&
                    <ActivityDetails activity={selectedActivity} />
                }
                <ActivityForm />
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard
