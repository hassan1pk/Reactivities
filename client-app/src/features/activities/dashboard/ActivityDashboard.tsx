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
    setEditMode: (eidtMode: boolean) => void;
}

const ActivityDashboard = ({ activities, selectActivity, selectedActivity, editMode, setEditMode }: IProps): JSX.Element => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    <ActivityList activities={activities} selectActivity={selectActivity} />
                </List>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity} setEditMode={setEditMode} />
                }
                {editMode &&
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>

    )
}

export default ActivityDashboard
