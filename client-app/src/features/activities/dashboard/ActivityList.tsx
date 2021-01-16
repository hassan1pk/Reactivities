import React from 'react'
import { Item, Segment, Button, Label } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
}



const ActivityList = ({ activities, selectActivity, setEditMode }: IProps): JSX.Element => {

    const handleActivityView = (activityId: string): void => {
        selectActivity(activityId);
        setEditMode(false);
    }

    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activities.map((activity) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => handleActivityView(activity.id)} floated='right' content='View' color='blue' />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }

            </Item.Group>
        </Segment>
    )
}

export default ActivityList
