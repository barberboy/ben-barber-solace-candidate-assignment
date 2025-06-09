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
    <main className="container mx-auto p-6">
      <h1 className="font-serif text-center text-2xl">Solace Advocates</h1>
      <div className="text-center">
        <p>Search</p>
        <input className="border" ref={searchInput} onChange={onSearchChange} />
        <button onClick={onResetClick}>Reset Search</button>
        <p>
          Searching for: <span ref={searchTermElement}></span>
        </p>
      </div>
      <div className="grid gap-6 my-6 lg:grid-cols-3 md:grid-cols-2">
        {filteredAdvocates.map(advocate => {
          return (
            <div className="p-6 border rounded-lg shadow-lg" key={advocate.firstName + advocate.lastName}>
              <h3 className="font-serif font-bold text-xl">{advocate.firstName} {advocate.lastName}, {advocate.degree}</h3>
              <div className="text-sm">{advocate.city}</div>
              <div className="text-sm">{advocate.phoneNumber}</div>
              <ul className="m-4 text-sm">
                {advocate.specialties.map((s) => (
                  <li className="list-disc" key={s}>{s}</li>
                ))}
              </ul>
              {/* <td>{advocate.yearsOfExperience}</td> */}
              {/* <td></td> */}
            </div>
          );
        })}
      </div>
    </main>
  );
}
