import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    setEditMode: (eidtMode: boolean) => void;
    activity: IActivity | null;
}

const ActivityForm = ({ setEditMode, activity: initialFormState }: IProps): JSX.Element => {

    const initializeForm = (): IActivity => {
        if (initialFormState) {
            return initialFormState;
        }
        else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={activity.title} />
                <Form.TextArea rows={2} placeholder='Description' value={activity.description} />
                <Form.Input placeholder='Category' value={activity.category} />
                <Form.Input type='date' placeholder='Date' value={activity.date} />
                <Form.Input placeholder='City' value={activity.city} />
                <Form.Input placeholder='Venue' value={activity.venue} />
                <Button floated='right' type='submit' content='Submit' positive />
                <Button onClick={() => setEditMode(false)} floated='right' type='Cancel' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default ActivityForm
