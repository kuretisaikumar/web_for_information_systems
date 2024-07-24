import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';
import Layout from '../components/Layout/index.layout';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import VenueCard from '../components/UI/VenueCard';
import { ProfileCard, UserInfoCard } from '../components/UI/ProfileCards';
import { DealsHistory } from '../components/UI/DealsHistory';
import { isEmpty } from '../helpers/isObjEmpty';
import AddVenueModel from '../components/UI/AddVenueModel';
import getDeals from '../actions/dealsHistory.actions';
import ManageUsers from '../components/UI/ManageUsers';
import ManageVenues from '../components/UI/ManageVenues';
import ManageBookings from '../components/UI/ManageDeals';

const Dashboard = (props) => {
    document.title = "Booking.in | Admin Dashboard";
    const dispatch = useDispatch();
    const [currentUI, setCurrentUI] = useState(0);
    const auth = useSelector(state => state.auth);
    const userInfo = useSelector(state => state.userInfo);
    const ownerVenues = useSelector(state => state.ownerVenues);
    const deals = useSelector(state => state.deals);
    const state = useSelector(state => state);
    console.log("STORE:: ",state);
    const [addVenueModalShow, setAddVenueModalShow] = useState(false);

    if (auth.token === null) {
        return <Redirect to={'/'} />
    }
    if (userInfo.loading) {
        return (
            <Layout>
                <div className='text-center' style={{ marginTop: '60px' }}>
                    <h1>Getting your info 🎉</h1>
                    <Spinner animation="border" variant="success" />
                </div>
            </Layout>
        );
    }
    const user = window.localStorage.getItem('user');
    const { fullName, email, contactNumber, role, username, createdAt } = userInfo.user;

    return (
        <Layout>
            <Container>
                <div className="main-body" >
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <ProfileCard
                                fullName={fullName}
                                email={email}
                                contactNumber={contactNumber}
                            />
                            <UserInfoCard
                                role={role}
                                username={username}
                                createdAt={createdAt}
                            />
                        </div>

                        <div className="col-md-8">
                            <div className='w-100 '>
                                <Button onClick={()=>setCurrentUI(0)}>Manage Users</Button>
                                <Button onClick={()=>setCurrentUI(1)} className='mx-4' variant='success'>Manage Venues</Button>
                                <Button onClick={()=>setCurrentUI(2)} variant="warning">Manage Deals</Button>
                            </div>
                            <div className='w-100 border-1'>
                                {
                                    currentUI === 1 ? <ManageVenues /> 
                                    : currentUI === 2 ? <ManageBookings /> : <ManageUsers />
                                 }
                            </div>
                        </div>
                    </div>

                </div>
            </Container >
        </Layout >
    );
}

export default Dashboard;