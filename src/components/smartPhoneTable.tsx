import React from "react";
import styled from "styled-components";
import CircleThumbNail from "./shared/CircleThumbnail.component";

interface SmartphoneProps {
  _id: number;
  _name: string;
  _brand: string;
  _image: string;
  _description: string;
}

interface SmartphoneTableProps {
  smartphones: SmartphoneProps[] | any[];
  headers: string[];
}

const ResponsiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dddddd;
  background: #ffff;
  table-layout: auto;

  @media (max-width: 768px) {
    border: 0;
    border:1px solid #ddd;

    thead {
      display: none;
    }

    tr {
      margin-bottom: 10px;
      display: block;
      border-bottom: 2px solid #ddd;
    }
    td {
      display: block;
      text-align: right;
      padding-left: 50%;
      position: relative;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 15px;
        text-align: left;
        font-weight: bold;
      }
    }
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const TableHeaderCell = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
`;

const Name = styled.label`
 display:flex;
 flex-direction:column;
 @media (max-width: 768px) {
  display: block;
 }
`;

const PhoneDetailsCard = styled.div`
 display:flex;
 flex-direction:row;
`;

/**
 * Renders a responsive table displaying a list of smartphones.
 * 
 * The table adapts to different screen sizes, showing a standard
 * table on larger screens and a transformed, more readable layout
 * on smaller screens.
 *
 * @param {SmartphoneTableProps} props - Props containing smartphones data and headers.
 * @returns {React.FC} A functional component that renders a table of smartphones.
 */

const SmartphoneTable: React.FC<SmartphoneTableProps> = ({
  smartphones,
  headers,
}) => {
  return (
    <ResponsiveTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <TableHeaderCell key={index}>{header}</TableHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {smartphones.map((phone) => (
          <tr key={phone._id}>
            <TableCell data-label={headers[0]}>
              <PhoneDetailsCard>
                <CircleThumbNail imageUrl={phone.image} alt={`Image of ${phone.name}`} />
                <Name>{phone._name}</Name>
              </PhoneDetailsCard>
            </TableCell>
            <TableCell data-label={headers[1]}>{phone.brand}</TableCell>
            <TableCell data-label={headers[2]}>{phone.description}</TableCell>
          </tr>
        ))}
      </tbody>
    </ResponsiveTable>
  );
};

export default SmartphoneTable;
