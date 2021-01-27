import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Item, Label } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface Props {
    activity: IActivity;
}

const ActivityListItem = ({ activity }: Props): JSX.Element => {

    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={NavLink} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default ActivityListItem
