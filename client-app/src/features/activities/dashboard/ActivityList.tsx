import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Item, Segment, Button, Label } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import ActivityListItem from './ActivityListItem'

const ActivityList = (): JSX.Element => {

    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activitiesByDate.map((activity) => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))
                }

            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)
