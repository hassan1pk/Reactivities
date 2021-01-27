import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Item, Segment, Button, Label } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import ActivityListItem from './ActivityListItem'

const ActivityList = (): JSX.Element => {

    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;

    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    <Segment clearing>
                        <Item.Group divided>
                            {
                                activities.map((activity) => (
                                    <ActivityListItem key={activity.id} activity={activity} />
                                ))
                            }

                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </Fragment>

    )
}

export default observer(ActivityList)
