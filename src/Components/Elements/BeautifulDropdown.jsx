import React, { useState, useRef, useEffect } from "react";
import "./TableStatus.css";
import { useDispatch, useSelector } from "react-redux";
import { clearPreferences, setNewsOutlet } from "../../store/slices/userSlice";

const options = [
  {
    text: "NewsApi.org",
    textColor: "#503FDB",
    id: 1,
    backgroundColor: "#EDEBFC",
    borderColor: "#503FDB80",
  },
  {
    text: "NewsApi.AI",
    textColor: "#00A383",
    id: 2,
    backgroundColor: "#E3F5F1",
    borderColor: "#04A38380",
  },
  {
    text: "Guardian",
    textColor: "#008FD9",
    id: 3,
    backgroundColor: "#E5F4FB",
    borderColor: "#008FD980",
  },
];

const BeautifulDropdown = () => {
  const selectedOutlet = useSelector((state) => state.user.selectedOutlet);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(selectedOutlet);
  const optionsRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const handleStatusChange = (status) => {
    setSelectedStatus(status?.text);
    setIsOpen(false);
    dispatch(setNewsOutlet(status?.text));
    dispatch(clearPreferences())
  };

  const selectedOption = options.find(
    (option) => option?.text === selectedStatus
  );

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (
            optionsRef.current &&
          !optionsRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [optionsRef]);

  return (
    <div
      className={`table-status rounded-full border-2`}
      ref={buttonRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      style={{
        borderColor: `${selectedOption?.borderColor}`,
        background: `${selectedOption?.backgroundColor}`,
        color: `${selectedOption?.textColor}`,
        ...selectedOption?.style,
      }}
    >
      <div
        className={`status-select flex flex-row gap-1 justify-between items-center text-[1.3rem] py-[3px] px-[8px] p-[8px]`}
      >
        <div className="flex items-center gap-2 text-[13px] text-nowrap">
          <div
            className="rounded-full h-[8px] w-[8px]"
            style={{ background: `${selectedOption?.textColor}` }}
          ></div>
          {selectedStatus}
        </div>

        <div
          className={`arrow border-t-[4px] ${isOpen ? "open" : ""}`}
          style={{ borderTop: `5px solid ${selectedOption?.textColor}` }}
        ></div>
      </div>
      {isOpen && (
        <div
          className={`options rounded-xl mt-1 pt-2 pr-4 !w-[180px]`}
          style={{
            overflowY: "auto",
            maxHeight: "200px",
          }}
          ref={optionsRef}
        >
          {options.map((option, index) => (
            <div
              className={`option flex flex-row gap-1 ${option?.className}`}
              onClick={() => handleStatusChange(option)}
              style={{
                color: `${option?.textColor}`,
                ...option?.style,
              }}
              key={index}
            >
              <div
                className="rounded-full mt-[7px] h-[6px] w-[6px]"
                style={{ background: `${option?.textColor}` }}
              ></div>
              {option?.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeautifulDropdown;
