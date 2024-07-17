import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../helpers/axios";
import { paymentCanceled, paymentSuccess } from "../../actions/checkout.actions";

const BookingModel = (props) => {
  // const navigate = useNavigate();
  const history = useHistory();
  const dispatch = useDispatch();
  const { _id, venueName, price, category, location, address, ownerId } = props;
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedDates , setBookedDates] = useState();
  const state = useSelector(state => state);
  console.log(state);

  const auth = useSelector((state) => state.auth);

  const gotoCheckoutPage = async (e) => {
    if (!auth.authenticate) {
      console.log("AUTH NOT");
      // navigate('/signin');
      history.push("/signin");
      return;
    } else {
      e.preventDefault();
      setIsLoading(true);
      const dealInfo = {
        venueId: _id,
        venueName: venueName,
        venueOwnerId: ownerId,
        bill: price,
        eventDate: selectedDate.toString(),
      };
      console.log(dealInfo);
      const res = await axios.post(`/checkout`, dealInfo);
      localStorage.setItem("dealId", JSON.stringify(res.data.dealId));
      // window.location.href = res.data.url;
      if (res.data.dealId) {
        setPaymentConfirm(true);
        dispatch(paymentSuccess(JSON.parse(localStorage.getItem("dealId"))));
      } else {
        setPaymentConfirm(false);
        dispatch(paymentCanceled(JSON.parse(localStorage.getItem("dealId"))));
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Booking Details📝
        </Modal.Title>
        <Button onClick={props.onHide}>X</Button>
      </Modal.Header>
      <Modal.Body>
        {paymentConfirm ? (
          <>
            <div className="text-center py-5 fs-4">
              Your Venue Is Booked Succesfully 🎉🎉🎉
            </div>
            <div className="text-center">Booking ID: {localStorage.getItem("dealId")}</div>
          </>
        ) : (
          <>
            <h5>
              <span style={{ color: "red" }}>
                <strong>Note: </strong>
              </span>
              Before booking always contact owner
            </h5>
            <hr />
            <Form onSubmit={gotoCheckoutPage}>
              <Row>
                <Col md={6}>
                  {/* <Input
                    label="Select the Date for Event"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}

                  /> */}
                  <label className="mb-2">Select the Date for Event</label>
                  <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                //   excludeDates={}
                className="rounded-1 border-1 p-1 px-3"
                style={{
                    width: '100%'
                }}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Venue Name"
                    type="text"
                    value={venueName}
                    isReadOnly={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Input
                    label="Category"
                    type="text"
                    value={category}
                    isReadOnly={true}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Location"
                    type="text"
                    value={location}
                    isReadOnly={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Input
                    label="Address"
                    type="text"
                    value={address}
                    isReadOnly={true}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Bill"
                    type="number"
                    value={price}
                    isReadOnly={true}
                    message="With Service tax included in Bill"
                  />
                </Col>
              </Row>

              <div className="text-center">
                <Button variant="success" type="submit">
                  {isLoading ? (
                    <>
                      <Spinner
                        animation="border"
                        as="span"
                        size="sm"
                        variant="light"
                      />{" "}
                      Processing...
                    </>
                  ) : (
                    <span>BOOK VENUE</span>
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingModel;
