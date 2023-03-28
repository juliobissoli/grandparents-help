import React, { useRef, useEffect } from "react";

import { X } from "phosphor-react";

interface Props {
  title?: string;
  close: () => void;
  children: React.ReactNode;
  footer?: Element;
  noHeader?: boolean;
}

function useOutsideDetect(ref: any, close: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Modal: React.FC<Props> = ({
  children,
  title,
  close,
  footer,
  noHeader,
}: any) => {
  const wrapperRef = useRef(null);
  useOutsideDetect(wrapperRef, close);

  const modalClass = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    opacity: 1,
  };
  return (
    <div style={modalClass}>
      <div
        ref={wrapperRef}
        className="bg-white absolute  rounded-[20px] mt-[10vh] min-w-[30vw]"
      >
        {!noHeader ? (
          <header className="flex justify-between py-4 px-8 border-b">
            <div className="flex items-end">
              {/* <slot name="header"></slot> */}
              <h1 className="text-2xl">{title}</h1>
            </div>
            <div className="p-0 flex justify-content-end">
              <button className="btn btn-lg" onClick={close}>
                <X size={24} weight="bold" />
              </button>
            </div>
          </header>
        ) : (
          ""
        )}
        <section className="p-8">{children}</section>
        <footer className={footer ? "border-t px-8 py-4" : ""}>{footer}</footer>
      </div>
    </div>
  );
};

export default Modal;
