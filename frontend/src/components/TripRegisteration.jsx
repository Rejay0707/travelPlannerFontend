import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setChange } from '../reducer/tripsReducer';


const FullPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #ff9a9e, #fad0c4);

    @media (max-width: 1024px ) {
        padding:100px;
        width:79.7%;
        height:70vh;
        
    }

    @media (max-width: 540px ) {
        padding:100px;
        width:100%
        
    }


    @media (max-width: 430px ) {
        padding:100px;
        width:100%
    }


    @media (max-width: 414px ) {
        padding:100px;
        width:100%
    }
    
    @media (max-width: 375px ) {
        padding:100px;
        width:110%
    }

    @media (max-width: 280px ) {
        padding:100px;
        width:140%
    }
`;

const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    // max-width: 800px;
    width: 90%;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 992px) {
        padding: 25px;
        width: 85%;
    }

    @media (max-width: 768px) {
        padding: 15px;
        width:90%
    }


    @media (max-width: 576px) {
        padding: 15px;
        width: 95%;
    }

    @media (max-width: 414px ) {
        padding:10px;
        width:100%

        
    }

`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 18px;

    
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;

    @media (max-width: 1024px) {
        padding: 1px;
        width:95%;
        height:20%;
        
    }

    @media (max-width: 768px) {
        padding: 15px;
        width:95%
    }

    @media (max-width: 430px ) {
        padding:10px;
        width:95%
    }

    @media (max-width: 414px ) {
        padding:10px;
        width:95%
    }

    @media (max-width: 375px) {
        padding:10px;
    }

`;

const Button = styled.button`
    padding: 15px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const TripRegistration = () => {
    const dispatch = useDispatch();
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [activities, setActivities] = useState([{ title: '', description: '' }]);
    
    

    const handleActivityChange = (index, field, value) => {
        const newActivities = [...activities];
        newActivities[index][field] = value;
        setActivities(newActivities);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tripData = { destination, startDate, endDate, activities };
        try {
            const response = await axios.post(`${BASE_URL}/api/trip/trip`, tripData);
            const addTrip = response.data;
            
            ;
            toast.success('The trip has been successfully created.');
            
            dispatch(setChange(true))
            clearForm();
            console.log(addTrip)
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    const clearForm = () => {
        setDestination('');
        setStartDate('');
        setEndDate('');
        setActivities([{ title: '', description: '' }]);
    };

    return (
        <FullPageContainer>
            <CustomForm onSubmit={handleSubmit}>
                <Label>
                    Destination:
                    <Input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                </Label>
                <br />
                <Label>
                    Start Date:
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </Label>
                <br />
                <Label>
                    End Date:
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </Label>
                <br />
                {activities.map((activity, index) => (
                    <div key={index}>
                        <Label>
                            Activity Title:
                            <Input
                                type="text"
                                value={activity.title}
                                onChange={(e) => handleActivityChange(index, 'title', e.target.value)}
                                required
                            />
                        </Label>
                        <br />
                        <Label>
                            Activity Description:
                            <Input
                                type="text"
                                value={activity.description}
                                onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                                required
                            />
                        </Label>
                    </div>
                ))}
                <br /><br />
                <Button type="submit">Add Trip</Button>
            </CustomForm>
        </FullPageContainer>
    );
};

export default TripRegistration;















