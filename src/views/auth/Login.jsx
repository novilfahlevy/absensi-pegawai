/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { connect } from 'react-redux';
import { login } from 'store/actions/authActions.js';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormFeedback
} from "reactstrap";

class Login extends React.Component {
  handleSubmit = values => {
    this.props.login(values);
  }

  handleChange = e => this.setState({ [e.target.id]: e.target.value });

  render() {
    const loginSchema = Yup.object().shape({
      email: Yup.string().required('Email harus diisi.').email('Email tidak valid!'),
      password: Yup.string().required('Password harus diisi.')
    })

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Formik 
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                role="form" 
                onSubmit={this.handleSubmit}
              >
                {
                  ({ errors, touched, handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Email" name="email" id="email" type="text" onChange={handleChange} />
                        </InputGroup>
                        { errors.email && touched.email ? <FormFeedback className="d-block mt-1">{errors.email}</FormFeedback> : null }
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Password" name="password" id="password" type="password" onChange={handleChange} />
                        </InputGroup>
                        { errors.password && touched.password ? <FormFeedback className="d-block mt-1">{errors.password}</FormFeedback> : null }
                      </FormGroup>
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="submit">
                          Masuk
                        </Button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    login: credentials => dispatch(login(credentials, ownProps.history.push))
  })
)(withRouter(Login));
