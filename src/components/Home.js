import React from 'react'

function Home() {

  return (
    <div className="container center-text " style={{ display: "flex", flexDirection: "column", height: "70vh", justifyContent: "center", alignItems: "center" }}>
      <figure class="text-center">
        <blockquote class="blockquote">
          <h1>Welcome to Your PocketNote</h1>
        </blockquote>
        <figcaption class="blockquote-footer fs-5 fw-normal">
          Developed by <cite title="Source Title">Madhu P</cite>
        </figcaption>
      </figure>
    </div>
  )
}

export default Home