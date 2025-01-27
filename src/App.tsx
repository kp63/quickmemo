import { useEffect, useRef, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import AppInfoModal from "./AppInfoModal";
import "./styles/modal.css";

function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useLocalStorage("value", "");
  const [isOpenAppInfoModal, setIsOpenAppInfoModal] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    // Prevent default save shortcut
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      return;
    }

    // Open app info modal
    if (e.key === "F1") {
      e.preventDefault();
      setIsOpenAppInfoModal(true);
      return;
    }
  }

  useEffect(() => {
    textAreaRef.current?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="wrapper">
      <div className="field-container">
        <textarea className="field" onChange={handleTextAreaChange} value={value} ref={textAreaRef} />
      </div>
      <div className="detail">
        <p>{value?.length}</p>
        <button className="app-info-button" onClick={() => setIsOpenAppInfoModal(true)}>
          ?
        </button>
      </div>
      <AppInfoModal show={isOpenAppInfoModal} onClose={setIsOpenAppInfoModal} />
    </div>
  )
}

export default App
