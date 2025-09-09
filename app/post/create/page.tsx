import React from "react";
import Nav from "./_components/Nav";
import CreateBox from "./_components/CreateBox";

const CreatePage = () => {
  return (
    <section className="px-2">
      <header>
        <Nav />
      </header>
      <main>
        <CreateBox />
      </main>
    </section>
  );
};

export default CreatePage;
