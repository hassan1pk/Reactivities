import React, { useState, ChangeEvent, useContext } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';

interface IProps {
    activity: IActivity | null;
}

const ActivityForm = ({ activity: initialFormState }: IProps): JSX.Element => {

    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    const handleSubmit = () => {
        console.log(activity);
        if (activity.id.length === 0) {
            activity.id = uuid();
            createActivity(activity);
        } else {
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} placeholder='Title' name='title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} rows={2} placeholder='Description' name='description' value={activity.description} />
                <Form.Input onChange={handleInputChange} placeholder='Category' name='category' value={activity.category} />
                <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' name='date' value={activity.date} />
                <Form.Input onChange={handleInputChange} placeholder='City' name='city' value={activity.city} />
                <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue' value={activity.venue} />
                <Button loading={submitting} floated='right' type='submit' content='Submit' positive />
                <Button onClick={cancelFormOpen} floated='right' type='Cancel' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
