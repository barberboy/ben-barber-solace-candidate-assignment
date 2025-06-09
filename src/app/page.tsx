"use client";

import { useEffect, useState, useRef } from "react";

// TODO: Give this a better home.
interface Advocate {
  firstName: string,
  lastName: string,
  city: string,
  degree: string,
  specialties: string[],
  yearsOfExperience: number,
  phoneNumber: number,
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  const searchInput = useRef<HTMLInputElement>(null)
  const searchTermElement = useRef<HTMLSpanElement>(null)

  // TODO convert to custom hook and add querying
  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        const advocates: Advocate[] = jsonResponse.data
        setAdvocates(advocates);
        setFilteredAdvocates(advocates);
      });
    });
  }, []);

  const onSearchChange = () => {
    const searchTerm = searchInput?.current?.value || '';

    // document.getElementById("search-term").innerHTML = searchTerm;
    if (searchTermElement && searchTermElement.current) {
      searchTermElement.current.textContent = searchTerm
    }

    console.log("filtering advocates...");

    // TODO: Move filtering to the server
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm)
        // advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);

    // Update search input and the search term when reset is clicked.
    if (searchInput && searchInput.current) {
      searchInput.current.value = ''
    }
    if (searchTermElement && searchTermElement.current) {
      searchTermElement.current.textContent = ''
    }
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span ref={searchTermElement}></span>
        </p>
        <input ref={searchInput} style={{ border: "1px solid black" }} onChange={onSearchChange} />
        <button onClick={onResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.firstName + advocate.lastName}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
