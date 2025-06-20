"use client";

import { useEffect, useState, ChangeEvent, useCallback } from "react";
import formatPhoneNumber from "./utils/format-phone-number";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

const PAGE_LIMIT = 6;
const SORT_OPTIONS = [{
  key: "experience",
  label: "Experience"
}, {
  key: "name",
  label: "Last Name"
}];

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>("name");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialty, setSpecialty] = useState<string>("");

  const fetchAdvocates = useCallback(async () => {
    const params = new URLSearchParams({
      'limit': String(PAGE_LIMIT),
      'offset': String(PAGE_LIMIT * page)
    });

    if (specialty) {
      params.set('specialty', specialty);
    }

    if (sort) {
      params.set('sortBy', sort);
    }

    console.log(`fetching advocates with params ${params}`);
    const response = await fetch(`/api/advocates?${params.toString()}`);
    const json = await response.json();
    const adv: Advocate[] = json.data;
    console.log({ advocates: adv });

    // If page is 0, replace the advocates array, otherwise append to the existing list
    setAdvocates(a => page ? a.concat(adv): adv);
  }, [ specialty, page, sort, setAdvocates ]);

  const fetchSpecialties = useCallback(async () => {
    console.log("fetching specialties...");
    const response = await fetch(`/api/specialties`);
    const json = await response.json();
    const specialties: string[] = json.data;
    console.log({ specialties });
    setSpecialties(specialties);
  }, [ setSpecialties ]);

  useEffect(() => {
    console.log("use effect called to fetch advocates and specialties");
    fetchAdvocates();
    fetchSpecialties();
  }, [fetchAdvocates, fetchSpecialties ]);
  
  const selectSpecialty = (specialty: string) => {
    setSpecialty(specialty);
    setPage(0);
  }

  const onSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = ev.currentTarget.value;
    console.log("Search term updated", { searchTerm });
    if (!searchTerm || specialties.includes(searchTerm)) {
      selectSpecialty(searchTerm);
    }
  }

  const onResetClick = () => {
    console.log('Resetting');
    selectSpecialty('');
  }

  const onMoreClick = () => {
    console.log('Loading more advocates');
    setPage(page + 1);
  }

  const onSelectSort = (ev: ChangeEvent<HTMLSelectElement>) => {
    console.log('Selected sort option', ev.target.value);
    setSort(ev.target.value);
    setPage(0);
  }

  const needsMore = advocates.length >= (page + 1) * PAGE_LIMIT;

  return (
    <main className="container mx-auto p-6">
      <h1 className="font-serif text-center text-2xl">Solace Advocates</h1>
      <h2 className="font-serif text-center text-xl m-6">Find your health care advocate today.</h2>

      <p className="text-center text-sm">
        I&rsquo;m looking for assistance with&nbsp;
        <input key={specialty} placeholder={specialty || '…'} list="specialties-list" width={16} className="border rounded p-1 focus:border" onInput={onSearchChange} ></input>
        <button className="rounded-full bg-slate-100 text-xs border h-6 w-6 ml-1" onClick={onResetClick}>✕</button>

        <datalist id="specialties-list">
          {specialties.map(sp => <option key={sp} value={sp} />)}
        </datalist>

        &nbsp;sorted by&nbsp;

        <select className="border rounded p-1" value={sort} onChange={onSelectSort}> 
          {SORT_OPTIONS.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
        </select>
      </p>

      <h2 className="text-center mt-6 mb-6 text-sm">
        {specialty
          ? <span>Advocates for <span className="font-bold">{specialty}</span>:</span>
          : <span>&nbsp;</span>
        }
      </h2>

      <div key={specialty} className="grid gap-6 my-6 lg:grid-cols-3 md:grid-cols-2">
        {advocates.map(advocate =>  (
            <div className="p-6 border rounded-lg shadow-lg" key={advocate.firstName + advocate.lastName}>
              <h3 className="font-serif font-bold text-xl">{advocate.firstName} {advocate.lastName}, {advocate.degree}</h3>
              <div className="text-sm">{advocate.city}</div>
              <div className="text-sm">{formatPhoneNumber(advocate.phoneNumber)}</div>
              <p className="text-sm my-3">{advocate.firstName} has {advocate.yearsOfExperience} years of experience specialized in {advocate.specialties.join(', ').toLowerCase()}.</p>
            </div>
          )
        )}
      </div>

      {
        needsMore && (
          <div className="text-center"><button className="justify-self-center rounded-full border px-4 py-1" onClick={onMoreClick}>More</button></div>
        )
      }
    </main>
  );
}
