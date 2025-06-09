"use client";

import { useEffect, useState, useRef } from "react";

// TODO: get a distinct list of specialties from the server.
import specialtiesList from "./utils/specialties-list"

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
      if (!searchTerm) return true;

      return (
        // Only search on specialty
        // advocate.firstName.includes(searchTerm) ||
        // advocate.lastName.includes(searchTerm) ||
        // advocate.city.includes(searchTerm) ||
        // advocate.degree.includes(searchTerm) ||
        advocate.specialties.join(' ').includes(searchTerm)
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
      <h2 className="font-serif text-center text-xl m-6">Find your health care advocate today.</h2>
      <p className="text-center text-sm">
        I'm looking for assistance with&nbsp;
        <input placeholder="..." list="specialties-list" width={16} className="border rounded p-1 focus  :border" ref={searchInput} onInput={onSearchChange} ></input>
        <button className="rounded-full bg-slate-100 text-xs border h-6 w-6" onClick={onResetClick}>✕</button>
      </p>

      <h2 className="text-center mt-12 mb6 text-sm">
        {searchInput?.current?.value
          ? <span>Advocates for <span className="font-bold" ref={searchTermElement}>{searchInput?.current?.value}</span>:</span>
          : <span>&nbsp;</span>
        }
      </h2>

      <datalist id="specialties-list">
        {specialtiesList.map(specialty => <option key={specialty} value={specialty} />)}
      </datalist>

      <div className="grid gap-6 my-6 lg:grid-cols-3 md:grid-cols-2">
        {filteredAdvocates.map(advocate => {
          return (
            <div className="p-6 border rounded-lg shadow-lg" key={advocate.firstName + advocate.lastName}>
              <h3 className="font-serif font-bold text-xl">{advocate.firstName} {advocate.lastName}, {advocate.degree}</h3>
              <div className="text-sm">{advocate.city}</div>
              <div className="text-sm">{formatPhoneNumber(advocate.phoneNumber)}</div>
              <ul className="m-4 text-sm">
                {advocate.specialties.map((s) => (
                  <li className="list-disc" key={s}>{s}</li>
                ))}
              </ul>
              {/*{advocate.yearsOfExperience}*/}
            </div>
          );
        })}
      </div>
    </main>
  );
}

// TODO: Extract to util
function formatPhoneNumber(phoneNumber: number) {
  // This assumes phone numbers are a 10-digit number
  return String(phoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
}
