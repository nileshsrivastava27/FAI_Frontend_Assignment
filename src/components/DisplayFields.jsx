

// DisplayFields.js

import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;

`;

const CategoryHeader = styled.h3`
margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHead = styled.thead`
background-color: black;
color: white;
`;

const TableHeadCell = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid black;
  `;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
&:nth-child(even) {
    background-color: ;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid black;
  `;

  const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  `;

  const DisplayFields = () => {
  const fields = useSelector((state) => state.fields);

  // Group fields by category
  const categorizedFields = fields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {});
  
  // State to hold form data
  const [formData, setFormData] = useState({
    Department: '',
    DOB: '',
    'Mobile Number': '',
    'PIN CODE': '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Collected Data:', formData);
  };

  return (
    <Container>
      <h2>Sample Screens for Displaying Fields for Data Collection</h2>
      {Object.keys(categorizedFields).map((category, index) => (
        <div key={index}>
          <CategoryHeader>{category}</CategoryHeader>
          <Table key={index}>
            <TableHead>
              <TableRow>
                <TableHeadCell>Field Display Name</TableHeadCell>
                <TableHeadCell>Field Type</TableHeadCell>
                <TableHeadCell>Field Data Type</TableHeadCell>
                <TableHeadCell>Max Length Allowed</TableHeadCell>
                <TableHeadCell>Is Mandatory</TableHeadCell>
                <TableHeadCell>Field Data</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorizedFields[category].map((field, index) => (
                <TableRow key={index}>
                  <TableCell>{field.fieldDisplayName}</TableCell>
                  <TableCell>{field.fieldType}</TableCell>
                  <TableCell>{field.fieldDataType}</TableCell>
                  <TableCell>{field.maxLengthAllowed}</TableCell>
                  <TableCell>{field.isMandatory ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{field.fieldData}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      {/* Dynamic Fields for Data Collection */}
      <div>
        <h3>Fields for Data Collection</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Field Name</TableHeadCell>
              <TableHeadCell>Field Value</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(formData).map(([field, value], index) => (
              <TableRow key={index}>
                <TableCell>{field}</TableCell>
                <TableCell>
                  {field === 'Department' ? (
                    <select
                      onChange={(e) =>
                        handleInputChange(field, e.target.value)
                      }
                      value={value}
                      >
                      <option value="">Select Department</option>
                      <option value="ECE">ECE</option>
                      <option value="CSE">CSE</option>
                      <option value="EEE">EEE</option>
                      {/* Add more departments as needed */}
                    </select>
                  ) : (
                    <input
                    type={field === 'DOB' ? 'date' : 'text'}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(field, e.target.value)
                      }
                      />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};

export default DisplayFields;


