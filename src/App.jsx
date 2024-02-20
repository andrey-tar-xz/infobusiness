import { useState } from 'react';
import { DATA_BASE } from "./database"

function FilterableData({ data }) {
  const [filterText, setFilterText] = useState('');

  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProductTable
          data={data}
          filterText={filterText}
        />
      </div>
    </>
  );
}

function ProductTable({ data, filterText }) {
  const cards = [];

  data.forEach((dataValue) => {
    if (
      dataValue.title.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    cards.push(
      <ProductRow
        data={dataValue}
        key={dataValue.title} />
    );
  });

  return (
    <>
      {cards}
    </>
  );
}

function ProductRow({ data }) {
  return (
    <Card data={data} />
  );
}

function Card({ data }) {
  function ListLinks({ name, data }) {
    return data ? <li><a href={data} target="_blank" className="hover:underline text-blue-500">{name}</a></li> : ""
  }

  return (
    <>
      <section className="w-full bg-black rounded-lg text-white break-words p-3">
        <div className="mb-3">
          <a className="hover:underline" href={data.site} target="_blank"><h3 className="text-2xl">{data.title}</h3></a>
          {data.email ? <a className="hover:underline text-gray-400" href={`mailto:${data.email}`}>{data.email}</a> : ""}
        </div>
        <ul>
          <ListLinks name="Trabalhe Conosco" data={data.trabalhe_conosco} />
          <ListLinks name="Portal de Vagas" data={data.portal_de_vagas} />
          <ListLinks name="LinkedIn" data={data.linkedin} />
          <ListLinks name="Gupy" data={data.gupy} />
          <ListLinks name="PandaPé" data={data.pandape} />
          <ListLinks name="InfoJobs" data={data.infojobs} />
        </ul>
      </section>
    </>
  )
}

function SearchBar({
  filterText,
  onFilterTextChange,
}) {
  return (
    <input
      type="text"
      value={filterText} placeholder="Pesquisar..."
      onChange={(e) => onFilterTextChange(e.target.value)}
      className="w-full h-10 mb-5 border-2 rounded-md border-black p-3"
    />
  );
}

export default function App() {
  return (
    <>
      <header className="w-full h-20 bg-black text-white flex justify-center items-center mb-5">
        <h2 className="text-3xl">
          Info Business
        </h2>
      </header>

      <main className="flex justify-center m-5">
        <div className="w-full md:w-[768px] lg:w-[1024px]">
          <FilterableData data={DATA_BASE} />
        </div>
      </main >
    </>
  )
}

{/*
{DATA_BASE.map(DATA_BASE =>
  <Card data={DATA_BASE} />
)}
*/}
