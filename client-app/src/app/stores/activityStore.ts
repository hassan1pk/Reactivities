import { action, makeAutoObservable, observable, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map<string,IActivity>();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = true;
    @observable activity: IActivity | undefined;
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
            runInAction(() => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split(".")[0];
                    //this.activities.push(activity);
                    this.activityRegistry.set(activity.id, activity);
                }); 
            });         
            
            
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            runInAction(() => {
                this.loadingInitial = false;
            });
            
        }
     
    }

    @action createActivity = async (activity: IActivity) => {
        try
        {
            this.submitting = true;
            await agent.Activities.create(activity);
            //this.activities.push(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
            });            
        }
        catch(error)
        {
            console.log(error);
        }
        finally{
            runInAction(() => {
                this.submitting = false;
            });
            
        }
    }

    @action editActivity = async (activity: IActivity) => {
        try
        {
            this.submitting = true;
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
            });
            
        }
        catch(error)
        {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.submitting = false;        
            });
                
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        try
        {
            this.submitting = true;
            this.target = event.currentTarget.name;
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
            });
            
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });
            
        }
    }

    @action loadActivity = async(id: string) => {
        let activity = this.getActivity(id);
        if(activity)
        {
            this.activity = activity;
        }
        else
        {
            try {
                this.loadingInitial = true;
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.activity = activity;
                });
            }
            catch(error)
            {
                runInAction(() => {
                    console.log(error);
                });                
            }
            finally
            {
                runInAction(() => {
                    this.loadingInitial = false;
                });
                
            }
        }
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action openCreateForm = () => {
        this.activity = undefined;
        this.editMode = true;
    }

    @action openEditForm = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.activity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }
 
    @action selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a => a.id === id);
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())