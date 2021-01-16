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
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard = ({ activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity }: IProps): JSX.Element => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList activities={activities} selectActivity={selectActivity} setEditMode={setEditMode} />
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />
                }
                {editMode &&
                    <ActivityForm setEditMode={setEditMode} activity={selectedActivity} />
                }
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard
