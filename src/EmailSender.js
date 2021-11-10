import React, { useState } from "react";
import axios from "axios";
import "./EmailSender.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//Loading animation stuff
import { BarLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const EmailSender = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = contact;
  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    await axios
      .post("https://contact-form-mern.herokuapp.com/contacts/", contact)
      .then((response) => {
        setMsg(response.data);
        console.log("Email Sent");
        setSubmitLoading(false);
      });
  };

  return (
    <div className="outer__container">
      <h1>Sending email using React and Node</h1>
      <div class="inner__content">
        <h4>Submit the form below to get in touch with me!</h4>
        <BarLoader loading={submitLoading} css={override} size={350} />
        <p>{msg}</p>
        <div className="form__element">
          <TextField
            type="text"
            label="Name"
            name="name"
            onChange={onInputChange}
            value={name}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="form__element">
          <TextField
            type="text"
            label="Your Email"
            name="email"
            onChange={onInputChange}
            value={email}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="form__element">
          <TextField
            type="text"
            label="Subject"
            name="subject"
            onChange={onInputChange}
            value={subject}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="form__element">
          <TextField
            type="text"
            label="Your Message"
            name="message"
            onChange={onInputChange}
            value={message}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
        </div>
        <Button variant="contained" onClick={onSubmit}>
          Contact Me
        </Button>
      </div>
    </div>
  );
};

export default EmailSender;
