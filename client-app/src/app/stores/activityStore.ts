import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = true;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;

    constructor() {
        makeObservable(this)
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
            this.activities = await agent.Activities.list()
            this.activities.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
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

    @action createActivity = async(activity: IActivity) => {
        try
        {
            this.submitting = true;
            await agent.Activities.create(activity);
            this.activities.push(activity);
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

    @action openCreateForm = () => {
        this.selectedActivity = undefined;
        this.editMode = true;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())