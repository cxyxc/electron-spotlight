import React from 'react';
import './InputArea.global.css';

export default function InputArea() {
  return (
    <div className="input-area">
      <input
        className="main-input"
        autoComplete="off"
        placeholder="Hello World!"
      />
    </div>
  );
}
