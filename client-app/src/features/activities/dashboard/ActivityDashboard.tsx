import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'

interface IProps {
    activities: IActivity[]
}

const ActivityDashboard = ({ activities }: IProps): JSX.Element => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList activities={activities} />
                </List>
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard
