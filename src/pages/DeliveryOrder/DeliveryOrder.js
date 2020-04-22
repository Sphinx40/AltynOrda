import React from "react";
import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Button,
  Table,
} from "semantic-ui-react";
import QuantityProduct from "../../components/QuantityProduct/QuantityProduct";
import OrderPrice from "../../components/OrderPrice/OrderPrice";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Zmap from "../../components/Zmap/Zmap";
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const DeliveryOrder = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const DeliverySchema = Yup.object().shape({
    name: Yup.string().max(20, "Too Long!").required("Обязательный поля"),
    phone: Yup.string()
      .matches(phoneRegExp, "Номер телефона не действителен")
      .required("Обязательный поля"),
    extraPhone: Yup.string()
      .matches(phoneRegExp, "Номер телефона не действителен")
      .required("Обязательный поля"),
    street: Yup.string().required("Обязательный поля"),
  });

  return (
    <Segment padded="very" color="violet" style={{ margin: 20 }}>
      <Header content="Доставка" textAlign="center" />
      <Steps>
    <Step status="process" title="Адрес" icon={<LoadingOutlined />} />
    <Step status="wait" title="Сделано" icon={<SmileOutlined />} />
  </Steps>
      <Divider />
      <QuantityProduct />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                extraPhone: "",
                street: "",
              }}
              validationSchema={DeliverySchema}
              onSubmit={(values) => {
                // same shape as initial values
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
              }) => (
                <Form>
                  <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Имя"
                            fluid
                            value={values.name}
                          />
                          <ErrorMessage name="name" />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Input
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            placeholder="Телефон"
                            fluid
                            value={values.phone}
                          />
                          <ErrorMessage name="phone" />
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Input
                            name="extraPhone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            placeholder="Дополнительный телефон"
                            fluid
                            value={values.extraPhone}
                          />
                          <ErrorMessage name="extraPhone" />
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Input
                            name="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Улица"
                            fluid
                            value={values.street}
                          />
                          <ErrorMessage name="street" />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <OrderPrice notShowButton={true} />
                  <Divider />
                  <Button color="violet" type="submit" onClick={handleSubmit}>
                    Оформить
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid.Column>
          <Grid.Column>
            <Zmap />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default DeliveryOrder;
