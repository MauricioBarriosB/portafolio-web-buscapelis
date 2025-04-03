import React, { useState } from "react";
import Modal from "./Modal";

const ModalExample = () => {

    const [isModalopen, setModalOpen] = useState(false);

  return (

<>

    {isModalopen && (
        <Modal onClose={() => setModalOpen(false)} namePeli='testnames'></Modal>
    )}



    <div className="App">
<       button onClick={() => setModalOpen(true)}>Open the Modal</button>
    </div>



    </>

  )
}

export default ModalExample