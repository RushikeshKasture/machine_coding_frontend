"use client";
import { useState } from "react";
import users from "./user.json";

export default function DataTable() {
  const [itemsPerPage, setItemsPerPage] = useState<number | "all">(5);
  const [currentPage, setCurrentPage] = useState(1);

  let itemsOnPage =
    itemsPerPage.toString() === "all" ? users.length : Number(itemsPerPage);
  let totalPages = Math.ceil(users.length / itemsOnPage);
  let startIndex = (currentPage - 1) * itemsOnPage;

  const selectedUsers =
    itemsPerPage.toString() === "all"
      ? users
      : users.slice(startIndex, startIndex + itemsOnPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h1 className="text-lg font-bold">Data Table</h1>
      <div className="grid grid-cols-2 gap-8">
        {" "}
        <div>
          <p>
            Given a list of users, build a users data table that displays users
            in a paginated format.
            <br />
            <br />
            Requirements
            <br />
            Table requirements
            <br />
            The users data table should display the following columns: Id, Name,
            Age, Occupation
            <br />
            Each row in the table represents a single user
            <br />
            Pagination requirements
            <br />
            The pagination controls should allow the user to navigate to
            previous and next pages
            <br />
            The pagination controls should display the current page number and
            the total number of pages
            <br />
            The table should update dynamically when the user navigates to a
            different page
            <br />
            Provide an option to select the number of users displayed per page
            (e.g., 5, 10, 20)
          </p>
        </div>
        <div>
          <h1>Solution </h1>
          <table className="border">
            <thead>
              <tr>
                {[
                  { label: "ID", key: "id" },
                  { label: "Name", key: "name" },
                  { label: "Age", key: "age" },
                  { label: "Occupation", key: "occupation" },
                ].map(({ label, key }) => (
                  <th key={key}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="border">
              {selectedUsers.map(({ id, name, age, occupation }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{occupation}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>Select Employees to display:</p>
          <select
            name="emp"
            id="emp"
            value={itemsPerPage}
            onChange={(event) => {
              const value = event.target.value;
              setItemsPerPage(value === "all" ? "all" : Number(value));
              setCurrentPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="all">All</option>
          </select>

          {itemsPerPage !== "all" && (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={prevPage} disabled={currentPage === 1}>
                Prev
              </button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
