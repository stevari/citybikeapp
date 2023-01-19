import { React } from 'react';

export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;
  const pStyle = {
    "color": "orange",
    "padding": "1",
    "margin": "1"
  };
  return (
    <>
      <div className="pagination">
        <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
          First
        </button>
        <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
          Previous
        </button>
        <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
          Next
        </button>
        <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
          Last
        </button>
      </div>
      <div>
        <p style={pStyle}>
          Page {activePage} of {totalPages}
        </p>
        <p style={pStyle}>
          Items: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </div>

    </>
  );
};
