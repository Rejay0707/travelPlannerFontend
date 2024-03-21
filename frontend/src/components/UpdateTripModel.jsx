
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../constants";
import { setChange } from "../reducer/tripsReducer";
import { useDispatch } from 'react-redux';

const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
`;

const ModalContent = styled.div`
background-color: white;
padding: 20px;
border-radius: 5px;
width: 80%;
max-width: 500px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
`;

const Label = styled.label`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
padding: 5px;
border: 1px solid #ccc;
border-radius: 4px;
`;

const Button = styled.button`
padding: 10px 20px;
background-color: #007bff;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
&:hover {
  background-color: #0056b3;
}
`;

const UpdateTripModal = ({ isOpen, onClose, trip, onUpdate }) => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(trip ? trip.startDate : today);
  const [endDate, setEndDate] = useState(trip ? trip.endDate : today);
  const [destination, setDestination] = useState(trip ? trip.destination : "");
  const [isActivityUpdateOpen, setIsActivityUpdateOpen] = useState(false);
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFields = {};
    if (destination !== trip.destination) {
      updatedFields.destination = destination;
    }
    if (startDate !== trip.startDate) {
      updatedFields.startDate = startDate;
    }
    if (endDate !== trip.endDate) {
      updatedFields.endDate = endDate;
    }
    if (Object.keys(updatedFields).length > 0) {
      const updatedTrip = {
        id: trip._id,
        ...updatedFields,
      };
      onUpdate(updatedTrip);
    } else {
      onClose();
    }
  };


  const handleActivityUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
        // Construct the activity object with the title and description
        const activityToUpdate = {
            title: activityTitle,
            description: activityDescription,
            // If you're updating an existing activity, include its _id
            // _id: "65f2cc8ac5071b853ba433c1", // Uncomment and set this if updating an existing activity
        };

        // Send the activity object in an array to the backend
        const response = await axios.put(`${BASE_URL}/api/trip/${trip._id}`, {
            activities: [activityToUpdate], // Wrap the activity object in an array
        });

        console.log("Activity updated successfully:", response.data);
        dispatch(setChange(true))

        setIsActivityUpdateOpen(false); // Close the activity update form
      
    } catch (error) {
        console.error("Error updating activity:", error);
    }
};



  function fun(e){
    e.preventDefault();
    setDestination(e.target.value);
  }

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Update Trip</h2>
        <Form onSubmit={handleSubmit}>
          <Label>
            Destination:
            <Input
              type="text"
              value={destination}
              onChange={(e) => 
                fun(e)
                
              }
              required
            />
          </Label>
          <Label>
            Start Date:
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Label>
          <Label>
            End Date:
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Label>
          <Button type="submit">Confirm Update</Button>
        </Form>

        <br />
        <Button onClick={() => setIsActivityUpdateOpen(true)}>
          Update Activity
        </Button>
        {isActivityUpdateOpen && (
          <div>
            <h3>Update Activity</h3>
            <Form onSubmit={handleActivityUpdateSubmit}>
              <Label>
                Activity Title:
                <Input
                  type="text"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                />
              </Label>
              <Label>
                Activity Description:
                <Input
                  type="text"
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                />
              </Label>
              <Button type="submit">Confirm Update</Button>
            </Form>
          </div>
        )}
        <br />
        <br />

        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UpdateTripModal;

