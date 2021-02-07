import React, { useState, ChangeEvent, useContext, useEffect } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';

interface DetailParams {
    id: string;
}

const ActivityForm = ({ match, history }: RouteComponentProps<DetailParams>): JSX.Element => {

    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() => {
                initialFormState && setActivity(initialFormState);
            });
        }

        return (() => {
            clearActivity();
        });
    }, [loadActivity, match.params.id, initialFormState, clearActivity, activity.id.length]);

    const handleFinalFormSubmit = (values: any) => {
        console.log(values);
    }

    /*const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }*/

    /*const handleSubmit = () => {
        //console.log(activity);
        if (activity.id.length === 0) {
            activity.id = uuid();
            createActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }*/

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field placeholder='Title' name='title' value={activity.title} component={TextInput} />
                                <Field placeholder='Description' name='description' rows={3} value={activity.description} component={TextAreaInput} />
                                <Field placeholder='Category' name='category' options={category} value={activity.category} component={SelectInput} />
                                <Field placeholder='Date' name='date' value={activity.date} component={TextInput} />
                                <Field placeholder='City' name='city' value={activity.city} component={TextInput} />
                                <Field placeholder='Venue' name='venue' value={activity.venue} component={TextInput} />
                                <Button loading={submitting} floated='right' type='submit' content='Submit' positive />
                                <Button onClick={() => history.push('/activities')} floated='right' type='Cancel' content='Cancel' />
                            </Form>
                        )}
                    />

                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm)
