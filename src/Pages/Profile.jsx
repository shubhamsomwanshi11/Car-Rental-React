import React, { Component } from 'react';
import './Profile.css';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    age: '',
    role: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform form submission logic, e.g., make API calls
    console.log(this.state);
    // Reset form fields or show success message
  };

  render() {
    const { name, email, mobile, address, age, role } = this.state;

    return (
      <div className="profile-form">
        <h2>Profile Update Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={this.handleChange}
            >
              <option value="">Select a role</option>
              <option value="I want to rent a car">I want to rent a car</option>
              <option value="Register Own car for rent">Register Own car for rent</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    );
  }
}
