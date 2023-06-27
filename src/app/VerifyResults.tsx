import React from 'react';
import './VerifyResults.css';

const VerifyResults = ({ results }) => {
  const renderTableRows = () => {
    return Object.entries(results).map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    ));
  };

  return (
    <div className="verify-results-container">
      <h2>Verify Results</h2>
      <div className="verify-results-table-container">
        <table className="verify-results-table">
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifyResults;

