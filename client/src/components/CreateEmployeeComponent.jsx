import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            location: '',
            email: '',
            dob: '',
            education: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.changeEducationHandler = this.changeEducationHandler.bind(this);
        this.save = this.save.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstname,
                    lastName: employee.lastname,
                    location: employee.location,
                    email: employee.email,
                    dob: employee.dob,
                    education: employee.education
                });
                this.setState({data:res.data});
            });
        }        
    }

    save = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, location: this.state.location, email: this.state.email, dob: this.state.dob, education: this.state.education};
        console.log('employee => ' + JSON.stringify(employee));
        EmployeeService.createEmployee(employee).then(res =>{
            this.props.history.push('/employees');
        });
    }

    
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeDobHandler= (event) => {
        this.setState({dob: event.target.value});
    }

    changeEducationHandler= (event) => {
        this.setState({education: event.target.value});
    }

        cancel(){
            this.props.history.push('/employees');
        }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    getContent(){
        
        if(this.state.id === '_add'){
            return <form>
            <div className = "form-group">
                <label> First Name: </label>
                <input placeholder="First Name" name="firstName" className="form-control" 
                    onChange={this.changeFirstNameHandler}/>
            </div>
            <div className = "form-group">
                <label> Last Name: </label>
                <input placeholder="Last Name" name="lastName" className="form-control" 
                     onChange={this.changeLastNameHandler}/>
            </div>
            <div className = "form-group">
                <label> Location: </label>
                <input placeholder="Location" name="location" className="form-control" 
                     onChange={this.changeLocationHandler}/>
            </div>
            <div className = "form-group">
                <label> Email: </label>
                <input placeholder="Email Address" name="email" className="form-control" 
                     onChange={this.changeEmailHandler}/>
            </div>
            <div className = "form-group">
                <label> Dob: </label>
                <input placeholder="date" name="dob" className="form-control" 
                     onChange={this.changeDobHandler}/>
            </div>
            <div className = "form-group">
                <label> Education: </label>
                <input placeholder="Education" name="education" className="form-control" 
                     onChange={this.changeEducationHandler}/>
            </div>

            <button className="btn btn-success" onClick={this.save}>Save</button>
            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
        </form>
        }
    }

    render() {
        
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                { this.getTitle()}
                                <div className = "card-body">
                                {this.getContent()}
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
