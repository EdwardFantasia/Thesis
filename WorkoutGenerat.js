import { React, Component} from 'react';
import './css/WorkoutGen.css'

class ExerciseComp extends Component{
    constructor(props){
        super(props)
        this.exc = props.exc
        this.excNum = props.excNum
        this.saveExc = props.saveExc
    }

    render(){
        return(
            <div>
                <label htmlFor='excName'>Exercise Name</label>
                    <input type = 'text' id = 'excName' name = 'excName'></input>
                <label htmlFor='excDesc'>Description</label>
                    <input type = 'text' id = 'excDesc' name = 'excDesc'></input>
                <button onClick={() => this.saveExc(this.excNum, document.getElementById('excName').value, document.getElementById('excDesc').value)}>Save Exercise</button>
            </div>
        )
    }
}

class WorkoutGeneratComp extends Component{
    constructor(props){
        super(props)
        this.navigation = props.navigation
        //create this.workout field, where if null, pushes a new workout to home and if not null, changes the index at this.workout
        this.route = props.route
        this.workoutData = this.route.params.workoutData
        this.state = {
            newWorkData: []
        } 
        this.saveExc = (num, excName, excDesc) => {
            this.state.newWorkData[num].excName = excName
            this.state.newWorkData[num].excDesc = excDesc
        }
    }

    async addExc(){
        await this.setState({newWorkData: [...this.state.newWorkData, {excName: null, excDesc: null}]})
    }

    render(){
        return(
            <div>
                <label htmlFor = 'workName'>Workout Name</label>
                    <input id = 'workName' name = 'workName'></input>
                    <br />
                <label htmlFor = 'workDesc'>Workout Description</label>
                    <input id = 'workDesc' name = 'workDesc'></input>
                    <br />
                <button onClick={() => this.addExc()}>Add Exercise</button>
                <br />
                {this.state.newWorkData.map((exc, excNum) => {
                    return(
                        <ExerciseComp exc = {exc} excNum = {excNum} saveExc = {this.saveExc}/>
                    )
                })}
                <br />
                <button onClick = {() => this.navigation.navigate('Home', {workouts: [...this.workoutData, {name: document.getElementById('workName').value, desc: document.getElementById('workDesc').value, exercises: this.state.newWorkData}]})}>Save Workout</button>
            </div>
        )
    }
}

export default function WorkoutGenerat({navigation, route}){
    return(
        <WorkoutGeneratComp navigation = {navigation} route = {route}></WorkoutGeneratComp>
    )
}