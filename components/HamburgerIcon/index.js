import { React, useState } from "react";
import className from 'classnames/bind';
const cx = className.bind();


export default function Tracking() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavToggle = async (e) => {
    e.preventDefault();
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <label 
        id="navToggle"
        className={cx(['navToggle', `isOpen-${isOpen}`])} 
        htmlFor="navToggle" 
        aria-label="Menu"
        width="50" 
        height="50"
        onClick={handleNavToggle}>
        <span></span>
        <span></span>
        <span></span>
      </label>
      <input
        id="navToggle"
        type="checkbox"
        checked={isOpen}
        readOnly={true}
      />
    </>
  );
}
