import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import { smartphoneSchema } from "../shared/schema/validationSchema";
import { addSmartphone } from "../store/smartphoneSlice";
import { useAppDispatch } from "../hooks/useDispatch";
import HeaderText from "./shared/headerText.component";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding: 50px 25px 50px 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: #f4f5f7;
  border-radius: 8px;
`;

const StyledField = styled(Field)`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
`;

const StyledErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const MandatoryText = styled.span`
  color: red;
  content: "*";
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 94%;

  &:hover {
    background-color: #333;
  }
`;

const CreateSmartphoneForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <HeaderText text={"Create Smartphone"} as={"h2"} />
      <FormContainer>
        <Formik
          initialValues={{
            name: "",
            brand: "",
            description: "",
            image: "",
          }}
          validationSchema={smartphoneSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // Here you would use the API to create the smartphone
            // For now, just logging the values and simulating a submit
            try {
              dispatch(addSmartphone(values));
            } catch (error) {
              alert("Failed to create smartphone");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <label htmlFor="name">
                Name<MandatoryText>*</MandatoryText>
              </label>
              <StyledField name="name" placeholder="Name" />
              <ErrorMessage name="name" component={StyledErrorMessage} />

              <label htmlFor="brand">
                Brand<MandatoryText>*</MandatoryText>
              </label>
              <StyledField name="brand" placeholder="Brand" />
              <ErrorMessage name="brand" component={StyledErrorMessage} />

              <label htmlFor="description">
                Description<MandatoryText>*</MandatoryText>
              </label>
              <StyledField
                name="description"
                as="textarea"
                placeholder="Description"
                onChange={(e: any) => {
                  handleChange(e);
                }}
              />
              <ErrorMessage name="description" component={StyledErrorMessage} />

              <label htmlFor="image">
                Image public URL<MandatoryText>*</MandatoryText>
              </label>
              <StyledField name="image" placeholder="Image URL" />
              <ErrorMessage name="image" component={StyledErrorMessage} />

              {status && <div>{status}</div>}

              <SubmitButton type="submit" disabled={isSubmitting}>
                Save
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </div>
  );
};

export default CreateSmartphoneForm;
