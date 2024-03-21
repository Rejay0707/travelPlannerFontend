import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import styled from 'styled-components';
import UpdateTripModal from './UpdateTripModel';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setChange } from '../reducer/tripsReducer';

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableHeader = styled.th`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
    padding: 8px;
    border-bottom: 1px solid #ddd;
`;

const ActionsContainer = styled.div`
    display: flex;
`;

const UpdateTripButton = styled.button`
    margin-right: 8px;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border-radius: 4px;
`;

const DeleteButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border-radius: 4px;
`;

const TripList = () => {
    const [localTrips, setLocalTrips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/trip/viewtrips`);
            setLocalTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const openModal = (trip) => {
        setSelectedTrip(trip);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { change } = useSelector((state) => state.trips)

    if(change){
      fetchTrips()
    
    }

    const dispatch = useDispatch();
    dispatch(setChange(false))
    

    const handleUpdateTrip = async (updatedTrip) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/trip/updatetrip/${updatedTrip.id}`, updatedTrip);
            console.log('Trip updated successfully:', response.data);
            fetchTrips();
            closeModal();
        } catch (error) {
            console.error('Error updating trip:', error);
        }
    };

    const handleDeleteTrip = async (tripId) => {
        try {
            await axios.delete(`${BASE_URL}/api/trip/${tripId}`);
            toast.success("The ticket cancellation was successful.");
            console.log('Trip deleted successfully');
            fetchTrips();
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    return (
        <div>
            <h2>All Trips</h2>
            <StyledTable>
                <thead>
                    <TableRow>
                        <TableHeader>Destination</TableHeader>
                        <TableHeader>Start Date</TableHeader>
                        <TableHeader>End Date</TableHeader>
                        <TableHeader>Activities</TableHeader>
                        <TableHeader>Trip Controller</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {localTrips.map((trip, index) => {
                        const startDate = new Date(trip.startDate);
                        const formattedStartDate = startDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });

                        const endDate = new Date(trip.endDate);
                        const formattedEndDate = endDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });

                        return (
                            <TableRow key={index}>
                                <TableData>{trip.destination}</TableData>
                                <TableData>{formattedStartDate}</TableData>
                                <TableData>{formattedEndDate}</TableData>
                                <TableData>
                                    <ul>
                                        {trip.activities.map((activity, activityIndex) => (
                                            <li key={activityIndex}>
                                                <strong>{activity.title}:</strong> {activity.description}
                                            </li>
                                        ))}
                                    </ul>
                                </TableData>
                                <TableData>
                                    <ActionsContainer>
                                        <UpdateTripButton onClick={() => openModal(trip)}>Update Trip</UpdateTripButton>
                                        <DeleteButton onClick={() => handleDeleteTrip(trip._id)}>Delete</DeleteButton>
                                    </ActionsContainer>
                                </TableData>
                            </TableRow>
                        );
                    })}
                </tbody>
            </StyledTable>
            <UpdateTripModal isOpen={isModalOpen} onClose={closeModal} trip={selectedTrip} onUpdate={handleUpdateTrip} />
        </div>
    );
};

export default TripList;









