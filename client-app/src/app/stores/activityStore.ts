import { action, makeAutoObservable, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
    @observable activityRegistry = new Map<string,IActivity>();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = true;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;
    @observable target: string = '';

    get activitiesByDate() {
        //return this.activities.slice().sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    constructor() {
        makeAutoObservable(this)
      }

    /*@action loadActivities = () => {
        this.loadingInitial = true;
        agent.Activities.list()
        .then(activities => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activities.push(activity);
        });        
      })
      .catch(error => console.log(error))
      .finally(() => this.loadingInitial = false);
    }*/

    @action loadActivities = async () => {
        try
        {
            this.loadingInitial = true;
            const activities = await agent.Activities.list();            
            activities.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
            }); 
            
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            this.loadingInitial = false;
        }
     
    }

    @action createActivity = async (activity: IActivity) => {
        try
        {
            this.submitting = true;
            await agent.Activities.create(activity);
            //this.activities.push(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
        }
        catch(error)
        {
            console.log(error);
        }
        finally{
            this.submitting = false;
        }
    }

    @action editActivity = async (activity: IActivity) => {
        try
        {
            this.submitting = true;
            await agent.Activities.update(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
        }
        catch(error)
        {
            console.log(error);
        }
        finally {
            this.submitting = false;            
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        try
        {
            this.submitting = true;
            this.target = event.currentTarget.name;
            await agent.Activities.delete(id);
            this.activityRegistry.delete(id);
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            this.submitting = false;
            this.target = '';
        }
    }

    @action openCreateForm = () => {
        this.selectedActivity = undefined;
        this.editMode = true;
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }
 
    @action selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a => a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())