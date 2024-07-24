import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "../../helpers/axios";
import { getOneVenue } from "../../actions/venue.actions";
import { useDispatch } from "react-redux";
import UpdateVenueModel from "./UpdateVenueModel";
import AddVenueModel from "./AddVenueModel";

const ManageVenues = () => {
  const [venues, setVenues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addVenueModalShow, setAddVenueModalShow] = useState(false);
  const [showUpdateVenueModal, setShowUpdateVenueModal] = useState(false);
  const [currentVenue, setCurrentVenue] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/admin/venues")
      .then((response) => setVenues(response.data))
      .catch((error) => console.error("Error fetching venues:", error));
  }, []);

  const handleShowModal = (venue) => {
    setCurrentVenue(
      venue || { name: "", location: "", capacity: "", description: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setCurrentVenue({ ...currentVenue, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (currentVenue._id) {
      axios
        .put(`/admin/venues/${currentVenue._id}`, currentVenue)
        .then((response) => {
          setVenues(
            venues.map((venue) =>
              venue._id === currentVenue._id ? response.data : venue
            )
          );
          handleCloseModal();
        })
        .catch((error) => console.error("Error updating venue:", error));
    } else {
      axios
        .post("/admin/venues", currentVenue)
        .then((response) => {
          setVenues([...venues, response.data]);
          handleCloseModal();
        })
        .catch((error) => console.error("Error adding venue:", error));
    }
  };

  const deleteVenue = (id) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      axios
        .delete(`/admin/venues/${id}`)
        .then(() => {
          setVenues(venues.filter((venue) => venue._id !== id));
        })
        .catch((error) => console.error("Error deleting venue:", error));
    }
  };

  const handleUpdate = (id) => {
    dispatch(getOneVenue(id));
    setShowUpdateVenueModal(true);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="my-4">Manage Venues</h2>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setAddVenueModalShow(true)}
          >
            Add Venue
          </Button>
          <ListGroup>
            {venues.map((venue) => (
              <ListGroup.Item key={venue._id}>
                <Row>
                  <Col xs={6}>
                    Venue: <span className="fw-light">{venue.venueName}</span> |
                    Category: <span className="fw-light">{venue.category}</span>{" "}
                    | Price: <span className="fw-light">{venue.price}</span>
                  </Col>
                  <Col xs={3}></Col>
                  <Col xs={3} className="d-flex justify-content-between">
                    <Button
                      variant="info"
                      className="mr-2"
                      onClick={() => handleUpdate(venue._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteVenue(venue._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <UpdateVenueModel
        show={showUpdateVenueModal}
        onHide={() => setShowUpdateVenueModal(false)}
      />
      <AddVenueModel
                                show={addVenueModalShow}
                                onHide={() => setAddVenueModalShow(false)}
                            />
    </Container>
  );
};

export default ManageVenues;
